import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useRoute, useNavigation} from '@react-navigation/native';

const PromptsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  return (
    <View>
      <View style={{marginTop: 90, marginHorizontal: 20}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              borderColor: 'black',
              borderWidth: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <AntDesign name="photo-camera-back" size={22} color="black" />
          </View>

          <Image
            style={{width: 100, height: 40}}
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png',
            }}
          />
        </View>
        <Text
          style={{
            fontSize: 25,
            fontWeight: 'bold',
            fontFamily: 'GezzaPro-Bold',
            marginTop: 15,
          }}>
          Escreva as respostas do seu perfil
        </Text>

        <View style={{marginTop: 20, flexDirection: 'column', gap: 20}}>
          {route?.params?.prompts ? (
            route?.params?.prompts.map((item, index) => (
              <Pressable
                onPress={() => navigation.navigate('ShowPrompts')}
                style={{
                  borderColor: '#707070',
                  borderWidth: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderStyle: 'dashed',
                  borderRadius: 10,
                  height: 70,
                }}>
                <Text
                  style={{
                    fontWeight: '600',
                    fontStyle: 'italic',
                    fontSize: 15,
                  }}>
                  {item?.question}
                </Text>
                <Text
                  style={{
                    fontWeight: '600',
                    fontStyle: 'italic',
                    fontSize: 15,
                    marginTop: 3,
                  }}>
                  {item?.answer}
                </Text>
              </Pressable>
            ))
          ) : (
            <View>
              <Pressable
                onPress={() => navigation.navigate('ShowPrompts')}
                style={{
                  borderColor: '#707070',
                  borderWidth: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderStyle: 'dashed',
                  borderRadius: 10,
                  height: 70,
                }}>
                <Text
                  style={{
                    fontWeight: '600',
                    fontStyle: 'italic',
                    fontSize: 15,
                  }}>
                  Select a Prompt
                </Text>
                <Text
                  style={{
                    fontWeight: '600',
                    fontStyle: 'italic',
                    fontSize: 15,
                    marginTop: 3,
                  }}>
                  And Write your own answer
                </Text>
              </Pressable>

              <Pressable
                onPress={() => navigation.navigate('ShowPrompts')}
                style={{
                  marginTop: 20,
                  borderColor: '#707070',
                  borderWidth: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderStyle: 'dashed',
                  borderRadius: 10,
                  height: 70,
                }}>
                <Text
                  style={{
                    fontWeight: '600',
                    fontStyle: 'italic',
                    fontSize: 15,
                  }}>
                  Select a Prompt
                </Text>
                <Text
                  style={{
                    fontWeight: '600',
                    fontStyle: 'italic',
                    fontSize: 15,
                    marginTop: 3,
                  }}>
                  And Write your own answer
                </Text>
              </Pressable>

              <Pressable
                onPress={() => navigation.navigate('ShowPrompts')}
                style={{
                  marginTop: 20,
                  borderColor: '#707070',
                  borderWidth: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderStyle: 'dashed',
                  borderRadius: 10,
                  height: 70,
                }}>
                <Text
                  style={{
                    color: 'gray',
                    fontWeight: '600',
                    fontStyle: 'italic',
                    fontSize: 15,
                  }}>
                  Select a Prompt
                </Text>
                <Text
                  style={{
                    color: 'gray',
                    fontWeight: '600',
                    fontStyle: 'italic',
                    fontSize: 15,
                    marginTop: 3,
                  }}>
                  And Write your own answer
                </Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default PromptsScreen;

const styles = StyleSheet.create({});
