import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SelectList} from 'react-native-dropdown-select-list';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import Modal from 'react-native-modal';

type RegisterProps = NativeStackScreenProps<RootStackParamList, 'Register'>;

const data = [
  {key: '1', value: 'Telecom'},
  {key: '2', value: 'DMP'},
  {key: '3', value: 'EDD'},
  {key: '4', value: 'ONEAD'},
  {key: '5', value: 'CNSS'},
  {key: '6', value: 'LANA'},
  {key: '7', value: 'MENFOP'},
];
import warning from '../assets/images/warning.png';
import illustration from '../assets/images/register_illustration.png';

const Register = ({navigation}: RegisterProps) => {
  const [name, setName] = useState('');
  const [company, setCampany] = useState('');
  const [errors, setErrors] = useState('');
  const [isWarningModalIsVisible, setIsWarningModalIsVisible] = useState(false);

  useEffect(() => {
    console.log();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Modal Error */}

      <View style={{elevation: 3, shadowOffset: {width: 1, height: 1}}}>
        {/* <Image
          style={{
            height: 150,
            width: 200,
            borderRadius: 10,
            padding: 18,
            backgroundColor: 'white',
            marginTop: 10,
          }}
          source={logo}
        /> */}
        <Image
          style={{
            height: 200,
            width: 200,
            borderRadius: 10,
            padding: 18,
            // backgroundColor: 'white',
            marginTop: 10,
          }}
          source={illustration}
        />
      </View>
      {/* <Text style={styles.headingText}>Saisir les informations ci-dessous</Text> */}
      {/* {errors && <Text style={styles.errorText}>{errors}</Text>} */}
      {/* {errors &&
        Alert.alert('Ce champ est obligatoire', errors, [
          {text: "C'est compris", style: 'cancel'},
        ])} */}
      <TextInput
        style={styles.input}
        onChangeText={setName}
        value={name}
        placeholder="Représentant de la compagnie"
      />
      <View style={{marginBottom: 30}}>
        <SelectList
          placeholder="compagnies"
          boxStyles={{width: 300}}
          dropdownTextStyles={{fontSize: 14, fontWeight: '600', padding: 6}}
          setSelected={campany => {
            setCampany(campany);
          }}
          data={data}
          save="value"
        />
      </View>
      {/* <Button
        title="Continuer"
        onPress={() => {
          Alert.alert(
            'Confirmer votre identité',
            `Vous confirmer que vous etes ${name} et que vous representer la compagnie ${company}`,
            [
              {
                text: 'je confirme',
                onPress: () => {
                  navigation.navigate('Engagement', {
                    person_name: name,
                    company: company,
                  });
                },
                style: 'cancel',
              },
            ],
          );
        }}
      /> */}
      <TouchableOpacity
        style={styles.primaryBtn}
        onPress={() => {
          if (name === '' && company === '') {
            setErrors(
              "Votre nom et ainsi que celui de votre compagnie sont necessaires avant de passer à l'etape suivante",
            );
            setIsWarningModalIsVisible(true);
          } else if (name === '') {
            setErrors(
              "Veuillez entrer votre nom avant de passer à l'etape suivante",
            );
            setIsWarningModalIsVisible(true);
          } else if (company === '') {
            setErrors(
              "Veuillez selectionner le nom de votre compagnie avant de passer à l'etape suivante",
            );
            setIsWarningModalIsVisible(true);
          } else {
            Alert.alert(
              'Confirmer votre identité',
              `Vous confirmer que vous etes ${name} et que vous représenter la compagnie ${company}`,
              [
                {
                  text: 'je confirme',
                  onPress: () => {
                    navigation.popTo('Engagement', {
                      person_name: name,
                      company: company,
                    });
                  },
                  style: 'cancel',
                },
              ],
            );
          }
        }}>
        <Text style={styles.btnText}>Enregistrement</Text>
      </TouchableOpacity>
      {/* <View style={{flex: 1}}>
        <Modal
          isVisible={isWarningModalIsVisible}
          onSwipeComplete={() => setIsWarningModalIsVisible(false)}
          animationIn="slideInUp" // Animation d'entrée
          animationOut="slideOutDown" // Animation de sortie
          swipeDirection="down" // Swipe vers le bas pour fermer
          backdropOpacity={0.5} // Fond semi-transparent
          onBackdropPress={() => {
            setIsWarningModalIsVisible(false);
          }} // Ferme en cliquant à l'extérieur
          style={{
            justifyContent: 'flex-end', // Positionne en bas de l'écran
            marginLeft: 5, // Supprime les marges
            marginRight: 5, // Supprime les marges
            marginBottom: 0,
          }}>
          <View
            style={{
              // backgroundColor: '#dfe6e9',
              backgroundColor: 'white',
              borderWidth: 2,
              borderColor: '#34495e',
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              height: '25%',
              // padding: 10,
            }}>
            <View style={{flex: 1, alignItems: 'center'}}>
              <View
                style={{
                  backgroundColor: '#34495e',
                  height: 50,
                  width: 50,
                  borderRadius: 50,
                  marginTop: -28,
                  borderWidth: 4,
                  borderColor: '#34495e',
                  borderStyle: 'dashed',
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Image
                  source={warning}
                  style={{height: 25, width: 25, borderRadius: 50}}
                />
              </View>
            </View>
            <Text
              style={{
                fontSize: 16,
                color: '#34495e',
                fontWeight: 'bold',
                textAlign: 'center',
                lineHeight: 20,
                padding: 50,
              }}>
              {errors}
            </Text>
          </View>
        </Modal>
      </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 30,
  },

  headingText: {
    color: '#000000',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    marginTop: 30,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 20,
  },
  input: {
    height: 50,
    width: 300,
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: 'white',
    padding: 15,
    marginTop: 20,
    marginBottom: 30,
  },
  primaryBtn: {
    backgroundColor: '#34495e',
    padding: 15,
    borderRadius: 10,
  },
  btnText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
export default Register;
