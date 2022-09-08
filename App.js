import React, { useState, useEffect } from "react";

import LoginScreen from"./src/screens/LoginScreen";
import ForgetPassword from "./src/screens/ForgetPassword";                                                           
import RegisterScreen from "./src/screens/RegisterScreen";
import HomeScreen from "./src/screens/HomeScreen";
import GetStarted from "./src/screens/GetStarted";

import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import { firebase } from './firebase';

const Stack = createNativeStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user){
    setUser(user);
    if(initializing)
      setInitializing(false);
  }
  useEffect(() => {
    const subscribe = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscribe;
  }, []);
  
  if (initializing) return null;

  if (!user){
    return (
      <Stack.Navigator 
        screenOptions={{headerShown:false}} >
        <Stack.Screen name="getstarted" component={GetStarted} />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="forgot" component={ForgetPassword} />
        <Stack.Screen name="register" component={RegisterScreen} />
        {/* <Stack.Screen name="home" component={HomeScreen} /> */}
      </Stack.Navigator>  
    );
  }
  
  return(
    <Stack.Navigator screenOptions={{headerShown:false}} >
        <Stack.Screen name="home" component={HomeScreen} />
      </Stack.Navigator>
  );
};

export default () => {
  return(
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
} 