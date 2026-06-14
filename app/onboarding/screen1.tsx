import React from 'react'
import { useRouter } from 'expo-router'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";

const screen1 = () => {
  const router = useRouter()
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1, justifyContent: 'space-between', padding: 20 }}>
        <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20}}>OmniStock</Text>
          <TouchableOpacity onPress={() => router.push('/onboarding/screen2')}>
            <Text style={{fontSize: 15}}>Skip</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center',  }}>
        <Image 
          source={require('../../assets/welcome-icon.png')}
          style={{ width: 300, height: 400, marginBottom: 20 }}
          resizeMode="contain" 
        />
        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 28, textAlign: 'center', marginBottom: 10 }}>
          Master Your Inventory
        </Text>
        <Text style={{ color: '#64748b', fontSize: 16, textAlign: 'center', paddingHorizontal: 10 }}>
          Effortlessly track stock levels, manage custom templates, and get alerts in real-time.
        </Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default screen1