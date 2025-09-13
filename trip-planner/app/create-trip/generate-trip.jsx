import { View, Text, TextInput, TouchableOpacity, Modal, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import React, { useContext, useState, useRef, useEffect } from 'react';
import { Video } from 'expo-av';
import Colors from '../../constants/Colors';
import { CreateTripContext } from '../../context/CreateTripContext';
import { AI_PROMPT } from '../../constants/Options';
import { useRouter } from 'expo-router';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from './../../configs/FirebaseConfig';
import { createChatSession } from '../../configs/AiModel'; // import the function

export default function GenerateTrip() {
  const videoRef = useRef(null);
  const { tripData } = useContext(CreateTripContext);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const router = useRouter();
  const user = auth.currentUser;

  useEffect(() => {
    // Show modal only if no API key in env
    if (!process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY || process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY.trim() === '') {
      setModalVisible(true);
    } else {
      const key = process.env.EXPO_PUBLIC_GOOGLE_GEMINI_API_KEY.trim();
      setApiKey(key);
      generateTrip(key);
    }
  }, []);

  const generateTrip = async (key) => {
    setLoading(true);

    try {
      const FINAL_PROMPT = AI_PROMPT
        .replace('{location}', tripData.locationInfo?.name || '')
        .replace('{totalDays}', tripData.totalNoOfDays?.toString() || '')
        .replace('{totalNight}', (tripData.totalNoOfDays ? tripData.totalNoOfDays - 1 : 0).toString())
        .replace('{traveler}', tripData.travelerCount?.title || '')
        .replace('{budget}', tripData.budget || '');

      // Create temporary chat session with key
      const chatSession = createChatSession(key);
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      const tripResp = JSON.parse(result.response.text());

      const docId = Date.now().toString();
      await setDoc(doc(db, "UserTrips", docId), {
        userEmail: user.email,
        tripPlan: tripResp,
        tripData: JSON.stringify(tripData),
        docId,
      });

      router.push('(tabs)/mytrip');
    } catch (error) {
      console.error(error);
      alert('Invalid API key or network error. Please try again.');
      setModalVisible(true); // reopen modal if error occurs
    } finally {
      setLoading(false);
      setApiKey(''); // clear key from memory
    }
  };

  const handleGenerate = () => {
    if (!apiKey.trim()) return;
    setModalVisible(false);
    generateTrip(apiKey);
  };

  return (
    <View style={{ flex: 1, backgroundColor: Colors.WHITE, padding: 25, paddingTop: 140 }}>
      <Text style={{ fontFamily: 'outfit-bold', fontSize: 35, textAlign: 'center' }}>Please wait...</Text>
      <Text style={{ fontFamily: 'outfit-medium', fontSize: 18, textAlign: 'center', marginTop: 20 }}>
        We are working to generate your trip, might take a few seconds
      </Text>

      <Video
        ref={videoRef}
        source={require('./../../assets/images/waiting.mp4')}
        style={{ width: '100%', height: 250, marginTop: 50 }}
        resizeMode="contain"
        shouldPlay
        isLooping
        isMuted
      />

      <Text style={{ fontFamily:'outfit', color:Colors.GRAY, fontSize:20, textAlign:'center', marginTop: 10 }}>
        Do not Go Back
      </Text>

      {/* API Key Modal */}
      {modalVisible && (
        <Modal visible={modalVisible} transparent animationType="fade">
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'rgba(0,0,0,0.4)' }}
          >
            <View style={{
              backgroundColor: Colors.WHITE,
              width: '85%',
              borderRadius: 20,
              padding: 25,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.3,
              shadowRadius: 10,
              elevation: 10,
              position: 'relative'
            }}>
              <TouchableOpacity
                onPress={() => router.back()}
                style={{ position: 'absolute', top: 15, right: 15, zIndex: 10 }}
              >
                <Text style={{ fontSize: 22, fontFamily: 'outfit-bold', color: Colors.GRAY }}>✕</Text>
              </TouchableOpacity>

              <Text style={{ fontFamily: 'outfit-bold', fontSize: 22, textAlign: 'center', marginBottom: 15 }}>Enter Your API Key</Text>

              <TextInput
                value={apiKey}
                onChangeText={setApiKey}
                placeholder="Paste your API key here"
                style={{
                  borderWidth: 1,
                  borderColor: Colors.GRAY,
                  borderRadius: 12,
                  padding: 12,
                  fontFamily: 'outfit',
                  marginBottom: 20,
                  fontSize: 16,
                }}
              />

              <TouchableOpacity
                onPress={handleGenerate}
                style={{
                  backgroundColor: Colors.PRIMARY,
                  paddingVertical: 15,
                  borderRadius: 12,
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color={Colors.WHITE} />
                ) : (
                  <Text style={{ fontFamily: 'outfit-bold', fontSize: 18, textAlign: 'center', color: Colors.WHITE }}>Generate Trip</Text>
                )}
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      )}
    </View>
  );
}
