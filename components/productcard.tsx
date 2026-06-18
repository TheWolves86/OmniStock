import React, { useState } from 'react'
import { Modal, Pressable, StyleSheet, Text, View} from 'react-native'

type ProductCardProps = {
    name: string;
    sku: string;
    category: string;
    purchasePrice: number;
    price: number;
    gstRate: number;
    stock: number;
    lowStockThreshold: number;
    createdAt: string;
};

export default function ProductCard({
    name,
    sku,
    category,
    purchasePrice,
    price,
    gstRate,
    stock,
    lowStockThreshold,
    createdAt,
}: ProductCardProps) {
    const [modalVisisble, setModalVisible] = useState(false);

    return (
        <>
           <Pressable
                style={styles.card}
                onPress={() => setModalVisible(true)}
                >
                <View style={styles.imagePlaceholder}>
                    <Text style={styles.imageText}>📦</Text>
                </View>

                <View style={styles.detailsContainer}>
                    <Text style={styles.name} numberOfLines={2}>
                    {name}
                    </Text>

                    <View style={styles.bottomSection}>
                    <View>
                        <View style={styles.categoryBadge}>
                        <Text style={styles.categoryText}>
                            {category}
                        </Text>
                        </View>

                        <Text style={styles.stock}>
                        {stock} Units Left
                        </Text>
                    </View>

                    <Text style={styles.price}>
                        ₹{price}
                    </Text>
                    </View>
                </View>
            </Pressable>
            <Modal visible={modalVisisble} animationType="slide" transparent>
                <View style={styles.overlay}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.modalTitle}>Product Details</Text>

                        <View style={styles.bigImage}>
                            <Text style={styles.imageText}>📦</Text>
                        </View>

                        <Text>Name: {name}</Text>
                        <Text>SKU: {sku}</Text>
                        <Text>Category: {category}</Text>

                        <Text>
                        Purchase Price: ₹{purchasePrice}
                        </Text>

                        <Text>
                        Selling Price: ₹{price}
                        </Text>

                        <Text>
                        GST Rate: {gstRate}%
                        </Text>

                        <Text>
                        Current Stock: {stock}
                        </Text>

                        <Text>
                        Low Stock Threshold: {lowStockThreshold}
                        </Text>

                        <Text>
                        Created At: {createdAt}
                        </Text>

                        <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeText}>Close</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 24,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: "#E5E7EB",
        },

    imagePlaceholder: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: "#F3F4F6",
        justifyContent: "center",
        alignItems: "center",
        },

    imageText: {
        fontSize: 28,
        },

    detailsContainer: {
        flex: 1,
        marginLeft: 16,
        },

    name: {
        fontSize: 18,
        fontWeight: "600",
        color: "#111827",
        },

    bottomSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-end",
        marginTop: 12,
        },

    categoryBadge: {
        borderWidth: 1,
        borderColor: "#E5E7EB",
        borderRadius: 20,
        paddingHorizontal: 10,
        paddingVertical: 4,
        alignSelf: "flex-start",
        },

    categoryText: {
        fontSize: 12,
        color: "#6B7280",
        },

    stock: {
        marginTop: 6,
        fontSize: 13,
        color: "#059669",
        fontWeight: "600",
        },

    price: {
        fontSize: 22,
        color: "#0891B2",
        fontWeight: "700",
        },
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.4)",
        justifyContent: 'center',
        padding: 20
    },
    modalContainer: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 20
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: "700",
        marginBottom: 16,
    },

    bigImage: {
        width: "100%",
        height: 180,
        backgroundColor: "#E5E7EB",
        borderRadius: 12,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 16
    },
    closeButton: {
        marginTop: 20,
        backgroundColor: "#2563EB",
        padding: 12,
        borderRadius: 10
    },
    closeText: {
        color: "white",
        textAlign: "center",
        fontWeight: "600",
    }
})