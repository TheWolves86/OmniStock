import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet} from 'react-native'

type Props = {
    id: number;
    name: string;
    sku: string;
    price: number;
    quantity: number;
    onIncrease: (id: number) => void;
    onDecrease: (id: number) => void
};
//
export default function BillItemCard({
    id,
    name,
    sku,
    price,
    quantity,
    onIncrease,
    onDecrease
}: Props) {
    return (
        <View style={styles.card}>
            <View style={styles.image}>
                <Text>📦</Text>
            </View>

            <View style={{ flex: 1 }}>
                <Text style={styles.name}>{ name }</Text>
                <Text style={styles.sku}>{ sku }</Text>
                <Text style={styles.price}>₹{price}</Text>

                <View style={styles.quantityrow}>
                    <TouchableOpacity style={styles.qtyButton} onPress={() => onDecrease(id)}>
                        <Text>-</Text>
                    </TouchableOpacity>

                    <Text>{quantity}</Text>

                    <TouchableOpacity style={styles.qtyButton} onPress={() => onIncrease(id)}>
                        <Text>+</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View>
                <Text style={styles.total}>
                    ₹{price * quantity}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        flexDirection: "row",
        backgroundColor: "#fff",
        marginHorizontal: 16,
        marginBottom: 12,
        padding: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: "#E5E7EB"
    },
    image: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#F3F4F6",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12
    },

    name: {
        fontWeight: "600",
        fontSize: 16
    },

    sku: {
        color: "gray",
        marginTop: 2
    },

    price: {
        color: "#008080",
        marginTop: 4 
    },
    quantityrow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12,
        marginTop: 10,
    },
    qtyButton: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: "#F3F4F6",
        justifyContent: "center",
        alignItems: "center"
    },
    total: {
        fontWeight: "700",
        fontSize: 16
    }
})
