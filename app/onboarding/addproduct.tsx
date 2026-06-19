import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { useRouter, useLocalSearchParams} from 'expo-router'
import { saveProduct } from '../../lib/productService';
import { SafeAreaView } from "react-native-safe-area-context";
import { getProductById, updateProduct } from '../../lib/productService';
import { useEffect } from 'react';


const AddProduct = () => {
    const router = useRouter()
    const { id } = useLocalSearchParams();

    console.log("Product ID:", id);
    const [productName, setProductName] = useState("")
    const [sku, setSku] = useState("")
    const [category, setCategory] = useState("")
    const [purchasePrice, setPurchasePrice] = useState("")
    const [sellingPrice, setSellingPrice] = useState("")
    const [gstRate, setGstRate] = useState("")
    const [currentStock, setCurrentStock] = useState("0")
    const [lowStockThreshold, setLowStockThreshold] = useState("10")

    useEffect(() => {
        if (!id) return;

        const product: any = getProductById(Number(id));

        if (!product) return;

        setProductName(product.name);
        setSku(product.sku);
        setCategory(product.category);
        setPurchasePrice(product.purchasePrice.toString());
        setSellingPrice(product.sellingPrice.toString());
        setGstRate(product.gstRate.toString());
        setCurrentStock(product.stock.toString());
        setLowStockThreshold(
            product.lowStockThreshold.toString()
  );
}, [id]);

    const handleSave = () => {
        if (!productName.trim()) {
            Alert.alert(
            "Validation Error",
            "Please enter product name"
            );
            return;
        }

        if (!sellingPrice.trim()) {
            Alert.alert(
            "Validation Error",
            "Please enter selling price"
            );
            return;
        }

        console.log("Product Ready To Save");
        if (id) {
            updateProduct(Number(id), {
            name: productName.trim(),
            sku: sku.trim(),
            category: category.trim(),
            purchasePrice: Number(purchasePrice),
            sellingPrice: Number(sellingPrice),
            gstRate: Number(gstRate),
            stock: Number(currentStock),
            lowStockThreshold: Number(lowStockThreshold),
        });

        Alert.alert("Success", "Product Updated");
        } else {
        saveProduct({
            name: productName.trim(),
            sku: sku.trim(),
            category: category.trim(),
            purchasePrice: Number(purchasePrice),
            sellingPrice: Number(sellingPrice),
            gstRate: Number(gstRate),
            stock: Number(currentStock),
            lowStockThreshold: Number(lowStockThreshold),
            createdAt: new Date().toISOString(),
        });

        Alert.alert("Success", "Product Added");
        }

        router.back();
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
            <View style={styles.header}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity style={styles.headerArrowButton} onPress={() => router.back()}>
                        <Text style={styles.headerArrowButtonText}>←</Text>
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Add Product</Text>
                </View>
                <TouchableOpacity style={styles.accountIcon}>
                    <Text style={styles.accountIconText}>👤</Text>
                </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
                <View style={styles.content}>
                    
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Basic Information</Text>
                            <Text style={styles.sectionSubtitle}>Primary details for inventory identification.</Text>
                        </View>
                        <View style={styles.divider} />

                        <View style={styles.formRow}>
                            <Text style={styles.label}>Product Name</Text>
                            <View style={styles.inputContainer}>
                                <TextInput 
                                    style={styles.input} 
                                    placeholder="e.g. Centrifuge Tube 50ml"
                                    value={productName}
                                    onChangeText={setProductName}
                                />
                            </View>
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.label}>SKU</Text>
                            <View style={styles.inputContainer}>
                                <TextInput 
                                    style={styles.input} 
                                    placeholder="e.g. CT-50-WH"
                                    value={sku}
                                    autoCapitalize='characters'
                                    onChangeText={setSku}
                                />
                            </View>
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.label}>Category</Text>
                            <View style={styles.inputContainer}>
                                <TextInput 
                                    style={styles.input} 
                                    placeholder="e.g. Lab Consumables"
                                    value={category}
                                    onChangeText={setCategory}
                                />
                            </View>
                        </View>
                    </View>

                    {/* Pricing & Tax Section */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Pricing & Tax</Text>
                            <Text style={styles.sectionSubtitle}>Financial metrics for this SKU.</Text>
                        </View>
                        <View style={styles.divider} />

                        <View style={styles.formRow}>
                            <Text style={styles.label}>Purchase Price</Text>
                            <View style={[styles.inputContainer, styles.symbolContainer]}>
                                <Text style={styles.symbolText}>₹</Text>
                                <TextInput 
                                    style={styles.input} 
                                    placeholder="0.00"
                                    keyboardType="numeric"
                                    value={purchasePrice}
                                    onChangeText={setPurchasePrice}
                                />
                            </View>
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.label}>Selling Price</Text>
                            <View style={[styles.inputContainer, styles.symbolContainer]}>
                                <Text style={styles.symbolText}>$</Text>
                                <TextInput 
                                    style={styles.input} 
                                    placeholder="0.00"
                                    keyboardType="decimal-pad"
                                    value={sellingPrice}
                                    onChangeText={setSellingPrice}
                                />
                            </View>
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.label}>GST Rate</Text>
                            <View style={[styles.inputContainer, styles.symbolContainer, { flex: 0.5 }]}>
                                <TextInput 
                                    style={styles.input} 
                                    placeholder="18"
                                    keyboardType="numeric"
                                    value={gstRate}
                                    onChangeText={setGstRate}
                                />
                                <Text style={[styles.symbolText, { paddingRight: 12, paddingLeft: 0 }]}>%</Text>
                            </View>
                        </View>
                    </View>

                    {/* Inventory Rules Section */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Inventory Rules</Text>
                            <Text style={styles.sectionSubtitle}>Stock levels and automated alerts.</Text>
                        </View>
                        <View style={styles.divider} />

                        <View style={styles.formRow}>
                            <Text style={styles.label}>Current Stock</Text>
                            <View style={styles.inputContainer}>
                                <TextInput 
                                    style={styles.input} 
                                    placeholder="0"
                                    keyboardType="numeric"
                                    value={currentStock}
                                    onChangeText={setCurrentStock}
                                />
                            </View>
                        </View>

                        <View style={styles.formRow}>
                            <Text style={styles.label}>Low Stock Threshold</Text>
                            <View style={[styles.inputContainer, { flex: 1.5 }]}>
                                <TextInput 
                                    style={styles.input} 
                                    placeholder="10"
                                    keyboardType="numeric"
                                    value={lowStockThreshold}
                                    onChangeText={setLowStockThreshold}
                                />
                            </View>
                            <View style={styles.alertBadge}>
                                <Text style={styles.alertBadgeText}>⚠ Alert</Text>
                            </View>
                        </View>
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.actionContainer}>
                        <TouchableOpacity style={styles.saveButton} onPress={async () => { await handleSave(); router.push('/inventory'); }}>
                            <Text style={styles.saveButtonText}>{id ? "Update Product" : "Save Product"}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
                            <Text style={styles.cancelButtonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingVertical: 15,
        backgroundColor: 'white',
        borderBottomColor: "#E5E5E5",
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15
    },
    headerArrowButton: {
        padding: 5
    },
    headerArrowButtonText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "#006666"
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: "#006666"
    },
    accountIcon: {
        width: 35,
        height: 35,
        backgroundColor: '#F0F0F0',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    accountIconText: {
        fontSize: 16
    },
    content: {
        paddingHorizontal: 20,
        paddingTop: 20
    },
    section: {
        marginBottom: 30
    },
    sectionHeader: {
        marginBottom: 10
    },
    sectionTitle: {
        fontWeight: "bold",
        fontSize: 22,
        color: '#111'
    },
    sectionSubtitle: {
        fontSize: 14,
        color: '#666',
        marginTop: 4
    },
    divider: {
        height: 1,
        backgroundColor: '#E5E5E5',
        marginBottom: 20
    },
    formRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        justifyContent: 'space-between'
    },
    label: {
        fontSize: 15,
        color: '#111',
        flex: 1,
    },
    inputContainer: {
        flex: 2,
        borderWidth: 1,
        borderColor: '#5b6978',
        borderRadius: 4,
        height: 45,
        justifyContent: 'center',
        backgroundColor: '#fff',
        overflow: 'hidden'
    },
    input: {
        flex: 1,
        paddingHorizontal: 12,
        fontSize: 15,
        color: '#333'
    },
    symbolContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    symbolText: {
        paddingLeft: 12,
        color: '#008080',
        fontSize: 16,
        fontWeight: 'bold'
    },
    alertBadge: {
        backgroundColor: '#FFF0F0',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 4,
        marginLeft: 10,
    },
    alertBadgeText: {
        color: '#D32F2F',
        fontSize: 12,
        fontWeight: '500'
    },
    actionContainer: {
        marginTop: 20,
        alignItems: 'center',
        gap: 15
    },
    saveButton: {
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 4,
    },
    saveButtonText: {
        fontSize: 16,
        color: '#111',
    },
    cancelButton: {
        paddingVertical: 12,
        paddingHorizontal: 30,
    },
    cancelButtonText: {
        fontSize: 16,
        color: '#111',
    }
})

export default AddProduct