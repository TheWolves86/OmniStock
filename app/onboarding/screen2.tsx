import { View, Text, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from 'expo-router'
import AsyncStorage from '@react-native-async-storage/async-storage';

const screen2 = () => {
  const router = useRouter()
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ flex: 1, justifyContent: 'space-between', padding: 20 }}>
        <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
          <Text style={{color: 'black', fontWeight: 'bold', fontSize: 20}}>OmniStock</Text>
          <TouchableOpacity onPress={async () => {await AsyncStorage.setItem("onboardingComplete","true");router.replace("/onboarding/store-setup");}}>
            <Text style={{fontSize: 15}}>Skip</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center',  }}>
        <Image 
          source={require('../../assets/screen1.png')}
          style={{ width: 300, height: 400, marginBottom: 20, borderRadius: 65 }}
          resizeMode="contain" 
        /> 
        <Text style={{ color: 'black', fontWeight: 'bold', fontSize: 28, textAlign: 'center', marginBottom: 10 }}>
           Grow ur Business
        </Text>
        <Text style={{ color: '#64748b', fontSize: 16, textAlign: 'center', paddingHorizontal: 10 }}>
          Get deep insights into your inventory, stock movements, and business performance from one place.
        </Text>
        </View>
        <View style={{ marginBottom: 20, gap: 10}}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10}}>
            <View style={{ backgroundColor: 'lightgrey', height:10, width: 10, borderRadius: 6}}></View>
            <View style={{ backgroundColor: '#008080', height:10, width: 10, borderRadius: 6 }}></View>
            <View style={{ backgroundColor: 'lightgrey', height:10, width: 10, borderRadius: 5 }}></View>
          </View>
          <TouchableOpacity style={{alignItems: 'center'}} onPress={() => router.push('/onboarding/screen3')}>
            <View style={{ backgroundColor: "#008080", paddingVertical: 15, paddingHorizontal: 30, borderRadius: 20, width: '90%', alignItems: 'center'}}>
              <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16}}>
                Next
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default screen2