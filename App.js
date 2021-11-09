import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, Image, Alert, Pressable } from 'react-native';
import CustomButton from './button'
import getQuestions from './src/GetQuestions';
import api from './src/GetQuestions2';

//export default function App() {
const IndexPage = () => {

let [game_questions, setGameQuestions] = useState();
let [question_text, setQuestionText] = useState("This is where the question will live.");


useEffect(() => {
  console.log("In useEffect");
  
  getData();

  async function getData(){
    
    const response = await fetch("http://127.0.0.1:3000/getQuestions");
    const data = await response.json();
    setGameQuestions(data);
    setQuestionText(data[0].Question)
    console.log(data);
  }
  

  // const questions = async () => {

  //   const response = await axios('http://127.0.0.1:3000/getQuestions')
  //   setQuestions(response.data);
  //   question_text = game_questions[0].Question;
  //   console.log(response.data)
  // };
  // questions();

  //goGetQuestions();
  //console.log(game_questions[1]);
  // api.getData()
  //   .then((response) => {
  //     game_questions = response.data;
  //     console.log("Got Data from function again!!")
  //     console.log(game_questions[0]);
  //     setQuestionText(game_questions[0].Question);
  // })
  // .catch((error) => {
  //   console.log(error)
  // })
}, []);

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


//goGetQuestions();


  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('./assets/MusicIQ-Logo.jpg')} />
      <View>
      <Text style={styles.questionText}>{question_text}</Text>
      
      <Text style={styles.questionText}></Text>

      </View>
      <View style={[{width: "90%", margin:10, textAlign: "center"}]}>
        
        <CustomButton  name='button1' text='Answer 1'  />
        <CustomButton  name='button2' text='Answer 2' />
        <CustomButton  name='button3' text='Answer 3' />
        <CustomButton  name='button4' text='Answer 4' />
        <Button onPress={goGetQuestions} title="Cllick ME"></Button>
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
