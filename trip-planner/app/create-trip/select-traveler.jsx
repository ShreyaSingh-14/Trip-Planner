import { View, Text, FlatList , TouchableOpacity} from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router';
import { useRouter } from 'expo-router';
import Colors from './../../constants/Colors'
import {SelectTravelesList} from './../../constants/Options'
import { CreateTripContext } from '../../context/CreateTripContext'
import OptionCard from '../../components/CreateTrip/OptionCard';
import { useState } from 'react';

export default function SelectTraveler() {
    const navigation = useNavigation();

    const [selectedTraveler, setSelectedTraveler]=useState();
    const { tripData, setTripData } = React.useContext(CreateTripContext);
    

    useEffect(() => {
        navigation.setOptions({ 
            headerShown: true,
            headerTransparent: true,
            headerTitle: '',
        });}, [])

    useEffect(() => {
        setTripData({...tripData,
            travelerCount:selectedTraveler
        })
    }, [selectedTraveler]);

  return (
     <View style={{ 
     paddingTop: 65, 
     backgroundColor: Colors.WHITE,
     height: '90%',
     }}>
        <Text style={{
            fontFamily: 'outfit-bold',
            fontSize: 30,
            paddingLeft: 25,
            color: Colors.PRIMARY,
            marginTop: 20,
        }}
        >Who's Travelling?</Text>

        <View style={{
            marginTop: 15,
            paddingHorizontal: 25 
        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 23,
            }}>Choose your traveles</Text>
        
            <FlatList
                    data={SelectTravelesList}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            onPress={() => setSelectedTraveler(item)}
                            style={{
                                marginVertical: 10,
                            }}
                        > 
                            <OptionCard option={item} selectedTraveler={selectedTraveler} />
                        </TouchableOpacity> 
                    )}
                />

        </View>    

        <TouchableOpacity style={{
            padding: 15,
            backgroundColor: Colors.PRIMARY,
            borderRadius: 15,
            marginTop: 20
        }}>
            <Text style={{
                textAlign: 'center',
                color: Colors.WHITE,
                fontFamily: 'outfit-medium',
                fontSize:20
            }}>Continue</Text>
        </TouchableOpacity>
        </View>
)
}
