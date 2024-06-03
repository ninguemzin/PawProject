import 'core-js/stable/atob';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import axios from 'axios';
import IonIcons from 'react-native-vector-icons/Ionicons';

const HomeScreen = () => {
  const [userId, setUserId] = useState('');
  const [profilesData, setProfilesData] = useState([]);
  useEffect(() => {
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);
  useEffect(() => {
    showToken();
  }, []);
  const showToken = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log('token', token);
  };
  console.log('USERID', userId);
  const [currentProfileIndex, setCurrentProfileIndex] = useState(0);
  const [currentProfile, setCurrentProfile] = useState();
  const fetchMatches = async () => {
    try {
      const response = await axios.get(
        `http://192.168.0.102:4000/matches?userId=${userId}`,
      );
    } catch (error) {
      console.error('Error fetching matches:', error);
      // Handle error in the frontend
    }
  };
  useEffect(() => {
    if (userId) {
      fetchMatches();
    }
  }, [userId]);
  useEffect(() => {
    if (profilesData.length > 0) {
      setCurrentProfile(profilesData[0]);
    }
  }, [profilesData]);
  console.log('profile', currentProfile);
  return (
    <ScrollView>
      <Text>Batata</Text>
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
