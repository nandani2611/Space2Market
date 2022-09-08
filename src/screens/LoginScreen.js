import { useNavigation } from '@react-navigation/core'

import React, { useState , useEffect} from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
   
} from "react-native";
import { firebase } from "../../firebase";

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CheckBox from 'expo-checkbox';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const isValidObjField = (obj) => {
  return Object.values(obj).every(value => value.trim())
}

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

const isValidPassword = (value) => {
  const regx = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/ ;
  return regx.test(value)
}

const LoginScreen = () => {
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("")
  
  const navigation = useNavigation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  loginuser = async(email, password) => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email,password)
      console.log('logged in with:',email);

    } catch(error){
      alert(error.message)
    }
  }


  const submitforgot = () => {
    navigation.navigate("forgot");
  }; 
  const signin = () => {
    navigation.navigate("register");
  };


  const isValidForm = () => {
    // we will accept only if all of the fields have value
    if(!isValidObjField(userInfo)) 
      return updateError("Required all fields!", setError)

    // only valid email id is allowed
    if(!isValidEmail(email)) 
      return updateError("Invalid email!",setError)

    // password must have8or more characters
    if(!isValidPassword(password)) 
      return updateError("Password atleast 8 character long, one uppercase letter, one lowercase letter ad contains digits  ",setError)

    return true;
    // if(!password.trim()|| password.length<8) return updateError('Password is less then 8 characters!',setError)
  }

  return (
    <KeyboardAwareScrollView
      style={{flex:1}}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.screenview}>
        
        <Image
          style={styles.image}
          source={{
            uri: "https://www.space2market.net/public/front/images/logos/PNG%20-%20S2m%20Logo%20(white%20b.g.).png"
          }} 
        />
        
        <View>
          <Text style={{fontSize: 23, fontWeight: "bold", }}>Welcome to Space2market 
            
            <FontAwesome name='hand-stop-o' size={20}/> 
          </Text>
          <Text style={{fontSize: 15, fontWeight:"300"}}>Please sign-in to your account and start the adventure </Text>
        </View>

        <View style={styles.google}>
          <TouchableOpacity style={styles.signInGoogle}>
            <Text style={{color: "#912626", fontSize:16}}>
              <FontAwesome name='google' size={17}/> Sign-in with Google  
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.or}> -or-</Text>
        { error ? (<Text style={{color:'red',fontSize:15,textAlign:'center'}}>{error}</Text> ) : null }

        <Text style={styles.text}>EMAIL OR USERNAME</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter your email or username"
            placeholderTextColor="#6e706f"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(email) => setEmail(email)}
          />
        </View>
        
        <View style={styles.pass}>
          <Text style={styles.text}>PASSWORD</Text>
          <TouchableOpacity onPress={() => submitforgot()} >
            <Text style={styles.forgot_button}>Forgot Password?</Text>
          </TouchableOpacity>          
        </View>

        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="password"
            placeholderTextColor="#6e706f"
            autoCapitalize="none"
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
          

        <View style={styles.wrapper}>
          <CheckBox
            value={agree}
            onValueChange={() => setAgree(!agree)}
            onPress = {() => setAgree(!agree)}
            color={agree?"blue":undefined}
          />  
          <Text style={styles.text}>Remember me</Text>
        </View>
        
        <TouchableOpacity 
            style={styles.loginBtn}
            onPress= { () => loginuser(email, password)}
        >  
          <Text style={{color: "#FFF"}}>Login</Text>
        </TouchableOpacity>
          
        <View style={styles.account}>
          <Text style={styles.text}>New on our platform? </Text>

          <TouchableOpacity onPress = { () => signin() }>
            <Text style={styles.forgot_button}>Create an account</Text>
          </TouchableOpacity> 

        </View>

        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}
export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  screenview: {
    flex: 1,
    marginTop: 37,
    marginBottom:150,
    marginHorizontal: 70, 
    alignContent: "center",
    justifyContent: "center",
  },

  checkboxWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingVertical: 5,
  },
  spacing: {
    marginTop: 1
  },

  signInGoogle: {
    width: 180,
    borderRadius: 8,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    color: "#6b8df2",
    backgroundColor: "#FFF",
    borderColor: "#6b8df2",
    borderWidth: 1,

  },

  google: {
    alignItems: "center",
    justifyContent: "center", 
    

  },

  or: {
    marginTop: 10,
    fontSize: 14,
    marginBottom: 5,
    paddingLeft: 160,
    justifyContent:"center", 
    alignContent: "center"
  },
  
  image: {
    width: 200,
    height: 110,
    marginTop: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
 
  inputView: {
    backgroundColor: "#FFF",
    borderColor: "#6b8df2",
    borderWidth: 1,
    borderRadius: 8,
    width: 350,
    height: 40,
    marginBottom: 10,
  },
 
  TextInput: {
    height: 50,
    flex: 1,
    padding: 10,
    alignContent: "flex-start"
  },
 
  forgot_button: {
    height: 16,
    marginRight: 4,
    color: "blue",
    fontStyle: "italic"   
  },
 
  loginBtn: {
    width: 350,
    borderRadius: 8,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8,
    color: "#FFF",
    backgroundColor: "blue",
    borderColor: "black"
  },

  text: {
    marginBottom: 5,
    marginLeft: 2
  },

  pass: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",

  },

 wrapper: {
  flexDirection: "row",
  flexWrap: "wrap",
  alignItems: "center"
 },

 button: {
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 12,
  paddingHorizontal: 32,
  borderRadius: 4,
  backgroundColor: 'white',
},

account: {
  marginTop: 10,
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  marginBottom: 70
},
});
