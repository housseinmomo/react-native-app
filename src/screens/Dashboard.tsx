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
  Platform,
  PermissionsAndroid,
} from 'react-native';
import firestore, {getDocs} from '@react-native-firebase/firestore';
import Modal from 'react-native-modal';
// NativeStackScreenProps : permet de typer les propriétés (props) des écrans dans une application React Native avec TypeScript
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {SafeAreaView} from 'react-native-safe-area-context';
type DashboardProps = NativeStackScreenProps<RootStackParamList, 'Dashboard'>;

import FileViewer from 'react-native-file-viewer';

import logo from '../assets/images/dcc.png';
import {RadioGroup} from 'react-native-radio-buttons-group';
import {SelectList} from 'react-native-dropdown-select-list';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';

const Dashboard = ({navigation}: DashboardProps) => {
  const [prospections, setProspections] = useState([]);
  const [nbProspects, setNbProspects] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Update Process State
  const [prospectToUpdate, setProspectToUpdate] = useState({});
  const [prospectionKey, setProspectionKey] = useState('');
  const [newName, setNewName] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newEngagementLevel, setNewEngagementLevel] = useState('');
  const [newDuration, setNewDuration] = useState('');

  // Search Bar State
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]);
  const [isLoadingFilteredData, setIsLoadingFilteredData] = useState(false);

  // Pagination State
  const [lastDocument, setLastDocument] = useState();

  // PDF
  const [pdfPath, setPdfPath] = useState('');
  const [isLoadingPdfFile, setIsLoadingPdfFile] = useState(false);

  const searchProspections = async (text: string) => {
    setSearchText(text);
    if (text.length < 1) {
      setResults([]); // Vider les résultats si l'entrée est vide
      return;
    }
    try {
      // TODO : Fonction Rechercher
      setIsLoadingFilteredData(true);
      const fetchFilteredDataFromFirestore = await firestore()
        .collection('prospections')
        .where('name', '>=', text)
        .where('name', '<=', text + '\uf8ff');

      const querySnapshot = await getDocs(fetchFilteredDataFromFirestore);

      const prospectionFiltered = [];
      querySnapshot.forEach(doc => {
        prospectionFiltered.push({key: doc.id, ...doc.data()});
      });
      setResults(prospectionFiltered);
      console.log(results);
      console.log('Fin de la recherche');
      setIsLoadingFilteredData(false);
    } catch (e) {
      console.error('Erreur lors de la recherche :', e);
    }
  };

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
      fetchProspectionDocuments();
    } catch (e) {
      console.log(e);
    }
  }, []);

  // Update Effect
  useEffect(() => {
    // State POST UPDATE
    setNewName(prospectToUpdate.name);
    setNewCompany(prospectToUpdate.company);
    setNewEngagementLevel(prospectToUpdate.engagement_level);
    setNewDuration(prospectToUpdate.duration);
    setProspectionKey(prospectToUpdate.key);
  }, [prospectToUpdate]);

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
    <SafeAreaView style={{marginTop: 10, marginBottom: 80}}>
      {/* TODO  */}
      <Modal
        isVisible={isModalVisible}
        animationIn="bounceIn"
        animationOut="fadeOut"
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
                          console.log(newData);
                          await firestore()
                            .collection('prospections')
                            .doc(prospectionKey)
                            .update(newData)
                            .then(() => {
                              console.log('Document mis à jour !');
                            });

                          if (searchText === '') {
                            setIsModalVisible(false);
                            console.log('Edit Normal');
                          } else {
                            console.log('Edit avec des prospects filtrees');
                            setSearchText('');
                            setIsModalVisible(false);
                            navigation.popTo('Dashboard');
                          }
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
          marginBottom: 100,
          marginTop: 60,
        }}>
        <Image
          style={{
            height: 100,
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
          value={searchText}
          onChangeText={searchProspections}
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
            navigation.push('Register');
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
          }}
          onPress={async () => {
            setIsLoadingPdfFile(true);

            console.log(prospections);
            if (Platform.OS === 'android') {
              await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
              );
            }
            let tableRows = prospections
              .map(
                item =>
                  `<tr>
                            <td>${item.name}</td>
                            <td>${item.company}</td>
                            <td>${item.engagement_level}</td>
                            <td>${item.duration}</td>
                        </tr>`,
              )
              .join('');
            let htmlContent = `
                      <html>
                      <head>
                          <style>
                            h1{
                              text-align: center;
                              font-size: 30;
                            }
                              table { width: 100%; border-collapse: collapse; }
                              th {background-color: #34495e; color: white }
                              th, td { border: 1px solid black; padding: 8px; text-align: center; font-size: 18; font-weight: bold }
                              .info{
                              font-size: 18; font-weight: bold; color: #34495e
                              }
                          </style>
                      </head>
                      <body>
                          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZthEuttQlzJogsblc6U-Ua5R5nVdc0wZAEA&s" />
                          <p class=info>Adresse : H4RP+224, Rue de Venice, Djibouti</p>
                          <p class=info>Téléphone : 21 35 13 22</p>
                          <p class=info>Site Web : http://www/sdsi.dj</p>
                          <p class=info>Email : sdsi@internet.dj</p>
                          <h1>Liste des engagements</h1>
                          <h2>Nombre d'engagements : ${nbProspects}</h2>
                          <hr />
                          <table>
                              <tr>
                                  <th>Nom</th>
                                  <th>Compagnie</th>
                                  <th>Engagement</th>
                                  <th>Durée d'engagement</th>
                              </tr>
                              ${tableRows}
                          </table>
                      </body>
                      </html>
                  `;
            let options = {
              html: htmlContent,
              fileName: 'Liste_Engagment',
              directory: 'Documents',
            };
            try {
              let file = await RNHTMLtoPDF.convert(options);
              setPdfPath(file.filePath);
              console.log('PDF généré : ', file.filePath);
              setIsLoadingPdfFile(false);

              Alert.alert('Succès', 'PDF généré avec succès !', [
                {
                  text: 'Ouvrir',
                  onPress: async () => {
                    console.log('Fin du chargement du fichier');
                    await FileViewer.open(pdfPath)
                      .then(() => {
                        console.log('Fichier ouvert avec succès !');
                      })
                      .catch(error => {
                        Alert.alert(
                          'Erreur',
                          "Impossible d'ouvrir le fichier.",
                        );
                        console.log(error);
                      });
                  },
                },
                {
                  text: 'Partager',
                  style: 'cancel',
                  onPress: async () => {
                    await Share.open({url: `file://${pdfPath}`});
                  },
                },
              ]);
            } catch (e) {
              console.log(e);
            }
          }}>
          {isLoadingPdfFile ? (
            <ActivityIndicator color="#34495e" size="small" />
          ) : (
            <Text style={{color: '#34495e', fontWeight: 'bold'}}>
              Exporter en PDF
            </Text>
          )}
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
          Nombre de prospects obtenus :{' '}
          {searchText === '' ? nbProspects : results.length}
        </Text>
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 30,
          marginBottom: 20,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            padding: 4,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#34495e',
            marginRight: 15,
            marginLeft: 15,
            width: 100,
            height: 30,
          }}>
          <Text style={{textAlign: 'center', color: '#34495e'}}>
            ◀ Précédent
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            width: 40,
            height: 30,
            padding: 4,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#34495e',
            marginRight: 15,
            marginLeft: 15,
          }}>
          <Text style={{textAlign: 'center', color: '#34495e'}}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: 'white',
            width: 100,
            height: 30,
            padding: 4,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: '#34495e',
            marginRight: 15,
            marginLeft: 15,
          }}>
          <Text style={{textAlign: 'center', color: '#34495e'}}>Suivant ▶</Text>
        </TouchableOpacity>
      </View>
      {isLoadingFilteredData ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20,
            marginTop: 10,
            marginBottom: 10,
          }}>
          <ActivityIndicator color="#34495e" size="large" />
        </View>
      ) : null}
      {searchText !== '' && searchText.length > 1 ? (
        <FlatList
          style={styles.flatListComponent}
          data={results}
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
                            console.log(documentID);
                            try {
                              await firestore()
                                .collection('prospections')
                                .doc(documentID)
                                .delete();
                              console.log('Document supprimé avec succès !');
                              setSearchText('');
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
      ) : (
        <FlatList
          style={styles.flatListComponent}
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
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    // paddingTop: 10,
    marginBottom: 50,
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
  flatListComponent: {
    marginTop: 10,
    marginBottom: 210,
  },
});

export default Dashboard;
