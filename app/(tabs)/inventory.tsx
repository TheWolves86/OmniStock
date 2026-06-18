import { View } from "react-native";
import ProductCard from "../../components/productcard";

export default function Inventory() {
  return (
    <View style={{ padding: 16 }}>
      <ProductCard
        name="Green Bottle"
        sku="SUNNY PET"
        category="Bottles"
        purchasePrice={20}
        price={60}
        gstRate={18}
        stock={121}
        lowStockThreshold={20}
        createdAt="2026-06-18"
      />
    </View>
  );
}