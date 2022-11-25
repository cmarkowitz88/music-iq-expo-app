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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' , color:'white'}}>
        <Text>Settings!</Text>
      </View>
    );
  }

const BottomNavigator = () => {
    return (
        <>
        <Tab.Navigator initialRouteName='Home' screenOptions={ { headerShown: false, tabBarStyle:{backgroundColor:'#000', borderTopWidth:0,}} }>
            <Tab.Screen name="GameScreen" component={GameScreen} />
            <Tab.Screen name="Welcome" component={SettingsScreen} />
      </Tab.Navigator>
    </>
    );
};

export default BottomNavigator;
