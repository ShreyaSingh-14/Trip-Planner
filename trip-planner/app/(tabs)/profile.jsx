import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import Colors from '../../constants/Colors';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { auth } from '../../configs/FirebaseConfig';

export default function Profile() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out successfully');
      router.replace('/auth/sign-in');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const menuItems = [
    {
      section: 'Settings',
      items: [
        {
          icon: 'notifications-none',
          label: 'Notifications',
          iconLib: MaterialIcons,
          onPress: () => router.push('/notifications'),
        },
      ],
    },
    {
      section: 'Trips',
      items: [
        {
          icon: 'inbox',
          label: 'Your Trips',
          iconLib: Feather,
          onPress: () => router.push('/trips'),
        },
      ],
    },
    {
      section: 'Support',
      items: [
        {
          icon: 'help-circle-outline',
          label: 'Help Center',
          iconLib: Ionicons,
          onPress: () => router.push('/help'),
        },
        {
          icon: 'phone',
          label: 'Contact Us',
          iconLib: Feather,
          onPress: () => router.push('/contact'),
        },
      ],
    },
  ];

  return (
    <ScrollView style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
    {/* Modern Profile Header */}
<View
  style={{
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    backgroundColor: Colors.WHITE,
    position: 'relative',
    overflow: 'hidden',
  }}
>
  {/* Subtle background gradient overlay */}
  <View
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 120,
      background: 'linear-gradient(135deg, rgba(79, 172, 254, 0.03) 0%, rgba(0, 242, 254, 0.03) 100%)',
    }}
  />

  {/* Avatar with modern glassmorphism effect */}
  <View
    style={{
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: 'rgba(255, 255, 255, 0.9)',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 20,
      shadowColor: '#4FACFE',
      shadowOpacity: 0.15,
      shadowRadius: 20,
      shadowOffset: { width: 0, height: 8 },
      elevation: 8,
      borderWidth: 2,
      borderColor: 'rgba(79, 172, 254, 0.1)',
      // Add subtle inner glow
      position: 'relative',
    }}
  >
    {/* Inner glow effect */}
    <View
      style={{
        position: 'absolute',
        width: 110,
        height: 110,
        borderRadius: 55,
        backgroundColor: 'rgba(79, 172, 254, 0.05)',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    />
    <Text style={{ fontSize: 52, zIndex: 1 }}>🌊</Text>
  </View>

  {/* Name with enhanced typography */}
  <Text
    style={{
      fontFamily: 'outfit-bold',
      fontSize: 26,
      color: Colors.DARK,
      marginBottom: 4,
      letterSpacing: -0.5,
      textAlign: 'center',
    }}
  >
    GuideX
  </Text>

  {/* Email with subtle styling */}
  <Text
    style={{
      fontFamily: 'outfit',
      fontSize: 15,
      color: Colors.GRAY,
      marginBottom: 24,
      opacity: 0.8,
      letterSpacing: 0.2,
    }}
  >
    guidex@example.com
  </Text>

  {/* Modern button with gradient and improved interaction */}
  <TouchableOpacity
    style={{
      backgroundColor: Colors.PRIMARY,
      paddingHorizontal: 28,
      paddingVertical: 12,
      borderRadius: 25,
      shadowColor: Colors.PRIMARY,
      shadowOpacity: 0.3,
      shadowRadius: 10,
      shadowOffset: { width: 0, height: 4 },
      elevation: 6,
      // Add subtle gradient if supported
      background: `linear-gradient(135deg, ${Colors.PRIMARY} 0%, rgba(79, 172, 254, 0.9) 100%)`,
      transform: [{ scale: 1 }], // For animation potential
    }}
    onPress={() => router.push('/profile/edit')}
    activeOpacity={0.8}
    // Add haptic feedback if available
    onPressIn={() => {
      // Add slight scale animation
      // Animated.spring(scaleValue, { toValue: 0.95, useNativeDriver: true }).start();
    }}
    onPressOut={() => {
      // Reset scale
      // Animated.spring(scaleValue, { toValue: 1, useNativeDriver: true }).start();
    }}
  >
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {/* Optional icon for more modern feel */}
      <Text
        style={{
          marginRight: 6,
          fontSize: 16,
          opacity: 0.9,
        }}
      >
        ✏️
      </Text>
      <Text
        style={{
          color: Colors.WHITE,
          fontFamily: 'outfit-semibold', // Use semibold if available
          fontSize: 15,
          letterSpacing: 0.3,
        }}
      >
        Edit Profile
      </Text>
    </View>
  </TouchableOpacity>

  {/* Optional: Add subtle stats or badges below */}
  <View
    style={{
      flexDirection: 'row',
      marginTop: 24,
      paddingHorizontal: 20,
      gap: 16,
    }}
  >
    {/* Example stat cards */}
    <View
      style={{
        backgroundColor: 'rgba(79, 172, 254, 0.08)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(79, 172, 254, 0.15)',
      }}
    >
      <Text
        style={{
          fontFamily: 'outfit-medium',
          fontSize: 12,
          color: Colors.PRIMARY,
          textAlign: 'center',
        }}
      >
        Premium
      </Text>
    </View>
    
    <View
      style={{
        backgroundColor: 'rgba(34, 197, 94, 0.08)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(34, 197, 94, 0.15)',
      }}
    >
      <Text
        style={{
          fontFamily: 'outfit-medium',
          fontSize: 12,
          color: '#22C55E',
          textAlign: 'center',
        }}
      >
        Active
      </Text>
    </View>
  </View>
</View>


      {/* Menu Sections */}
      <View style={{ padding: 20 }}>
        {menuItems.map((section, index) => (
          <View key={index} style={{ marginBottom: 25 }}>
            <Text
              style={{
                fontFamily: 'outfit-bold',
                fontSize: 16,
                marginBottom: 12,
                color: Colors.GRAY,
              }}
            >
              {section.section}
            </Text>

            <View
              style={{
                backgroundColor: Colors.WHITE,
                borderRadius: 15,
                shadowColor: '#000',
                shadowOpacity: 0.05,
                shadowOffset: { width: 0, height: 2 },
                shadowRadius: 6,
                elevation: 2,
              }}
            >
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
                      paddingHorizontal: 15,
                      borderBottomWidth:
                        idx === section.items.length - 1 ? 0 : 1,
                      borderBottomColor: Colors.LIGHT_GRAY,
                    }}
                  >
                    <View
                      style={{
                        backgroundColor: Colors.LIGHT_GRAY,
                        borderRadius: 10,
                        padding: 8,
                      }}
                    >
                      <IconLib
                        name={item.icon}
                        size={22}
                        color={item.color || Colors.DARK}
                      />
                    </View>
                    <Text
                      style={{
                        fontFamily: 'outfit',
                        fontSize: 16,
                        marginLeft: 15,
                        color: item.color || Colors.DARK,
                      }}
                    >
                      {item.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleLogout}
          style={{
            marginTop: 20,
            backgroundColor: Colors.BLACK
            ,
            paddingVertical: 15,
            borderRadius: 15,
            alignItems: 'center',
            shadowColor: '#000',
            shadowOpacity: 0.05,
            shadowRadius: 3,
            elevation: 2,
          }}
        >
          <Text
            style={{
              color: Colors.WHITE,
              fontFamily: 'outfit-medium',
              fontSize: 16,
            }}
          >
            Log Out
          </Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <Text
        style={{
          color: Colors.GRAY,
          fontFamily: 'outfit',
          fontSize: 13,
          textAlign: 'center',
          marginTop: 30,
          marginBottom: 20,
        }}
      >
        Developed by GuideX ©2025
      </Text>
    </ScrollView>
  );
}
