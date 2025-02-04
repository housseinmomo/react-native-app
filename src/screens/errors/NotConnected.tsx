import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState} from 'react';
import NetInfo from '@react-native-community/netinfo';
import notConnecteIllustration from '../../assets/images/not_connected_illustration.png';

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
type NotConnectedProps = NativeStackScreenProps<
  RootStackParamList,
  'NotConnected'
>;

const NotConnected = ({navigation}: NotConnectedProps) => {
  const [isConnected, setIsConnected] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        padding: 8,
      }}>
      <Text
        style={{
          fontSize: 14,
          lineHeight: 30,
          textAlign: 'center',
          fontWeight: 'bold',
          marginBottom: 20,
          color: '#34495e',
          backgroundColor: 'white',
          padding: 10,
          borderRadius: 8,
          borderWidth: 1,
          elevation: 1,
          shadowOffset: {height: 1, width: 1},
        }}>
        ⚠️ Un problème de connexion a été détecté. Une bonne connectivité est
        essentielle pour accéder à vos ressources hébergées sur le cloud.
        Veuillez réactiver votre Wi-Fi ou vos données mobiles, puis cliquez sur
        le bouton de rafraîchissement
      </Text>
      <Image
        source={notConnecteIllustration}
        style={{height: 350, width: 350}}
      />
      <TouchableOpacity
        style={{
          backgroundColor: 'white',
          padding: 15,
          marginTop: 10,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: '#34495e',
        }}
        onPress={() => {
          // TODO : check if client is connected to internet
          // setIsLoading(true);
          // setTimeout(() => null, 1000);
          const checkConnectivity = NetInfo.addEventListener(state => {
            console.log('Is connected ?', state.isConnected);
            setIsConnected(Boolean(state.isConnected));
          });

          checkConnectivity();
          console.log(isConnected);
          if (isConnected === true) {
            // Redirection Dashbord
            navigation.popTo('Dashboard');
          } else {
            // Redirection Home
            navigation.popTo('Home');
          }
        }}>
        <Text style={{fontWeight: 'bold'}}>Rafraichissement</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NotConnected;
