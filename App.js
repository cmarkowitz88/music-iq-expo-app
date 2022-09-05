import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import Amplify from 'aws-amplify';
import config from "./src/aws-exports";
import RootNavigator from "./src/navigation/RootNavigator";
import 'expo-dev-client'  

Amplify.configure(config);

//export default function App() {
const IndexPage = () => {
  return <RootNavigator />;
};

export default IndexPage;
