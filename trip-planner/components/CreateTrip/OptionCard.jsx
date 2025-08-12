import { View, Text } from 'react-native';
import React from 'react';
import Colors from './../../constants/Colors';

export default function OptionCard({ option, selectedTraveler }) {
  const isSelected = selectedTraveler?.id === option?.id;

  return (
    <View
      style={[
        {
          padding: 18,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: Colors.LIGHT_GRAY,
          borderRadius: 12,
          borderWidth: 2,
          borderColor: 'transparent',
        },
        isSelected && { borderColor: Colors.PRIMARY, backgroundColor: '#fff' },
      ]}
    >
      {/* Left side text */}
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'outfit-bold',
            color: Colors.BLACK,
          }}
        >
          {option?.title}
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontFamily: 'outfit-medium',
            color: Colors.GRAY,
            marginTop: 2,
          }}
        >
          {option?.desc}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: Colors.GRAY,
            marginTop: 2,
          }}
        >
          {option?.people}
        </Text>
      </View>

      {/* Icon on right */}
      <Text
        style={{
          fontSize: 32,
          marginLeft: 10,
        }}
      >
        {option?.icon}
      </Text>
    </View>
  );
}
