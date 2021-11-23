import React, {useState} from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

//export default function CustomButton(props) {
  //const CustomButton = ({text, onPress}) => {
    const CustomButton = ({onPress, text}) => {

  //const btnPress = () =>{ alert(props.text) }
  
  
  return (
    //<Pressable style={styles.button} onPress={ ()=> setOutputText('New Text')}>
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 3,
    backgroundColor: 'gray',
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