import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {FlatList,Image,SafeAreaView,ScrollView,Text,TouchableOpacity,View,} from 'react-native';
import {NavigationButton} from '../../components/button';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import favFunc from '../../utilitaires/favFunc';
import stillConnected from '../../utilitaires/stillConnected';
import AsyncStorage from '@react-native-async-storage/async-storage';


const MangaList =({navigation}) => {
  const [mangas, setMangas] = useState([]);
  const [page,setPage] = useState(0);
  const offset = 30;

  useEffect(() => {
    stillConnected(navigation);
  }, []);

  useEffect(() => {
    const getDatas = async () => {
      try {
        const result = await axios({
          method:'GET',
          url: 'https://api.jikan.moe/v4/manga',
          params:{
            offset: offset*page,
            limit: 30,
          },
        });
        setMangas([...mangas, ...result.data.data]);
      } catch (error) {
        console.log(error);
      }
    };
    getDatas();
  }, [page]);

  const disconnect = async () => {
    await AsyncStorage.removeItem('token');
    navigation.navigate('Login');
  };

  const isInFavorite = async manga => {};

  const AddOrRemoveToFavorite = async manga => {
    const localFavorite = await favFunc();
    console.log(localFavorite);
    const index = localFavorite.findIndex(item => item.id === manga.id);
    console.log(index);
    if (index === -1) {
      localFavorite.push(manga);
      await AsyncStorage.setItem('favorite', JSON.stringify(localFavorite));
    } else {
      localFavorite.splice(index, 1);
      await AsyncStorage.setItem('favorite', JSON.stringify(localFavorite));
    }
  };


  return(
    <View>
      <Text>Liste des mangas</Text>
      <NavigationButton onPress={disconnect} label="Se deconnecter" />
      <NavigationButton
        onPress={() => navigation.navigate('Login')}
        label="Page Login"
      />
      <NavigationButton
        onPress={() => navigation.navigate('Favoris')}
        label="Liste Favoris"
      />

      <FlatList
        data={mangas}
        keyExtractor={item => item.id}
        onEndReached={() => setPage(page + 1)}
        renderItem={({item}) => {
          return (
            <>
              <TouchableOpacity
                onPress={() => navigation.navigate('Manga', {id: item.id})}>
                <Image
                  style={{width: 100, height: 100}}
                  source={require('../../assets/images/MangaDefault.jpg')}
                />
                <Text>{item.name}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => AddOrRemoveToFavorite(item)}
                style={{padding: 24}}>
                <Text>Ajoutez aux favoris</Text>
              </TouchableOpacity>
            </>
          );
        }}
      />
    </View>
  );
}

export default MangaList;
