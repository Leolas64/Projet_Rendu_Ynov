import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import styled from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import axios from 'axios';
import favFunc from '../../utilitaires/favFunc';
import Manga from '../manga';

const Favoris = () => {
  const [favoris, setFavoris] = useState([]);

  useFocusEffect(() => {
    const pickFav = async () => {
      const favorisChoisis = await favFunc();
      setFavoris(favorisChoisi);
    };
    pickFav();
  });

  return (
    <ScrollView>
      <Text>Page des Favoris</Text>
      {favoris.map(manga => (
        <View key={manga.id}>
          <Text>{manga.title}</Text>
          <Image
            style={{width: 100, height: 100}}
            source={{
              uri: `https://api.jikan.moe/v4/manga/${id}/pictures`,
            }}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default Favoris;
