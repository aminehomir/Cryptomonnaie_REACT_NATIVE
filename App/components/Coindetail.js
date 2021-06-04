
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View,Dimensions,Image,FlatList,TouchableOpacity,Pressable, ImageBackground,ActivityIndicator,ScrollView,TextInput,Modal,Alert } from 'react-native'
import{Avatar,ListItem, Header,Icon,} from 'react-native-elements';
import { LinearGradient } from 'expo-linear-gradient';
import axios from 'axios' ;
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
  import AsyncStorage from '@react-native-async-storage/async-storage';
const img = require('../images/000.jpg')
const {width: WIDTH}= Dimensions.get('window')


  export function Coindetail({route,navigation}) {
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisible2, setModalVisible2] = useState(false);
     const [isLoading, setLoading] = useState(true);
     const [data, setData] = useState([]);
     const [time, setTime] = useState([0,0]);
     const [price, setPrice] = useState([0,0]);
     const [cryptoAmount, setCryptoAmount] = useState();
    

      const idcoin = route.params.idcoin;
      // console.log(idcoin);


    

     async function  buy  () {

        const email = await  AsyncStorage.getItem('email');
        console.log('ggggggggggggggggggggggggggggggggg');

        console.log(email);
        console.log('ggggggggggggggggggggggggggggggggg');


        console.log('********************************');

 
        console.log(data.priceUsd);
        console.log('********************************');
        
        
        console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
        console.log(data.name);
    

        console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');

        console.log(cryptoAmount);
       
    try{
      const res = await axios.post(`http://192.168.8.98:3000/wallet/add`, {email : email, currencyPrice: data.priceUsd,cryp_name : data.name,value : cryptoAmount})
      console.log(res.data)
           Alert.alert(JSON.stringify(

          "Buy Done!",
         
          [{
                   text: "OK"
                    }]
                   )   );
                   setModalVisible(!modalVisible)
    }
      catch{
        console.log(error)
      }

     


      };




      const sell = async() => {

        const email = await AsyncStorage.getItem('email');
        console.log('ggggggggggggggggggggggggggggggggg');

        console.log(email);
        console.log('ggggggggggggggggggggggggggggggggg');


        console.log('********************************');

 
        console.log(data.priceUsd);
        console.log('********************************');
        
        
        console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
        console.log(data.name);
    

        console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');

        console.log(cryptoAmount);

       try{
         
        const res = await axios.post(`http://192.168.8.98:3000/wallet/sell`, {email : email, currencyPrice: data.priceUsd,cryp_name : data.name,value : cryptoAmount});
       
        console.log(res.data);
        Alert.alert(JSON.stringify(

          "Sell Done!",
         
          [{
                   text: "OK"
                    }]
                   )   );
                   setModalVisible2(!modalVisible2)
       
      } catch{
        console.log(error)
      }

    
       
     
    
      };


      const getdata = ()=>{
        axios.get(`https://api.coincap.io/v2/assets/${idcoin}`)
        .then((response) => {
        //   console.log(response.data);
        setData(response.data.data);
        
         
        })
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
      

    }
     
 

