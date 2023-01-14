import React, { useState } from "react";
import * as SecureStore from "expo-secure-store";

import {
  CognitoUserPool,
  CognitoUserAttribute,
  CognitoUser,
  AuthenticationDetails,
} from "amazon-cognito-identity-js";

export const setLocalStorage = (key, value) => {
  console.log("In set LocalStorage");
  save(key, value);

  async function save(key, value) {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch (e) {
      console.log(e);
    } finally {
      console.log("Done Saving Local Storage.");
    }
  }
};

export const getRandomNumber = (min,max) =>{
    return Math.floor(Math.random() *(max - min + 1)+min);
};

export async function deleteLocalStorageItem(key) {
  await SecureStore.deleteItemAsync(key).then(() => {
    console.log(`Deleted Key: ${key}`);
  });
}

export async function setLocalStorage2(key, value) {
  await SecureStore.setItemAsync(key, value).then(() => {
    console.log("wrote to storage");
  });
}

export async function getLocalStorage(key) {
  result = await SecureStore.getItemAsync(key);
  // let result = await SecureStore.getItemAsync(key);
  return result;
}

export async function getAllUserData(fields){
  let userData = {'level':'', 'round':''};
  for (key of fields){
    userData[key] = await SecureStore.getItemAsync(key);
  }
  return userData;
}

export async function getAllUserData2(fields){
  var promise = new Promise((resolve, reject) => {
  let userData = {"level":'', "round":''};
  
  fields.map(field => {
    console.log(field);
    res = SecureStore.getItemAsync(field);
      console.log(res);
      userData[field] = res;
      
  console.log(`User Data: ${userData}`);
  });
  resolve(userData);
  
  return promise;
});
}

export function logInUser(userName, userPassword) {
  var promise = new Promise((resolve, reject) => {
    let rtn = "success";
    if (typeof userPassword === "undefined") {
      // Get password from local-storage
      SecureStore.getItemAsync("password").then((userPassword) => {
        console.log(userPassword);

        let authenticationData = {
          Username: userName,
          Password: userPassword,
        };

        let authenticationDetails = new AuthenticationDetails(
          authenticationData
        );

        const poolData = {
          UserPoolId: "us-east-1_smGpwOWnD",
          ClientId: "383pg349j8s1m42kavf0ta7i4r",
        };
        let userPool = new CognitoUserPool(poolData);
        let userData = {
          Username: userName,
          Pool: userPool,
        };
        var cognitoUser = new CognitoUser(userData);
        cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: function (result) {
            let accessToken = result.getAccessToken().getJwtToken();
            let idToken = result.getIdToken().getJwtToken();
            SecureStore.setItemAsync("idToken", idToken).catch((error) =>
              console.log("Could not save user info ", error)
            );
            resolve("success");
          },
          onFailure: function (err) {
            console.log(err.message);
            //setLoginMessage(err.message);
            rtn = "failure";
            reject("failed");
          },
        });
      });
    }
  });
  return promise;
}
