import React from "react";
import {
  ImageBackground,
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  Button,
  Text,
  Image,
} from "react-native";
import CustomButton from "../../button";

const RoundReview = ({ route, navigation }) => {
  const { data } = route.params;
  const Item = ({ answer_status }) => (
    <View>
      <Text style={styles.text}>{answer_status}</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item answer_status={item.answer_status} />
  );

  console.log(data);
  console.log("h");

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.text}>Round Review</Text>
        {data && (
          <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        )}

        <CustomButton text="Back" onPress={() => navigation.navigate("Game")} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    flexDirection: "column",
    color: "white",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "flex-start",
  },

  button: {
    color: "white",
  },
  text: {
    color: "white",
  },

  answer_status: {
    color: "white",
  },
});

export default RoundReview;
