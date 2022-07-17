import React from "react";
import {ImageBackground, StyleSheet,SafeAreaView, View, Button, Text, Image} from "react-native";
import CustomButton from "../../button";

function WelcomeScreen({route, navigation}){
    
       // const {from} = route.params;

    return(
        <SafeAreaView style={styles.container}>
        <View style={styles.container}>
        <ImageBackground style={styles.background}
           source={require('../../assets/iStock-488101821.jpg')}>
                <Image style={styles.image} source={require('../../assets/MusicIQ-Logo_2.jpg')} />
                <CustomButton  text="Play Game" onPress={() => navigation.navigate('Game')}/>
                <CustomButton  text="Log In" onPress={() => navigation.navigate('LogIn')}/>
                <CustomButton  text="Password Reset Page 2" onPress={() => navigation.navigate('ForgotPassword2')}/>
        </ImageBackground>
       <Text></Text>
        </View>
        </SafeAreaView>

        
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:"black",
        flexDirection: 'column',
        backgroundColor: 'black',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    background: {
        flex: 1,
        width:null,
        height:null,
        resizeMode: "contain",
       
    },
    button:{
        color:"white", 
    },
    text:{
        color:"white",
    },
    image: {
        resizeMode: 'contain',
        width: 370,
        height: 90,
      },

})

export default WelcomeScreen;