import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { Colors } from './../../constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export default function TabLayout() {
  return (
   <Tabs screenOptions={{
    headerShown: false,
    tabBarActiveTintColor: Colors.PRIMARY,
   }}>
    
     <Tabs.Screen name="mytrip" 
     options ={{
      tabBarLabel: 'My Trip',
      tabBarIcon: ({ color }) =><Ionicons name = "location-sharp" 
      size={24} color={color} /> 
     }}/>
     <Tabs.Screen name="discover"
      options ={{
      tabBarLabel: 'Explore',
      tabBarIcon: ({ color }) =><Ionicons name="globe-sharp" 
      size={24} color={color} /> 
     }} />
     <Tabs.Screen name="premium" 
     options ={{
      tabBarLabel: 'Premium',
      tabBarIcon: ({ color }) =><MaterialIcons name="workspace-premium" size={24} color={color} /> 
     }} />
    <Tabs.Screen name="profile" 
     options ={{
      tabBarLabel: 'Profile',
      tabBarIcon: ({ color }) =><Ionicons name="people-circle" 
      size={24} color={color} /> 
     }} />
      
   </Tabs>    
   
  )
}