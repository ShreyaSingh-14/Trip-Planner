import { View, Text, FlatList, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useEffect } from 'react';
import { useNavigation } from 'expo-router';
import Colors from '../../constants/Colors';
import { SelectBudgetOptions } from '../../constants/Options';
import OptionCard from '../../components/CreateTrip/OptionCard';
import { CreateTripContext } from '../../context/CreateTripContext';
import { useRouter } from 'expo-router';  

export default function SelectBudget() {
    const navigation = useNavigation();
    const [selectedOption, setSelectedOption] = React.useState();
    const { tripData, setTripData } = React.useContext(CreateTripContext);
    const router=useRouter();
    useEffect(() => {
        navigation.setOptions({
            headerShown: true,
            headerTransparent: true,
            headerTitle: '',
        });
    }, []);

    useEffect(() => {
      selectedOption&&setTripData({
        ...tripData,
        budget: selectedOption?.title
      })
    }, [selectedOption]);

  const onClickContinue = () => { 
    if (!selectedOption) {
      ToastAndroid.show('Select Your Budget',ToastAndroid.LONG)
      return;
    }
    router.push('/create-trip/review-trip');
  }
  return (
    <View style={{
        paddingTop:90,
        padding:25,
        backgroundColor: Colors.WHITE,
        height: '100%'
    }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 36,
        margiTop:20
      }}>Budget 🪙</Text>

      <View style={{
        marginTop:20
      }}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 20
        }}>Choose spending habits for your trip</Text>

        <FlatList 
        data={SelectBudgetOptions} 
        renderItem={({item,index})=>(
          <TouchableOpacity style={{ marginVertical: 10 }}
          onPress={() => setSelectedOption(item)}>
            <OptionCard option={item} selectedOption={selectedOption} />
         </TouchableOpacity> 
        )}/>
      </View>

        <TouchableOpacity
        onPress={onClickContinue}
              style={{
                padding: 15,
                backgroundColor: selectedOption ? Colors.PRIMARY : Colors.LIGHT_GRAY,
                borderRadius: 15,
                marginTop: '20',
                marginBottom: 30,
              }}
              disabled={!selectedOption}
            >
                <Text
                  style={{
                    textAlign: 'center',
                    color: Colors.WHITE,
                    fontFamily: 'outfit-medium',
                    fontSize: 20,
                  }}
                >
                  Continue
                </Text>
            </TouchableOpacity>

    </View>
  )
}