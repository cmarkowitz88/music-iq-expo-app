import * as React from "react";
import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import WelcomeScreen from "../screens/WelcomeScreen";
import GameScreen from "../screens/GameScreen";
import RoundReview from "../screens/RoundReview";
import LoginScreen from "../screens/LoginScreen";
import LoginTest from "../screens/LoginTestScreen";
import NewUser from "../screens/NewUser";
import NewUserConfirmEmail from "../screens/NewUserEmailConfirm";
import ForgotPassword from "../screens/ForgotPassword";
import ForgotPassword2 from "../screens/ForgotPassword2";
import BottomNavigator from "./BottomNavigator";

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false,tabBarStyle:{backgroundColor:'black'} }}>
      
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
        <Stack.Screen name="Tabs" component={BottomNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
