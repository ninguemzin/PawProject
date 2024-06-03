import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from 'jwt-decode';
import 'core-js/stable/atob';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

const LikesScreen = () => {
  const navigation = useNavigation();
  const [option, setOption] = useState('Recent');
  const [userId, setUserId] = useState('');
  const [likes, setLikes] = useState([]);
  useEffect(() => {
    console.log('hi');
    const fetchUser = async () => {
      const token = await AsyncStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
    };

    fetchUser();
  }, []);
  const fetchReceivedLikes = async () => {
    try {
      const response = await axios.get(
        `http://10.0.2.2:4000/received-likes/${userId}`,
      );
      const receivedLikes = response.data.receivedLikes;
      console.log(receivedLikes); // Handle received likes in your frontend
      setLikes(receivedLikes);
    } catch (error) {
      console.error('Error fetching received likes:', error);
      // Handle error in the frontend
    }
  };

  useEffect(() => {
    if (userId) {
      fetchReceivedLikes();
    }
  }, [userId]);
  useFocusEffect(
    useCallback(() => {
      if (userId) {
        fetchReceivedLikes();
      }
    }, [userId]),
  );
  console.log('likes', likes.length);
  return (
    <ScrollView
      style={{marginTop: 55, padding: 15, flex: 1, backgroundColor: '#FAF9F6'}}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            fontSize: 23,
            fontWeight: 'bold',
            fontFamily: 'GeezaPro-Bold',
            marginTop: 15,
          }}>
          Likes You
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            backgroundColor: '#008B8B',
            padding: 10,
            borderRadius: 30,
          }}>
          <SimpleLineIcons name="fire" size={24} color="white" />
          <Text
            style={{textAlign: 'center', fontWeight: 'bold', color: 'white'}}>
            Boost
          </Text>
        </View>
      </View>

      <View
        style={{
          marginVertical: 20,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 10,
        }}>
        <View
          style={{
            width: 38,
            height: 38,
            borderRadius: 19,
            backgroundColor: '#D0D0D0',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Ionicons name="filter" size={22} color="black" />
        </View>
        <Pressable
          onPress={() => setOption('Recent')}
          style={{
            borderColor: option == 'Recent' ? 'transparent' : '#808080',
            borderWidth: 0.7,
            padding: 10,
            borderRadius: 20,
            backgroundColor: option == 'Recent' ? 'black' : 'transparent',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 14,
              fontWeight: '400',
              color: option == 'Recent' ? 'white' : '#808080',
            }}>
            Recent
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setOption('your type')}
          style={{
            borderColor: option == 'your type' ? 'transparent' : '#808080',
            borderWidth: 0.7,
            padding: 10,
            borderRadius: 20,
            backgroundColor: option == 'your type' ? 'black' : 'transparent',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 14,
              fontWeight: '400',
              color: option == 'your type' ? 'white' : '#808080',
            }}>
            your type
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setOption('Last Active')}
          style={{
            borderColor: option == 'Last Active' ? 'transparent' : '#808080',
            borderWidth: 0.7,
            padding: 10,
            borderRadius: 20,
            backgroundColor: option == 'Last Active' ? 'black' : 'transparent',
            likes: likes?.length,
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 14,
              fontWeight: '400',
              color: option == 'Last Active' ? 'white' : '#808080',
            }}>
            Last Active
          </Text>
        </Pressable>
        <Pressable
          onPress={() => setOption('Nearby')}
          style={{
            borderColor: option == 'Nearby' ? 'transparent' : '#808080',
            borderWidth: 0.7,
            padding: 10,
            borderRadius: 20,
            backgroundColor: option == 'Nearby' ? 'black' : 'transparent',
          }}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 14,
              fontWeight: '400',
              color: option == 'Nearby' ? 'white' : '#808080',
            }}>
            Nearby
          </Text>
        </Pressable>

        <View>
          {likes?.length > 0 && (
            <Pressable>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'flex-start',
                    paddingHorizontal: 16,
                    paddingVertical: 12,
                    backgroundColor: '#f0f0f0',
                    borderRadius: 5,
                    marginBottom: 8,
                    width: 145,
                  }}>
                  <Text></Text>
                </View>
                <Text></Text>
              </View>
            </Pressable>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default LikesScreen;

const styles = StyleSheet.create({});
