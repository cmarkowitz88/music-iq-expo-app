import React, { useState } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const CustomPlayButton = ({ color, onPress }) => {
  return (
    <Pressable onPress={onPress} isCorrect="true"
    style={({ pressed }) => [
        { opacity: pressed ? 0.5 : 1.0 }
      ]}>
      <AntDesign name="caretright" size={35} color={color} />
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
    elevation: 3,
    //backgroundColor: {color},
    margin: 10,
    width: "85%",
  },
});

export default CustomPlayButton;
