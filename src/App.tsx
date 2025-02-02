import React, {Children, useEffect} from 'react';

// Navigation
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Screens
import Home from './screens/Home';
import Details from './screens/Details';
import Register from './screens/Register';
import Engagement from './screens/Engagement';
import Congratulation from './screens/Congratulation';
import Dashboard from './screens/Dashboard';
import {ActivityIndicator} from 'react-native';
// import SplashScreen from 'react-native-splash-screen';

// On predefinie la liste des ecrans ainsi que leurs props en amont avec typescript
export type RootStackParamList = {
  Home: undefined;
  Register: undefined;
  Engagement: {
    person_name: string;
    company: string;
  };
  Details: {
    person_name: string;
    company: string;
    engagement_level: string;
    duration: string;
  };
  Congratulation: undefined;
  Dashboard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  // useEffect(() => {
  //   setTimeout(() => {
  //     return <ActivityIndicator size={'large'} color={'yellow'} />;
  //   }, 2000);
  // }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'SDSI - Crowdfunding - Ecole 42',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 16,
              color: '#34495e',
            },
            headerTitleAlign: 'center',
            animation: 'slide_from_right',
            animationDuration: 400,
          }}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            title: '1/4',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 16,
              color: '#34495e',
            },
            // headerBackVisible: false,
            // headerBackTitle: 'Home',
            // headerBackButtonDisplayMode: 'minimal',
            headerTitleAlign: 'center',
            animation: 'slide_from_right',
            animationDuration: 400,
          }}
        />
        <Stack.Screen
          name="Engagement"
          component={Engagement}
          options={{
            title: '2/4',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 16,
              color: '#34495e',
            },
            headerTitleAlign: 'center',
            animation: 'slide_from_right',
            animationDuration: 400,
          }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{
            title: '3/4',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 16,
              color: '#34495e',
            },
            headerTitleAlign: 'center',
            animation: 'slide_from_right',
            animationDuration: 400,
          }}
        />
        <Stack.Screen
          name="Congratulation"
          component={Congratulation}
          options={{
            title: '4/4',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 16,
              color: '#34495e',
            },
            headerTitleAlign: 'center',
            animation: 'slide_from_bottom',
            animationDuration: 400,
          }}
        />
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{
            title: 'Gestion des prospections',
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 16,
              color: '#34495e',
            },
            headerTitleAlign: 'center',
            animation: 'fade_from_bottom',
            animationDuration: 400,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
