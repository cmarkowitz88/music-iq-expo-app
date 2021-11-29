import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Audio } from 'expo-av';
import {StyleSheet, View, Button, Image, Text} from 'react-native';
import CustomButton from './button';
import api from './src/GetQuestions2';
import QuestionText from './src/QuestionText';
import ScoreText from './src/ScoreText';
//import TimerText from './src/Timer';


//export default function App() {
const IndexPage = () => {

let [game_questions, setGameQuestions] = useState();
let [question_text, setQuestionText] = useState("");
let [correct_answer, setCorrectAnswer] = useState();
let [answer1_text, setAnswer1Text] = useState();
let [answer2_text, setAnswer2Text] = useState();
let [answer3_text, setAnswer3Text] = useState();
let [answer4_text, setAnswer4Text] = useState();
let [file_path, setFilePath] = useState();
let [score, setScore] = useState(0);
let [question_count, setQuestionCount] = useState(0);
let [track_length, setTrackLength] = useState(0);
let [time_left, setTimeLeft] = useState(0);
let [status_text, setStatusText] = useState('');
let [is_correct, setIsCorrect] =  useState(false);
let [btn_disabled_status, setBtn_disabled_status] = useState(false);

let tmpCnt = 0;



const onPress = (val) =>{
  selected_answer = val.answer1_text;
  clearInterval(oneSecInterval);
  setBtn_disabled_status(true);
  
  if (selected_answer == correct_answer){
    setScore(prevScore => prevScore + 1);
    setIsCorrect(true)
    setStatusText("Correct")
    console.log('Correct!')
  }
  else{
    setStatusText("Incorrect")
    setIsCorrect(false)
  }
  console.log(val)
 
}

async function playSound(filePath) {
    
  const soundObj = new Audio.Sound()
  //const source = require('./assets/audio/2.wav') 
  tmp = 'http://localhost:4566/music-iq.audio-files/' + filePath
  const source = { uri: tmp};
  await soundObj.loadAsync(source)
  await soundObj.playAsync()

  }


useEffect(() => {
  console.log("In useEffect");
  getData();
  
  async function getData(){
    
    const response = await fetch("http://127.0.0.1:3000/getQuestions");
    const data = await response.json();
    
    // First time app is loaded we get the json payload and store it in state object for later use
    setGameQuestions(data);

    // First time app is loaded we need immediate access to data so we'll directly use data object
    // For future requests we'll use game_questions array
    setQuestionText(data[question_count].Question);
    setAnswer1Text(data[question_count].Answer1);
    setAnswer2Text(data[question_count].Answer2);
    setAnswer3Text(data[question_count].Answer3);
    setAnswer4Text(data[question_count].Answer4);
    setCorrectAnswer(data[question_count].Correct_Answer);
    setFilePath(data[question_count].File_Path);
    setTrackLength(data[question_count].Track_Length);
    setTimeLeft(data[question_count].Track_Length);
    tmpCnt = data[question_count].Track_Length;
    
    //console.log(data);
    playSound(data[question_count].File_Path);
    setTimer();
  }

}, []);

function setTimer(){ 
  oneSecInterval = setInterval(() => {
  tmpCnt =  tmpCnt - 1;
  
  setTimeLeft(prevtimeLeft => prevtimeLeft - 1);
  console.log({tmpCnt});
  
  if (tmpCnt == 0) {
    clearInterval(oneSecInterval);
  }
  }, 1000);

}

const  setGameScreen = () =>{
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
      <View><ScoreText text={score}></ScoreText></View>
      {/*<View><TimerText> </TimerText></View>*/}
      <View><Text style={styles.timer}>Time Remaining: {time_left} </Text></View>
      <View>
      <QuestionText questionText={question_text}></QuestionText>
      </View>
      <View style={[{width: "90%", margin:10, textAlign: "center"}]}>
        <CustomButton  name='button1' text={answer1_text} disabled_status={btn_disabled_status} onPress={() => onPress({answer1_text})} />
        <CustomButton  name='button2' text={answer2_text} disabled_status={btn_disabled_status} onPress={() => onPress({answer2_text})}/>
        <CustomButton  name='button3' text={answer3_text} disabled_status={btn_disabled_status} onPress={() => onPress({answer3_text})}/>
        <CustomButton  name='button4' text={answer4_text} disabled_status={btn_disabled_status} onPress={() => onPress({answer4_text})}/>
        {/*<Button onPress={goGetQuestions} title="Click ME"></Button>*/}
        </View>

        <View><Text style={is_correct ? styles.statusTextCorrect : styles.statusTextIncorrect}>{status_text}</Text></View>
        
      
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
    height: 170,
  },

  questionText:{
    color:'white',
    fontSize:20,
    marginLeft:6,
  },

  statusTextCorrect:{
    color:'green',
    fontSize:28,
    paddingTop:10
  },

  statusTextIncorrect:{
    color: 'red',
    fontSize:28,
    paddingTop:10
  },

  myButton:{
    margin:25
  },

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

export default IndexPage
