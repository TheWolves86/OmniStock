import { View, ScrollView, Pressable, Text} from "react-native";
import ProductCard from "../../components/productcard";
import React, {useState, useEffect} from "react"
import { getProducts } from "../../lib/productService";
import { useRouter } from 'expo-router'

export default function Inventory() {
  const router = useRouter();
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
    const data = getProducts();

    setProducts(data as any[]);
  }, []);
  return (
    <View style={{flex: 1}}>
      <ScrollView
      contentContainerStyle={{
        padding: 16,
    }}
    >
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
    </ScrollView>
    <Pressable style={{position: 'absolute',bottom:10,right:20, width:56,height:56,borderRadius: 28,backgroundColor: "#008080", justifyContent: "center", alignItems: "center", elevation: 8}} onPress={() => router.push('../onboarding/addproduct')}>
      <Text style={{color: "#FFFFFF",fontSize: 28, fontWeight: "300"}}>+</Text>
    </Pressable>
  </View>
  );
}