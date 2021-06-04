
import React, { useEffect, useState } from 'react';

import { StyleSheet, Text, View,Dimensions,Image, ImageBackground,TextInput,TouchableOpacity,CheckBox} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
import firebase from '../firebase/firebase'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios' ;

const {width: WIDTH}= Dimensions.get('window')

const img = require('../images/000.jpg')
const image = require('../images/CRYPTO_Logo.png')





export function SignUp({navigation}) {


 

  const [lastname, setLastname] = useState('');
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [error, setError] = useState('');
 
  const signup = async () => {
    try {
      
        const response = await firebase.auth().createUserWithEmailAndPassword(email, password);

        // const res = await axios.post(`http://192.168.8.98:3000/user/add`, {email:email });
        // console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
        // console.log(res.data.solde);
        // console.log('&&&&&&&&&&&&&&&&&&&&&****&amine***&&&&&&&&&&&&&');

        
    } catch (err) {
       console.log(err.message);
    }
    navigation.navigate('SignIn');
    const db = firebase.firestore();

  if (db) {
    db.collection('Users').add({
       Lastname:lastname,
       Firstname:firstname,
       Email:email,
       Password:password



       
    })
  



}


}

// const saveUser = async () => {

//   try {
   
//     console.log('cliked');
   
//       const res = await axios.post(`http://localhost:3000/user/add`, {email:email });
//       navigation.navigate('SignIn');
            
//              console.log(res.data);
         


//   } catch(e) {
//    console.log(e);
//   }
// }

// useEffect(() => {
 
//   saveUser();
// },[]);

  

  return( 
    <ImageBackground  source={img} style={styles.backgroundcontainer} >
      
  
    <View  style={styles.logoContainer}>
    <View >
    <Image source={image} style={{  height: 60,width: 'auto',}}/>
           
            <View style={{ width: 220,height: 90, alignItems:'center'}}>
            
              
              
            </View>
        </View>  
    
   
    <TextInput
        style={styles.input}
        placeholder={'Prenom'}
        placeholderTextColor={'#b3b3b3'}
        underlineColorAndroid='transparent'
        onChangeText={setFirstname}
        value={firstname}
        />
         <TextInput
        style={styles.input}
        placeholder={'Nom'}
        placeholderTextColor={'#b3b3b3'}
        underlineColorAndroid='transparent'
        onChangeText={setLastname}
        value={lastname}
        />

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

       

     
   
     
          
      
        
        

{/* {
            error ?
                <Text style={{ color: 'red' }}>{error}</Text>
                : null
        } */}

        <TouchableOpacity style={styles.btnLogin}>
         <Text style={styles.text} onPress={() =>  signup()}> Register </Text>
     </TouchableOpacity>
     <TouchableOpacity style={styles.btnLogin2}>
         <Text style={styles.text} onPress={() => navigation.navigate('SignIn')}> Login </Text>
     </TouchableOpacity>

     
     

     
   
    </View>
    
    </ImageBackground>

  );
}


export default SignUp ;



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

