import React, { useState, useEffect, useCallback } from "react";
import {
  ActivityIndicatorBase,
  View,
  StyleSheet,
  TextInput,
  Image,
  Text,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Icon,
} from "react-native";
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";
import { Fontisto } from "@expo/vector-icons";


const LogInScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [loginMessage, setLoginMessage] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

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
        setLoginMessage("Successful.");
        setLoggedIn(true);
      },
      onFailure: function (err) {
        console.log(err.message);
        setLoginMessage(err.message);
      },
    });
  };

  const handleSubmitPress = () => {
    logInUser();

    return (
      <SafeAreaView style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../assets/MusicIQ-Logo_2.jpg")}
        />
  
        <View style={{ flex: 1, width: "100%" }}>
          <Text style={styles.header_text}>Login</Text>
  
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
          
          <Text style={styles.body_text}>Enter your username:</Text>
          <View style={styles.SectionStyle}> 
          <Fontisto style={{margin:5}}name="email" size={32} color='white'/>
          <TextInput
            autoCapitalize="none"
            style={styles.inputStyle}
            onChangeText={(newText) => setUserEmail(newText)}
            defaultValue={userEmail}
            placeholder="Ernter Your Email Address"
          />
          </View>
          <Text style={styles.body_text}>Enter your password:</Text>
          <View>
            <TextInput
              style={styles.inputStyle}
              autoCapitalize="none"
              style={styles.inputStyle}
              onChangeText={(newPassword) => setUserPassword(newPassword)}
              defaultValue={userPassword}
              placeholder="Ernter Your Password"
              secureTextEntry={secure}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
            }}
          >
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={handleSubmitPress}
            >
              <Text style={styles.buttonTextStyle}>LOGIN</Text>
            </TouchableOpacity>
          </View>
        </View>
  
        <View>
          <Text style={{ color: "#fff", fontSize: 20, paddingBottom:25}}>
            Don't have an account? Sign up here.
          </Text>
        </View>
      </SafeAreaView>
    );
  };
  
  };

  
const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flexDirection: "column",
    color: "white",
    flex: 1,
    height: "100%",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    
   
   
},
  inputStyle: {
    backgroundColor: "#fff",
    height: 40,
    margin: 12,
    marginLeft:12,
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    fontSize: 20,
    width: "90%",
    flexDirection: "row",
    borderRadius: 20,
  },
  header_text: {
    color: "white",
    fontSize: 40,
    paddingTop: 20,
    margin: 12,
    fontWeight:"bold"
  },
  body_text: {
    color: "white",
    paddingTop: 10,
    fontSize: 20,
    margin: 12,
    paddingBottom: 0,
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
    marginTop: 40,
    marginBottom: 25,
    width: 165,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 20,
  },
});

export default LogInScreen;
