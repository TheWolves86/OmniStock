import { View, Text } from 'react-native'
import React, { useEffect} from 'react'
import { getProducts } from "../../lib/productService"

export default function Inventory() {
  useEffect(() => {
    const products = getProducts();

    console.log(products);
  }, []);

  return (
    <View>
      <Text>Inventory Screen</Text>
    </View>
  );
}
