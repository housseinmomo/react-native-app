import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Image,
  StatusBar,
  Text,
} from 'react-native';
import React, {useEffect} from 'react';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import logo from '../assets/images/D2C-removebg-preview.png';
import congrat_illustration from '../assets/images/congrat_illustration.png';

type CongratulationProps = NativeStackScreenProps<
  RootStackParamList,
  'Congratulation'
>;

const Congratulation = ({navigation}: CongratulationProps) => {
  return (
    <>
      <StatusBar backgroundColor={'#34495e'} />

      <ImageBackground
        source={{
          uri: 'https://img.freepik.com/premium-photo/light-blue-abstract-stylish-technological-art-background-34_769134-618.jpg?w=360',
        }}
        resizeMode="cover"
        style={[
          {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 2,
          },
          styles.container,
        ]}>
        <View style={{elevation: 3, shadowOffset: {width: 1, height: 1}}}>
          <Image
            style={{
              height: 250,
              width: 250,
              borderRadius: 10,
              padding: 18,
              // backgroundColor: 'white',
              marginBottom: 15,
            }}
            source={congrat_illustration}
          />
        </View>
        <Text style={styles.headingText}>
          Merci Beaucoup, toute l'equipe de SDSI vous remercie pour votre
          participation dans ce projet.
        </Text>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => {
            navigation.popTo('Dashboard');
          }}>
          <Text style={styles.btnText}>Accéder au Dashboard</Text>
        </TouchableOpacity>
      </ImageBackground>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    padding: 20,
  },
  headingText: {
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: 'bold',
    textAlign: 'center',
    lineHeight: 60,
    marginBottom: 25,
    color: 'white',
    elevation: 2,
    borderWidth: 2,
    borderColor: 'white',
  },
  primaryBtn: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#000000',
  },
  btnText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default Congratulation;
