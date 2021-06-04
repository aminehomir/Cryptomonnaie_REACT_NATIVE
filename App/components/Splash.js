import React from 'react'
import { View, Text, ActivityIndicator, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
const image = require('../images/CRYPTO_Logo.png')


export default function Splash(props) {
    React.useEffect(() => {
        AsyncStorage.getItem('TOKEN').then((authToken)=>{
            if (authToken) {
                props.navigation.navigate('Home')
            } else {
                props.navigation.navigate('SignIn')
            }
        })
    }, []);
    return (
        <View style={{flex:1,alignItems:'center'}}>
              <Image source={image} style={{  height: 60,width: 'auto',}}/>
            <ActivityIndicator size={62} color={'red'}/>
          
          
        </View>
    )
}
