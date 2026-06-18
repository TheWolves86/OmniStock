import { Tabs } from 'expo-router'

export default function TabLayout(){
  return (
    <Tabs screenOptions={{headerShown: false}}>
      <Tabs.Screen name="index" options={{title: "Dashboard"}}/>
      <Tabs.Screen name="inventory" options={{title: "Inventory",}}/>
      <Tabs.Screen name="billing" options={{title: "Billing"}}/>
      <Tabs.Screen name="report" options={{title: "Reports"}}/>
      <Tabs.Screen name="settings" options={{title: "Settings"}}/>
    </Tabs>
    
  )
}