import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Audio } from 'expo-av';
import {StyleSheet, View, Button, Image, Text, SafeAreaView} from 'react-native';
import CustomButton from './button';
import api from './src/GetQuestions2';
import QuestionText from './src/QuestionText';
import ScoreText from './src/ScoreText';
import { get } from 'react-native/Libraries/Utilities/PixelRatio';
import { VERTICAL } from 'react-native/Libraries/Components/ScrollView/ScrollViewContext';

//export default function App() {
const IndexPage = () => {

let [game_questions, setGameQuestions] = useState();
let [question_text, setQuestionText] = useState("");
let [correct_answer, setCorrectAnswer] = useState();
let [answer1_text, setAnswer1Text] = useState();
let [answer2_text, setAnswer2Text] = useState();
let [answer3_text, setAnswer3Text] = useState();
let [answer4_text, setAnswer4Text] = useState();
let [score_weight_multiplier, setScoreWeightMultiplier] = useState();
let [file_path, setFilePath] = useState();
let [score, setScore] = useState(0);
let [round, setRound] = useState(0);
let [round_question_cnt, setRoundQuestionCount] = useState(0);
let [question_count, setQuestionCount] = useState(0);
let [track_length, setTrackLength] = useState(0);
let [time_left, setTimeLeft] = useState(0);
let [status_text, setStatusText] = useState('');
let [is_correct, setIsCorrect] =  useState(false);
let [btn_disabled_status, setBtn_disabled_status] = useState(false);
let [playback_object, setPlayBackObject] = useState(null);
let [sound_object, setSoundObject] = useState(null);
let [btn1_color, setBtn1Color] = useState('gray');
let [btn2_color, setBtn2Color] = useState('gray');
let [btn3_color, setBtn3Color] = useState('gray');
let [btn4_color, setBtn4Color] = useState('gray');
let [hint, setHint] = useState();
let [showHintView, setShowHintView] = useState(false);
let [showNextBtn, setShowNextBtnBln] = useState(false);

let tmpCnt = 0;

const onPress = (val) => {
  let ans1 = val.answer1_text;
  let ans2 = val.answer2_text;
  let ans3 = val.answer3_text;
  let ans4 = val.answer4_text;
  let btn_selected = 0;

  if(ans1 != undefined){
    selected_answer = ans1;
    btn_selected = 1;
  }
  else if(ans2 != undefined) {
    selected_answer = ans2;
    btn_selected = 2;
  }
  else if (ans3 != undefined) {
    selected_answer = ans3;
    btn_selected = 3;;
  }
  else if (ans4 != undefined) {
    selected_answer = ans4;
    btn_selected = 4;;
  }

  clearInterval(oneSecInterval);
  setBtn_disabled_status(true);
  playback_object.unloadAsync();
  
  
  if (selected_answer == correct_answer){
    //setBtn1Color('green')
    playSoundFX(getSoundFXFile('correct'));
    highlightButtons('correct', btn_selected);
    //setScore(prevScore => prevScore + 1);
    calcScore(track_length, time_left,score_weight_multiplier)
    setIsCorrect(true)
    setStatusText("Correct")
    console.log('Correct!')
  }
  else{
    playSoundFX(getSoundFXFile('incorrect'));
    highlightButtons('incorrect', btn_selected);
    setStatusText("Incorrect")
    setIsCorrect(false)
  }
  console.log(val)
  setSoundObject(null);
  setShowNextBtnBln(true);
  setShowHintView(true);
 
}

const calcScore = (in_track_length, user_time,score_weight_multiplier) =>{
  let x = (Math.ceil(user_time / track_length * 100)) * score_weight_multiplier;
  x = Math.round(x / 10) * 10;
  setScore(prevScore => prevScore + x);

}

const highlightButtons = (status, in_btn_selected) => {
  if(status=='correct'){
    if (in_btn_selected == 1 )setBtn1Color('green');
    else if (in_btn_selected ==2 )setBtn2Color('green');
    else if (in_btn_selected ==3 )setBtn3Color('green');
    else if (in_btn_selected ==4 )setBtn4Color('green');
  }
  else if (status=='incorrect'){
    if (in_btn_selected == 1 )setBtn1Color('red');
    else if (in_btn_selected ==2 )setBtn2Color('red');
    else if (in_btn_selected ==3 )setBtn3Color('red');
    else if (in_btn_selected ==4 )setBtn4Color('red');
  }
}

const resetButtons = () => {
  setBtn1Color('gray');
  setBtn2Color('gray');
  setBtn3Color('gray');
  setBtn4Color('gray');
}

const getSoundFXFile = (answer_status) => {

  const applause = ['Applause_1.wav', 'Applause_2.wav', 'Applause_3.wav', 'Applause_4.wav'];
  const boos = ['Boo_1.wav', 'Boo_2.wav', 'Boo_3.wav', 'Boo_4.wav'];

  if (answer_status == 'correct'){
      i = Math.floor(Math.random() * applause.length);
      return applause[i];
  }
  else if (answer_status == 'incorrect'){
      j = Math.floor(Math.random() * boos.length);
      return boos[j];
  }

}

async function playSoundFX(filePath){
    const soundObjFX = new Audio.Sound();
     
    tmp = 'http://localhost:4566/music-iq.audio-files/' + filePath
    const source = { uri: tmp};
    const status = await soundObjFX.loadAsync(source);
    
    console.log(status);
    await soundObjFX.playAsync();
}

async function playSound(filePath) {
    
  if(sound_object === null){
    const soundObj = new Audio.Sound();
    setPlayBackObject(soundObj);
    //const source = require('./assets/audio/2.wav') 
    tmp = 'http://localhost:4566/music-iq.audio-files/' + filePath
    const source = { uri: tmp};
    const status = await soundObj.loadAsync(source);
    setSoundObject(status);
    console.log(status);
    await soundObj.playAsync();
    }

  }

//************** Initial Entry Point ****************/
useEffect(() => {
  console.log("In useEffect");
  getData();
  
  async function getData(){
    
    const response = await fetch("http://127.0.0.1:3000/getQuestions");
    const data = await response.json();
    
    rndm_game_questions = randomize_questions(data);
    
    // First time app is loaded we get the json payload and store it in state object for later use
    //setGameQuestions(data);
    setGameQuestions(rndm_game_questions);

    // First time app is loaded we need immediate access to data so we'll directly use data object
    // For future requests we'll use game_questions array
    setQuestionText(rndm_game_questions[question_count].Question);
    setAnswer1Text(rndm_game_questions[question_count].Answer1);
    setAnswer2Text(rndm_game_questions[question_count].Answer2);
    setAnswer3Text(rndm_game_questions[question_count].Answer3);
    setAnswer4Text(rndm_game_questions[question_count].Answer4);
    setCorrectAnswer(rndm_game_questions[question_count].Correct_Answer);
    setFilePath(rndm_game_questions[question_count].File_Path);
    setTrackLength(rndm_game_questions[question_count].Track_Length);
    setHint(rndm_game_questions[question_count].Hint);
    setTimeLeft(rndm_game_questions[question_count].Track_Length);
    setScoreWeightMultiplier(rndm_game_questions[question_count].Score);
    setRound(1);
    tmpCnt = rndm_game_questions[question_count].Track_Length;

    // Set the counter for question counter per round. 10 questions per round and then will show results view
    setRoundQuestionCount(round_question_cnt + 1);
    
    //console.log(data);
    playSound(rndm_game_questions[question_count].File_Path);
    setQuestionCount(question_count + 1);
    setTimer();
  }

  const randomize_questions = (in_array) => {

    const num_questions = in_array.length;
    let ary_list_of_indicies = [];
    let question_array = [];
    let new_index = -1

    for(let x=0; x<num_questions;x++){
        new_index = Math.floor(Math.random() * num_questions);

        let t = ary_list_of_indicies.indexOf(new_index)
      
        while(ary_list_of_indicies.indexOf(new_index) > -1){
            new_index = Math.floor(Math.random() * num_questions);
      }
      
      ary_list_of_indicies.push(new_index);
      question_array[new_index] = in_array[x];
    }
   
    return question_array;
    
  }

}, []);

function setTimer(){ 
  oneSecInterval = setInterval(() => {
  tmpCnt =  tmpCnt - 1;
  
  setTimeLeft(prevtimeLeft => prevtimeLeft - 1);
  //console.log({tmpCnt});
  
  if (tmpCnt == 0) {
    clearInterval(oneSecInterval);
  }
  }, 1000);

}

const showHint = () => {
  setShowHintView(true);
}

const  nextQuestion = () => {
  
  console.log("In game screen");
  console.log(question_count);
  setBtn_disabled_status(false);
  setShowNextBtnBln(false);
  setShowHintView(false);
  setStatusText("");
  resetButtons();
 
  setQuestionText(game_questions[question_count].Question);
  setAnswer1Text(game_questions[question_count].Answer1);
  setAnswer2Text(game_questions[question_count].Answer2);
  setAnswer3Text(game_questions[question_count].Answer3);
  setAnswer4Text(game_questions[question_count].Answer4);
  setCorrectAnswer(game_questions[question_count].Correct_Answer);
  setFilePath(game_questions[question_count].File_Path);
  setTrackLength(game_questions[question_count].Track_Length);
  setTimeLeft(game_questions[question_count].Track_Length);
  setHint(game_questions[question_count].Hint);
  tmpCnt = game_questions[question_count].Track_Length;

  // Increment counter for current question for this round
  setRoundQuestionCount(round_question_cnt + 1);
    
  //console.log(data);
  playSound(game_questions[question_count].File_Path);
  setQuestionCount(question_count + 1);
  setTimer();
  

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
    <SafeAreaView style={styles.safeview}>
    <View style={styles.container}>
      <Image style={styles.image} source={require('./assets/MusicIQ-Logo.jpg')} />
      <View><ScoreText text={score}></ScoreText></View>
      {/*<View><TimerText> </TimerText></View>*/}
      <View><Text style={styles.timer}>Time Remaining: {time_left} </Text></View>
      <View>
      <QuestionText questionText={question_text}></QuestionText>
      </View>
      <View style={[{width: "90%", margin:5, textAlign: "center"}]}>
        <CustomButton  name='button1' text={answer1_text} color={btn1_color} disabled_status={btn_disabled_status} onPress={() => onPress({answer1_text})} />
        <CustomButton  name='button2' text={answer2_text} color={btn2_color} disabled_status={btn_disabled_status} onPress={() => onPress({answer2_text})}/>
        <CustomButton  name='button3' text={answer3_text} color={btn3_color} disabled_status={btn_disabled_status} onPress={() => onPress({answer3_text})}/>
        <CustomButton  name='button4' text={answer4_text} color={btn4_color} disabled_status={btn_disabled_status} onPress={() => onPress({answer4_text})}/>
        <CustomButton  name='hint'    text='Show Me a Hint' onPress={showHint} title='Show Me a Hint' />
        
        </View>
       
        {showHintView ? (<View><Text style={styles.hint}>{hint}</Text></View>): null}
        <View style={[{width: "90%", margin:5, textAlign: "center"}]}>
          <Text style={is_correct ? styles.statusTextCorrect : styles.statusTextIncorrect}>{status_text}</Text>
          {showNextBtn ? (<CustomButton  name='next'  style={styles.next_button}  text='Next -->' color='blue' onPress={nextQuestion} title="Next-->" />) : null}
       
       <StatusBar style="auto" />
      </View>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  
  safeview: {
    flex:1,
    backgroundColor: 'black',
  },

  image: {
    resizeMode: 'contain',
    width: 370,
    height: 90,
  },

  questionText:{
    color:'white',
    fontSize:20,
    marginLeft:4,
  },

  statusTextCorrect:{
    color:'green',
    fontSize:28,
    paddingTop:10,
    textAlign: "center",
    fontWeight:"bold",
    paddingBottom:15,
  },

  statusTextIncorrect:{
    color: 'red',
    fontSize:28,
    paddingTop:10,
    textAlign: "center",
    paddingBottom:15,
  },

  myButton:{
    margin:25
  },

  timer:{
    color:'purple',
    fontSize:20,
    marginLeft:1,
    paddingBottom:15,
    textAlign:'left',
    flexDirection:'row',
    fontWeight:'bold'
    },

   hint:{
     color:'white'
   } ,

   next_button:{
     paddingTop:35,
   }

});

export default IndexPage
