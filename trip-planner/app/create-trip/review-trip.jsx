import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react';
import { useNavigation } from 'expo-router';
import Colors from '../../constants/Colors';
import moment from 'moment';
import { CreateTripContext } from '../../context/CreateTripContext';

export default function ReviewTrip() {

    const navigation = useNavigation();
    const { tripData, setTripData } = React.useContext(CreateTripContext);

    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: ''
        })
    }, [])

    return (
        <View style={{
            padding: 25,
            paddingTop: 75,
            backgroundColor: Colors.WHITE,
            height: '100%'
        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 35,
                marginTop: 20
            }}>Review Your Trip</Text>

            <View>
                <Text style={{
                    fontFamily: 'outfit-medium',
                    fontSize: 20,
                    marginTop: 10
                }}>Before generating your trip, please review your selection</Text>

                {/* Destination Info */}
                <View style={{
                    marginTop: 40,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Text style={{ fontSize: 30 }}>📍</Text>
                    <View style={{ marginLeft: 20 }}>
                        <Text style={{
                            fontFamily: 'outfit',
                            fontSize: 20,
                            color: Colors.GRAY
                        }}>Destination</Text>
                        <Text style={{
                            fontFamily: 'outfit-medium',
                            fontSize: 18
                        }}>{tripData?.locationInfo?.name}</Text>
                    </View>
                </View>

                {/* Date Selected Info */}
                <View style={{
                    marginTop: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Text style={{ fontSize: 30 }}>📅</Text>
                    <View style={{ marginLeft: 20 }}>
                        <Text style={{
                            fontFamily: 'outfit',
                            fontSize: 20,
                            color: Colors.GRAY
                        }}>Travel Date</Text>
                        <Text style={{
                            fontFamily: 'outfit-medium',
                            fontSize: 18
                        }}>
                         {moment(tripData?.startDate).format('DD MMM')+" To "+moment(tripData?.endDate).format('DD MMM')+"   "}
            ({tripData?.totalNoOfDays} days)
                        </Text>
                    </View>
                </View>

                {/* Travelers Info */}
                <View style={{
                    marginTop: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Text style={{ fontSize: 30 }}>🚌</Text>
                    <View style={{ marginLeft: 20 }}>
                        <Text style={{
                            fontFamily: 'outfit',
                            fontSize: 20,
                            color: Colors.GRAY
                        }}>Who is Traveling</Text>
                        <Text style={{
                            fontFamily: 'outfit-medium',
                            fontSize: 18
                        }}>
                            {tripData?.selectedTraveler?.title || tripData?.selectedTraveler || tripData?.travelerCount?.title || tripData?.travelerCount}
                        </Text>
                    </View>
                </View>

                {/* Budget Info */}
                <View style={{
                    marginTop: 20,
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <Text style={{ fontSize: 30 }}>💵</Text>
                    <View style={{ marginLeft: 20 }}>
                        <Text style={{
                            fontFamily: 'outfit',
                            fontSize: 20,
                            color: Colors.GRAY
                        }}>Budget</Text>
                        <Text style={{
                            fontFamily: 'outfit-medium',
                            fontSize: 18
                        }}>{tripData?.budget}</Text>
                    </View>
                </View>
            </View>

            <TouchableOpacity
                style={{
                    padding: 15,
                    backgroundColor: Colors.PRIMARY,
                    borderRadius: 15,
                    marginTop: 20,
                    marginBottom: 30,
                }}
                onPress={() => {/* handle trip creation here */}}
            >
                <Text
                    style={{
                        textAlign: 'center',
                        color: Colors.WHITE,
                        fontFamily: 'outfit-medium',
                        fontSize: 20,
                    }}
                >
                    Make My Trip
                </Text>
            </TouchableOpacity>
        </View>
    )
}