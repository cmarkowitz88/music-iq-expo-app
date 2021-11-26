import React, {Component, PropTypes, useState,useEffect} from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

export default function TimerText(props) {
    let [timeLeft, setTimeLeft] = useState(20);
    x = 20;

   
    
    var oneSecInterval = setInterval(() => {
        console.log(x);
        //tmp = timeLeft-1;
        x=x-1;
        //setTimeLeft(tmp);

        if (x == 0) {
            clearInterval(oneSecInterval);
        }
    }, 1000);


  return (
      <Text style={styles.timer}>Time Remaining: {x}</Text>
  );
}

const styles = StyleSheet.create({
    timer:{
        color:'purple',
        fontSize:22,
        marginLeft:1,
        paddingBottom:15,
        textAlign:'left',
        flexDirection:'row',
        fontWeight:'bold'
        }
});