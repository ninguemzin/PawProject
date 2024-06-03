import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  BottomModal,
  ModalContent,
  ModalTitle,
  SlideAnimation,
} from 'react-native-modals';

const ShowPromptsScreen = () => {
  const navigation = useNavigation();
  const [prompts, setPrompts] = useState([]);
  const [option, setOption] = useState('About me');
  const [answer, setAnswer] = useState('');
  const [question, setQuestion] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const questionPrompts = [
    {
      id: '0',
      name: 'Sobre mim',
      questions: [
        {
          id: '10',
          question: 'Um fato aleatório que adoro é',
        },
        {
          id: '11',
          question: 'Domingo típico',
        },
        {
          id: '12',
          question: 'Eu enlouqueço por',
        },
        {
          id: '13',
          question: 'Habilidades incomuns',
        },
        {
          id: '14',
          question: 'Minha maior força',
        },
        {
          id: '15',
          question: 'Meus prazeres simples',
        },
        {
          id: '16',
          question: 'Um objetivo de vida meu',
        },
      ],
    },
    {
      id: '2',
      name: 'Autocuidados',
      questions: [
        {
          id: '10',
          question: 'Eu relaxo através de',
        },
        {
          id: '11',
          question: 'Um limite meu é',
        },
        {
          id: '12',
          question: 'Eu me sinto mais apoiado quando',
        },
        {
          id: '13',
          question: 'Eu me animo fazendo',
        },
        {
          id: '14',
          question: 'Para mim, relaxamento é',
        },
        {
          id: '15',
          question: 'Eu combato minha tristeza fazendo',
        },
        {
          id: '16',
          question: 'Minha rotina de cuidados com a pele',
        },
      ],
    },
  ];
  const openModal = item => {
    setModalVisible(!isModalVisible);

    setQuestion(item?.question);
  };
  const addPrompt = () => {
    const newPrompt = {question, answer};
    setPrompts([...prompts, newPrompt]);
    setQuestion('');
    setAnswer('');
    setModalVisible(false);
    if (prompts.length == 3) {
      setModalVisible(false);
      navigation.navigate('Prompts', {
        prompts: prompts,
      });
    }
  };
  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <View
          style={{
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text style={{fontSize: 15, fontWeight: '500', color: '#581845'}}>
            Ver tudo
          </Text>
          <Text style={{fontSize: 16, fontWeight: '500', color: '#581845'}}>
            Comandos
          </Text>
        </View>
        <View
          style={{
            marginHorizontal: 10,
            marginTop: 20,
            flexDirection: 'row',
            gap: 10,
          }}>
          {questionPrompts?.map((item, index) => (
            <>
              <View key={index}>
                <Pressable
                  onPress={() => setOption(item?.name)}
                  style={{
                    padding: 10,
                    borderRadius: 20,
                    backgroundColor: option == item?.name ? '#581845' : 'white',
                  }}>
                  <Text
                    style={{
                      textAlign: 'center',
                      color: option == item?.name ? 'white' : 'black',
                    }}>
                    {item?.name}
                  </Text>
                </Pressable>
              </View>
            </>
          ))}
        </View>

        <View style={{marginTop: 20, marginHorizontal: 12}}>
          {questionPrompts?.map((item, index) => (
            <View key={index}>
              {option == item?.name && (
                <View>
                  {item?.questions?.map((question, index) => (
                    <Pressable
                      onPress={() => openModal(question)}
                      style={{marginVertical: 12}}>
                      <Text style={{fontSize: 15, fontWeight: '500'}}>
                        {question.question}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              )}
            </View>
          ))}
        </View>
      </SafeAreaView>
      <BottomModal
        onBackdropPress={() => setModalVisible(!isModalVisible)}
        onHardwareBackPress={() => setModalVisible(!isModalVisible)}
        swipeDirection={['up', 'down']}
        swipeThreshold={200}
        modalTitle={<ModalTitle title="Responda à pergunta" />}
        modalAnimation={
          new SlideAnimation({
            slideFrom: 'bottom',
          })
        }
        visible={isModalVisible}
        onTouchOutside={() => setModalVisible(!isModalVisible)}>
        <ModalContent style={{width: '100%', height: 250}}>
          <View style={{marginVertical: 10}}>
            <Text
              style={{textAlign: 'center', fontWeight: '600', fontSize: 15}}>
              responda sua pergunta
            </Text>
            <Text style={{marginTop: 15, fontSize: 20, fontWeight: '600'}}>
              {question}
            </Text>
            <View
              style={{
                borderColor: '#202020',
                borderWidth: 1,
                padding: 10,
                borderRadius: 10,
                height: 100,
                marginVertical: 12,
                borderStyle: 'dashed',
              }}>
              <TextInput
                value={answer}
                style={{color: 'gray', width: 300, fontSize: answer ? 18 : 18}}
                onChangeText={text => setAnswer(text)}
                placeholder="Enviar sua resposta"></TextInput>
            </View>
            <Button onPress={addPrompt} title="Add" />
          </View>
        </ModalContent>
      </BottomModal>
    </>
  );
};

export default ShowPromptsScreen;

const styles = StyleSheet.create({});
