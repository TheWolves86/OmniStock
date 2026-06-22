import { StyleSheet, Text, View, ScrollView, TouchableOpacity} from 'react-native'
import React, { useEffect, useState} from 'react'
import { getBills } from '../../lib/billService'
import { SafeAreaView } from "react-native-safe-area-context"
import { useRouter } from 'expo-router'

const Billing = () => {
  const [bills, setBills] = useState<any[]>([]);
  const router = useRouter()

  useEffect(() => {
    const data = getBills();
    setBills(data as any[]);
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white"}}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.icon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Billing History</Text>
        <TouchableOpacity>
          <Text style={styles.icon}>👤</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.container}>
        {bills.map((bill) => (
          <View key={bill.id} style={styles.billCard}>
            <View style={{ flex: 1}}>
              <Text style={styles.customerName}>
                {bill.customerName || "Walk-in Customer"}
              </Text>
              <Text style={styles.invoiceNumber}>
                {bill.invoiceNumber}
              </Text>
              <Text style={styles.paymentMethod}>
                {bill.paymentMethod}
              </Text>
            </View>

            <View style={{ alignItems: 'flex-end'}}>
              <Text style={styles.amount}>
                ₹{bill.grandTotal}
              </Text>

              <Text style={styles.date}>
                {new Date(bill.createdAt).toLocaleDateString()}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.fab} onPress={() => router.push('/addnewbill')}>
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
  </SafeAreaView>
  )
}

export default Billing

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingTop: 16
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
  billCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center',
    backgroundColor: "white",
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#F9FAFB"
  },

  invoiceNumber: {
    fontSize: 16,
    fontWeight: "700"
  },

  paymentMethod: {
    color: "#6b7280",
    marginTop: 4
  },
  
  amount: {
    fontSize: 18,
    fontWeight: "700",
    color: "#008080"
  },
  customerName: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 4
  },

  date: {
    color: "#6B7280",
    marginTop: 4,
    fontSize: 12
  },
  fab: {
  position: "absolute",
  bottom: 24,
  right: 24,

  width: 60,
  height: 60,
  borderRadius: 30,

  backgroundColor: "#008080",

  justifyContent: "center",
  alignItems: "center",

  elevation: 5,
},

fabText: {
  color: "white",
  fontSize: 32,
  fontWeight: "700",
}

});//
