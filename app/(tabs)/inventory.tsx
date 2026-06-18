import { View, ScrollView} from "react-native";
import ProductCard from "../../components/productcard";
import React, {useState, useEffect} from "react"
import { getProducts } from "../../lib/productService"; 

export default function Inventory() {
  const [products, setProducts] = useState<any[]>([]);
  useEffect(() => {
  const data = getProducts();

  setProducts(data as any[]);
}, []);
  return (
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
  );
}