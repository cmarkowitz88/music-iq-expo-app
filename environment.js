import Constants from "expo-constants";
import { Platform } from "react-native";

const localhost = Platform.OS === "ios" ? "localhost:8080" : "10.0.2.2:8080";

const ENV = {
 dev:{
    useMockData: false,
    useLocalApis: true,
    localGetQuestionsApi:'http://127.0.0.1:3000/getQuestions?level=1',
    localGetAudioApi: 'http://localhost:4566/m-musiciq-audio-files/',
    devGetQuestionsApi: 'https://5g2fgriwo3.execute-api.us-east-1.amazonaws.com/Stage/getQuestions?level=1',
    devGetAudioApi: 'http://localhost:4566/m-musiciq-audio-files/',
 },
 staging:{
    useMockData: false,
    useLocalApis: false,
 },
 prod:{
    useMockData: false,
    useLocalApis:false,
 }

};


const getEnvVars = (env = Constants.manifest.releaseChannel) => {

    if (__DEV__){
        return ENV.dev;
    } else if (env === 'staging'){
        return ENV.staging;
    } else if (env === 'prod'){
        return ENV.prod;
    }
};

export default getEnvVars;