import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import {
  getRegistrationProgress,
  saveRegistrationProgress,
} from '../registrationUltils';

const GenderScreen = () => {
  const [gender, setGender] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
    getRegistrationProgress('Gender').then(ProgressData => {
      if (ProgressData) {
        setGender(ProgressData.gender || '');
      }
    });
  }, []);
  const handleNext = () => {
    if (gender.trim() !== '') {
      saveRegistrationProgress('Gender', {gender});
    }
    navigation.navigate('Dating');
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
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
            <MaterialCommunityIcons
              name="newspaper-variant-outline"
              size={26}
              color="black"
            />
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
            fontFamily: 'GeezaPro-Bold',
            marginTop: 15,
            color: 'black',
          }}>
          Qual gênero do seu Pet?
        </Text>
        <Text
          style={{
            marginTop: 30,
            fontSize: 15,
            color: 'gray',
          }}>
          Os usuários são combinados com base nestes três grupos de gênero. Você
          pode adicionar mais informações sobre gênero posteriormente.
        </Text>

        <View style={{marginTop: 30}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: '500', fontSize: 15}}>Macho</Text>
            <Pressable onPress={() => setGender('Men')}>
              <FontAwesome
                name="circle"
                size={26}
                color={gender == 'Men' ? '#581845' : '#F0F0F0'}
              />
            </Pressable>
          </View>
        </View>

        <View style={{marginTop: 30}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: '500', fontSize: 15}}>Fêmea</Text>
            <Pressable onPress={() => setGender('Woman')}>
              <FontAwesome
                name="circle"
                size={26}
                color={gender == 'Woman' ? '#581845' : '#F0F0F0'}
              />
            </Pressable>
          </View>
        </View>

        <View style={{marginTop: 30}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontWeight: '500', fontSize: 15}}>Não Binario</Text>
            <Pressable onPress={() => setGender('Non Binary')}>
              <FontAwesome
                name="circle"
                size={26}
                color={gender == 'Non Binary' ? '#581845' : '#F0F0F0'}
              />
            </Pressable>
          </View>
        </View>

        <View
          style={{
            marginTop: 30,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 8,
          }}>
          <AntDesign name="checksquare" size={26} color={gender == '#581845'} />
          <Text style={{fontSize: 15}}>Visível no perfil</Text>
        </View>

        <TouchableOpacity
          onPress={handleNext}
          activeOpacity={0.8}
          style={{marginTop: 30, marginLeft: 'auto'}}>
          <MaterialCommunityIcons
            name="arrow-right-circle"
            size={45}
            color="#581845"
            style={{alignSelf: 'center', marginTop: 20}}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default GenderScreen;

const styles = StyleSheet.create({});
