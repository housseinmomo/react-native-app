import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import logo from '../assets/images/D2C-removebg-preview.png';
import recap_illustration from '../assets/images/recap_illustration.png';
import {SelectList} from 'react-native-dropdown-select-list';

const companies = [
  {key: '1', value: 'Telecom'},
  {key: '2', value: 'DMP'},
  {key: '3', value: 'EDD'},
  {key: '4', value: 'ONEAD'},
  {key: '5', value: 'CNSS'},
  {key: '6', value: 'LANA'},
  {key: '7', value: 'MENFOP'},
];

const engagements = [
  {key: '1', value: 'Bronze'},
  {key: '2', value: 'Silver'},
  {key: '3', value: 'Gold'},
  {key: '4', value: 'Platinum'},
  {key: '5', value: 'Diamond'},
];
const durations = [
  {key: '1', value: '1 - 3 mois'},
  {key: '2', value: '3 - 6 mois'},
  {key: '3', value: '6 - 9 mois'},
  {key: '4', value: '12 - 15 mois'},
  {key: '5', value: '16 - 24 mois'},
];

type DetailsProps = NativeStackScreenProps<RootStackParamList, 'Details'>;

const Details = ({route, navigation}: DetailsProps) => {
  const {person_name, company, engagement_level, duration} = route.params;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [name, setName] = useState(person_name);
  const [companyName, setCompanyName] = useState(company);
  const [engagementLevel, setEngagementLevel] = useState(engagement_level);
  const [durationOfEngagement, setDurationOfEngagement] = useState(duration);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#34495e'} />
      {/* <View style={styles.modalContainer}> */}
      {/* <Modal
          isVisible={isModalVisible}
          animationIn="shake"
          animationOut="slideOutDown"
          onBackdropPress={() => setIsModalVisible(false)} // Ferme en cliquant à l'extérieur
        >
          <View style={styles.modalContent}>
            <View style={styles.modalInputWrapper}>
              <Text style={styles.modalText}>
                Modifier cette prospection avant de l'envoyer dans la base de
                données
              </Text>
              <TextInput
                style={styles.modalInput}
                value={name}
                onChangeText={setName}
              />
              <SelectList
                data={companyName}
                placeholder="Votre compagnie"
                boxStyles={{width: 250}}
                dropdownTextStyles={{
                  fontSize: 14,
                  fontWeight: '600',
                  padding: 6,
                }}
                setSelected={value => {
                  setCompanyName(value);
                }}
                data={companies}
                save="value"
              />
              <View style={{marginTop: 10}}></View>
              <SelectList
                placeholder="Niveaux d'engagement"
                boxStyles={{width: 250}}
                dropdownTextStyles={{
                  fontSize: 14,
                  fontWeight: '600',
                  padding: 6,
                }}
                setSelected={value => {
                  setEngagementLevel(value);
                }}
                data={engagements}
              />
              <TextInput
                style={[styles.modalInput, {marginTop: 10}]}
                value={engagementLevel}
                onChangeText={setEngagementLevel}
              />
              <TextInput
                style={styles.modalInput}
                value={durationOfEngagement}
                onChangeText={setDurationOfEngagement}
              />
              <TouchableOpacity
                onPress={() => {
                  navigation.popTo('Details', {
                    person_name: name,
                    company: companyName,
                    engagement_level: engagementLevel,
                    duration: durationOfEngagement,
                  });
                  setIsModalVisible(false);
                }}
                style={[styles.btn, styles.btn]}>
                <Text style={[styles.TextUpdate, {borderColor: '#e67e22'}]}>
                  Modifier
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal> */}
      {/* </View> */}
      <View style={{elevation: 3, shadowOffset: {width: 1, height: 1}}}>
        <Image
          style={{
            height: 200,
            width: 200,
            borderRadius: 10,
            padding: 18,
            // backgroundColor: 'white',
            marginBottom: 15,
          }}
          source={recap_illustration}
        />
      </View>
      {/* <Text style={styles.headingText}>
        Verifier une derniere fois avant de valider
      </Text> */}
      <View style={styles.inputWrapper}>
        <Text style={styles.labelText}>👨🏻‍💼</Text>
        <TextInput
          style={styles.inputFullWidth}
          onChangeText={() => {}}
          value={person_name}
          placeholder=""
          editable={false}
        />
      </View>
      <ScrollView horizontal={true}>
        <View style={styles.inputWrapperColumn}>
          <View style={styles.inputWrapper}>
            <Text style={styles.labelText}>💼</Text>
            <TextInput
              style={styles.input}
              value={company}
              placeholder="La compagnie"
              editable={false}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.labelText}>📊</Text>
            <TextInput
              style={styles.input}
              onChangeText={() => {}}
              value={engagement_level}
              placeholder="Le type d'engagement"
              editable={false}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.labelText}>🗓️</Text>
            <TextInput
              style={styles.input}
              onChangeText={() => {}}
              value={duration}
              placeholder="La durée d'engagement"
              editable={false}
            />
          </View>
        </View>
      </ScrollView>
      <View style={styles.btnWrapper}>
        <TouchableOpacity
          style={[styles.btn, styles.BtnDelete]}
          onPress={() => {
            Alert.alert(
              'Annuler cette prospection',
              'Vous souhaitez cette prospection',
              [
                {
                  text: 'Oui',
                  style: 'cancel',
                  onPress: () => {
                    navigation.popTo('Dashboard');
                  },
                },
                {
                  text: 'Non',
                  style: 'destructive',
                },
              ],
            );
          }}>
          <Text style={styles.TextDelete}>Annuler</Text>
        </TouchableOpacity>
        {/* 
        <TouchableOpacity
          style={[styles.btn, styles.BtnUpdate]}
          onPress={() => {
            Alert.alert(
              'Modifier cette prospection',
              'Vous souhaitez modifier cette prospection',
              [
                {
                  text: 'Oui',
                  style: 'cancel',
                  onPress: () => {
                    // Todo
                    // Afficher un modal / formulaire de update
                    setIsModalVisible(true);
                    // Utiliser nos setter
                    // Revenir sur la meme page avec les nouvelles information
                  },
                },
                {
                  text: 'Non',
                  style: 'destructive',
                },
              ],
            );
          }}>
          <Text style={styles.TextUpdate}>Modifier</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={[styles.btn, styles.btnPrimary]}
          onPress={async () => {
            // TODO : Push to firebase
            try {
              await firestore().collection('prospections').add({
                name: name,
                company: companyName,
                engagement_level: engagementLevel,
                duration: durationOfEngagement,
                createdAt: firestore.FieldValue.serverTimestamp(),
              });
              // TODO : Redirection vers congrat
              console.log('Document ajouté avec succès !');
              navigation.popTo('Congratulation');
            } catch (error) {
              console.error('Erreur Firestore:', error);
            }
          }}>
          <Text style={styles.textPrimary}>Valider</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  inputWrapper: {
    padding: 22,
    backgroundColor: 'white',
    margin: 10,
    borderWidth: 1,
    elevation: 3,
    borderRadius: 4,
    shadowOffset: {height: 1, width: 1},

    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headingText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: 100,
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: 'white',
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalInput: {
    height: 50,
    width: 250,
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: 'white',
    padding: 15,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputFullWidth: {
    height: 50,
    width: 300,
    borderWidth: 1,
    borderRadius: 15,
    backgroundColor: 'white',
    padding: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  labelText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    opacity: 0.6,
    marginBottom: 8,
  },
  btnPrimary: {
    backgroundColor: 'white',
    borderColor: '#2c3e50',
    borderWidth: 1,
  },
  textPrimary: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
  },
  BtnUpdate: {
    backgroundColor: 'white',
    borderColor: '#d35400',
    borderWidth: 1,
  },
  TextUpdate: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#d35400',
    textAlign: 'center',
  },
  BtnDelete: {
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: 'red',
  },
  TextDelete: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
  },
  inputWrapperColumn: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: -30,
    height: 150,
  },
  btn: {
    padding: 10,
    width: 150,
    margin: 4,
    borderRadius: 4,
    elevation: 1,
    shadowOffset: {height: 1, width: 1},
  },
  btnWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  modalInputWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 30,
    height: 400,
    borderRadius: 10,
  },
  modalText: {fontSize: 16, marginBottom: 15, textAlign: 'center'},
});

export default Details;
