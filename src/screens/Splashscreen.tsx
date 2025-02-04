import React, {useEffect, useState} from 'react';
import {View, ActivityIndicator, StyleSheet, Image, Text} from 'react-native';
import RNBootSplash from 'react-native-bootsplash';

import loading_illustration from '../assets/images/loading_illustration.png';

const SplashScreen = ({onFinish}: {onFinish: () => void}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Splash Screen
    RNBootSplash.hide({fade: true});

    // Suivi d'un spinner
    setTimeout(() => {
      setLoading(false);
      onFinish(); // Quand le chargement est fini, on passe à l'écran principal
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#34495e" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#fff', // Assure-toi que ça matche avec ton splash screen
  },
});

export default SplashScreen;
