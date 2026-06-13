import React from 'react'
import { styled } from 'nativewind';
import { View, Text, StyleSheet } from 'react-native'
import { SafeAreaView as RNSafeAreaView } from "react-native-safe-area-context";

const SafeAreaView = styled(RNSafeAreaView);
const screen1 = () => {
  return (
    <View >
      <Text>screen1</Text>
      <Text>Hi</Text>
      <View>
        <Text>Hi</Text>
      </View>
    </View>
  )
}

export default screen1
