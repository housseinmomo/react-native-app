import {
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  Button,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

// NativeStackScreenProps : permet de typer les propriétés (props) des écrans dans une application React Native avec TypeScript
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

// import logosdsi from '../assets/images/logo.png';
import logo from '../assets/images/D2C-removebg-preview.png';
// import logo from '../assets/images/DD.jpg';

const Home = ({navigation}: HomeProps) => {
  return (
    <>
      <StatusBar backgroundColor={'#34495e'} />
      <ImageBackground
        source={{
          uri: 'https://images.unsplash.com/photo-1663296160988-c4e31a41e507?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        }}
        style={{width: '100%', height: '100%'}}>
        <View style={styles.container}>
          <View style={{elevation: 3, shadowOffset: {heigh: 1, width: 1}}}>
            <Image
              source={logo}
              style={{
                height: 150,
                width: 200,
                borderRadius: 8,
                borderWidth: 2,
                borderColor: 'white',
                padding: 18,
                backgroundColor: 'white',
              }}
            />
          </View>
          <Text style={styles.smallText}>
            Bienvenue sur la plateforme de levée de fonds de l’École 42, où
            chaque contribution aide à coder l’avenir !
          </Text>
          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() => {
              navigation.popTo('Dashboard');
            }}>
            <Text style={styles.btnText}>Consulter votre dashboard</Text>
          </TouchableOpacity>
        </View>
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
    // backgroundColor: 'white',
  },

  headingText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 8,
    marginBottom: 60,
    color: '#34495e',
  },
  smallText: {
    color: '#34495e',
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 35,
    marginTop: 260,
    backgroundColor: 'white',
    margin: 10,
    padding: 10,
    borderRadius: 8,
    elevation: 1,
  },
  imgContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  primaryBtn: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#34495e',
  },
  btnText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#34495e',
  },
});
export default Home;
