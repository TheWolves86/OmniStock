import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView} from 'react-native'
import React, { useState, useEffect} from 'react'
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from "expo-router"
import BillItemCard from "../components/BillItemCard"
import { getProducts } from "../lib/productService"
import { saveBill} from "../lib/billService"
import { reduceProductStock } from '../lib/productService'


const billing = () => {
  const router = useRouter();
  const [ cartItems, setCartItems ] = useState<any[]>([]);
  const [ paymentMethod, setPaymentMethod] = useState("Cash")
  const [ products, setProducts ] = useState<any[]>([]);
  const [ searchQuery, setSearchQuery ] = useState("");
  const [ bills, setBills ] = useState<any[]>([]);
  const [ customerName, setCustomerName] = useState("");
  const [ customerPhone, setCustomerPhone] = useState("");
  const [ customerAddress, setCustomerAddress] = useState("");

  useEffect(() => {
    const data = getProducts();
    setProducts(data as any[]);
  }, []);


  const increaseQuantity = (id: number) => {
    setCartItems((prev) => prev.map((item) => item.id === id ? {...item, quantity: item.quantity + 1} : item))
  }

  const decreaseQuantity = (id: number) => {
  setCartItems((prev) =>
    prev
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
    );
  };

  const filteredProducts = products.filter((product) =>
  (product.name || "")
    .toLowerCase()
    .includes(searchQuery.toLowerCase())
  );

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const gstTotal = cartItems.reduce(
  (sum, item) =>
    sum + ((item.price * item.quantity) * item.gstRate) / 100,
  0
  );
  const grandTotal = subtotal + gstTotal;

  const handleGenerateInvoice = () => {
    if (cartItems.length === 0) {
      return;
    }
     
    saveBill(
      ({
        invoiceNumber: `INV-${Date.now()}`,
        customerName,
        customerPhone,
        customerAddress: "",
        paymentMethod,
        subtotal,
        gstTotal,
        grandTotal,
        createdAt: new Date().toISOString()
      } as any),
      cartItems
    );

    cartItems.forEach((item) => {
      reduceProductStock(
        item.id,
        item.quantity
      );
    });

    setCartItems([]);

    alert("Invoice Saved")
  };

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
      <View style={styles.customerContainer}>
        <TextInput placeholder='Customer Name' value={customerName} onChangeText={setCustomerName} style={styles.customerInput}/>
        <TextInput placeholder='Phone Number' value={customerPhone} onChangeText={setCustomerPhone} style={styles.customerInput}/>
        <TextInput placeholder='Address'value={customerAddress} onChangeText={setCustomerAddress} style={styles.customerInput}/>
      </View>
      <View style={styles.searchBar}>
        <Text style={{ marginRight: 10 }}>🔍</Text>
        <TextInput placeholder='Search by product name...' style={{ flex: 1}} value={searchQuery} onChangeText={setSearchQuery}/>
      </View>
      {searchQuery.length > 0 && (
        <ScrollView
          style={{
            maxHeight: 200,
            marginHorizontal: 16,
            borderWidth: 1,
            borderColor: "#E5E7EB",
            borderRadius: 12,
            backgroundColor: "white",
          }}
        >
          {filteredProducts.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={{
                padding: 12,
                borderBottomWidth: 1,
                borderColor: "#E5E7EB",
              }}
              onPress={() => {
                setCartItems((prev) => [
                  ...prev,
                  {
                    id: product.id,
                    name: product.name,
                    sku: product.sku,
                    price: product.sellingPrice,
                    quantity: 1,
                    gstRate: product.gstRate
                  },
                ]);

                setSearchQuery("");
              }}
            >
              <Text style={{ fontWeight: "600" }}>
                {product.name}
              </Text>

              <Text style={{ color: "#6B7280" }}>
                ₹{product.sellingPrice}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      
      <ScrollView style={{ flex: 1 }}>
        {cartItems.map((item) => (
          <BillItemCard
            key={item.id}
            id={item.id}
            name={item.name}
            sku={item.sku}
            price={item.price}
            quantity={item.quantity}
            onIncrease={increaseQuantity}
            onDecrease={decreaseQuantity}
          />
        ))}
      </ScrollView>

      <View style={styles.paymentContainer}>
        <TouchableOpacity
          style={[
            styles.paymentButton,
            paymentMethod === "Cash" && styles.paymentButtonActive,
          ]}
          onPress={() => setPaymentMethod("Cash")}
        >
          <Text>Cash</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.paymentButton,
            paymentMethod === "Card" && styles.paymentButtonActive,
          ]}
          onPress={() => setPaymentMethod("Card")}
        >
          <Text>Card</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.paymentButton,
            paymentMethod === "UPI" && styles.paymentButtonActive,
          ]}
          onPress={() => setPaymentMethod("UPI")}
        >
          <Text>UPI</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.summaryLeft}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>
              ₹{subtotal.toFixed(2)}
            </Text>
          </View>

          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>GST</Text>
            <Text style={styles.summaryValue}>
              ₹{gstTotal.toFixed(2)}
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

        <TouchableOpacity style={styles.generateButton} onPress={handleGenerateInvoice}>
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
  paymentContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    marginBottom: 12
  },
  paymentButton: {
    flex: 1,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 12,
    alignItems: "center",
    marginHorizontal: 4,
  },
  paymentButtonActive: {
    backgroundColor: "#008080"
  },
  customerContainer: {
    paddingHorizontal: 16,
  },
  customerInput: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10
  }
})