import { View, Text } from 'react-native'
import React from 'react'
import { Colors } from './../../constants/Colors'

export default function OptionCard({ option, selectedTraveler }) {
  const isSelected = selectedTraveler?.id === option?.id;

  return (
    <View
      style={[
        {
          padding: 20,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: Colors.LIGHT_GRAY,
          borderRadius: 15,
        },
        isSelected && { borderWidth: 2, borderColor: Colors.PRIMARY },
      ]}
    >
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontSize: 20,
            fontFamily: 'outfit-bold',
          }}
        >
          {option?.title}
        </Text>
        <Text
          style={{
            fontSize: 17,
            fontFamily: 'outfit-medium',
            color: Colors.GRAY,
            marginTop: 4,
          }}
        >
          {option?.desc}
        </Text>
        <Text
          style={{
            fontSize: 14,
            color: Colors.GRAY,
            marginTop: 4,
          }}
        >
          {option?.people}
        </Text>
      </View>
      <Text
        style={{
          fontSize: 36,
          marginLeft: 20,
        }}
      >
        {option?.icon}
      </Text>
    </View>
  )
}