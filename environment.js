import Constants from "expo-constants";
import { Platform } from "react-native";

const localhost = Platform.OS === "ios" ? "localhost:8080" : "10.0.2.2:8080";

const ENV = {
 dev:{
    useMockData: true,
 },
 staging:{
    useMockData: false,
 },
 prod:{
    useMockData: false,
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