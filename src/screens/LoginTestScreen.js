import React, { Component, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native";
import { Fontisto, AntDesign } from "@expo/vector-icons";

import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";

import * as SecureStore from "expo-secure-store";
import { setLocalStorage2, getValueFor, logInUser } from "./Utils";

const LogInTest = ({navigation}) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [loginMessage, setLoginMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const setLocalStorage =  async (key, value) => {
    await SecureStore.setItemAsync("idToken", idToken).catch((error) =>
              console.log("Could not save user info ", error)
            ).then(console.log("saved value"));
  }

  const handleNewUser = () => {
    navigation.navigate("NewUser");
  };

  const handleSubmitPress = () => {
    logInUser();
  };

  const logInUser = () => {
    let authenticationData = {
      Username: userEmail,
      Password: userPassword,
    };

    let authenticationDetails = new AuthenticationDetails(authenticationData);

    const poolData = {
      UserPoolId: "us-east-1_smGpwOWnD",
      ClientId: "383pg349j8s1m42kavf0ta7i4r",
    };
    let userPool = new CognitoUserPool(poolData);
    let userData = {
      Username: userEmail,
      Pool: userPool,
    };
    var cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        let accessToken = result.getAccessToken().getJwtToken();
        let idToken = result.getIdToken().getJwtToken();
        setLocalStorage2("idToken", idToken).then(() => {navigation.navigate("Game")
        console.log("Wrote to storage");});
        // SecureStore.setItemAsync("idToken", idToken).catch((error) =>
        //       console.log("Could not save user info ", error)
        //     );
        setLoginMessage("Successful.");
        setLoggedIn(true);
        
      },
      onFailure: function (err) {
        console.log(err.message);
        setLoginMessage(err.message);
      },
    });
  };
  return (
    <SafeAreaView style={styles.safeview}>
      <View style={styles.container}>
        <View style={styles.headerImage}>
          <Image
            style={styles.image}
            source={require("../../assets/MusicIQ-Logo_2.jpg")}
          />
        </View>
        <View style={styles.header_text_container}>
          <Text style={styles.header_text}>Login</Text>
        </View>

        <View>
          <Text
            style={{
              color: "red",
              fontSize: 25,
              margin: 12,
            }}
          >
            {loginMessage}
          </Text>
        </View>
        <View>
          <Text style={styles.body_text}>Enter your username:</Text>
        </View>
        <View style={styles.SectionStyle}>
          <Fontisto
            style={{ margin: 5 }}
            name="email"
            size={32}
            color="black"
          />
          <TextInput
            style={styles.inputStyle}
            placeholder="Enter Your Email Here"
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            onChangeText={(newText) => setUserEmail(newText)}
          />
        </View>
        <View>
          <Text style={styles.body_text}>Enter your password:</Text>
        </View>
        <View style={styles.SectionStyle}>
          <AntDesign
            style={{ margin: 5 }}
            name="lock1"
            size={32}
            color="black"
          />
          <TextInput
            style={styles.inputStyle}
            placeholder="Enter Your Password Here"
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            onChangeText={(newPassword) => setUserPassword(newPassword)}
            defaultValue={userPassword}
            placeholder="Enter Your Password"
            secureTextEntry={secure}
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={handleSubmitPress}
        >
          <Text style={styles.buttonTextStyle}>Sign In</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: "#fff", fontSize: 20, paddingBottom: 25 }}>
          Don't have an account?{" "}
          <TouchableOpacity onPress={handleNewUser}>
            <Text style={{ color: "green", fontSize: 20 }}>Sign up here.</Text>
          </TouchableOpacity>
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "black",
  },
  safeview: {
    flex: 1,
    backgroundColor: "black",
  },
  headerImage: {
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "green",
  },

  SectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#000",
    height: 40,
    borderRadius: 15,
    margin: 10,
    paddingLeft: 10,
  },

  ImageStyle: {
    padding: 10,
    margin: 5,
    height: 25,
    width: 25,
    resizeMode: "stretch",
    alignSelf: "center",
  },
  header_text_container: {
    justifyContent: "space-around",
    alignContent: "flex-end",
    alignItems: "flex-start",
  },
  header_text: {
    color: "white",
    fontSize: 40,
    paddingTop: 20,
    margin: 12,
    fontWeight: "bold",
  },
  body_text: {
    color: "white",
    paddingTop: 10,
    fontSize: 20,
    margin: 12,
    paddingBottom: 0,
  },
  inputStyle: {
    backgroundColor: "#fff",
    height: 38,
    margin: 12,
    fontSize: 20,
    flexDirection: "row",
    flex: 1,
  },
  buttonStyle: {
    backgroundColor: "#7DE24E",
    borderWidth: 0,
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 40,
    alignItems: "center",
    borderRadius: 20,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
    width: 165,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 20,
  },
});

export default LogInTest;
