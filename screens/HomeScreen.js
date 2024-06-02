import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = () => {
  useEffect(() => {
    showToken();
  }, []);
  const showToken = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log('token', token);
  };
  return (
    <View>
      <View>Batata</View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
