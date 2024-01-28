import React from 'react';
import { StyleSheet,Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack'

import CreateView from '../views/CreateView';
import EditView from '../views/EditView';
import ItemListView from '../views/ItemListView';
import DetailsView from '../views/DetailsView';
import ProfileView from '../views/ProfileView';
import LoginScreen from '../views/Auth/LoginScreen';
import CartView from '../views/CartView';
import OnboardingView from '../views/OnboardingView';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
 return (
   
   <NavigationContainer>
    <Stack.Navigator screenOptions={{
        
      }} 
      >
        {/* <Stack.Screen name='Onboarding' component={OnboardingView} options={{headerShown: false}}/> */}
        <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}}  /> 
       <Stack.Screen name='List' component={ItemListView}  options={{headerShown: false, title:'List item'}}/>
       <Stack.Screen name='Create' component={CreateView} options={{title: 'Back',headerShown: true}} />
       <Stack.Screen name='Edit' component={EditView} options={{title: 'Back',headerShown: true}}/>
       <Stack.Screen name='Details' component={DetailsView} options={{title: 'Back', headerShown: true}}/>
       <Stack.Screen name='Profile' component={ProfileView} />
       <Stack.Screen name='Cart' component={CartView} options={{headerShown: false}}/>
       
    </Stack.Navigator>
    </NavigationContainer>
);
}

export default AppNavigation;


const styles = StyleSheet.create({
    
})
