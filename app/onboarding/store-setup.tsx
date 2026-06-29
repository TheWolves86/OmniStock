import { View, Text, Image, TouchableOpacity, FlatList, ScrollView, Switch, StyleSheet, TextInput, Pressable, Alert} from 'react-native'
import React, { useState} from 'react'
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from 'expo-router'
import SwitchSelector from "react-native-switch-selector";
import AsyncStorage from '@react-native-async-storage/async-storage'


const StoreSetup = () => {
  const router = useRouter()
  const [storeName, setStoreName] = useState("")
  const [haveEmployee, setEmployee] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState("")
  const saveStoreSetup = async () => {
  try {
    if (!storeName.trim()) {
      Alert.alert("Error", "Please enter a store name")
      return
    }

    if (!selectedTemplate) {
      Alert.alert("Error", "Please select a template")
      return
    }

    const setupData = {
      storeName,
      haveEmployee,
      selectedTemplate,
    }

    await AsyncStorage.setItem(
      "storeSetup",
      JSON.stringify(setupData)
    )

    await AsyncStorage.setItem(
      "storeSetupComplete",
      "true"
    )

    Alert.alert("Success", "Store setup saved!")

    // Later we'll navigate
    // router.replace('/dashboard')

  } catch (error) {
    console.log("SAVE ERROR:", error)
    // Security Fix: Do not leak internal error details to the user
    Alert.alert("Error", "An error occurred while saving the store setup. Please try again.")
  }
}
  const templates = [
  { id: "kirana", name: "Grocery", icon: "🛒" },
  { id: "clothing", name: "Clothing", icon: "👕" },
  { id: "saree", name: "Saree", icon: "🧵" },
  { id: "custom", name: "Create Your Own", icon: "⚙️" },
  ]
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white'}}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerText}>OmniStock</Text>
          <TouchableOpacity style={styles.headerButton}>
            <Text style={styles.headerButtonText}>?</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.content}>
        <View>
            <View style={styles.contentintro}>
              <Text style={styles.contentIntroText}>Let's set up your store</Text>
              <Text style={styles.contentIntroDescription}>Configure your digital inventory environment with clinical precision.</Text>
            </View>
          </View>
          <View style={styles.contentstorename}>
              <Text style={styles.contentstorenametitle}>OWNER / STORE NAME</Text>
              <TextInput style={styles.contentstorenameinput} value={storeName} placeholder='e.g. Tanya Creations' placeholderTextColor="lightgrey" onChangeText={(newtext) => setStoreName(newtext)} maxLength={100} />
          </View>
          <View style={styles.employeesection}>
            <Text style={styles.employeeTitle}>Do you have employees?</Text>
            <Text style={styles.employeeDescription}>Setup access roles for your staff.</Text>
            <View style={{width:200}}>
              <SwitchSelector
                initial={0}
                onPress={(val: string) => setEmployee(val === "yes")}
                textColor="#666"
                selectedColor="#fff"
                buttonColor="#008080"
                backgroundColor="#f2f2f2"
                borderRadius={50}
                hasPadding
                options={[
                  { label: "NO", value: "no" },
                  { label: "YES", value: "yes" }
                ]}
              />
            </View>
          </View>
          <View style={styles.templateSection}>
              <Text style={styles.templateTitle}>Choose a Template</Text>
              {templates.map((template) => (
              <Pressable
                key={template.id}
                onPress={() => setSelectedTemplate(template.id)}
                style={[
                  styles.templateCard,
                  selectedTemplate === template.id &&
                    styles.selectedTemplateCard
                ]}
                
              >
                <Text>{template.icon}</Text>
                <Text>{template.name}</Text>
              </Pressable>
            ))}
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.footerbutton}
            onPress={async () => {
              await saveStoreSetup();
              router.replace("/(tabs)");;
            }}
          >
            <Text style={styles.footerbuttontext}>Complete Setup</Text>
          </TouchableOpacity>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  )
}

const styles =  StyleSheet.create({
  header: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingHorizontal: 20,
  paddingVertical: 10,
  backgroundColor: 'white',
  borderColor: "lightgrey",
  borderWidth: 1
},

headerText: {
  fontSize: 22,
  fontWeight: 'bold',
  color: '#008080',
},

headerButton: {
  width: 36,
  height: 36,
  borderRadius: 18,
  borderWidth: 1,
  borderColor: '#008080',
  justifyContent: 'center',
  alignItems: 'center',
},

headerButtonText: {
  color: '#008080',
  fontSize: 18,
  fontWeight: 'bold',
},
content: {
  paddingHorizontal: 15
},
contentintro: {
  marginTop: 20,
  gap: 12,
  paddingHorizontal: 20,
},
contentIntroText: {
  fontSize: 25,
  fontWeight: 'bold'
},
contentIntroDescription: {
},
contentstorename: {
  marginTop: 25,
  gap: 5,
  paddingHorizontal: 20
},
contentstorenametitle: {
  color: "#008080",
  fontWeight: "bold"
},
contentstorenameinput: {
  borderWidth: 0.5,
  borderColor: "#008080",
  borderRadius: 20,
  height: 40,
  paddingHorizontal: 20,
},
employeesection: {
  borderWidth: 0.8,
  borderColor: "#008080",
  marginTop: 20,
  padding: 10,
  borderRadius: 15,
  paddingHorizontal: 20,
  gap:5
},
employeeTitle: {
  marginTop: 10,
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 5,
},

employeeDescription: {
  color: '#64748B',
  marginBottom: 15,
},
templateSection: {
  marginTop: 30
},
templateTitle: {
  fontSize: 20,
  fontWeight: 'bold'
},
templateCard: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 10,
  padding: 15,
  borderWidth: 1,
  borderColor: '#E5E7EB',
  borderRadius: 15,
  marginTop: 10,
},
selectedTemplateCard: {
  borderColor: '#008080',
  backgroundColor: '#E6F7F7',
},
footer: {
  marginTop: 25,
  padding: 15
},
footerbutton: {
  backgroundColor: "#008080",
  padding: 15,
  alignItems: "center",
  borderRadius: 25
},
footerbuttontext: {
  color: 'white',
  fontSize: 18,
  fontWeight: "bold"
}
})

export default StoreSetup