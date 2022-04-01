import * as React from 'react';
import { View, Text} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import WelcomeScreen from '../screens/WelcomeScreen';
import GameScreen from '../screens/GameScreen';
import RoundReview from '../screens/RoundReview';
import LoginScreen from '../screens/LoginScreen';


const Stack = createNativeStackNavigator();

const RootNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="Home"         component={WelcomeScreen} />
              <Stack.Screen name="Game"         component={GameScreen} />
              <Stack.Screen name="RoundReview"  component={RoundReview} />
              <Stack.Screen name="LogIn"        component={LoginScreen} />
            </Stack.Navigator>
        </NavigationContainer>

    );
};

export default RootNavigator;