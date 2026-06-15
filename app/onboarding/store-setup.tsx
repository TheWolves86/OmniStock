import { View, Text, Image, TouchableOpacity, FlatList, ScrollView} from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from 'expo-router'

const storesetup = () => {
  const router = useRouter()
  return (
    <View>
      <Text>store-setup</Text>
    </View>
  )
}

export default storesetup