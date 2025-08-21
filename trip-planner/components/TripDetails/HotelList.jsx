import { View, Text, FlatList, Image } from 'react-native'

import Colors from '../../constants/Colors'


export default function HotelList({ hotelList }) {
    return (
        
        <View>
            <Text style={{
                marginTop: 20,
                fontFamily: 'outfit-bold',
                fontSize: 20,
            }}>🏨 Hotel Recommendation</Text>
            <FlatList
                data={hotelList}
                style={{
                    marginTop: 8,
                }}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                renderItem={({ item, index }) => (
                    <View style={{
                        marginRight: 20,
                        width: 184,
                        borderWidth: 2,
                        borderRadius: 15,
                        borderColor:Colors.LIGHT_GRAY,
                        backgroundColor: Colors.WHITE,
                       
                    }}>
                        <Image
                                   source={
                                     item.imageUrl
                                       ? { uri: item.imageUrl }:require('./../../assets/images/placeholder.jpeg')
                                   }
                            style={{
                                width: 180,
                                height: 120,
                                borderRadius: 15,
                            }}
                        />
                        <View style={{
                            padding: 10
                            
                            }}>
                            <Text style={{
                                fontFamily: 'outfit-medium',
                                fontSize: 17,
                            }}>
                                {item.hotelName}
                            </Text>
                            <View style={{
                                display: 'flex',
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                            }}>

                                <Text style={{
                                    fontFamily: 'outfit',

                                }}>
                                    ⭐️ {item.rating}
                                </Text>
                                <Text style={{
                                    fontFamily: 'outfit',
                                    color: '#888',
                                }}>
                                    💰{item.price}
                                </Text>
                            </View>
                        </View>
                    </View>
                )}
            />
        </View>
    )
}