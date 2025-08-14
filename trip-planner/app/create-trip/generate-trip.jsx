import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import { Video } from 'expo-av';
import Colors from '../../constants/Colors';
import { CreateTripContext } from '../../context/CreateTripContext';

export default function GenerateTrip() {
  const videoRef = React.useRef(null);
  const {tripData,setTripData}=useContext(CreateTripContext);
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
