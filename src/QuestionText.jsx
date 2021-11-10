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
        fontSize:20,
        marginLeft:6,
        }
});