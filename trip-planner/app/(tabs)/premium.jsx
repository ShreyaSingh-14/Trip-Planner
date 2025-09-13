import { View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React, { useState } from 'react'
import { Colors } from './../../constants/Colors'
import Ionicons from '@expo/vector-icons/Ionicons'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import FontAwesome6 from '@expo/vector-icons/FontAwesome6'

const { width } = Dimensions.get('window')

export default function Premium() {
  const [selectedPlan, setSelectedPlan] = useState('yearly')

  const features = [
    {
      icon: 'infinite',
      title: 'Unlimited Trip Plans',
      description: 'Create as many trips as you want',
      color: '#4FACFE'
    },
    {
      icon: 'sparkles',
      title: 'AI Suggestions',
      description: 'Get smart travel recommendations',
      color: '#FFD700'
    },
    {
      icon: 'pricetag',
      title: 'Booking Discounts',
      description: 'Save on flights, trains & hotels',
      color: '#22C55E'
    },
    {
      icon: 'airplane',
      title: 'Airline & Train Tickets',
      description: 'Book tickets directly in-app',
      color: '#FF6B6B'
    },
    {
      icon: 'bed',
      title: 'Hotel & Restaurant Booking',
      description: 'Reserve stays & dining spots',
      color: '#9B59B6'
    },
    {
      icon: 'people',
      title: 'Group Planning & Scheduling',
      description: 'Advanced booking with friends',
      color: '#FF9500'
    }
  ]

  const plans = [
    {
      id: 'monthly',
      title: 'Monthly',
      price: '$9.99',
      period: 'per month',
      popular: false,
      savings: null
    },
    {
      id: 'yearly',
      title: 'Yearly',
      price: '$79.99',
      period: 'per year',
      popular: true,
      savings: 'Save 33%'
    }
  ]

  return (
    <ScrollView 
      style={{ flex: 1, backgroundColor: Colors.WHITE }}
      showsVerticalScrollIndicator={false}
    >
      {/* Header Section with Gradient Background */}
      <View
        style={{
          paddingTop: 60,
          paddingBottom: 40,
          paddingHorizontal: 20,
          backgroundColor: Colors.WHITE,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background Gradient Overlay */}
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 200,
            background: 'linear-gradient(135deg, rgba(79, 172, 254, 0.08) 0%, rgba(255, 215, 0, 0.08) 100%)',
          }}
        />

        {/* Premium Crown Icon */}
        <View
          style={{
            alignItems: 'center',
            marginBottom: 20,
          }}
        >
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: 'rgba(255, 215, 0, 0.15)',
              justifyContent: 'center',
              alignItems: 'center',
              shadowColor: '#FFD700',
              shadowOpacity: 0.3,
              shadowRadius: 15,
              shadowOffset: { width: 0, height: 5 },
              elevation: 8,
            }}
          >
            <MaterialIcons name="workspace-premium" size={40} color="#FFD700" />
          </View>
        </View>

        {/* Title */}
        <Text
          style={{
            fontFamily: 'outfit-bold',
            fontSize: 32,
            color: Colors.DARK,
            textAlign: 'center',
            marginBottom: 8,
            letterSpacing: -1,
          }}
        >
          Premium💫
        </Text>

        {/* Subtitle */}
        <Text
          style={{
            fontFamily: 'outfit',
            fontSize: 16,
            color: Colors.GRAY,
            textAlign: 'center',
            lineHeight: 24,
            opacity: 0.8,
          }}
        >
          Unlock the full potential of your travels
        </Text>
      </View>

      {/* Features Section */}
      <View style={{ paddingHorizontal: 20, marginBottom: 40 }}>
        <Text
          style={{
            fontFamily: 'outfit-bold',
            fontSize: 20,
            color: Colors.DARK,
            marginBottom: 20,
            textAlign: 'center',
          }}
        >
          Premium Features
        </Text>

        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: 16,
          }}
        >
          {features.map((feature, index) => (
            <View
              key={index}
              style={{
                width: (width - 56) / 2,
                backgroundColor: Colors.WHITE,
                borderRadius: 16,
                padding: 20,
                borderWidth: 1,
                borderColor: 'rgba(0,0,0,0.06)',
                shadowColor: '#000',
                shadowOpacity: 0.05,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 2 },
                elevation: 3,
              }}
            >
              <View
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 24,
                  backgroundColor: `${feature.color}15`,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: 12,
                }}
              >
                <Ionicons name={feature.icon} size={24} color={feature.color} />
              </View>
              
              <Text
                style={{
                  fontFamily: 'outfit-bold',
                  fontSize: 14,
                  color: Colors.DARK,
                  marginBottom: 4,
                }}
              >
                {feature.title}
              </Text>
              
              <Text
                style={{
                  fontFamily: 'outfit',
                  fontSize: 12,
                  color: Colors.GRAY,
                  lineHeight: 18,
                }}
              >
                {feature.description}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Pricing Plans */}
      <View style={{ paddingHorizontal: 20, marginBottom: 40 }}>
        <Text
          style={{
            fontFamily: 'outfit-bold',
            fontSize: 20,
            color: Colors.DARK,
            marginBottom: 20,
            textAlign: 'center',
          }}
        >
          Choose Your Plan
        </Text>

        <View style={{ gap: 16 }}>
          {plans.map((plan) => (
            <TouchableOpacity
              key={plan.id}
              onPress={() => setSelectedPlan(plan.id)}
              style={{
                backgroundColor: Colors.WHITE,
                borderRadius: 16,
                padding: 20,
                borderWidth: selectedPlan === plan.id ? 2 : 1,
                borderColor: selectedPlan === plan.id ? Colors.PRIMARY : 'rgba(0,0,0,0.06)',
                shadowColor: selectedPlan === plan.id ? Colors.PRIMARY : '#000',
                shadowOpacity: selectedPlan === plan.id ? 0.15 : 0.05,
                shadowRadius: 8,
                shadowOffset: { width: 0, height: 2 },
                elevation: selectedPlan === plan.id ? 6 : 3,
                position: 'relative',
              }}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <View
                  style={{
                    position: 'absolute',
                    top: -8,
                    right: 20,
                    backgroundColor: '#FFD700',
                    paddingHorizontal: 12,
                    paddingVertical: 4,
                    borderRadius: 12,
                    shadowColor: '#FFD700',
                    shadowOpacity: 0.3,
                    shadowRadius: 4,
                    elevation: 4,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: 'outfit-bold',
                      fontSize: 11,
                      color: '#FFFFFF',
                    }}
                  >
                    MOST POPULAR
                  </Text>
                </View>
              )}

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontFamily: 'outfit-bold',
                      fontSize: 18,
                      color: Colors.DARK,
                      marginBottom: 4,
                    }}
                  >
                    {plan.title}
                  </Text>
                  
                  <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
                    <Text
                      style={{
                        fontFamily: 'outfit-bold',
                        fontSize: 24,
                        color: Colors.PRIMARY,
                      }}
                    >
                      {plan.price}
                    </Text>
                    <Text
                      style={{
                        fontFamily: 'outfit',
                        fontSize: 14,
                        color: Colors.GRAY,
                        marginLeft: 4,
                      }}
                    >
                      {plan.period}
                    </Text>
                  </View>
                  
                  {plan.savings && (
                    <Text
                      style={{
                        fontFamily: 'outfit-medium',
                        fontSize: 12,
                        color: '#22C55E',
                        marginTop: 4,
                      }}
                    >
                      {plan.savings}
                    </Text>
                  )}
                </View>

                {/* Selection Radio */}
                <View
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    borderWidth: 2,
                    borderColor: selectedPlan === plan.id ? Colors.PRIMARY : Colors.GRAY,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  {selectedPlan === plan.id && (
                    <View
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: 6,
                        backgroundColor: Colors.PRIMARY,
                      }}
                    />
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* CTA Button */}
      <View style={{ paddingHorizontal: 20, marginBottom: 40 }}>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.PRIMARY,
            borderRadius: 16,
            paddingVertical: 18,
            shadowColor: Colors.PRIMARY,
            shadowOpacity: 0.3,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 6 },
            elevation: 8,
          }}
          activeOpacity={0.8}
        >
          <Text
            style={{
              fontFamily: 'outfit-bold',
              fontSize: 18,
              color: Colors.WHITE,
              textAlign: 'center',
              letterSpacing: 0.5,
            }}
          >
            Start Premium Journey
          </Text>
        </TouchableOpacity>

        {/* Trust Indicators */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 16,
            gap: 16,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Ionicons name="shield-checkmark" size={16} color="#22C55E" />
            <Text
              style={{
                fontFamily: 'outfit',
                fontSize: 12,
                color: Colors.GRAY,
              }}
            >
              Cancel anytime
            </Text>
          </View>
          
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Ionicons name="refresh" size={16} color="#22C55E" />
            <Text
              style={{
                fontFamily: 'outfit',
                fontSize: 12,
                color: Colors.GRAY,
              }}
            >
              7-day free trial
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}