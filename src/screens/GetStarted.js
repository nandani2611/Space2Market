import { 
    View,
    Text,
    Button,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    Animated, 
    Dimensions,
    Image,
    ImageBackground


} from 'react-native'
import React, { PureComponent } from 'react';
import * as Animatable from 'react-native-animatable';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {LinearGradient} from 'expo-linear-gradient';

const GetStarted = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
          source={{uri:'https://images.pexels.com/photos/5847766/pexels-photo-5847766.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'}}
          style={styles.image}   >
          <Animatable.View 
            animation='fadeIn' 
            style={styles.textView}>
            <Text style={styles.text}>Welcome to Space2Market <FontAwesome name='rocket' size={25}/> 
 </Text>
          </Animatable.View>
          <Animatable.View 
            style={styles.btnView}
            animation='zoomIn' >
            <TouchableOpacity onPress = { () => navigation.navigate('login') }>
              <LinearGradient 
                colors={['#dbd5d3', '#736f6d']} 
                style={styles.btnTextView} >
                <Text style={{color: "#3b3837", fontSize: 24, backgroundColor: 'transparent', fontWeight: 'bold'}}>Get Started</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Animatable.View>

        </ImageBackground>
  

  </SafeAreaView>
  )
    
}

export default GetStarted;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
    },
    image: {
      width: '100%',
      height: '100%',
    },
    textView:{
      position: 'absolute',
      marginTop: 70,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 30
    }, 

    text: {
      fontWeight: 'bold',
      fontSize: 35,
      color: '#585959'
    },

    btnView: {
      position: 'absolute',
      marginTop: 750,
      paddingHorizontal: 120
    },
    btnTextView: {
        width: 170,
        borderRadius: 100/2,
        height: 60,
        opacity: 0.9,
        alignItems: "center",
        justifyContent: "center",
      },
    





})