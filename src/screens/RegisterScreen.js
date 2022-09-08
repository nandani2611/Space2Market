import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TextInput,
    TouchableOpacity,
    Image,
  
} from "react-native";

import {firebase} from "../../firebase";
import { useNavigation } from '@react-navigation/core'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import React, { useEffect, useState } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CheckBox from 'expo-checkbox';


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
  
const RegisterScreen = () => {
  const navigation = useNavigation()
  
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("")
  
  const [name, setName] = useState('')
  const [uname, setUname] = useState('')
  const [number, setNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


   
  const isValidForm = () => {
    // we will accept only if all of the fields have value
    if(!isValidObjField(userInfo)) 
      return updateError("Required all fields!", setError)

    // if valid name with 3 or more characters
    if(!name.trim() || name.length < 3) 
      return updateError("Invalid name!", setError)

    if(!uname.trim() || uname.length < 3) 
      return updateError("Invalid username!", setError)

    if(!number.trim() || number.length < 10) 
      return updateError("Invalid number!", setError)

    // only valid email id is allowed
    if(!isValidEmail(email)) 
      return updateError("Invalid email!",setError)

    // password must have8or more characters
    if(!isValidPassword(password)) 
      return updateError("Password atleast 8 character long, one uppercase letter, one lowercase letter ad contains digits  ",setError)

    return true;
  }

  const privacyPolicy = () => {
    console.log("privacyPolicy")
  }

  // useEffect(() => {
  //   const subscribe = auth.onAuthStateChanged(user => {
  //     if(isValidForm()){
  //       if (user) {
  //         navigation.navigate('home')
  //       }
  //     }
  //   })

  //   return subscribe
  // }, []) 

  registeruser = async (email, password, name, uname, number) => {
    await firebase.auth().createUserWithEmailAndPassword(email,password)
      .then(() => {
        firebase.auth().currentUser.sendEmailVerification({
          handleCodeInApp: true,
          url : "https://space2market-3b6b0.firebaseapp.com",
        })
        .then(() => {
          alert("Verification email sent")
          console.log('Registered with:',email);
          }) .catch((error) => {
            alert(error.message)
          })
          .then(() => {
            firebase.firestore().collection('users')
            .doc(firebase.auth().currentUser.uid)
            .set({
              name,
              uname,
              number,
              email,

            })
          })
            .catch((error) => {
              alert(error.message)
            })
      }) //1st then
        .catch((error =>{ 
          alert(error.message)
        }))
    }  
    
    return (
    <KeyboardAwareScrollView
      style={{flex:1}}
    >

    <SafeAreaView style={styles.container}>
      <View style={styles.screenview}>
        
        <Image
            style={styles.image}
            source={{ uri: "https://www.space2market.net/public/front/images/logos/PNG%20-%20S2m%20Logo%20(white%20b.g.).png" }} 
        />
        <View>
          <Text style={{fontSize: 25, fontWeight: "400", marginBottom: 5}}>Adventure starts here<Text> </Text>
            <FontAwesome name='rocket' size={20}/> 
          </Text>
          <Text style={{fontSize: 15, fontWeight:"300", marginBottom: 5}}>Make your listing management easy and fun! </Text>
        </View>
        
        { error ? (<Text style={{color:'red',fontSize:15,textAlign:'center'}} > {error} </Text> ): null }

        <Text style={styles.text}>FULL NAME</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter your name"
            placeholderTextColor="#6e706f"
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(name) => setName(name)}
          />
        </View>

        <Text style={styles.text}>USER NAME</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.TextInput}
            placeholder="Enter your username"
            placeholderTextColor="#6e706f"
            autoCapitalize="none"
            autoCorrect={true}
            onChangeText={(uname) => setUname(uname)}
          />
        </View>

        <Text style={styles.text}>PHONE NO.</Text>
        <View style={styles.inputView}>
          <TextInput 
            style={styles.TextInput}
            placeholder="Enter your phone no."
            placeholderTextColor="#6e706f"
            keyboardType='numeric'
            maxLength={10}
            onChangeText={(number) => setNumber(number)}
          />
        </View>

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


          <Text style={styles.text}>PASSWORD</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.TextInput}
              placeholder="********"
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
              // style={{ height: 18, width: 18 }}
            />  
            <View style={styles.account}>
              <Text> I agree to</Text>
              <Text style={{color: "blue"}} onPress={privacyPolicy}> privacy policy and terms </Text>

            </View>
          </View>
          

          <TouchableOpacity 
            style={[styles.loginBtn,
              { backgroundColor: agree? "blue" : "#8a9bba", }
            ]}
            onPress = { () => registeruser(email, password, name, uname, number) }
          >
            <Text style={{color: "#FFF"}}>Sign up</Text>
          </TouchableOpacity>
            
          <View style={styles.account}>
            <Text>Already have an account?</Text>
            <Text style={{color: "blue"}} onPress = { () => navigation.replace("login") }> Sign in instead</Text>
          </View>
      </View>
    </SafeAreaView>
    </KeyboardAwareScrollView>
  )  
}         

export default RegisterScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    account: {
      marginTop: 10,
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
      
    },
  
    screenview: {
        flex: 1,
        marginHorizontal: 80,
        marginTop: 37,     
        marginBottom:126,
        justifyContent: "center",
    },
  
    text: {
        marginBottom: 1,
        marginTop: 3,
        marginHorizontal: 2
    },
    image: {
      marginTop: 50,
      width: 200,
      height: 150,
      resizeMode: 'contain',
      alignSelf: 'center',
    },
  
    inputView: {
        backgroundColor: "#FFF",
        borderColor: "#6b8df2",
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
      wrapper: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
       },
      forgot_button: {
        height: 30,
        color: "blue",
        alignItems: "center",
        
        // fontStyle: "italic" ,
        paddingVertical: 2,
        // fontSize: 14  
      },
      
  
    }
  );
  
  
  