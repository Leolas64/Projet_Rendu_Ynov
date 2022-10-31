import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Dimensions} from 'react-native';
import MangaList from '../screens/mangaList';
import Manga from '../screens/manga';
import Favoris from '../screens/favoris';
import Login from '../screens/login';

const Stack = createNativeStackNavigator();

const Routes = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='MangaList' component={MangaList}/>
        <Stack.Screen name='Manga' component={Manga}/>
        <Stack.Screen name='Favoris' component={Favoris}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Routes;