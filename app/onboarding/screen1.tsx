import React from 'react'

import { View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";

const screen1 = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <Image source={require('../../assets/images/welcome-icon.png')} className="w-full h-1/2" resizeMode="contain" />
    </SafeAreaView>
  )
}

export default screen1