import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
  TextInput,
  Alert,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Modal from 'react-native-modal';
// NativeStackScreenProps : permet de typer les propriétés (props) des écrans dans une application React Native avec TypeScript
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {SafeAreaView} from 'react-native-safe-area-context';
type DashboardProps = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

import logo from '../assets/images/dcc.png';
import {RadioGroup} from 'react-native-radio-buttons-group';
import {SelectList} from 'react-native-dropdown-select-list';

const Dashboard = ({navigation}: DashboardProps) => {
  const [prospections, setProspections] = useState([]);
  const [nbProspects, setNbProspects] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [prospectToUpdate, setProspectToUpdate] = useState({});

  const [newName, setNewName] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newEngagementLevel, setNewEngagementLevel] = useState('');
  const [newDuration, setNewDuration] = useState('');

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

  useEffect(() => {
    try {
      const fetchProspectionDocuments = async () => {
        const subscriber = await firestore()
          .collection('prospections')
          .orderBy('createdAt', 'desc')
          .onSnapshot(querySnapshot => {
            setNbProspects(querySnapshot.size);
            const prospectionsData = [];
            querySnapshot.forEach(documentSnapshot => {
              // Transformation
              prospectionsData.push({
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              });
            });
            setProspections(prospectionsData);
            setIsLoading(false);
            console.log(prospections);
          });
        return () => subscriber();
      };
      setNewName(prospectToUpdate.name);
      fetchProspectionDocuments();
    } catch (e) {
      console.log(e);
    }
  }, []);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          padding: 20,
        }}>
        <ActivityIndicator color="#34495e" size="large" />
      </View>
    );
  }
  // const handleUpdate = async () => {
  //   try {
  //     await firestore().collection("users").doc(userId).update({ name });
  //     alert("Mise à jour réussie !");
  //   } catch (error) {
  //     alert("Erreur : " + error.message);
  //   }
  // };

  return (
    <SafeAreaView style={{marginTop: 30}}>
      {/* TODO  */}
      <Modal
        isVisible={isModalVisible}
        animationIn="shake"
        animationOut="slideOutDown"
        onBackdropPress={() => setIsModalVisible(false)} // Ferme en cliquant à l'extérieur
      >
        {/* Container */}
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {/* Modal */}
          <View
            style={{
              backgroundColor: 'white',
              width: 300,
              maxHeight: 550,
              borderRadius: 10,
              padding: 10,
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#34495e',
                marginBottom: 10,
              }}>
              Formulaire de modification
            </Text>
            <TextInput
              style={{
                height: 40,
                width: 200,
                borderWidth: 1,
                borderRadius: 15,
                backgroundColor: 'white',
                padding: 10,
                fontWeight: 'bold',
                marginBottom: 10,
              }}
              value={newName}
              onChangeText={setNewName}
            />
            <SelectList
              placeholder="compagnies"
              defaultOption={{
                key: companies.indexOf(prospectToUpdate.company),
                value: prospectToUpdate.company,
              }} // Définit l'option par défaut
              boxStyles={{width: 200}}
              dropdownTextStyles={{fontSize: 14, fontWeight: '600', padding: 6}}
              setSelected={company => {
                setNewCompany(company);
              }}
              data={companies}
              save="value"
            />
            <View style={{marginBottom: 10}}></View>
            <SelectList
              placeholder="engagement"
              defaultOption={{
                key: engagements.indexOf(prospectToUpdate.engagement_level),
                value: prospectToUpdate.engagement_level,
              }} // Définit l'option par défaut
              boxStyles={{width: 200}}
              dropdownTextStyles={{fontSize: 14, fontWeight: '600', padding: 6}}
              setSelected={engagement => {
                setNewEngagementLevel(engagement);
              }}
              data={engagements}
              save="value"
            />
            <View style={{marginBottom: 10}}></View>
            <SelectList
              placeholder="duration"
              defaultOption={{
                key: durations.indexOf(prospectToUpdate.duration),
                value: prospectToUpdate.duration,
              }} // Définit l'option par défaut
              boxStyles={{width: 200}}
              dropdownTextStyles={{fontSize: 14, fontWeight: '600', padding: 6}}
              setSelected={duration => {
                setNewDuration(duration);
              }}
              data={durations}
              save="value"
            />

            <TouchableOpacity
              style={{
                backgroundColor: 'white',
                borderColor: '#d35400',
                borderWidth: 1,
                padding: 10,
                width: 100,
                borderRadius: 8,
                marginTop: 10,
              }}
              onPress={() => {
                Alert.alert(
                  'Confirmation',
                  'Êtes vous sûres de vouloir modifier cette prospection',
                  [
                    {
                      text: 'Oui',
                      style: 'cancel',
                      onPress: async () => {
                        try {
                          const newData = {
                            name: newName,
                            company: newCompany,
                            engagement_level: newEngagementLevel,
                            duration: newDuration,
                            createdAt: firestore.FieldValue.serverTimestamp(),
                          };
                          await firestore()
                            .collection('propections')
                            .doc(prospectToUpdate.key)
                            .set(newData, {merge: true});
                          console.log('Document mis à jour !');
                          navigation.popTo('Dashboard');
                        } catch (error) {
                          console.error(
                            'Erreur lors de la mise à jour :',
                            error,
                          );
                        }
                      },
                    },
                    {
                      text: 'Non',
                      style: 'destructive',
                    },
                  ],
                );
              }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: '#d35400',
                  textAlign: 'center',
                }}>
                Modifier
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* TODO  */}

      <StatusBar backgroundColor={'#34495e'} />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 120,
          marginTop: 60,
        }}>
        <Image
          style={{
            height: 150,
            width: 200,
            padding: 10,
            borderRadius: 10,
          }}
          source={logo}
        />
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 30,
          marginTop: 15,
        }}>
        <TextInput
          placeholder="Rechercher une prospection"
          style={{
            height: 50,
            width: 300,
            borderWidth: 1,
            borderRadius: 15,
            backgroundColor: 'white',
            padding: 15,
            marginTop: 30,
            marginBottom: 40,
          }}
        />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          marginTop: 20,
          marginBottom: 30,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#34495e',
            height: 35,
            padding: 8,
            borderRadius: 8,
          }}
          onPress={() => {
            // TODO: Navigation Home
            navigation.popTo('Register');
          }}>
          <Text style={{color: 'white'}}>Nouvelle prospection</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            borderColor: '#34495e',
            borderWidth: 1,
            height: 35,
            padding: 8,
            borderRadius: 8,
          }}>
          <Text style={{color: '#34495e', fontWeight: 'bold'}}>
            Extraire sous format
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          //   alignItems: 'center',
          marginBottom: 30,
        }}>
        <Text
          style={{
            backgroundColor: 'white',
            height: 30,
            padding: 5,
            borderRadius: 8,
            borderColor: '#34495e',
            color: '#34495e',
            fontWeight: 'bold',
            borderWidth: 1,
          }}>
          Nombre de prospects obtenus :{nbProspects}
        </Text>
      </View>
      <FlatList
        data={prospections}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Image
              source={{
                uri: `https://ui-avatars.com/api/?name=${
                  item.name.split(' ').slice(0, 2)[0]
                }+${
                  item.name.split(' ').slice(0, 2)[1]
                }&background=random&size=120&font-size=0.33&bold=true`,
              }}
              style={styles.image}
            />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.details}>💼 {item.company}</Text>
              {item.engagement_level === 'Bronze' ? (
                <Text style={styles.infoProscription}>
                  🥉 {item.engagement_level}
                </Text>
              ) : null}
              {item.engagement_level === 'Silver' ? (
                <Text style={styles.infoProscription}>
                  🥈 {item.engagement_level}
                </Text>
              ) : null}
              {item.engagement_level === 'Gold' ? (
                <Text style={styles.infoProscription}>
                  🥇 {item.engagement_level}
                </Text>
              ) : null}
              {item.engagement_level === 'Platinum' ? (
                <Text style={styles.infoProscription}>
                  💠 {item.engagement_level}
                </Text>
              ) : null}
              {item.engagement_level === 'Diamond' ? (
                <Text style={styles.infoProscription}>
                  💎 {item.engagement_level}
                </Text>
              ) : null}
              <Text style={styles.infoProscription}>🗓️ {item.duration}</Text>
              {/* <Text style={styles.infoProscription}> */}
              {/* ✅ :{' '} */}
              {/* {item.createdAt
                  ? createdAt.toDate().toLocaleString()
                  : 'Date inconnue'} */}
              {/* </Text> */}
              <TouchableOpacity
                style={styles.buttonUpdate}
                onPress={() => {
                  setIsModalVisible(true);
                  setProspectToUpdate(item);
                  console.log(item);
                }}>
                <Text style={styles.buttonTextUpdate}>Editer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonDelete}
                onPress={() => {
                  Alert.alert(
                    'Confirmation',
                    `Êtes vous sûres de vouloir supprimer definitivement ${item.name} dans liste des prospections`,
                    [
                      {
                        text: 'Oui',
                        style: 'cancel',
                        onPress: async () => {
                          const documentID = item.key;
                          try {
                            await firestore()
                              .collection('prospections')
                              .doc(documentID)
                              .delete();
                            console.log('Document supprimé avec succès !');
                            navigation.popTo('Dashboard');
                          } catch (error) {
                            console.error(
                              'Erreur lors de la suppression :',
                              error,
                            );
                          }
                        },
                      },
                      {
                        text: 'Non',
                        style: 'destructive',
                      },
                    ],
                  );
                }}>
                <Text style={styles.buttonTextDelete}>Supprimer</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        // keyExtractor={prospection => prospection.key}
        contentContainerStyle={styles.container}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    // paddingTop: 10,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fbfbfb',
    borderWidth: 4,
    borderColor: '#DCDCDC',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  info: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 14,
    color: '#888',
    marginVertical: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  star: {
    fontSize: 16,
    color: '#FFD700',
  },
  infoProscription: {
    fontSize: 14,
    color: '#888',
    marginVertical: 5,
  },
  buttonUpdate: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#f1c40f',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDelete: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e74c3c',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonTextUpdate: {
    color: '#f1c40f',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextDelete: {
    color: '#e74c3c',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Dashboard;
