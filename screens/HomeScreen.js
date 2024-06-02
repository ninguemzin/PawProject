import {StyleSheet, Text, View} from 'react-native';
import React {useEffect} from 'react';
import AsyncStorage from ''

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
      <View></View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
