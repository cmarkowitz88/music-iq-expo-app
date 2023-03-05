import React, { useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";

//export default function CustomButton(props) {
//const CustomButton = ({text, onPress}) => {
const CustomButton = ({ onPress, text, disabled_status, color, hide, text_color="#1FE0AB" }) => {
  //const btnPress = () =>{ alert(props.text) }

  if (hide) {
    return null;
  }

  return (
    //<Pressable style={styles.button} onPress={ ()=> setOutputText('New Text')}>
    <Pressable
      style={styles.defaultButton}
      onPress={onPress}
      disabled={disabled_status}
      backgroundColor={color}
      isCorrect="true"
    >
      <Text style={styles.text}><Text style={{color:text_color}}>{text}</Text></Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  defaultButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 22,
    borderRadius: 20,
    borderColor: "#89938D",
    elevation: 3,
    borderWidth: 1,
    margin: 10,
    width: "85%",
    height: 40,
  },
  text: {
    fontSize: 15,
    lineHeight: 16,
    fontWeight: "bold",
    letterSpacing: 0.25,
  },
});

export default CustomButton;
