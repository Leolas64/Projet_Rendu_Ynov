import axios from 'axios';
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';

const Manga = ({route}) => {
  const [manga, setManga] = React.useState({});

  useEffect(() => {
    axios({
      method: 'GET',
      url: `https://api.jikan.moe/v4/manga/${route.params.id}/title`,
    })
      .then(response => {
        setManga(response.data.data[0]);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <View>
      <Text>Page Manga {route.params.id}</Text>
      <Text>{manga.title}</Text>
      <Text>
        {manga.synopsis
          ? manga.synopsis
          : 'Pas de résumé disponible'}
      </Text>
    </View>
  );
};

export default Manga;
