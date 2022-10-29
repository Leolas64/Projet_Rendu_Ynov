import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {FlatList,Image,SafeAreaView,ScrollView,Text,TouchableOpacity,View,} from 'react-native';
import {NavigationButton} from '../../components/button';
import favFunc from '../../utilitaires/favFunc';
import stillConnected from '../../utilitaires/stillConnected';


const MangaList = {{navigation}} => {
  const [mangas, setMangas] = useState([]);
  const [page,setPage] = useState(0);
  const offset = 20;

  useEffect(() => {
    stillConnected(navigation);
  }, []);

  useEffect(() => {
    const getDatas = async () => {
      try {
        const result = await axios({
          method:'GET',
          url: 'https://api.jikan.moe/v4/',
          params:{
            offset: offset*page,
            limit: 20,
          },
        });
        setMangas([...mangas, ...result.data.data.results]);
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
    const index = localFavorite.findIndex(anime => anime.id === manga.id);
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
        keyExtractor={manga => manga.id}
        onEndReached={() => setPage(page + 1)}
        renderItem={({manga}) => {
          return (
            <>
              <TouchableOpacity
                onPress={() => navigation.navigate('Mangas', {id: manga.id})}>
                <Image
                  style={{width: 100, height: 100}}
                  source={require('../../assets/images/MangaDefault.jpg')}
                />
                <Text>{manga.title}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => AddOrRemoveToFavorite(manga)}
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
