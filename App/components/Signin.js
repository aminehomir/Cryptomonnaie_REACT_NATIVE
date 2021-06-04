import React, { useState } from 'react'

import { StyleSheet, Text, View,Dimensions,Image, ImageBackground,TextInput,TouchableOpacity,CheckBox} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
import firebase from '../firebase/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Google from 'expo-google-app-auth';
import * as GoogleSignIn from 'expo-google-sign-in';
import axios from 'axios' ;
// import * as GoogleSignIn from 'expo-google-sign-in';
const {width: WIDTH}= Dimensions.get('window')

const img = require('../images/000.jpg')
const image = require('../images/CRYPTO_Logo.png')




export function SignIn({navigation}) {

 
 

 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [solde, setSolde] = useState(0);

  

  const signIn = async () => {
    try {
        const response = await firebase.auth().signInWithEmailAndPassword(email, password);
        await AsyncStorage.setItem('TOKEN', response.user.refreshToken);
        await AsyncStorage.setItem('email', email);

        const res = await axios.post(`http://192.168.1.102:3000/user/add`, {email:email });



        // console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
        const id = res.data.id;
            await AsyncStorage.setItem('id', id.toString());

        // setSolde(res.data.solde);
        // console.log(solde && solde);
       
        // console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
       
       
        // console.log('&&&&&&&&&&&&&&&&&&&&&****&amine***&&&&&&&&&&&&&');
        
        
        
       
        navigation.navigate('Home');
    } catch (err) {
       console.log(err.message);
    }

}
    


 
  
      async function signInWithGoogleAsync() {

              Google.logInAsync({
              
                androidClientId: `626154533290-5ajv4hh3ng5qlov7to1vo6ct4ikj019c.apps.googleusercontent.com`,
               
               
                scopes: ['profile', 'email']
                
              }) .then(async(result) => {
                const { type} = result;
        
              if (type === "success") {
                await AsyncStorage.setItem('email', email);
                navigation.navigate("Home");
              
              }
              else {
             
                console.log('Google Signin was cancelled');
              
                }
          
      
          });        
       
      }

  return (
    <ImageBackground  source={img} style={styles.backgroundcontainer} >
      
  
    <View  style={styles.logoContainer}>
    <View >
    <Image source={image} style={{  height: 60,width: 'auto',}}/>
           
            <View style={{ width: 220,height: 90, alignItems:'center'}}>
            
              
              
            </View>
        </View>  
    
   

    <TextInput
        style={styles.input}
        placeholder={'Email'}
        placeholderTextColor={'#b3b3b3'}
        underlineColorAndroid='transparent'
        onChangeText={setEmail}
        value={email}
        /> 

        <TextInput
        style={styles.input}
        placeholder={'Password'}
        placeholderTextColor={'#b3b3b3'}
        underlineColorAndroid='transparent'
        onChangeText={setPassword}
        value={password}
        secureTextEntry
        />  


        <TouchableOpacity style={styles.btnLogin}>
         <Text style={styles.text} onPress={() =>signIn()}> Login </Text>
        
     </TouchableOpacity>
      
     <TouchableOpacity style={styles.btnLogin2}>
     <Text style={styles.text} onPress={() => signInWithGoogleAsync()}> Login with google</Text>

     </TouchableOpacity>
     
     <View style={{flexDirection:'row',marginTop:20,width:240}}> 
     <Text style={{color:'white',fontSize:15}}>Don't have an acount? </Text>
     <Text style={{color:'#58c9de',fontSize:16}}onPress={() => navigation.navigate('SignUp')}> Sign Up </Text>
     </View>

     

   

     
     

     
   
    </View>
    
    </ImageBackground>

  );
}


export default SignIn ;



const styles = StyleSheet.create({

  backgroundcontainer:{
    width: 500,
    height:'auto',
  },

 logoContainer: {
    
   alignItems: 'center',
     width: 500,
     height:'auto',
     padding:'50%',
    //  backgroundColor:'#283c53'
    
},


 logoText:{
  color: '#ffffff',
  fontSize:25,
  fontWeight:'500',
 marginBottom: 40,
   
    },
    input:{
        width: WIDTH - 50,
        height: 60,
        marginTop: 20,
        borderWidth: 1,
        borderColor: "#2c4a60",
        borderRadius: 5,
        fontSize:16,
        paddingLeft: 25,
        backgroundColor:'#233345',
        color:'#FFFFFF',
     
        
        },

       

    

btnLogin:{

  width: WIDTH - 50,
    height: 55,
    borderRadius: 2,
    backgroundColor:'#58c9de',
    justifyContent: 'center',
    marginTop: 30,
    shadowColor: "#471f51",
    shadowOffset: {
      width: 0,
      height: 5,
      color:'white'
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
    
    
    },
    btnLogin2:{

      width: WIDTH - 50,
        height: 55,
        borderRadius: 2,
        borderWidth: 2,
        borderColor: "#58c9de",
        justifyContent: 'center',
        marginTop: 30,
        shadowColor: "#471f51",
        shadowOffset: {
          width: 0,
          height: 5,
          color:'white'
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,
    
        elevation: 11,
        
        
        },
    text:{
    
    color:'white',
    fontSize: 16,
    textAlign: 'center'
    },

    sign: {
    color:'rgba(255,255,255, 0.7)',
    fontSize: 16,
   
    marginTop: 30
    },

    backgroundcontainer:{
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
     
     
    },

    Radiotext: {
        fontSize: 8,
        color:'#b3b3b3'
    },
    check:{
       borderColor: "#d9d9d9",
        marginTop: 28,
        marginBottom: -12,
        alignItems: 'center',
        flexDirection: 'row',
        width: WIDTH - 50,
        backgroundColor:'#ffffff',
        borderRadius: 25,
        height: 55,
        padding: 5,
        borderWidth: 1


    },
    checkbox:{
     
      padding:10
     }
    


});

