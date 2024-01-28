import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Button } from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';

const Dots = ({selected}) => {
    let backgroundColor;

    backgroundColor = selected ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.3)';

    return (
        <View 
            style={{
                width:6,
                height: 6,
                marginHorizontal: 3,
                backgroundColor,
                borderRadius:45,
            }}
        />
    );
}


const Done = ({...props}) => (
    <TouchableOpacity
        style={{marginHorizontal:10}}
        {...props}
    >
        <Text style={{fontSize:16}}>Done</Text>
    </TouchableOpacity>
);

const OnboardingView = ({navigation}) => {
  return (
    
    <Onboarding
    // SkipButtonComponent={Skip}
    // NextButtonComponent={Next}
    DoneButtonComponent={Done}
    DotComponent={Dots}
    onDone={() => navigation.navigate("Login")}
  pages={[
    {
      backgroundColor: '#b3fbd6',
      image: <Image style={{height:300, width:300 }} source={require('../images/onboarding-2.jpg')} />,
      //subtitle: 'Done with React Native Onboarding Swiper',
      
    },
   
    ]} 
    />

    
  );
};

export default OnboardingView

const styles = StyleSheet.create({})