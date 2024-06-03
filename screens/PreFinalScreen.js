import {Pressable, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {
  getRegistrationProgress,
  saveRegistrationProgress,
} from '../registrationUltils';
import {useNavigation, useRoute} from '@react-navigation/native';
import LottieView from 'lottie-react-native';

import { AuthContext } from '../AuthContext';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const PreFinalScreen = () => {
  const api = axios.create({
    baseURL: 'http://10.0.2.2:4000',
    withCredentials: true,
    headers: {
    'Access-Control-Allow-Origin': '*',
    'Accept':'application/json',
    'Content-Type':'application/json',
    }, 
    });
  const navigation = useNavigation();
  const route = useRoute();
  const [userData, setUserData] = useState();
  useEffect(() => {
    getAllUserData();
  }, []);

  const { token, isLoading,setToken } = useContext(AuthContext);

  console.log(token)

  useEffect(() => {
    // Check if the token is set and not in loading state
    if (token) {
      // Navigate to the main screen
      navigation.navigate('MainStack', { screen: 'Main' });
    }
  }, [token, navigation]);
  const getAllUserData = async () => {
    try {
      // Define an array to store data for each screen
      const screens = [
        'Name',
        'Email',
        'Password',
        'Birth',
        'Location',
        'Gender',
        'Dating',
        'LookingFor',
        'Photos',
        'Prompts',
      ]; // Add more screens as needed

      // Define an object to store user data
      let userData = {};

      // Retrieve data for each screen and add it to the user data object
      for (const screenName of screens) {
        const screenData = await getRegistrationProgress(screenName);
        if (screenData) {
          userData = {...userData, ...screenData}; // Merge screen data into user data
        }
      }

      // Return the combined user data
      setUserData(userData);
    } catch (error) {
      console.error('Error retrieving user data:', error);
      return null;
    }
  };
  const clearAllScreenData = async () => {
    try {
      const screens = [
        'Name',
        'Email',
        'Birth',
        'Location',
        'Gender',
       
        'Dating',
        'LookingFor',
    
        'Photos',
      ];
      // Loop through each screen and remove its data from AsyncStorage
      for (const screenName of screens) {
        const key = `registration_progress_${screenName}`;
        await AsyncStorage.removeItem(key);
      }
      console.log('All screen data cleared successfully');
    } catch (error) {
      console.error('Error clearing screen data:', error);
    }
  };
  const registerUser = async () => {
    try {
      const response = await api.post('/register', userData)
        .then(response => {
          console.log(response);
          const token = response.data.token;
          console.log(token)
          AsyncStorage.setItem('token', token);
          setToken(token)
        });
      // Assuming the response contains the user data and token

      // Store the token in AsyncStorage
      // navigation.replace('Main', {
      //   screen: 'Home',
      // });
      //   navigation.replace('MainStack', {screen: 'Main'});

        clearAllScreenData();
    } catch (error) {
      console.error('Error registering user:', error);
      throw error; // Throw the error for handling in the component
    }
  };
  console.log('user data', userData);
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{marginTop: 80}}>
        <Text
          style={{
            fontSize: 35,
            fontWeight: 'bold',
            fontFamily: 'GeezaPro-Bold',
            marginLeft: 20,
          }}>
          Tudo pronto para se registrar
        </Text>
        <Text
          style={{
            fontSize: 33,
            fontWeight: 'bold',
            fontFamily: 'GeezaPro-Bold',
            marginLeft: 20,
            marginRight: 10,
            marginTop: 10,
          }}>
          Configurando seu perfil para você
        </Text>
      </View>

      <View>
        <LottieView
          source={require('../assets/love.json')}
          style={{
            height: 260,
            width: 300,
            alignSelf: 'center',
            marginTop: 40,
            justifyContent: 'center',
          }}
          autoPlay
          loop={true}
          speed={0.7}
        />
      </View>

      <Pressable
        onPress={registerUser}
        style={{backgroundColor: '#900C3F', padding: 15, marginTop: 'auto'}}>
        <Text
          style={{
            textAlign: 'center',
            color: 'white',
            fontWeight: '600',
            fontSize: 15,
          }}>
          Finalizar registro
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default PreFinalScreen;

const styles = StyleSheet.create({});