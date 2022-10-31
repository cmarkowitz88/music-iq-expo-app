import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';
import WelcomeScreen from "../screens/WelcomeScreen";




import { createNativeStackNavigator } from "@react-navigation/native-stack";


import GameScreen from "../screens/GameScreen";
import RoundReview from "../screens/RoundReview";
import LoginScreen from "../screens/LoginScreen";
import LoginTest from "../screens/LoginTestScreen";
import NewUser from "../screens/NewUser";
import NewUserConfirmEmail from "../screens/NewUserEmailConfirm";
import ForgotPassword from "../screens/ForgotPassword";
import ForgotPassword2 from "../screens/ForgotPassword2";

const Stack = createNativeStackNavigator();


const Tab = createBottomTabNavigator();

function HomeScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Home!</Text>
      </View>
    );
  }
  
  function SettingsScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }

const BottomNavigator = () => {
    return (
        <>
        <NavigationContainer>
        <Tab.Navigator>
            <Tab.Screen name="Welcome" component={WelcomeScreen} />
            
      </Tab.Navigator>
      
    </NavigationContainer>
    <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={WelcomeScreen} />
        <Stack.Screen name="Game" component={GameScreen} />
        <Stack.Screen name="RoundReview" component={RoundReview} />
        <Stack.Screen name="LogIn" component={LoginTest} />
        <Stack.Screen name="NewUser" component={NewUser} />
        <Stack.Screen
          name="NewUserConfirmEmail"
          component={NewUserConfirmEmail}
        />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="ForgotPassword2" component={ForgotPassword2} />
      </Stack.Navigator>
    </NavigationContainer>
    
    
    </>
    );
};

export default BottomNavigator;
