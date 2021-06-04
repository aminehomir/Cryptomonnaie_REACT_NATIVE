import React, { useEffect, useState } from 'react'

import { StyleSheet, Text, View,Dimensions,Image,FlatList,ActivityIndicator,ScrollView,Item,
    ImageBackground,TextInput,TouchableOpacity,CheckBox} from 'react-native';
import{Avatar,ListItem, Header, Icon} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import LinearGradient from 'react-native-linear-gradient';
// import firebase from '../firebase/firebase'
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import * as Google from 'expo-google-app-auth';
// import * as GoogleSignIn from 'expo-google-sign-in';
// import * as GoogleSignIn from 'expo-google-sign-in';
import axios from 'axios' ;
const {width: WIDTH}= Dimensions.get('window')

const img = require('../images/000.jpg')
const image = require('../images/CRYPTO_Logo.png')




export function Home({navigation}) {

    const [isLoading, setLoading] = useState(true);
    // const [id, setId] = useState(0);
    // const [solde, setSolde] = useState(0);
    const [data, setData] = useState([]);

   

  //   async function getId() {

  //   const i = await AsyncStorage.getItem('id');

  //   console.log(i);
  //   console.log('&&&&&&&&&&&');

  //   setId(i);

  // }

  // async function getsolde(){
      

  //   axios.get(`http://192.168.8.98:3000/user/usermail/${id}`)
  //     .then((response) => {
  //         console.log(response.data.solde);
  //        setSolde(response.data.solde);
        
  //     })
  //     .catch((error) => console.error(error))
   

  // }





    const getdatacoin = () =>{
      axios.get('https://api.coincap.io/v2/assets?limit=10')
      .then((response) => {
          // console.log(response.data.data);
         setData(response.data.data);
        
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
    }

    useEffect(() => {
      getdatacoin();
      // getId();
      // getsolde();
        
    }, []);
     
    const logOutUser = ()=>{
      AsyncStorage.clear().then(()=>{
        navigation.navigate('SignIn');
      })
      console.log('clicked');
  }

  
  return (
    <ImageBackground  source={img} style={styles.backgroundcontainer} >
     <View style={{ flex: 1,}}> 
     <Header
    leftComponent={  <TouchableOpacity onPress={()=>navigation.navigate('Profil')}><Icon
    name='person'  color='#fff'/></TouchableOpacity>}
    centerComponent={{ text: 'home', style: { color: '#fff' } }}
    rightComponent={<TouchableOpacity onPress={logOutUser}><Icon
    name='logout' color='#fff'/></TouchableOpacity>}
    backgroundColor='#2E4561'
    />
  
   
    <View >
    
  
    <View style={{ flex: 1, padding: 4,backgroundColor:'#2E4561'}}>
      {isLoading ? <ActivityIndicator /> : (
         <View  >

      
        <FlatList
        
          data={data}
          keyExtractor={(item, index) => {
            // console.log("index", index)
            return index.toString();
          }}
          renderItem={({ item }) => {
            // console.log("item", item)
            return (
              <View style={{ backgroundColor:'#2E4561'}}  >
                <TouchableOpacity  onPress={()=>navigation.navigate("Detail",{idcoin:item.id})} style={{shadowColor: 'black',backgroundColor:'#2E4561', shadowOffset: {width: 0, height: 1},shadowOpacity: 0.2,elevation: 1}}>
                   
                            <ListItem style={{}} >
                                <Avatar source={{uri: `https://assets.coincap.io/assets/icons/${item.symbol.toLowerCase()}@2x.png `}} />
                               
                                <ListItem.Content style={{flex:5,}}>
                                <ListItem.Title >{item.name}</ListItem.Title>
                                        <ListItem.Subtitle>{item.symbol}</ListItem.Subtitle>
                                </ListItem.Content>
                                <ListItem.Title style={{flex:5}}>
                                    ${ Number.parseFloat(item.priceUsd).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                </ListItem.Title>
                                <ListItem.Title > 
                                    { item.changePercent24Hr>0 ? 
                                    <Text style={{color:'green'}}> 
                                        {Number.parseFloat(item.changePercent24Hr).toFixed(2)}% 
                                    </Text>: <Text style={{color:'red'}}>
                                        {Number.parseFloat(item.changePercent24Hr).toFixed(2)}% 
                                    </Text>}
                                </ListItem.Title>
                            </ListItem>
                            </TouchableOpacity>
              </View>
             
            )
          }}
        />
        </View>
      )}
    </View>
            <View style={{ width: 220,height: 90, alignItems:'center'}}>
            
              
              
            </View>
        </View>  
       
   


      
      
    
  
            
     

     
  
     
    </View>
    
    </ImageBackground>

  );
}


export default Home ;



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

