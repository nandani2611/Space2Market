import {
    View,
    Text,
    Button,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    Image
  
  } from "react-native";
  import { firebase } from "../../firebase";

  import React, { useState } from 'react';
  import FontAwesome from 'react-native-vector-icons/FontAwesome';
  
  const updateError=(error,stateUpdater)=>{
    stateUpdater(error);
    setTimeout(() => {
      stateUpdater('')
    },2500);
  }
  
  const isValidEmail = (value) => {
    const regx =  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    return regx.test(value)
  }
  
const ForgetPassword = ({navigation}) => {
    const [error, setError] = useState("")
    const[email,setEmail] = useState("")

    forgotpassword = async(email) => {
      try {
        await firebase.auth().sendPasswordResetEmail(email)
        alert("please cheack your email")
      } catch(error){
        alert(error.message)
      }
    }
    
    const isValidForm = () => {
      
      if(!isValidEmail(email)) 
        return updateError("Invalid email!",setError)
  
      return true;
    }

  
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.screenview}>
          
          <Image
              style={styles.image}
              source={{ uri: "https://www.space2market.net/public/front/images/logos/PNG%20-%20S2m%20Logo%20(white%20b.g.).png" }} 
          />
          <View>
            <Text style={{fontSize: 25, fontWeight: "400", marginBottom: 5}}>Forgot Password?
              <FontAwesome name='lock' size={20}/> 
            </Text>
            <Text style={{fontSize: 15, fontWeight:"300", marginBottom: 5}}>Enter your registered email and we'll send you instruction to reset your password </Text>
  
          </View>
          { error ? (<Text style={{color:'red',fontSize:18,textAlign:'center'}} > {error} </Text> ): null }
  
          <Text style={styles.text}>EMAIL</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="Enter your email"
              placeholderTextColor="#6e706f"
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={(email) => setEmail(email)}
              
            />
          </View>
          
          
          <TouchableOpacity 
              style={styles.loginBtn}
              onPress = { () => forgotpassword(email) }  
              >
              <Text style={{color: "#FFF", fontSize: 16}}>Send Reset Link</Text>
          </TouchableOpacity>
  
          <TouchableOpacity style={styles.back} onPress={() => navigation.goBack()} >
              <Text style={{color: "blue", fontSize: 15}}><FontAwesome name='angle-left' size={17}/>  Back to login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
  
    );
  }
  
  const styles = StyleSheet.create({
      container: {
          flex: 1,
          backgroundColor: "#fff",
          alignItems: "center",
          justifyContent: "center",
      },
      screenview: { 
          flex: 1,
          marginHorizontal: 80,
          marginBottom: 10,
          justifyContent: "center",
      },
  
      text: {
          marginBottom: 5,
      },
      image: {
          width: 200,
          height: 150,
          resizeMode: 'contain',
          alignSelf: 'center',
      },
  
      inputView: {
          backgroundColor: "#FFF",
          borderColor: "blue",
          borderWidth: 1,
          borderRadius: 5,
          width: 350,
          height: 40,
          marginBottom: 8,
        },
        loginBtn: {
          width: 350,
          borderRadius: 8,
          height: 40,
          alignItems: "center",
          justifyContent: "center",
          // marginTop: 20,
          color: "#FFF",
          backgroundColor: "blue",
          borderColor: "black"
        },
        back: {
          width: 350,
          borderRadius: 8,
          height: 40,
          alignItems: "center",
          justifyContent: "center",
          marginTop: 10,
          color: "blue",
          backgroundColor: "white",
          borderColor: "black"
        },
        TextInput: {
          height: 50,
          flex: 1,
          padding: 10,
          alignContent: "flex-start"
        },
  });
  
  export default ForgetPassword;
  
  