import AsyncStorage from '@react-native-async-storage/async-storage';

const favFunc = async () => {
  const favoriteLocal = JSON.parse(await AsyncStorage.getItem('favorite'));
  return favoriteLocal ? favoriteLocal : [];
};

export default favFunc;
