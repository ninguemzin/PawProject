import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const PromptsScreen = () => {
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
      </View>
    </View>
  );
};

export default PromptsScreen;

const styles = StyleSheet.create({});
