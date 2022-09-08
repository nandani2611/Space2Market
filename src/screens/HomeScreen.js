  
import {View,Text,Button,StyleSheet,TouchableOpacity} from "react-native";
import { useNavigation } from '@react-navigation/core';

import React, {useState, useEffect} from'react';
import { firebase } from '../../firebase';

// import HomeScreen1 from "./dashboardScreens/HomeScreen1";
// import ListingScreen from "./dashboardScreens/ListingScreen";
// import JourneyScreen from "./dashboardScreens/JourneyScreen";
// import TransactionScreen from "./dashboardScreens/TransactionScreen";

import { createDrawerNavigator } from "@react-navigation/drawer";
import {NavigationContainer} from "@react-navigation/native";

const Drawer = createDrawerNavigator();


const HomeScreen = () => {
  const navigation = useNavigation()
  const [fname, setFname] = useState('')
  

  useEffect(() => {
      firebase.firestore().collection('users')
      .doc(firebase.auth().currentUser.uid).get()
      .then((snapshot) => {
        if(snapshot.exists){
          setFname(snapshot.data())
        }
        else {
          console.log('User does not exist')
        }
      })
  }, [])

  return(
    <View style={styles.container}>
      <Text>Dashboard</Text>
      <Text style={styles.text}>
        Hello
        {/* , {fname.name}  */}
      </Text>
      <TouchableOpacity
        onPress={ () => {firebase.auth().signOut()}}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
   
  )


  // return (
  //   <NavigationContainer>
  //     <Drawer.Navigator initialRouteName="home1">
  //       <Drawer.Screen name='home1' component={HomeScreen1}/>
  //       <Drawer.Screen name='listing' component={ListingScreen}/>
  //       <Drawer.Screen name='journey' component={JourneyScreen}/>
  //       <Drawer.Screen name='transaction' component={TransactionScreen}/>

  //     </Drawer.Navigator>

  //   </NavigationContainer>

  // )
}
export default HomeScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
     button: {
      backgroundColor: '#155694',
      width: '60%',
      padding: 15,
      borderRadius: 10,
      alignItems: 'center',
      marginTop: 40,
    },
    buttonText: {
      color: 'white',
      fontWeight: '700',
      fontSize: 16,
    },
    text: {
      fontSize: 25
    }
  })



