import { View, Text } from 'react-native';
import React, { use, useContext ,useState} from 'react';
import { Video } from 'expo-av';
import Colors from '../../constants/Colors';
import { CreateTripContext } from '../../context/CreateTripContext';
import { AI_PROMPT } from '../../constants/Options';
import { useEffect } from 'react';
import { chatSession } from '../../configs/AiModel';
import { useRouter } from 'expo-router';
import { setDoc, doc } from 'firebase/firestore';
import { auth, db } from './../../configs/FirebaseConfig';

export default function GenerateTrip() {
  const videoRef = React.useRef(null);
const { tripData, setTripData } = useContext(CreateTripContext);
const [loading,setLoading]=useState(false);
const router=useRouter();
const user=auth.currentUser;

useEffect(() => {
  GenerateAiTrip();
}, []);

const GenerateAiTrip = async () => {
  setLoading(true);

  const FINAL_PROMPT = AI_PROMPT
    .replace('{location}', tripData.locationInfo?.name || '')
    .replace('{totalDays}', tripData.totalNoOfDays?.toString() || '')
    .replace('{totalNight}', (tripData.totalNoOfDays ? tripData.totalNoOfDays - 1 : 0).toString())
    .replace('{traveler}', tripData.travelerCount?.title)
    .replace('{budget}', tripData.budget)
    .replace('{totalDays}', tripData.totalNoOfDays?.toString() || '')
    .replace('{totalNight}', (tripData.totalNoOfDays ? tripData.totalNoOfDays - 1 : 0).toString());

  console.log("FINAL_PROMPT:", FINAL_PROMPT);
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log("AI Response:", result.response.text())
    const tripResp=JSON.parse(result.response.text());
    setLoading(false);
    const docId = Date.now().toString();
   await setDoc(doc(db, "UserTrips", docId), {
      userEmail: user.email,
      tripPlan: tripResp,//ai result
      tripData:JSON.stringify(tripData),//user selection data 
      docId: docId,
    });
    router.push('(tabs)/mytrip');     
};

  return (
    <View
      style={{
        padding: 25,
        paddingTop: 140,
        backgroundColor: Colors.WHITE,
        height: '100%',
      }}
    >

      <Text
        style={{
          fontFamily: 'outfit-bold',
          fontSize: 35,
          textAlign: 'center',
        }}
      >
        Please wait...
      </Text>

      <Text
        style={{
          fontFamily: 'outfit-medium',
          fontSize: 18,
          textAlign: 'center',
          marginTop: 20,
        }}
      >
        We are working to generate your trip, might take a few seconds
      </Text>

      <Video
        ref={videoRef}
        source={require('./../../assets/images/waiting.mp4')}
        style={{
          width: '100%',
          height: 250,
          marginTop: 50,
        }}
        resizeMode="contain"
        shouldPlay
        isLooping
        isMuted
      />
      <Text style={{
        fontFamily:'outfit',
        color:Colors.GRAY,
        fontSize:20,
        textAlign:'center'
      }}>
        Do not Go Back
      </Text>
    </View>
  );
}
//adding comment for no reason
