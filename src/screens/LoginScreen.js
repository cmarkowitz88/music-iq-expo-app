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
import { AntDesign } from "@expo/vector-icons";

const LogInScreen = ({ navigation }) => {
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [secure, setSecure] = useState(true);

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
      },
      onFailure: function (err) {
        alert(err.message || JSON.stringify(err));
      },
    });
  };

  const handleSubmitPress = () => {
    logInUser();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../assets/MusicIQ-Logo_2.jpg")}
      />
      <View style={{ flex: 1, width: "100%" }}>
        <Text style={styles.header_text}> Please Log In</Text>
        <Text style={styles.body_text}>Enter your username:</Text>
        <TextInput
          autoCapitalize="none"
          style={styles.inputStyle}
          onChangeText={(newText) => setUserEmail(newText)}
          defaultValue={userEmail}
          placeholder="Ernter Your Email Address"
        />

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
      </View>
      <Text style={styles.body_text}>{userEmail}</Text>
      <Text style={styles.body_text}>{userPassword}</Text>

      <TouchableOpacity style={styles.buttonStyle} onPress={handleSubmitPress}>
        <Text style={styles.buttonTextStyle}>LOGIN</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 0.5,
    borderColor: "#000",
    height: 40,
    borderRadius: 5,
    margin: 10,
  },
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
  inputStyle: {
    backgroundColor: "#45dba5",
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderColor: "gray",
    padding: 5,
    fontSize: 22,
    width: "90%",
    flexDirection: "row",
  },
  header_text: {
    color: "white",
    fontSize: 25,
    paddingTop: 30,
    margin: 12,
  },
  body_text: {
    color: "white",
    paddingTop: 25,
    fontSize: 18,
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
    borderRadius: 10,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 20,
    marginBottom: 25,
    width: 125,
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
  },
});

export default LogInScreen;
