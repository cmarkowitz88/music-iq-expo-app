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

//export  const getLocalStorage = (key) => {
//console.log("In get LocalStorage");
//tmp = await getValueFor(key);
//return tmp;

// export function getValueFor(key) {
    
//     try {
//         result = await SecureStore.getItemAsync(key);
//         if (result) {
//             console.log("🔐 Here's your value 🔐 \n" + result);
//             resolve(result);
//         } else {
//             console.log("No values stored under that key.");
//             resolve("Not found");
//     }
//     } catch {
//         e;
//         console.log(e);
//         reject("Error getting key");
//   } finally {
//     console.log("Done reading local storage value.");
//   }

// }

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
          }
        });
      });
    }
  });
  return promise;
}
