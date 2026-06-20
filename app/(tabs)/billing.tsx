import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView} from 'react-native'
import React, { useState, useEffect} from 'react'
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"
import BillItemCard from "../../components/BillItemCard"
import { getProducts } from "../../lib/productService"

const billing = () => {
  const router = useRouter();
  const cartItems = [
  {
    id: 1,
    name: "Premium Hand Sanitizer",
    sku: "SAN-001",
    price: 120,
    quantity: 2,
  },
  {
    id: 2,
    name: "Coffee Beans",
    sku: "COF-001",
    price: 350,
    quantity: 1,
  },
  ];

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [ products, setProducts ] = useState<any[]>([]);
  const [ searchQuery, setSearchQuery ] = useState("");


  useEffect(() => {
    const data = getProducts();
    setProducts(data as any[]);
  }, []);

  const filteredProducts = products.filter((product) =>
  (product.name || "")
    .toLowerCase()
    .includes(searchQuery.toLowerCase())
  );//

  const cgst = subtotal * 0.09;
  const sgst = subtotal * 0.09;
  const grandTotal = subtotal + cgst + sgst;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.icon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>New Bill</Text>
        <TouchableOpacity>
          <Text style={styles.icon}>👤</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.searchBar}>
        <Text style={{ marginRight: 10 }}>🔍</Text>
        <TextInput placeholder='Search by product name...' style={{ flex: 1}} value={searchQuery} onChangeText={setSearchQuery}/>
      </View>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{padding: 20}}>
        {cartItems.map((item) => (
          <BillItemCard key={item.id} name={item.name} sku={item.sku} price={item.price} quantity={item.quantity} />
        ))}
      </ScrollView>
      

      <View style={styles.bottomContainer}>
        <View style={styles.summaryLeft}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>
              ₹{subtotal.toFixed(2)}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>CGST (9%)</Text>
            <Text style={styles.summaryValue}>
              ₹{cgst.toFixed(2)}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>SGST (9%)</Text>
            <Text style={styles.summaryValue}>
              ₹{sgst.toFixed(2)}
            </Text>
          </View>
        </View>

        <View style={styles.summaryDivider} />

        <View style={styles.summaryRight}>
          <Text style={styles.grandTotalLabel}>
            GRAND TOTAL
          </Text>

          <Text style={styles.grandTotalValue}>
            ₹{grandTotal.toFixed(2)}
          </Text>
        </View>
      </View>

      <View style={styles.actionContainer}>
        <TouchableOpacity style={styles.holdButton}>
          <Text style={styles.holdButtonText}>
            Hold Bill
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.generateButton}>
          <Text style={styles.generateButtonText}>
            Generate Invoice
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  ) 
}

export default billing

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB"
  },
  title: {
    fontSize: 25,
    fontWeight: "700",
    color: "#008080"
  },
  icon: {
    fontSize: 23,
    color: "#008080"
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    margin: 16,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 30,
    paddingHorizontal: 16,
    paddingVertical: 12
  },

bottomContainer: {
  flexDirection: "row",
  padding: 16,
  borderTopWidth: 1,
  borderColor: "#E5E7EB",
  alignItems: "center",
},

summaryLeft: {
  flex: 1,
},

summaryDivider: {
  width: 1,
  height: 80,
  backgroundColor: "#E5E7EB",
  marginHorizontal: 16,
},

summaryRight: {
  alignItems: "center",
},

grandTotalLabel: {
  fontSize: 12,
  color: "#6B7280",
  letterSpacing: 1,
},

grandTotalValue: {
  fontSize: 28,
  fontWeight: "700",
  color: "#008080",
  marginTop: 8,
},

actionContainer: {
  flexDirection: "row",
  paddingHorizontal: 16,
  paddingBottom: 16,
},

holdButton: {
  flex: 1,
  borderWidth: 1,
  borderColor: "#D1D5DB",
  borderRadius: 16,
  justifyContent: "center",
  alignItems: "center",
  paddingVertical: 16,
  marginRight: 12,
},

holdButtonText: {
  fontWeight: "600",
},

generateButton: {
  flex: 2,
  backgroundColor: "#008080",
  borderRadius: 16,
  justifyContent: "center",
  alignItems: "center",
  paddingVertical: 16,
},
summaryRow: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 8,
},

summaryLabel: {
  fontSize: 14,
  color: "#374151",
},

summaryValue: {
  fontSize: 14,
  color: "#111827",
},

generateButtonText: {
  color: "white",
  textAlign: "center",
  fontWeight: "700",
  fontSize: 16,
},
})