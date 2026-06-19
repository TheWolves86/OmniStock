import { View, ScrollView, Pressable, Text, StyleSheet, TouchableOpacity, TextInput} from "react-native";
import ProductCard from "../../components/productcard";
import React, {useState, useEffect} from "react"
import { getProducts } from "../../lib/productService";
import { useRouter } from 'expo-router'
import { SafeAreaView } from "react-native-safe-area-context";

export default function Inventory() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    const data = getProducts();

    setProducts(data as any[]);
  }, []);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <ScrollView
      contentContainerStyle={{
        
    }}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Products</Text>
        <TouchableOpacity style={styles.accountIcon}>
          <Text style={styles.accountIconText}>👤</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.searchBar}>
        <TouchableOpacity style={{}}>
          <Text style={styles.searchBarSearchIcon}>🔍</Text>
        </TouchableOpacity>
        <TextInput placeholder="Search products..." style={{flex: 1}}></TextInput>
      </View>
      <View style={styles.productCardList}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            sku={product.sku}
            category={product.category}
            purchasePrice={product.purchasePrice}
            price={product.sellingPrice}
            gstRate={product.gstRate}
            stock={product.stock}
            lowStockThreshold={product.lowStockThreshold}
            createdAt={product.createdAt}
          />
        ))}
      </View>
    </ScrollView>
    <Pressable style={{position: 'absolute',bottom:10,right:20, width:56,height:56,borderRadius: 28,backgroundColor: "#008080", justifyContent: "center", alignItems: "center", elevation: 8}} onPress={() => router.push('/onboarding/addproduct')}>
      <Text style={{color: "#FFFFFF",fontSize: 28, fontWeight: "300"}}>+</Text>
    </Pressable>
  </SafeAreaView>
  );
}//

const styles = StyleSheet.create({
  header: {
    borderWidth: 1,
    borderColor: "lightgrey",
    flexDirection: "row",
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 15
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 25,
    color: "#027171"
  },
  productCardList: {
    padding: 16
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
  searchBar: {
    borderWidth: 0.3,
    padding: 5,
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 10,
    paddingHorizontal: 16,
    marginLeft: 16,
    marginRight: 16,
    flexDirection: "row",
    alignItems: 'center'
  },
  searchBarSearchIcon: {
    fontSize: 20
  },
  FilterIcon: {

  }
})
