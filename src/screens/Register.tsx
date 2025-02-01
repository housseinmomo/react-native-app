import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Image,
  Button,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SelectList} from 'react-native-dropdown-select-list';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

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
import logosdsi from '../assets/images/dcc.png';

const Register = ({navigation}: RegisterProps) => {
  const [name, setName] = useState('');
  const [company, setCampany] = useState('');
  const [errors, setErrors] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={{
          height: 120,
          width: 200,
          marginBottom: 10,
          borderRadius: 10,
          elevation: 3,
        }}
        source={logosdsi}
      />
      <Text style={styles.headingText}>Saisir les informations ci-dessous</Text>
      {errors && <Text style={styles.errorText}>{errors}</Text>}
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
          } else if (name === '') {
            setErrors(
              "Veuillez entrer votre nom avant de passer à l'etape suivante",
            );
          } else if (company === '') {
            setErrors(
              "Veuillez selectionner le nom de votre compagnie avant de passer à l'etape suivante",
            );
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
