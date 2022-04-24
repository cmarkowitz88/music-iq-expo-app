import React, { useState } from "react";
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

import { setLocalStorage, getValueFor } from "./Utils";
import * as SecureStore from "expo-secure-store";

const NewUser = ({ route, navigation }) => {
  const [userEmail, setUserEmail] = useState("");
  const [mobilePhone, setMobilePhone] = useState("+");
  const [userPassword, setUserPassword] = useState("");
  const [confirmUserPassword, setConfirmUserPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [loginMessage, setLoginMessage] = useState("");
  const [showErrMessage, setShowErrMessage] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const handleSubmitPress = () => {
    // Add a '+' to the mobile number so it's in correct format for AWS
    let tmpMobilePhone = "+" + mobilePhone;
    setMobilePhone("+" + tmpMobilePhone);

    const poolData = {
      UserPoolId: "us-east-1_smGpwOWnD",
      ClientId: "383pg349j8s1m42kavf0ta7i4r",
    };
    let userPool = new CognitoUserPool(poolData);
    let attributeList = [];

    let dataEmail = {
      Name: "email",
      Value: userEmail,
    };

    let dataPhoneNumber = {
      Name: "phone_number",
      Value: tmpMobilePhone,
    };

    const attributeEmail = new CognitoUserAttribute(dataEmail);
    const attributeMobilePhone = new CognitoUserAttribute(dataPhoneNumber);
    attributeList.push(attributeEmail);
    attributeList.push(attributeMobilePhone);

    userPool.signUp(
      userEmail,
      userPassword,
      attributeList,
      null,
      function (err, result) {
        if (err) {
          setLoginMessage(err.message);
          setShowErrMessage(true);
          return;
        }
        let cognitoUser = result.user;
        let userName = cognitoUser.getUsername();
        setShowErrMessage(true);
        setLoginMessage(userName);
        //setLocalStorage('password', userPassword);

        SecureStore.setItemAsync("password", userPassword).catch((error) =>
          console.log("Could not save user info ", error)
        );

        // getValueFor('password').then((value => {
        //     console.log(value);
        // }));

        SecureStore.getItemAsync("password").then((password) => {
          console.log(password);
          navigation.navigate("NewUserConfirmEmail", { userName: userName });
        });
      }
    );
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
          <Text style={styles.header_text}>Create Account</Text>
        </View>
        {showErrMessage && (
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
        )}
        <View style={styles.body_text}>
          {/*<Text style={styles.body_text}>Enter an email address:</Text>*/}
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
            placeholder="Email"
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            onChangeText={(newText) => setUserEmail(newText)}
          />
        </View>
        <View style={styles.body_text}>
          {/*<Text style={styles.body_text}>Enter mobile number:</Text>*/}
        </View>
        <View style={styles.SectionStyle}>
          <AntDesign
            style={{ margin: 5 }}
            name="mobile1"
            size={32}
            color="black"
          />
          <TextInput
            style={styles.inputStyle}
            placeholder="Mobile"
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            onChangeText={(newText) => setMobilePhone(newText)}
          />
        </View>
        <View style={styles.body_text}>
          {/*<Text style={styles.body_text}>Enter your password:</Text>*/}
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
            placeholder="Password"
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            onChangeText={(newPassword) => setUserPassword(newPassword)}
            defaultValue={userPassword}
            secureTextEntry={secure}
          />
        </View>
        <View style={styles.body_text}>
          {/*<Text style={styles.body_text}>Confirm your password:</Text>*/}
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
            placeholder="Confirm Password"
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            onChangeText={(confmPassword) =>
              setConfirmUserPassword(confmPassword)
            }
            defaultValue={confirmUserPassword}
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
          <Text style={styles.buttonTextStyle}>Create</Text>
        </TouchableOpacity>
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
    width: "95%",
    borderRadius: 25,
    margin: 5,
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
    fontSize: 30,
    paddingTop: 10,
    margin: 12,
    fontWeight: "bold",
  },
  body_text: {
    paddingTop: 10,

    paddingBottom: 10,
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

export default NewUser;
