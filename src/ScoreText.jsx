import React, {Component, PropTypes, useState} from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

export default function ScoreText(props) {
    
  return (
      <Text style={styles.scoreText}>Score: {props.text}</Text>
  );
}

const styles = StyleSheet.create({
    scoreText:{
        color:'purple',
        fontSize:22,
        marginLeft:1,
        paddingBottom:15,
        textAlign:'left',
        flexDirection:'row',
        fontWeight:'bold'
        }
});