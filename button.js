import React, {useState} from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

export default function CustomButton(props) {
    
  const [ outputText, setOutputText] = useState('Open up App.js')

  const btnPress = () =>{ alert(props.name) }
  
  
  return (
    //<Pressable style={styles.button} onPress={ ()=> setOutputText('New Text')}>
    <Pressable style={styles.button} onPress={btnPress}>
      <Text style={styles.text}>{props.text}</Text>
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