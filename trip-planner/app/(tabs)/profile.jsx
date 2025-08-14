import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from 'expo-router';
import Colors from '../../constants/Colors';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';

export default function Profile() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: '',
    });
  }, []);

  const menuItems = [
    {
      section: 'Settings',
      items: [
        // { icon: 'person-outline', label: 'Profile', iconLib: Ionicons, onPress: () => navigation.push('/profile/edit') },
        { icon: 'notifications-none', label: 'Notifications', iconLib: MaterialIcons, onPress: () => navigation.push('/notifications') },
      ],
    },
    {
      section: 'Trips',
      items: [
        { icon: 'inbox', label: 'Your Trips', iconLib: Feather, onPress: () => navigation.push('/trips') },
      ],
    },
    {
      section: 'Support',
      items: [
        { icon: 'help-circle-outline', label: 'Help Center', iconLib: Ionicons, onPress: () => navigation.push('/help') },
        { icon: 'phone', label: 'Contact Us', iconLib: Feather, onPress: () => navigation.push('/contact') },
        { icon: 'logout', label: 'Log Out', iconLib: MaterialIcons, color: Colors.RED, onPress: () => console.log('Logout pressed') },
      ],
    },
  ];

  return (
    <ScrollView style={{ backgroundColor: Colors.WHITE, height: '100%' }}>
      {/* Profile Header */}
      <Text style={{
        padding:20, marginTop:30, fontFamily:'outfit-bold',fontSize:40
      }}> Profile</Text>
      <View style={{ paddingHorizontal: 20, alignItems: 'center', marginBottom: 30, marginTop:5 }}>
       
        <Text style={{ fontFamily: 'outfit-bold', fontSize: 22 }}>GuideX</Text>
        <Text style={{ fontFamily: 'outfit', fontSize: 14, color: Colors.GRAY }}>guidex@example.com</Text>

        <TouchableOpacity
          style={{
            marginTop: 15,
            backgroundColor: Colors.PRIMARY,
            paddingHorizontal: 20,
            paddingVertical: 8,
            borderRadius: 20,
          }}
         // onPress={() => navigation.push('/profile/edit')}
        >
          <Text style={{ color: Colors.WHITE, fontFamily: 'outfit-medium' }}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Menu Sections */}
      <View style={{ paddingHorizontal: 20 }}>
        {menuItems.map((section, index) => (
          <View key={index} style={{ marginBottom: 30 }}>
            <Text
              style={{
                fontFamily: 'outfit-bold',
                fontSize: 18,
                marginBottom: 10,
                color: Colors.GRAY,
              }}
            >
              {section.section}
            </Text>

            {section.items.map((item, idx) => {
              const IconLib = item.iconLib;
              return (
                <TouchableOpacity
                  key={idx}
                  onPress={item.onPress}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 15,
                    borderBottomWidth: idx === section.items.length - 1 ? 0 : 1,
                    borderBottomColor: Colors.LIGHT_GRAY,
                  }}
                >
                  <IconLib
                    name={item.icon}
                    size={22}
                    color={item.color || Colors.DARK}
                  />
                  <Text
                    style={{
                      fontFamily: 'outfit',
                      fontSize: 16,
                      marginLeft: 15,
                    }}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        ))}
      </View>
      <Text style={{color:Colors.GRAY, fontFamily:'outfit', fontSize:15, paddingLeft:95}}>Developed by GuideX @2025</Text>
    </ScrollView>
  );
}
