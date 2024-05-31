import {
  StyleSheet,
  Text,
  TextInput,
  View,
  SafeAreaView,
  Image,
  Pressable,
  Button,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

const PhotoScreen = () => {
  const navigation = useNavigation();
  const [imageUrls, setImageUrls] = useState(['', '', '', '', '', '']);
  const [imageUrl, setImageUrl] = useState('');

  const handleAddImage = () => {
    const index = imageUrls.findIndex(url => url === '');
    if (index !== -1) {
      const updateUrls = [...imageUrls];
      updateUrls[index] = imageUrl;
      setImageUrls(updateUrls);
      setImageUrl('');
    }
  };

  const handleNext = () => {
    navigation.navigate('Prompts');
  };

  return (
    <SafeAreaView>
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
            <MaterialIcons name="photo-camera-back" size={22} color="black" />
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
          }}>
          Escolha suas fotos e vídeos
        </Text>
        <View style={{marginTop: 20}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 20,
            }}>
            {imageUrls?.slice(0, 3).map((url, index) => (
              <Pressable
                key={index}
                style={{
                  borderColor: '#581845',
                  borderWidth: url ? 0 : 2,
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderStyle: 'dashed',
                  borderRadius: 10,
                  height: 100,
                }}>
                {url ? (
                  <Image
                    source={{uri: url}}
                    style={{width: 100, height: 100}}
                  />
                ) : (
                  <EvilIcons name="image" size={22} color="black" />
                )}
              </Pressable>
            ))}
          </View>
        </View>

        <View style={{marginTop: 20}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: 20,
            }}>
            {imageUrls?.slice(3).map((url, index) => (
              <Pressable
                key={index}
                style={{
                  borderColor: '#581845',
                  borderWidth: url ? 0 : 2,
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderStyle: 'dashed',
                  borderRadius: 10,
                  height: 100,
                }}>
                {url ? (
                  <Image
                    source={{uri: url}}
                    style={{width: 100, height: 100}}
                  />
                ) : (
                  <EvilIcons name="image" size={22} color="black" />
                )}
              </Pressable>
            ))}
          </View>
        </View>
        <View style={{marginVertical: 10}}>
          <Text style={{color: 'gray', fontSize: 15}}>Drag to reorder</Text>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '500',
              color: '#581845',
              marginTop: 3,
            }}>
            Add four to six photos
          </Text>
        </View>
        <View style={{marginTop: 25}}>
          <Text>Add a picture of yourself</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              paddingVertical: 5,
              borderRadius: 5,
              marginTop: 10,
              backgroundColor: '#DCDCDC',
            }}>
            <EvilIcons
              style={{marginLeft: 8}}
              name="image"
              size={22}
              color="black"
            />
            <TextInput
              value={imageUrl}
              onChangeText={text => setImageUrl(text)}
              style={{color: 'gray', marginVertical: 10, width: 300}}
              placeholder="enter your image url"
            />
          </View>
          <Button
            onPress={handleAddImage}
            style={{marginTop: 5}}
            title="Add Image"
          />
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

export default PhotoScreen;

const styles = StyleSheet.create({});
