import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SelectList} from 'react-native-dropdown-select-list';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

type EngagementProps = NativeStackScreenProps<RootStackParamList, 'Engagement'>;

const engagement_level = [
  {key: '1', value: 'Bronze'},
  {key: '2', value: 'Silver'},
  {key: '3', value: 'Gold'},
  {key: '4', value: 'Platinum'},
  {key: '5', value: 'Diamond'},
];
const duration_level = [
  {key: '1', value: '1 - 3 mois'},
  {key: '2', value: '3 - 6 mois'},
  {key: '3', value: '6 - 9 mois'},
  {key: '4', value: '12 - 15 mois'},
  {key: '5', value: '16 - 24 mois'},
];
import logosdsi from '../assets/images/dcc.png';

const Engagement = ({route, navigation}: EngagementProps) => {
  const {person_name, company} = route.params;
  const [typeEngagement, setTypeEngagement] = useState('');
  const [durationEngagement, setDurationEngagement] = useState('');
  const [errors, setErrors] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'#34495e'} />

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
      <Text style={styles.headingText}>Determiner vos engagement</Text>
      {errors && <Text style={styles.errorText}>{errors}</Text>}
      <View style={{marginBottom: 30}}>
        <SelectList
          placeholder="Niveaux d'engagement"
          boxStyles={{width: 300}}
          dropdownTextStyles={{fontSize: 14, fontWeight: '600', padding: 6}}
          setSelected={value => {
            switch (value) {
              case 'Bronze':
                Alert.alert(
                  `Engagement : ${value} 🥉`,
                  `Les institutions ayant souscrit à l'engagement ${value} devront verser une somme entre 200 000 à 300 000 FDJ par mois`,
                  [
                    {
                      text: `Devenir ${value}`,
                      style: 'cancel',
                    },
                  ],
                );
                setTypeEngagement(value);
                break;
              case 'Silver':
                Alert.alert(
                  `Engagement : ${value} 🥈`,
                  `Les institutions ayant souscrit à  l'engagement ${value} devront verser une somme entre 600 000 à 600 000 FDJ par mois`,
                  [
                    {
                      text: `Devenir ${value}`,
                      style: 'cancel',
                    },
                  ],
                );
                setTypeEngagement(value);
                break;
              case 'Gold':
                Alert.alert(
                  `Engagement : ${value} 🥇`,
                  `Les institutions ayant souscrit à  l'engagement ${value} devront verser une somme entre 900 000 à 1 200 000 FDJ par mois`,
                  [
                    {
                      text: `Devenir ${value}`,
                      style: 'cancel',
                    },
                  ],
                );
                setTypeEngagement(value);
                break;
              case 'Platinum':
                Alert.alert(
                  `Engagement : ${value} 💠`,
                  `Les institutions ayant souscrit à  l'engagement ${value} devront verser une somme entre 1 300 000 à 2 000 000 FDJ par mois`,
                  [
                    {
                      text: `Devenir ${value}`,
                      style: 'cancel',
                    },
                  ],
                );
                setTypeEngagement(value);
                break;
              case 'Diamond':
                Alert.alert(
                  `Engagement : ${value} 💎 `,
                  `Les institutions ayant souscrit à  l'engagement ${value} devront verser une somme entre 2 000 000 à 3 000 000 FDJ par mois`,
                  [
                    {
                      text: `Devenir ${value}`,
                      style: 'cancel',
                    },
                  ],
                );
                setTypeEngagement(value);
                break;
            }
          }}
          data={engagement_level}
          save="value"
        />
      </View>
      <View style={{marginBottom: 30}}>
        <SelectList
          placeholder="Durée d'engagement"
          boxStyles={{width: 300}}
          dropdownTextStyles={{fontSize: 14, fontWeight: '600', padding: 6}}
          setSelected={(value: string) => {
            switch (value) {
              case '1 - 3 mois':
                Alert.alert(
                  "Durée d'engagement 🗓️",
                  `Je m'engage pour [${value}] dans le projet : Djibouti Code Campus`,
                  [
                    {
                      text: 'confirmation',
                      style: 'cancel',
                    },
                  ],
                );
                setDurationEngagement(value);
                break;
              case '3 - 6 mois':
                Alert.alert(
                  "Durée d'engagement 🗓️",
                  `Je m'engage pour [${value}] dans le projet : Djibouti Code Campus`,
                  [
                    {
                      text: 'confirmation',
                      style: 'cancel',
                    },
                  ],
                );
                setDurationEngagement(value);
                break;
              case '6 - 9 mois':
                Alert.alert(
                  "Durée d'engagement 🗓️",
                  `Je m'engage pour [${value}] dans le projet : Djibouti Code Campus`,
                  [
                    {
                      text: 'confirmation',
                      style: 'cancel',
                    },
                  ],
                );
                setDurationEngagement(value);
                break;
              case '12 - 15 mois':
                Alert.alert(
                  "Durée d'engagement 🗓️",
                  `Je m'engage pour [${value}] dans le projet : Djibouti Code Campus`,
                  [
                    {
                      text: 'confirmation',
                      style: 'cancel',
                    },
                  ],
                );
                setDurationEngagement(value);
                break;
              case '16 - 24 mois':
                Alert.alert(
                  "Durée d'engagement 🗓️",
                  `Je m'engage pour [${value}] dans le projet : Djibouti Code Campus`,
                  [
                    {
                      text: 'confirmation',
                      style: 'cancel',
                    },
                  ],
                );
                setDurationEngagement(value);
                break;
            }
          }}
          data={duration_level}
          save="value"
        />
      </View>
      <TouchableOpacity
        style={styles.primaryBtn}
        onPress={() => {
          if (typeEngagement === '' && durationEngagement === '') {
            setErrors(
              "Votre niveau d'engagement et ainsi que votre votre durée d'engagement sont necessaires avant de passer à l'etape suivante",
            );
          } else if (typeEngagement === '') {
            setErrors(
              "Veuillez entrer votre niveau d'engagement avant de passer à l'etape suivante",
            );
          } else if (durationEngagement === '') {
            setErrors(
              "Veuillez entrer votre durée d'engagement avant de passer à l'etape suivante",
            );
          } else {
            Alert.alert(
              'Félicitation 👏',
              `Vous avez souscrit à un engagement de type ${typeEngagement} pour une durée entre ${durationEngagement}`,
              [
                {
                  text: 'Poursuivre ',
                  onPress: () => {
                    navigation.popTo('Details', {
                      person_name: person_name,
                      company: company,
                      engagement_level: typeEngagement,
                      duration: durationEngagement,
                    });
                  },
                  style: 'cancel',
                },
              ],
            );
          }
        }}>
        <Text style={styles.btnText}>Je m'engage dans projet</Text>
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
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 30,
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
  errorText: {
    color: 'red',
    fontSize: 12,
    lineHeight: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 20,
  },
});
export default Engagement;
