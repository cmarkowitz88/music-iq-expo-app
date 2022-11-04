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
  ScrollView,
  Divider,
} from "react-native";
import CustomButton from "../../button";

const separator = () => (
  <View
      style={{
        backgroundColor: 'white',
        height: 0.5,
      }}
    />
);

const RoundReview = ({ route, navigation }) => {
  const { data } = route.params;
  const header_wording = "Round Review";
  const header_answer = "Your Answer: ";
  const header_time = "Your Time: ";
  const time_increment_1 = " second";
  const time_increment_2 = " seconds"

  

  const Item = ({ num, question, answer_status, answer, time_to_answer }) => (
    <View style={styles.listItem}>
      <Text style={styles.question_text}>
        {num}. {question}
      </Text>
      <Text style={styles.text}>
        {header_answer}
        {answer} - {answer_status}
      </Text>
      <Text style={styles.last_item_text}>
        {header_time}
        {time_to_answer}
        {time_to_answer ==1 ? time_increment_1 : time_increment_2}
      </Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <Item
      num={item.id}
      question={item.question}
      answer_status={item.answer_status}
      answer={item.answer}
      time_to_answer={item.time_to_answer}
    />
  );

  console.log(data);
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 1, width: '100%' }}>
        <Text style={styles.header_text}>{header_wording}</Text>
        <View style={{ flex: 1, width: '100%' }}>
          {data && (
            <FlatList
              data={data}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              scrollEnabled = "true"
              ItemSeparatorComponent={separator}
            />
          )}
        </View>

        <CustomButton text="Back" onPress={() => navigation.navigate("Tabs")} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    flexDirection: "column",
    color: "white",
    fontSize: 15,
    flex: 1,
    height:"100%"
  },
  listItem: {
    borderWidth: 1,
    backgroundColor: "black",
    padding: 10,
  },

  header_text: {
    fontSize: 28,
    color: "white",
    paddingBottom: 25,
    fontWeight: "bold",
    textAlign: "center",
  },

  button: {
    color: "white",
  },
  question_text: {
    color: "white",
    fontSize: 18,
    textAlign: "left",
    fontWeight: "bold",
    paddingBottom: 5,
  },
  text: {
    color: "white",
    fontSize: 18,
    textAlign: "left",
  },
  last_item_text: {
    color: "white",
    fontSize: 18,
    textAlign: "left",
    paddingBottom: 10,
  },
});

export default RoundReview;
