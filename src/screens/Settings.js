import React from "react";
import {
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  View,
  Button,
  Text,
  Image,
} from "react-native";
import CustomButton from "../../button";

function SettingsScreen({ route, navigation }) {
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={require("../../assets/MusicIQ-Logo_2.jpg")}
        />
        <View><Text>Settings Screen</Text></View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    flexDirection: "column",
    backgroundColor: "black",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  background: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain",
  },
  button: {
    color: "white",
  },
  text: {
    color: "white",
  },
  image: {
    resizeMode: "contain",
    width: 370,
    height: 90,
  },
});

export default SettingsScreen;
