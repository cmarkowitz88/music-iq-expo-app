import React from 'react';
import { Text,  StyleSheet} from 'react-native';

export default function LevelText(props) {
    
  return (
      <Text style={styles.levelText}>Level: {props.text}</Text>
  );
}

const styles = StyleSheet.create({
    levelText:{
        color:'purple',
        fontSize:14,
        marginLeft:1,
        paddingBottom:2,
        textAlign:'left',
        flexDirection:'row',
        fontWeight:'bold',
        }
});