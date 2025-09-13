import { View, Text, TouchableOpacity, ScrollView, Alert, Modal, FlatList, Linking, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import Colors from '../../constants/Colors';
import { Ionicons, MaterialIcons, Feather } from '@expo/vector-icons';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../configs/FirebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function Profile() {
  const router = useRouter();
  const [userTrips, setUserTrips] = useState([]);
  const [tripsModalVisible, setTripsModalVisible] = useState(false);
  const [helpModalVisible, setHelpModalVisible] = useState(false);

  const isPremium = false; // Default: normal user, can be fetched from user profile

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace('/auth/sign-in');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const handleNotification = () => {
    Alert.alert('Notifications', 'Featured sections have been updated!', [{ text: 'OK' }]);
  };

  const fetchUserTrips = async () => {
    try {
      const q = query(collection(db, 'UserTrips'), where('userEmail', '==', auth.currentUser.email));
      const querySnapshot = await getDocs(q);
      const trips = [];
      querySnapshot.forEach(doc => trips.push(doc.data()));
      setUserTrips(trips);
      setTripsModalVisible(true);
    } catch (error) {
      console.error('Error fetching trips:', error);
      Alert.alert('Error', 'Unable to fetch trips. Try again later.');
    }
  };

  const handleHelpCenter = () => setHelpModalVisible(true);
  const handleContact = () => Linking.openURL('mailto:guide6x@gmail.com?subject=Support%20Request');


  const menuItems = [
    { section: 'Settings', items: [{ icon: 'notifications-none', label: 'Notifications', iconLib: MaterialIcons, onPress: handleNotification }] },
    { section: 'Trips', items: [{ icon: 'inbox', label: 'Your Trips', iconLib: Feather, onPress: fetchUserTrips }] },
    {
      section: 'Support',
      items: [
        { icon: 'help-circle-outline', label: 'Help Center', iconLib: Ionicons, onPress: handleHelpCenter },
        { icon: 'phone', label: 'Contact Us', iconLib: Feather, onPress: handleContact }
      ]
    }
  ];

  return (
    <ScrollView style={{ backgroundColor: Colors.WHITE, flex: 1 }}>
      {/* Profile Header */}
      <View style={styles.headerContainer}>
        <View style={styles.avatarContainer}>
          <View style={styles.innerGlow} />
          <Text style={{ fontSize: 52, zIndex: 1 }}>🌊</Text>
        </View>

        <Text style={styles.nameText}>GuideX</Text>
        <Text style={styles.emailText}>guidex@example.com</Text>

        {/* User Type Label */}
        {/* <View style={{ marginBottom: 20, alignItems: 'center' }}>
          <Text style={{ fontFamily: 'outfit-bold', fontSize: 18, color: isPremium ? Colors.PRIMARY : Colors.GRAY }}>
            {isPremium ? 'Premium User' : 'Normal User'}
          </Text>
          {!isPremium && (
            <TouchableOpacity onPress={handleUpgrade} style={{ marginTop: 8, backgroundColor: Colors.PRIMARY, paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20 }}>
              <Text style={{ color: Colors.WHITE, fontFamily: 'outfit-semibold' }}>Upgrade</Text>
            </TouchableOpacity>
          )}
        </View> */}
      </View>

      {/* Menu Sections */}
      <View style={{ padding: 20 }}>
        {menuItems.map((section, index) => (
          <View key={index} style={{ marginBottom: 25 }}>
            <Text style={styles.sectionTitle}>{section.section}</Text>
            <View style={styles.menuContainer}>
              {section.items.map((item, idx) => {
                const IconLib = item.iconLib;
                return (
                  <TouchableOpacity key={idx} onPress={item.onPress} style={[styles.menuItem, { borderBottomWidth: idx === section.items.length - 1 ? 0 : 1 }]}>
                    <View style={styles.iconContainer}><IconLib name={item.icon} size={22} color={item.color || Colors.DARK} /></View>
                    <Text style={styles.menuLabel}>{item.label}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        ))}

        {/* Logout */}
        <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <Text style={styles.footerText}>Developed by GuideX ©2025</Text>

      {/* Trips Modal */}
      <Modal visible={tripsModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Your Trips</Text>
            <FlatList
              data={userTrips}
              keyExtractor={(item) => item.docId}
              renderItem={({ item }) => (
                <View style={styles.tripItem}>
                  <Text style={{ fontFamily: 'outfit-medium', fontSize: 16 }}>{item.tripPlan?.travelPlan?.location || 'Unknown Location'}</Text>
                  <Text style={{ fontFamily: 'outfit', fontSize: 14, color: Colors.GRAY }}>Days: {item.tripPlan?.travelPlan?.totalDays || 0}</Text>
                </View>
              )}
            />
            <TouchableOpacity onPress={() => setTripsModalVisible(false)} style={styles.closeModalBtn}>
              <Text style={styles.closeModalText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Help Center Modal */}
      <Modal visible={helpModalVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Help Center</Text>
            <Text style={{ fontFamily: 'outfit', fontSize: 16, marginVertical: 10 }}>Report an Issue Via Mail in Contact Us</Text>
            <TouchableOpacity onPress={() => setHelpModalVisible(false)} style={styles.closeModalBtn}>
              <Text style={styles.closeModalText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  headerContainer: { alignItems: 'center', paddingTop: 60, paddingBottom: 10, paddingHorizontal: 10, backgroundColor: Colors.WHITE, position: 'relative' },
  avatarContainer: { width: 120, height: 120, borderRadius: 60, backgroundColor: 'rgba(255, 255, 255, 0.9)', justifyContent: 'center', alignItems: 'center', marginBottom: 10, shadowColor: '#4FACFE', shadowOpacity: 0.15, shadowRadius: 20, shadowOffset: { width: 0, height: 8 }, elevation: 8, borderWidth: 2, borderColor: 'rgba(79, 172, 254, 0.1)', position: 'relative' },
  innerGlow: { position: 'absolute', width: 110, height: 110, borderRadius: 55, backgroundColor: 'rgba(79, 172, 254, 0.05)', justifyContent: 'center', alignItems: 'center' },
  nameText: { fontFamily: 'outfit-bold', fontSize: 26, color: Colors.DARK, marginBottom: 4, letterSpacing: -0.5, textAlign: 'center' },
  emailText: { fontFamily: 'outfit', fontSize: 15, color: Colors.GRAY, opacity: 0.8, letterSpacing: 0.2 },
  sectionTitle: { fontFamily: 'outfit-bold', fontSize: 16, marginBottom: 8, color: Colors.GRAY },
  menuContainer: { backgroundColor: Colors.WHITE, borderRadius: 15, shadowColor: '#000', shadowOpacity: 0.05, shadowOffset: { width: 0, height: 2 }, shadowRadius: 6, elevation: 2 },
  menuItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 15, paddingHorizontal: 15, borderBottomColor: Colors.LIGHT_GRAY },
  iconContainer: { backgroundColor: Colors.LIGHT_GRAY, borderRadius: 10, padding: 8 },
  menuLabel: { fontFamily: 'outfit', fontSize: 16, marginLeft: 15, color: Colors.DARK },
  logoutBtn: { marginTop: 20, backgroundColor: Colors.BLACK, paddingVertical: 15, borderRadius: 15, alignItems: 'center', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 3, elevation: 2 },
  logoutText: { color: Colors.WHITE, fontFamily: 'outfit-medium', fontSize: 16 },
  footerText: { color: Colors.GRAY, fontFamily: 'outfit', fontSize: 13, textAlign: 'center', marginTop: 30, marginBottom: 20 },
  modalOverlay: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { width: '85%', backgroundColor: Colors.WHITE, borderRadius: 15, padding: 20, alignItems: 'center', maxHeight: '70%' },
  modalTitle: { fontFamily: 'outfit-bold', fontSize: 18, marginBottom: 10 },
  tripItem: { paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: Colors.LIGHT_GRAY, width: '100%' },
  closeModalBtn: { marginTop: 15, backgroundColor: Colors.PRIMARY, paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20 },
  closeModalText: { color: Colors.WHITE, fontFamily: 'outfit-semibold' },
});
