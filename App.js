import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import Amplify from "aws-amplify";
import config from "./src/aws-exports";
import RootNavigator from "./src/navigation/RootNavigator";
import BottomNavigator from "./src/navigation/BottomNavigator";
import "expo-dev-client";
import * as Sentry from "sentry-expo";

Amplify.configure(config);

Sentry.init({
  dsn: "https://3a00e31ea4584034840258745a5aaf84@o1402859.ingest.sentry.io/6735357",
  enableInExpoDevelopment: true,
  debug: true, // If `true`, Sentry will try to print out useful debugging information if something goes wrong with sending the event. Set it to `false` in production
});

//export default function App() {
const IndexPage = () => {
  return (
    <>
      <RootNavigator />
    </>
  );
};

export default IndexPage;
