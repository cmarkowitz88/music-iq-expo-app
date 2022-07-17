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
import { Auth } from "aws-amplify";


import { setLocalStorage2, getValueFor, logInUser } from "./Utils";


const ForgotPassword = ({ route, navigation }) => {
  const [loginMessage, setLoginMessage] = useState("");
  const [showErrMessage, setShowErrMessage] = useState(false);
  const [emailAdrs, setEmailAdrs] = useState("");
  const [buttonText, setButtonText] = useState("Submit");

  const handleSubmitPress = () => {
   Auth.forgotPassword(emailAdrs).then(data =>{
        console.log(`Forgot Password Started: ${data} `);
        navigation.navigate("ForgotPassword2", { userName: emailAdrs });
        
    }).catch(err => {
        console.log(err.message);
    })
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
          <Text style={styles.header_text}>Reset Password</Text>
        </View>
        <View>
          <Text style={styles.body_text}>
            Enter your email address:
          </Text>
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
            placeholder="Enter email"
            underlineColorAndroid="transparent"
            autoCapitalize="none"
            onChangeText={(tmpEmailAdrs) => setEmailAdrs(tmpEmailAdrs)}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            paddingTop: 35,
          }}
        >
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={handleSubmitPress}
          >
            <Text style={styles.buttonTextStyle}>{buttonText}</Text>
          </TouchableOpacity>
        </View>
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
    width: "85%",
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
    fontSize: 21,
    color: "#fff",
    paddingBottom: 10,
  },
  inputStyle: {
    backgroundColor: "#fff",
    height: 38,
    margin: 12,
    fontSize: 20,
    flexDirection: "row",
    flex: 1,
    width: "10%",
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

export default ForgotPassword;
