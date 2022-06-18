import React, {Component, PropTypes, useState} from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';

export default function QuestionText(props) {
    

  return (
      <Text style={styles.questionText}>{props.questionText}</Text>
  );
}

const styles = StyleSheet.create({
    questionText:{
        color:'white',
        fontSize:18,
        marginLeft:6,
        paddingBottom:15
        }
});