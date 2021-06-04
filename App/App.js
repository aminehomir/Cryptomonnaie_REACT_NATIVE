
import * as React from 'react';
import { StyleSheet, Text, View,ImageBackground,ScrollView, Image  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import  SignUp from './components/Signup';
import  SignIn from './components/Signin';
import  Home from './components/home';
import  Coindetail from './components/Coindetail';
import  Splash from './components/Splash';
import  Profil from './components/profil';
// import  Validate from './components/validate';




const Stack = createStackNavigator()




export default function App() {


  return (
    // <ImageBackground source={image} style={styles.backgroundcontainer}>
    <NavigationContainer>
     
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,
      }}
    >
      
{/*     
      <Stack.Screen name="Validate" component={Validate} /> */}
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="Detail" component={Coindetail} />
      <Stack.Screen name="Profil" component={Profil} />
     
      
    </Stack.Navigator>
  
  </NavigationContainer>

    
  );
}

const styles = StyleSheet.create({
 
  backgroundcontainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
   
   
  }
});
