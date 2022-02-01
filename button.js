import React, {useState} from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

//export default function CustomButton(props) {
  //const CustomButton = ({text, onPress}) => {
    const CustomButton = ({onPress, text, disabled_status,color}) => {

  //const btnPress = () =>{ alert(props.text) }
  
  
  return (
    //<Pressable style={styles.button} onPress={ ()=> setOutputText('New Text')}>
    <Pressable style={styles.defaultButton} onPress={onPress} disabled={disabled_status} backgroundColor={color} isCorrect='true'>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  defaultButton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 22,
    borderRadius: 20,
    elevation: 3,
    //backgroundColor: {color},
    margin:10
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

export default CustomButton