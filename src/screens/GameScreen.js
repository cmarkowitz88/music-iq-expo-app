import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Audio } from "expo-av";
import {
  StyleSheet,
  View,
  Button,
  Image,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Pressable,
} from "react-native";
import CustomButton from "../../button";
import CustomPlayButton from "../../play-button";
import api from "../GetQuestions2";
import QuestionText from "../QuestionText";
import ScoreText from "../ScoreText";
import { setLocalStorage2, getLocalStorage, logInUser, setLocalStorage } from "./Utils";

import getEnvVars from "../../environment";
import { out } from "react-native/Libraries/Animated/Easing";
import { backgroundColor } from "react-native/Libraries/Components/View/ReactNativeStyleAttributes";
import * as SecureStore from "expo-secure-store";
import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
  CognitoRefreshToken,
} from "amazon-cognito-identity-js";
import { Auth, Storage } from "aws-amplify";
import AWS from "aws-sdk";

let useMockData = "";
let apiUriGetQuestions = "";
let apiUriGetAudioApiUri = "";
let tmpIdToken = "";

const envObj = getEnvVars();
console.log(envObj);

//const { useMockData } = getEnvVars();
//const { localGetQuestionsApi} = getEnvVars();
console.log("Using Mock Data: " + useMockData);

const GameScreen = ({ navigation }) => {
  // All state variables
  let [timer_started, setTimerStarted] = useState(false);
  let [game_questions, setGameQuestions] = useState();
  let [question_type, setQuestionType] = useState();
  let [question_text, setQuestionText] = useState("");
  let [correct_answer, setCorrectAnswer] = useState();
  let [answer1_text, setAnswer1Text] = useState();
  let [answer2_text, setAnswer2Text] = useState();
  let [answer3_text, setAnswer3Text] = useState();
  let [answer4_text, setAnswer4Text] = useState();
  let [score_weight_multiplier, setScoreWeightMultiplier] = useState();
  let [file_path, setFilePath] = useState();
  let [file_path1, setFilePath1] = useState();
  let [file_path2, setFilePath2] = useState();
  let [file_path3, setFilePath3] = useState();
  let [file_path4, setFilePath4] = useState();
  let [score, setScore] = useState(0);
  let [round, setRound] = useState(0);
  let [round_question_cnt, setRoundQuestionCount] = useState(0);
  let [question_count, setQuestionCount] = useState(0);
  let [track_length, setTrackLength] = useState(0);
  let [answer1_track_length, setAnswer1TrackLength] = useState(0);
  let [answer2_track_length, setAnswer2TrackLength] = useState(0);
  let [answer3_track_length, setAnswer3TrackLength] = useState(0);
  let [answer4_track_length, setAnswer4TrackLength] = useState(0);
  let [timeLeft, setTimeLeft] = useState(30);
  let [status_text, setStatusText] = useState("");
  let [is_correct, setIsCorrect] = useState(false);
  let [btn_disabled_status, setBtn_disabled_status] = useState(false);
  let [playback_object, setPlayBackObject] = useState(null);
  let [sound_object, setSoundObject] = useState(null);
  let [btn1_color, setBtn1Color] = useState("gray");
  let [btn2_color, setBtn2Color] = useState("gray");
  let [btn3_color, setBtn3Color] = useState("gray");
  let [btn4_color, setBtn4Color] = useState("gray");
  let [hint, setHint] = useState();
  let [showHintView, setShowHintView] = useState(false);
  let [showNextBtn, setShowNextBtnBln] = useState(false);
  let [correct_answer_btn, setCorrectAnswerBtn] = useState();
  let [users_time, setUsersTime] = useState(0);
  let [rnd_review_ary, setRndReviewAry] = useState([]);
  let [out_of_time, setOutOfTime] = useState(false);
  let [showAnimatedGif, setShowAnimatedGif] = useState(true);
  let [playing_memory_track, setPlayingMemoryTrack] = useState(false);
  let [seconds, setSeconds] = useState();
  let [isActive, setIsActive] = useState(true);
  let [memory_seconds, setMemorySeconds] = useState();
  let [memory_track_length, setMemoryTrackLength] = useState();
  let [memory_answer_selected_button, setMemoryAnswerSelectedButton] =
    useState(0);
  let [idToken, setIdToken] = useState();
  let [gotUserCreds, setGotUserCreds] = useState(false);
  let [refreshToken, setRefreshToken] = useState({});

  // Temp variables
  let tmpCnt = 0;
  let tmpStatus = "";
  let level;

  const QUESTIONS_PER_ROUND = 10;

  const setUpVars = (inObj) => {
    useMockData = inObj.useMockData;
    if (inObj.useLocalApis) {
      apiUriGetQuestions = inObj.localGetQuestionsApi;
      apiUriGetAudioApiUri = inObj.localGetAudioApi;
    } else {
      apiUriGetQuestions = inObj.devGetQuestionsApi;
      apiUriGetAudioApiUri = inObj.devGetAudioApi;

      // getLocalStorage("idToken").then((token) => {
      //   idToken = token;
      //   console.log(token);
      //   console.log(idToken);
      // });
    }
  };

  const guessAnswer = (val) => {
    let ans1 = val.answer1_text;
    let ans2 = val.answer2_text;
    let ans3 = val.answer3_text;
    let ans4 = val.answer4_text;
    let selected_answer = "";
    let btn_selected = 0;
    let blnOutOfTime = false;
    let soundFxFile = "";

    setTimerStarted(false);
    setShowAnimatedGif(false);
    setPlayingMemoryTrack(false);

    if (ans1 != undefined) {
      selected_answer = ans1;
      btn_selected = 1;
    } else if (ans2 != undefined) {
      selected_answer = ans2;
      btn_selected = 2;
    } else if (ans3 != undefined) {
      selected_answer = ans3;
      btn_selected = 3;
    } else if (ans4 != undefined) {
      selected_answer = ans4;
      btn_selected = 4;
    } else {
      blnOutOfTime = true;
    }

    let tmp_users_time = track_length - seconds;
    setUsersTime(tmp_users_time);

    //clearInterval(oneSecInterval);
    setBtn_disabled_status(true);
    if (playback_object) playback_object.unloadAsync();
    let c = round_question_cnt + 1;
    setRoundQuestionCount(c);
    setQuestionCount(question_count + 1);

    if (blnOutOfTime) {
      setStatusText("OUT OF TIME");
    } else if (selected_answer == correct_answer) {
      setStatusText("CORRECT");
    } else {
      setStatusText("INCORRECT");
    }

    if (selected_answer == correct_answer) {
      tmpStatus = "Correct";
      soundFxFile = getSoundFXFile("correct");

      //playSoundFX();
      highlightButtons("correct", btn_selected);
      calcScore(track_length, seconds, score_weight_multiplier);
      setIsCorrect(true);
      console.log("Correct!");
    } else {
      tmpStatus = "Incorrect";
      //playSoundFX(getSoundFXFile("incorrect"));
      soundFxFile = getSoundFXFile("incorrect");
      highlightButtons("incorrect", btn_selected);
      highlightButtons("correct", correct_answer_btn);
      setIsCorrect(false);
    }

    if (!envObj.useLocalApis) {
      goRefreshToken().then(() => {
        generatePreSignedURL(soundFxFile)
          .then((url) => {
            playSoundFX(url);
          })
          .catch((err) => {
            console.log("Error " + err);
          });
      });
    } else {
      url = "http://localhost:4566/m-musiciq-audio-files/public/" + soundFxFile;
      playSoundFX(url);
    }

    // Assign the question/answer properties to object and push into array so we can show on RoundReview screen
    let roundReviewData = {
      id: c,
      question: question_text,
      answer: selected_answer,
      answer_status: tmpStatus,
      time_to_answer: tmp_users_time,
    };
    let tmp = rnd_review_ary;
    tmp.push(roundReviewData);
    setRndReviewAry(tmp);

    if (c == QUESTIONS_PER_ROUND) {
      setRndReviewAry([]);
      setRoundQuestionCount(1);
      navigation.navigate("RoundReview", { data: rnd_review_ary });
    }
    console.log(val);
    setSoundObject(null);
    setShowNextBtnBln(true);
    setShowHintView(true);
    //setOutOfTime(false);
  };

  const calcScore = (in_track_length, user_time, score_weight_multiplier) => {
    let x =
      Math.ceil((user_time / track_length) * 100) * score_weight_multiplier;
    x = Math.round(x / 10) * 10;
    setScore((prevScore) => prevScore + x);
  };

  const highlightButtons = (status, in_btn_selected) => {
    if (status == "correct") {
      if (in_btn_selected == 1) setBtn1Color("green");
      else if (in_btn_selected == 2) setBtn2Color("green");
      else if (in_btn_selected == 3) setBtn3Color("green");
      else if (in_btn_selected == 4) setBtn4Color("green");
    } else {
      if (in_btn_selected == 1) setBtn1Color("red");
      else if (in_btn_selected == 2) setBtn2Color("red");
      else if (in_btn_selected == 3) setBtn3Color("red");
      else if (in_btn_selected == 4) setBtn4Color("red");
    }
  };

  const resetButtons = () => {
    setBtn1Color("gray");
    setBtn2Color("gray");
    setBtn3Color("gray");
    setBtn4Color("gray");
  };

  const getSoundFXFile = (answer_status) => {
    const applause = [
      "Applause_1.mp3",
      "Applause_2.mp3",
      "Applause_3.mp3",
      "Applause_4.mp3",
    ];
    const boos = ["Boo_1.mp3", "Boo_2.mp3", "Boo_3.mp3", "Boo_4.mp3"];

    if (answer_status == "correct") {
      let i = Math.floor(Math.random() * applause.length);
      return applause[i];
    } else {
      let j = Math.floor(Math.random() * boos.length);
      return boos[j];
    }
  };

  const playNextMemoryAnswer = (filepath, trackLength, answer_number) => {
    setPlayingMemoryTrack(true);
    playback_object.unloadAsync();
    setSoundObject(null);
    //playSound(filepath, "memory");
    if (!envObj.useLocalApis) {
      generatePreSignedURL(filepath)
        .then((url) => {
          playSound(url, "memory");
        })
        .catch((err) => {
          console.log("Error " + err);
        });
    } else {
      url = apiUriGetAudioApiUri + filepath;
      playSound(url, "memory");
    }
    setShowAnimatedGif(true);
    setMemorySeconds(0);
    setMemoryTrackLength(trackLength);
    setMemoryAnswerSelectedButton(answer_number);
  };

  async function playSoundFX(filePath) {
    const soundObjFX = new Audio.Sound();

    //tmp = apiUriGetAudioApiUri + filePath;
    //tmp = "http://localhost:4566/m-musiciq-audio-files/SoundFX/" + filePath;
    //const source = require('./assets')
    const source = { uri: filePath };
    const status = await soundObjFX.loadAsync(source);

    console.log(status);
    await soundObjFX.playAsync();
  }

  async function playSound(filePath, question_type) {
    if (sound_object === null || question_type == "memory") {
      const soundObj = new Audio.Sound();
      setPlayBackObject(soundObj);
      //const source = require('./assets/audio/2.wav')
      //tmp = encodeURI(apiUriGetAudioApiUri + filePath);
      //filePath = 'https://s3.amazonaws.com/craig.markowitz.stuff/1000020.wav?';
      //tmp = "http://localhost:4566/m-musiciq-audio-files/" + filePath;

      const source = { uri: filePath };
      const status = await soundObj.loadAsync(source);
      setSoundObject(status);
      console.log(status);
      await soundObj.playAsync();
    }
  }

  //************** Initial Entry Point for GameScreen component  ****************/
  useEffect(() => {
    console.log("In useEffect");
    setUpVars(envObj);
    getLocalStorage("level").then((tmplevel) => {
      if(tmplevel == null){
        setLocalStorage2("level","1");
        level = 1;
      }
      else{
        level = tmplevel;
      }
      console.log(level);
      getData();
    
     });
    //getData();

    async function getData2(){
      let data = {};
      
      goRefreshToken();
      let token = (await Auth.currentSession()).getIdToken().getJwtToken();

      if (useMockData) {
        const response = await fetch(
          "/Users/craigmarkowitz/Documents/Development/music-iq-expo/MockData.json"
        );
        data = await response.json();
      } else if (!useMockData) {
        const response = await fetch(
          apiUriGetQuestions + "level=" + level,
          {
            withCredentials: true,
            credentials: "include",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        data = await response.json();
      }
    }

    async function getData() {
      let data = {};
      //let token = await getJwt();
      goRefreshToken();
      let token = (await Auth.currentSession()).getIdToken().getJwtToken();

      if (useMockData) {
        //data = require("json!../../../MockData.json");
        const response = await fetch(
          "/Users/craigmarkowitz/Documents/Development/music-iq-expo/MockData.json"
        );
        data = await response.json();
      } else if (!useMockData) {
       
        const response = await fetch(
          //"http://127.0.0.1:3000/getQuestions?level=1"
          apiUriGetQuestions + "level=" + level,
          {
            withCredentials: true,
            credentials: "include",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        data = await response.json();
      }

      rndm_game_questions = randomize_questions(data);

      // First time app is loaded we get the json payload and store it in state object for later use
      //setGameQuestions(data);
      setGameQuestions(rndm_game_questions);

      // First time app is loaded we need immediate access to data so we'll directly use data object
      // For future requests we'll use game_questions array
      setQuestionType(rndm_game_questions[question_count].Type);
      setQuestionText(rndm_game_questions[question_count].Question);
      setAnswer1Text(rndm_game_questions[question_count].Answer1);
      setAnswer2Text(rndm_game_questions[question_count].Answer2);
      setAnswer3Text(rndm_game_questions[question_count].Answer3);
      setAnswer4Text(rndm_game_questions[question_count].Answer4);
      setCorrectAnswer(rndm_game_questions[question_count].Correct_Answer);
      setFilePath(rndm_game_questions[question_count].File_Path);
      if (rndm_game_questions[question_count].Type == "music-memory") {
        setFilePath1(rndm_game_questions[question_count].Answer1_File_Path);
        setFilePath2(rndm_game_questions[question_count].Answer2_File_Path);
        setFilePath3(rndm_game_questions[question_count].Answer3_File_Path);
        setFilePath4(rndm_game_questions[question_count].Answer4_File_Path);
      }

      setTrackLength(rndm_game_questions[question_count].Track_Length);
      setAnswer1TrackLength(
        rndm_game_questions[question_count].Answer1_Track_Length
      );
      setAnswer2TrackLength(
        rndm_game_questions[question_count].Answer2_Track_Length
      );
      setAnswer3TrackLength(
        rndm_game_questions[question_count].Answer3_Track_Length
      );
      setAnswer4TrackLength(
        rndm_game_questions[question_count].Answer4_Track_Length
      );
      setHint(rndm_game_questions[question_count].Hint);
      setTimeLeft(rndm_game_questions[question_count].Track_Length);
      setSeconds(rndm_game_questions[question_count].Track_Length);
      setTimerStarted(true);
      setScoreWeightMultiplier(rndm_game_questions[question_count].Score);
      setRound(1);
      setCorrectAnswerButton(
        rndm_game_questions[question_count].Answer1,
        rndm_game_questions[question_count].Answer2,
        rndm_game_questions[question_count].Answer3,
        rndm_game_questions[question_count].Answer4,
        rndm_game_questions[question_count].Correct_Answer
      );

      //console.log(data);
      if (!envObj.useLocalApis) {
        goRefreshToken().then(() => {
          generatePreSignedURL(rndm_game_questions[question_count].File_Path)
            .then((url) => {
              playSound(url);
            })
            .catch((err) => {
              console.log("Error " + err);
            });
        });
      } else {
        url =
          apiUriGetAudioApiUri + rndm_game_questions[question_count].File_Path;
        playSound(url);
      }
    }

    const randomize_questions = (in_array) => {
      const num_questions = in_array.length;
      let ary_list_of_indicies = [];
      let question_array = [];
      let new_index = -1;

      for (let x = 0; x < num_questions; x++) {
        new_index = Math.floor(Math.random() * num_questions);

        let t = ary_list_of_indicies.indexOf(new_index);

        while (ary_list_of_indicies.indexOf(new_index) > -1) {
          new_index = Math.floor(Math.random() * num_questions);
        }

        ary_list_of_indicies.push(new_index);
        question_array[new_index] = in_array[x];
      }

      return question_array;
    };
  }, []);
  //************** END Initial Entry Point for GameScreen component  ****************/

  async function getJwt() {
    ses = await Auth.currentSession();
    console.log("in get jwt")
    return idToken;
  }

  async function goRefreshToken() {
    ses = await Auth.currentSession();
    console.log("refreshed token...")
  }

  async function generatePreSignedURL(filePath) {
    //filePath = 'TubeScreamer.mp3'
    const url = await Storage.get(filePath);
    console.log("got presigned url");
    return url;
  };

  // useEffect(() => {
  //   let oneSecInterval = null;
  //   if(isActive){
  //     oneSecInterval = setInterval(() => {
  //       //setTimeLeft((prevtimeLeft) => prevtimeLeft - 1);
  //       setTimeLeft(timeLeft => timeLeft - 1);

  //       // if (time_left == 0) {
  //       //   setOutOfTime(true);
  //       //   clearInterval(oneSecInterval);
  //       //   onPress("out-of-time");
  //       // }
  //     }, 1000);
  //   }
  // },[timeLeft]);

  useEffect(() => {
    let interval = null;
    if (seconds > 0 && timer_started) {
      interval = setInterval(() => {
        setSeconds((seconds) => seconds - 1);
        //setMemorySeconds(0);
        //console.log(memory_seconds);
      }, 1000);
    } else if (seconds == 0) {
      setShowAnimatedGif(false);
      setSeconds(0);
      clearInterval(interval);
      setOutOfTime(true);
      setTimerStarted(false);
      if (playback_object) {
        playback_object.unloadAsync();
        setSoundObject(null);
      }
      if (question_type == "music-knowledge") guessAnswer("out-of-time");
    } else if (!timer_started);
    return () => clearInterval(interval);
  }, [seconds, timer_started]);

  useEffect(() => {
    let interval = null;
    if (question_type == "music-memory" && playing_memory_track) {
      console.log("Playing Memory Track");
      if (memory_seconds < memory_track_length) {
        interval = setInterval(() => {
          setMemorySeconds((memory_seconds) => memory_seconds + 1);
          console.log(memory_seconds);
        }, 1000);
      }
    }
    return () => clearInterval(interval);
  }, [memory_seconds]);

  function setTimer() {
    oneSecInterval = setInterval(() => {
      tmpCnt = tmpCnt - 1;

      setTimeLeft((prevtimeLeft) => prevtimeLeft - 1);

      if (tmpCnt == 0) {
        setOutOfTime(true);
        clearInterval(oneSecInterval);
        guessAnswer("out-of-time");
      }
    }, 1000);
  }

  const showHint = () => {
    setShowHintView(true);
  };

  const nextQuestion = () => {
    if (question_count < game_questions.length) {
      console.log("In game screen");
      console.log(question_count);
      setShowAnimatedGif(true);
      setBtn_disabled_status(false);
      setShowNextBtnBln(false);
      setShowHintView(false);
      setStatusText("");
      resetButtons();
      setTimerStarted(true);
      setOutOfTime(false);

      setQuestionType(game_questions[question_count].Type);
      setQuestionText(game_questions[question_count].Question);
      setAnswer1Text(game_questions[question_count].Answer1);
      setAnswer2Text(game_questions[question_count].Answer2);
      setAnswer3Text(game_questions[question_count].Answer3);
      setAnswer4Text(game_questions[question_count].Answer4);
      setCorrectAnswer(game_questions[question_count].Correct_Answer);
      setFilePath(game_questions[question_count].File_Path);
      if (game_questions[question_count].Type == "music-memory") {
        setFilePath1(game_questions[question_count].Answer1_File_Path);
        setFilePath2(game_questions[question_count].Answer2_File_Path);
        setFilePath3(game_questions[question_count].Answer3_File_Path);
        setFilePath4(game_questions[question_count].Answer4_File_Path);
      }
      setTrackLength(game_questions[question_count].Track_Length);
      setAnswer1TrackLength(
        rndm_game_questions[question_count].Answer1_Track_Length
      );
      setAnswer2TrackLength(
        rndm_game_questions[question_count].Answer2_Track_Length
      );
      setAnswer3TrackLength(
        rndm_game_questions[question_count].Answer3_Track_Length
      );
      setAnswer4TrackLength(
        rndm_game_questions[question_count].Answer4_Track_Length
      );
      setSeconds(game_questions[question_count].Track_Length);
      setMemorySeconds(null);
      setHint(game_questions[question_count].Hint);

      setCorrectAnswerButton(
        game_questions[question_count].Answer1,
        game_questions[question_count].Answer2,
        game_questions[question_count].Answer3,
        game_questions[question_count].Answer4,
        game_questions[question_count].Correct_Answer
      );

      // Increment counter for current question for this round
      //setRoundQuestionCount(round_question_cnt + 1);

      //console.log(data);
      //playSound(game_questions[question_count].File_Path);
      if (!envObj.useLocalApis) {
        goRefreshToken().then((val) => {
          console.log(val);
          generatePreSignedURL(rndm_game_questions[question_count].File_Path)
            .then((url) => {
              playSound(url);
            })
            .catch((err) => {
              console.log("Error " + err);
            });
        });
      } else {
        url =
          apiUriGetAudioApiUri + rndm_game_questions[question_count].File_Path;
        playSound(url);
      }
      
    } else {
      console.log("No More Questions.");
      setStatusText("Level Completed. Nice Job.");
      setShowNextBtnBln(true);
    }
  };

  const setCorrectAnswerButton = (ans1, ans2, ans3, ans4, c) => {
    // As we are assigning the questions we want to know which button contains the correct answer
    // so that if the use selects the incorrect answer we'll know the correct one so we can change
    // the background to green to indicate it was the correct answer

    if (ans1 == c) setCorrectAnswerBtn(1);
    else if (ans2 == c) setCorrectAnswerBtn(2);
    else if (ans3 == c) setCorrectAnswerBtn(3);
    else if (ans4 == c) setCorrectAnswerBtn(4);
  };

  async function goGetQuestions() {
    api
      .getData()
      .then((response) => {
        console.log(response.data);
        console.log(typeof response.data);
        const q = response.data;
        setQuestionText(game_questions[2].Question);

        //console.log("Got Data from function again!!")

        //console.log('done');
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async function getData2(){
    let data = {};
    
    goRefreshToken();
    let token = (await Auth.currentSession()).getIdToken().getJwtToken();

    if (useMockData) {
      const response = await fetch(
        "/Users/craigmarkowitz/Documents/Development/music-iq-expo/MockData.json"
      );
      data = await response.json();
    } else if (!useMockData) {
      const response = await fetch(
        apiUriGetQuestions + "level=" + level,
        {
          withCredentials: true,
          credentials: "include",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      data = await response.json();
      return data;
    }
  }

  

  return (
    <SafeAreaView style={styles.safeview}>
      <ScrollView>
        <View style={styles.container}>
          <Image
            style={styles.image}
            source={require("../../assets/MusicIQ-Logo_2.jpg")}
          />
          <View>
            <ScoreText text={score}></ScoreText>
          </View>

          <View>
            <Text style={styles.timer}>
              Time Remaining: 0:{seconds < 10 ? "0" : ""}
              {seconds}{" "}
            </Text>
          </View>

          <View style={{ paddingBottom: 20 }}>
            <Image
              style={{ height: 70, width: 300 }}
              source={
                showAnimatedGif
                  ? require("../../assets/5uwq.gif")
                  : require("../../assets/5uwq_Still.png")
              }
            />
          </View>

          <View>
            <QuestionText questionText={question_text}></QuestionText>
          </View>

          {question_type && out_of_time && question_type == "music-memory" && (
            <>
              <View
                style={[
                  { flexDirection: "row", alignItems: "center", marginLeft: 5 },
                ]}
              >
                <View
                  style={[
                    { flex: 1, flexDirection: "row", justifyContent: "left" },
                  ]}
                >
                  <CustomPlayButton
                    color="red"
                    onPress={() =>
                      playNextMemoryAnswer(file_path1, answer1_track_length, 1)
                    }
                  />
                </View>
                <Text style={styles.memory_seconds}>
                  {!memory_seconds || memory_answer_selected_button != 1
                    ? "0:00 "
                    : ""}
                  {memory_answer_selected_button == 1 &&
                  memory_seconds &&
                  memory_seconds <= 9
                    ? "0:0" + memory_seconds + " "
                    : ""}
                  {memory_answer_selected_button == 1 &&
                  memory_seconds &&
                  memory_seconds > 9
                    ? "0:" + memory_seconds + " "
                    : ""}
                  / 0:{answer1_track_length}
                </Text>
                <View
                  style={[
                    {
                      flex: 6,
                      justifyContent: "left",
                      flexDirection: "row",
                      backgroundColor: "black",
                    },
                  ]}
                >
                  <CustomButton
                    name="button1"
                    text={answer1_text}
                    color={btn1_color}
                    disabled_status={btn_disabled_status}
                    onPress={() => guessAnswer({ answer1_text })}
                  />
                </View>
              </View>

              <View
                style={[
                  { flexDirection: "row", alignItems: "center", marginLeft: 5 },
                ]}
              >
                <View
                  style={[
                    { flex: 1, flexDirection: "row", justifyContent: "left" },
                  ]}
                >
                  <CustomPlayButton
                    color="green"
                    onPress={() =>
                      playNextMemoryAnswer(file_path2, answer2_track_length, 2)
                    }
                  />
                </View>
                <Text style={styles.memory_seconds}>
                  {!memory_seconds || memory_answer_selected_button != 2
                    ? "0:00 "
                    : ""}
                  {memory_answer_selected_button == 2 &&
                  memory_seconds &&
                  memory_seconds <= 9
                    ? "0:0" + memory_seconds + " "
                    : ""}
                  {memory_answer_selected_button == 2 &&
                  memory_seconds &&
                  memory_seconds > 9
                    ? "0:" + memory_seconds + " "
                    : ""}
                  / 0:{answer2_track_length}
                </Text>
                <View
                  style={[
                    {
                      flex: 6,
                      justifyContent: "left",
                      flexDirection: "row",
                      backgroundColor: "black",
                    },
                  ]}
                >
                  <CustomButton
                    name="button2"
                    text={answer2_text}
                    color={btn2_color}
                    disabled_status={btn_disabled_status}
                    onPress={() => guessAnswer({ answer2_text })}
                  />
                </View>
              </View>

              <View
                style={[
                  { flexDirection: "row", alignItems: "center", marginLeft: 5 },
                ]}
              >
                <View
                  style={[
                    { flex: 1, flexDirection: "row", justifyContent: "left" },
                  ]}
                >
                  <CustomPlayButton
                    color="yellow"
                    onPress={() =>
                      playNextMemoryAnswer(file_path3, answer3_track_length, 3)
                    }
                  />
                </View>
                <Text style={styles.memory_seconds}>
                  {!memory_seconds || memory_answer_selected_button != 3
                    ? "0:00 "
                    : ""}
                  {memory_answer_selected_button == 3 &&
                  memory_seconds &&
                  memory_seconds <= 9
                    ? "0:0" + memory_seconds + " "
                    : ""}
                  {memory_answer_selected_button == 3 &&
                  memory_seconds &&
                  memory_seconds > 9
                    ? "0:" + memory_seconds + " "
                    : ""}
                  / 0:{answer3_track_length}
                </Text>
                <View
                  style={[
                    {
                      flex: 6,
                      justifyContent: "left",
                      flexDirection: "row",
                      backgroundColor: "black",
                    },
                  ]}
                >
                  <CustomButton
                    name="button3"
                    text={answer3_text}
                    color={btn3_color}
                    disabled_status={btn_disabled_status}
                    onPress={() => guessAnswer({ answer3_text })}
                  />
                </View>
              </View>

              <View
                style={[
                  { flexDirection: "row", alignItems: "center", marginLeft: 5 },
                ]}
              >
                <View
                  style={[
                    { flex: 1, flexDirection: "row", justifyContent: "left" },
                  ]}
                >
                  <CustomPlayButton
                    color="blue"
                    onPress={() =>
                      playNextMemoryAnswer(file_path4, answer4_track_length, 4)
                    }
                  />
                </View>
                <Text style={styles.memory_seconds}>
                  {!memory_seconds || memory_answer_selected_button != 4
                    ? "0:00 "
                    : ""}
                  {memory_answer_selected_button == 4 &&
                  memory_seconds &&
                  memory_seconds <= 9
                    ? "0:0" + memory_seconds + " "
                    : ""}
                  {memory_answer_selected_button == 4 &&
                  memory_seconds &&
                  memory_seconds > 9
                    ? "0:" + memory_seconds + " "
                    : ""}
                  / 0:{answer4_track_length}
                </Text>
                <View
                  style={[
                    {
                      flex: 6,
                      justifyContent: "left",
                      flexDirection: "row",
                      backgroundColor: "black",
                    },
                  ]}
                >
                  <CustomButton
                    name="button4"
                    text={answer4_text}
                    color={btn4_color}
                    disabled_status={btn_disabled_status}
                    onPress={() => guessAnswer({ answer4_text })}
                  />
                </View>
              </View>
            </>
          )}

          {question_type && question_type == "music-knowledge" && (
            <View
              style={[
                {
                  width: "100%",
                  margin: 5,
                  textAlign: "center",
                  alignItems: "center",
                },
              ]}
            >
              <CustomButton
                name="button1"
                text={answer1_text}
                color={btn1_color}
                disabled_status={btn_disabled_status}
                onPress={() => guessAnswer({ answer1_text })}
              />
              <CustomButton
                name="button2"
                text={answer2_text}
                color={btn2_color}
                disabled_status={btn_disabled_status}
                onPress={() => guessAnswer({ answer2_text })}
              />
              <CustomButton
                name="button3"
                text={answer3_text}
                color={btn3_color}
                disabled_status={btn_disabled_status}
                onPress={() => guessAnswer({ answer3_text })}
              />
              <CustomButton
                name="button4"
                text={answer4_text}
                color={btn4_color}
                disabled_status={btn_disabled_status}
                onPress={() => guessAnswer({ answer4_text })}
              />
            </View>
          )}

          {question_type == "music-knowledge" && (
            <CustomButton
              name="hint"
              text="Give Me a Hint!"
              onPress={showHint}
              title="Show Me a Hint"
            />
          )}

          {question_type == "music-memory" && out_of_time && (
            <CustomButton
              name="hint"
              text="Give Me a Hint!"
              onPress={showHint}
              title="Show Me a Hint"
            />
          )}

          {showHintView ? (
            <View>
              <Text style={styles.hint}>{hint}</Text>
            </View>
          ) : null}
          <View style={[{ width: "90%", margin: 5, textAlign: "center" }]}>
            <Text
              style={
                is_correct
                  ? styles.statusTextCorrect
                  : styles.statusTextIncorrect
              }
            >
              {status_text}
            </Text>
            {showNextBtn ? (
              <CustomButton
                name="next"
                text="Next -->"
                onPress={nextQuestion}
                title="Next-->"
              />
            ) : null}

            <StatusBar style="auto" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  safeview: {
    flex: 1,
    backgroundColor: "black",
  },

  image: {
    resizeMode: "contain",
    width: 370,
    height: 90,
  },

  questionText: {
    color: "white",
    fontSize: 15,
    marginLeft: 4,
  },

  statusTextCorrect: {
    color: "green",
    fontSize: 15,
    paddingTop: 10,
    textAlign: "center",
    fontWeight: "bold",
    paddingBottom: 15,
  },

  statusTextIncorrect: {
    color: "red",
    fontSize: 15,
    paddingTop: 10,
    textAlign: "center",
    fontWeight: "bold",
    paddingBottom: 15,
  },

  myButton: {
    margin: 25,
  },

  timer: {
    color: "purple",
    fontSize: 14,
    marginLeft: 1,
    paddingBottom: 15,
    textAlign: "left",
    flexDirection: "row",
    fontWeight: "bold",
    fontVariant: ["tabular-nums"],
  },

  hint: {
    color: "white",
    marginLeft: 6,
    fontSize: 14,
  },

  next_button: {
    paddingTop: 35,
    fontSize: 25,
  },

  memory_seconds: {
    color: "white",
    fontSize: 16,
    fontVariant: ["tabular-nums"],
    fontWeight: "bold",
    paddingRight: 5,
  },
});

export default GameScreen;
