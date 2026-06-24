import { StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native';
import React, { useEffect, useState} from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from "expo-router";
import { getProducts } from "../../lib/productService"
import { getBills } from "../../lib/billService"

const Dashboard = () => {
  const router = useRouter();

  //Store the states
  const [ storeName, setStoreName ] = useState("My Store")
  const [ totalProducts, setTotalProducts ] = useState(0);
  const [ inventoryValue, setInventoryValue ] = useState(0);
  const [ totalBills, setTotalBills ] = useState(0);
  const [ lowStockCount, setLowStockCount ] = useState(0);
  const [ lowStockProducts, setLowStockProducts] = useState<any[]>([]);

  //loads dashboard data when u open up the page
  useEffect(() => {
    loadDashboard();
  }, [])

  //fetch details anc calculate metrics
  const loadDashboard = async () => {
    const storeData = await AsyncStorage.getItem("storeSetup")

    if (storeData) {
      const parsed = JSON.parse(storeData);
      setStoreName(parsed.storeName)
    }
    const products = getProducts() as any[];
    const bills = getBills() as any[];

    setTotalProducts(products.length);

    const Value = products.reduce(
      (sum, item) => sum + item.purchasePrice * item.stock,
      0
    );

    setInventoryValue(Value);

    setTotalBills(bills.length);

    const lowStock = products.filter(
      (item) => item.stock <= item.lowStockThreshold
    );

    setLowStockCount(lowStock.length)
    setLowStockProducts(lowStock)
  }
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView >
        {/*Header*/}
        <View style={styles.header}>
          <Text style={styles.logo}>
            OmniStock
          </Text>
          <TouchableOpacity onPress={() => router.push('/settings')}>
            <Text style={styles.icon}>⚙️</Text>
          </TouchableOpacity>
        </View>
        {/*Gretting Box*/}
        <View style={styles.greetingContainer}>
          <Text style={styles.greeting}>
            Good Morning,
          </Text>
          <Text style={styles.storeName}>
            {storeName}
          </Text>
        </View>
        {/*Analytics*/}
        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              Total Products
            </Text>
            <Text style={styles.cardValue}>
              {totalProducts}
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              Inventory Value
            </Text>
            <Text style={styles.cardValue}>
              ₹{inventoryValue}
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              Total Bills
            </Text>
            <Text style={styles.cardValue}>
              {totalBills}
            </Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              Low Stock
            </Text>
            <Text style={styles.cardValue}>
              {lowStockCount}
            </Text>
          </View>

        </View>
        <Text style={styles.sectionTitle}>
          Quick Actions
        </Text>
        {/*Quick Actions*/}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/onboarding/addproduct')}>
            <Text style={styles.actionIcon}>➕</Text>
            <Text>Add Product</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/addnewbill')}>
            <Text style={styles.actionIcon}>🧾</Text>
            <Text>Billing</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/billing')}>
            <Text style={styles.actionIcon}>📜</Text>
            <Text>History</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionCard} onPress={() => router.push('/inventory')}>
            <Text style={styles.actionIcon}>📦</Text>
            <Text>Inventory</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionTitle}>
          Low Stock Alerts
        </Text>
        {/*Low stock Container*/}
        <View style={styles.alertContainer}>
          {lowStockProducts.length === 0 ? (
            <Text>No low stock products 🎉</Text>
          ) : (
            lowStockProducts.map((item) => (
              <View
                key={item.id}
                style={styles.alertCard}
              >
                <View>
                  <Text style={styles.alertProductName}>
                    {item.name}
                  </Text>

                  <Text style={styles.alertCategory}>
                    {item.category}
                  </Text>
                </View>

                <View style={styles.stockBadge}>
                  <Text style={styles.stockBadgeText}>
                    {item.stock} LEFT
                  </Text>
                </View>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  header: {
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB"
  },
  logo : {
    fontSize: 24,
    fontWeight: "700",
    color: '#008080'
  },
  icon: {
    fontSize: 24
  },
  settings: {
    fontSize: 24
  },
  greetingContainer: {
    padding: 20
  },
  greeting: {
    fontSize: 18,
    color: "#6b7280"
  },
  storeName: {
    fontWeight: "700",
    fontSize: 28,
    marginTop: 4
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16
  },
  card: {
    width: "48%",
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12
  },
  cardTitle: {
    color: "#6b7280",
    marginBottom: 8
  },
  cardValue: {
    fontSize: 22,
    fontWeight: "700",
    color: "#008080"
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    margin: 16
  },
  quickActions: {
    flexDirection: "row",
    flexWrap: 'wrap',
    justifyContent: "space-between",
    paddingHorizontal: 16
  },
  actionCard: {
    width: "48%",
    backgroundColor: "#F9FAFB",
    padding: 20
  },
  actionIcon: {
    fontSize: 28,
    marginBottom: 8
  },
  alertContainer: {
  paddingHorizontal: 16,
  marginBottom: 20
},

alertCard: {
  backgroundColor: "#F9FAFB",
  borderRadius: 16,
  padding: 16,
  marginBottom: 12,
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center"
},

alertProductName: {
  fontSize: 16,
  fontWeight: "700"
},
alertCategory: {
  color: "#6B7280",
  marginTop: 4
},
stockBadge: {
  backgroundColor: "#FEE2E2",
  paddingHorizontal: 12,
  paddingVertical: 6,
  borderRadius: 20
},
stockBadgeText: {
  color: "#DC2626",
  fontWeight: "700"
},
});