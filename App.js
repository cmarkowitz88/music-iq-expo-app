import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, Image, Alert, Pressable } from 'react-native';
import CustomButton from './button'
import getQuestions from './src/GetQuestions';
import api from './src/GetQuestions2';
import QuestionText from './src/QuestionText';
import {Audio} from 'expo-av';

//export default function App() {
const IndexPage = () => {

let [game_questions, setGameQuestions] = useState();
let [question_text, setQuestionText] = useState("");
let [answer1_text, setAnswer1Text] = useState();
let [answer2_text, setAnswer2Text] = useState();
let [answer3_text, setAnswer3Text] = useState();
let [answer4_text, setAnswer4Text] = useState();
let [file_path, setFilePath] = useState();


useEffect(() => {
  console.log("In useEffect");
  
  getData();
  

  async function playSound() {
    
    const soundObj = new Audio.Sound()
    let source = require('./assets/audio/2.wav')
    await soundObj.loadAsync(source)
    await soundObj.playAsync()

    }

  async function getData(){
    
    const response = await fetch("http://127.0.0.1:3000/getQuestions");
    const data = await response.json();
    setGameQuestions(data);
    setQuestionText(data[0].Question);
    setAnswer1Text(data[0].Answer1);
    setAnswer2Text(data[0].Answer2);
    setAnswer3Text(data[0].Answer3);
    setAnswer4Text(data[0].Answer4);
    setFilePath(data[0].File_Path);
    setFilePath("3.wav");
    console.log(data);
    playSound();

  }

}, []);

let  setGameScreen = () =>{
  console.log("In game screen");
  setQuestionText(game_questions[0].Question);

}

async function goGetQuestions() {

  api.getData()
    .then((response) => {
    console.log(response.data);
    console.log(typeof response.data)
    const q = response.data
    setQuestionText(game_questions[2].Question);
    
    //console.log("Got Data from function again!!")
    
    //console.log('done');
  })
  .catch((error) => {
    console.log(error)
  })
}

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('./assets/MusicIQ-Logo.jpg')} />
      <View>
      <QuestionText questionText={question_text}></QuestionText>
      </View>
      <View style={[{width: "90%", margin:10, textAlign: "center"}]}>
        <CustomButton  name='button1' text={answer1_text}  />
        <CustomButton  name='button2' text={answer2_text} />
        <CustomButton  name='button3' text={answer3_text} />
        <CustomButton  name='button4' text={answer4_text} />
        <Button onPress={goGetQuestions} title="Click ME"></Button>
        </View>
        
      
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignContent: 'center',
    alignItems: 'center'
  },
  image: {
    resizeMode: 'contain',
    width: 370,
    height: 200,
  },
  questionText:{
  color:'white',
  fontSize:20,
  marginLeft:6,
  },
  myButton:{
    margin:25
  }
});

export default IndexPage