const convertTime =  (timestamp) => {

        
        var date = new Date(timestamp);
        var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        var day = days[date.getDay()]
     
    
     return day           
  
  };



  const getDataCall = async () => {
    try {
      const response = await axios.get(
        `https://api.coincap.io/v2/assets/${idcoin}/history?interval=d1`,
      );


      
      let resData = response.data.data;



      const priceArray = resData && resData.map(item => item.priceUsd);
      const dateArray  = resData && resData.map(item => convertTime(item.time));
      // const dateArray  = resData && resData.map(item => item.time);

      setTime(dateArray && dateArray.slice(-6));
      setPrice(priceArray && priceArray.slice(-6));



    } catch (error) {
      // handle error
      console.log(error.message);
    }
  };


    // const getdata = ()=>{
    //     axios.get(`https://api.coincap.io/v2/assets/${idcoin}`)
    //     .then((response) => {
    //     //   console.log(response.data);
    //     setData(response.data.data);
        
        
    //     })
    //     .catch((error) => console.error(error))

    // }

    const logOutUser = ()=>{
      AsyncStorage.clear().then(()=>{
        navigation.navigate('SignIn');
      })
      console.log('clicked');
  }


 
    
  
      useEffect(() => {
       
         getdata();
         getDataCall();
         
        
      }, []);
      
       


      
  
    return (
        <ImageBackground  source={img} style={styles.backgroundcontainer} >
        
            
            <View style={{ flex: 1,}}> 
             
                <Header
                leftComponent={<TouchableOpacity onPress={() => navigation.navigate('Home')}><Icon
                name='chevron-left' color='#fff'/></TouchableOpacity>}
                centerComponent={{ text: 'Detail Coin', style: { color: '#fff' } }}
                rightComponent={ <TouchableOpacity onPress={logOutUser}><Icon
                name='logout' color='#fff'/></TouchableOpacity>}
                backgroundColor='#2E4561'
                />
             <ScrollView  >
         <View style={{ flex: 1, }}>
         <LinearGradient
        // Background Linear Gradient
        colors={['rgba(0,0,0,1.8)', 'transparent']}
        style={styles.background}
      />
             {isLoading ? <ActivityIndicator /> : (
               
           <View style={{backgroundColor:'#283C54',padding:21,height:790}}>
               <View style={{alignItems: 'center'}}> 
               <Avatar size="large" source={{uri: `https://assets.coincap.io/assets/icons/${data.symbol.toLowerCase()}@2x.png `}} />
              
               <Text style={{fontSize:15,fontWeight:'500',color:'white',marginTop:10}}>{data.name} ({data.symbol})</Text>
               <Text style={{fontSize:30,fontWeight:'500',color:'white',marginTop:10}}> $ {Number.parseFloat(data.priceUsd).toFixed(2)} USD </Text>
             
              
               </View>
              <View style={{flexDirection:'row',height:50, justifyContent: 'center',}}>
              <View  style={{padding:15,flexDirection:'row'}}>
               <Text style={{fontWeight:'500',color:'white'}}>Average :</Text>
               <Text style={{marginRight:7,fontWeight:'500',color:'white',fontSize:15}}> ${Number.parseFloat(data.vwap24Hr).toFixed(2)}</Text>
               </View>
               <View  style={{padding:15,flexDirection:'row'}}>
               <Text style={{marginRight:7,fontWeight:'500',color:'white'}}>Change :</Text>
               { data.changePercent24Hr>0 ? 
                <Text style={{color:'green',fontSize:15}}>{Number.parseFloat(data.changePercent24Hr).toFixed(2)}% 
                </Text>: 
                <Text style={{color:'red',fontSize:15}}>{Number.parseFloat(data.changePercent24Hr).toFixed(2)}% 
                </Text>}
                </View>

                </View>
                <View style={{alignItems:'center'}}>
                <View style={{flexDirection:'row',marginTop:10}}>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.textStyle}>Buy</Text>
      </Pressable>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible2(true)}
      >
        <Text style={styles.textStyle}>Sell</Text>
      </Pressable>
      </View>

  <LineChart
     data={{
        labels: time,
        datasets: [
          {
            data: price,
          }
        ]
      }}
    width={385} // from react-native
    height={220}
    yAxisLabel="$"
    yAxisSuffix="k"
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#283C54",
      backgroundGradientFrom: "#2F4562",
      backgroundGradientTo: "#2F4562",
      decimalPlaces: 2, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      style: {
        borderRadius: 6
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#58C9DE"
      }
    }}
    bezier
    style={{
      shadowColor: "#471f51",
      marginVertical: 8,
      padding:20,
      borderRadius: 21
    }}
  />
    
  <View style={styles.centeredView}>

     {/* ********************************* modal buy *********************************/}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{color:'black',fontSize:16,marginBottom:20,textAlign:'center',color:'white'}}>Value of Currency you Want to Buy</Text>
          <TextInput
        style={styles.input}
       
        onChangeText={setCryptoAmount}
                value={cryptoAmount}
                keyboardType="numeric"
      />
     <View style={{flexDirection:'row'}}>
    {/* <TouchableOpacity style={{backgroundColor:'#58c9de',padding:10,width:130,alignItems: "center",margin:10}}>
              <Text style={{fontSize:25,color:'white'}}>Sell</Text>
            </TouchableOpacity> */}
            <TouchableOpacity style={{backgroundColor:'#58c9de',padding:10,width:100,borderRadius: 3,alignItems: "center",margin:10}}  onPress={buy}>
              <Text style={{fontSize:15,color:'white'}}>Buy</Text>
            </TouchableOpacity>

            
            <Pressable
             style={{backgroundColor:'#2F4562',padding:10,width:100,borderRadius: 3,alignItems: "center",margin:10}}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={{fontSize:15,color:'white'}}>Cancel</Text>
            </Pressable>

            </View>
          </View>
        </View>
      </Modal>

    {/* ********************************* modal sell *********************************/}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible2}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible2(!modalVisible2);
        }}
      >
        <View style={styles.centeredView}>
          
          <View style={styles.modalView}>
          <Text style={{color:'black',fontSize:16,marginBottom:20,textAlign:'center',color:'white'}}>Value of Currency you Want to Sell</Text>

          <TextInput
           
        style={styles.input}
        
        onChangeText={setCryptoAmount}
          value={cryptoAmount}
          keyboardType="numeric"
      />
  <View style={{flexDirection:'row'}}>
    <TouchableOpacity style={{backgroundColor:'#58c9de',padding:10,width:100,borderRadius: 3,alignItems: "center",margin:10}}  onPress={sell}>
              <Text style={{fontSize:15,color:'white'}}>Sell</Text>
            </TouchableOpacity>
           

            
            <Pressable
             style={{backgroundColor:'#2F4562',padding:10,width:100,borderRadius: 3,alignItems: "center",margin:10}}
              onPress={() => setModalVisible2(!modalVisible2)}
            >
              <Text style={{fontSize:15,color:'white'}}>Cancel</Text>
            </Pressable>

            </View>
          </View>
        </View>
      </Modal>


      
    </View>





  
</View>
              
              

                
           </View>
      )}
      
    </View>
    </ScrollView>
    </View>

    
        </ImageBackground>
    );
}


const styles = StyleSheet.create({

    backgroundcontainer:{
        flex:1,
     
      height:'auto',
    },
  
   logoContainer: {
      
     alignItems: 'center',
       width: 500,
       height:'auto',
       padding:'50%',
      //  backgroundColor:'#283c53'
      
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 300,
  },
  input:{
    width: WIDTH - 150,
    height: 50,
    
    marginBottom: 20,
    
   
    borderRadius: 3,
    fontSize:16,
    paddingLeft: 25,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
  
    color:'white',
 
    
    },

    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "#283C54",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      width:90,
      borderRadius: 2,
      padding: 5,
      elevation: 2,
      margin:3
    },
    buttonOpen: {
      backgroundColor: "#58C9DE",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
})  

export default Coindetail ;