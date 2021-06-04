
import React, { useEffect, useState } from 'react'

import { StyleSheet, Text, View,Dimensions,Image,FlatList,ActivityIndicator,ScrollView,Item,
    ImageBackground,TextInput,TouchableOpacity,CheckBox} from 'react-native';
import{Avatar,ListItem, Header, Icon} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios' ;
const {width: WIDTH}= Dimensions.get('window')

const img = require('../images/000.jpg')
const image = require('../images/CRYPTO_Logo.png')




const profil = ({navigation}) => {

    const [id, setId] = useState('');
    const [solde, setSolde] = useState('');

    const logOutUser = ()=>{
        AsyncStorage.clear().then(()=>{
          navigation.navigate('SignIn');
        })
        console.log('clicked');
    }
  


    
  async function getId() {
     

    const i = await AsyncStorage.getItem('id');

    console.log(i);
    console.log('&&&&&&&&&&&');

    setId(i);

  }

  function getsolde(){
      

    axios.get(`http://192.168.1.102:3000/user/usermail/${id}`)
      .then((resp) => {
        //   console.log(resp.data.solde);
         setSolde(resp.data.solde.toFixed(2));
        
      })
      .catch((error) => console.error(error))
   

  }
    
  
      useEffect(() => {
        getId();
        getsolde();
        
         
        
      }, []);




    return ( 
        <ImageBackground  source={img} style={styles.backgroundcontainer} >
        <View style={{ flex: 1,}}> 
        <Header
                leftComponent={<TouchableOpacity onPress={() => navigation.navigate('Home')}><Icon
                name='chevron-left' color='#fff'/></TouchableOpacity>}
                centerComponent={{ text: 'Profil', style: { color: '#fff' } }}
                rightComponent={ <TouchableOpacity onPress={logOutUser}><Icon
                name='logout' color='#fff'/></TouchableOpacity>}
                backgroundColor='#2E4561'
                />
     
      
       <View  style={{backgroundColor:'#283C54',padding:21,height:790}} >
       
     
       
       <View style={{alignItems: 'center'}}> 
            
              
             
               <Text style={{fontSize:30,fontWeight:'500',color:'white',marginTop:10}}>Wallet</Text>
               <Text style={{fontSize:30,fontWeight:'500',color:'white',marginTop:10}}> $ {solde} </Text>
             
              
               </View>
           </View>  
          
      
   
   
         
         
       
     
               
        
   
        
     
        
       </View>
       
       </ImageBackground>
     );
}
 
export default profil;

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
      text:{
      
      color:'rgba(255,255,255, 0.7)',
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