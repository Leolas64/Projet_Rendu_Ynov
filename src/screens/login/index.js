import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import React, {useEffect} from 'react';
import {Text, TextInput, View} from 'react-native';
import {NavigationButton} from '../../components/button';
import {useFocusEffect} from '@react-navigation/native';
import stillConnected from '../../utilitaires/stillConnected';
import LoginForm from '../../components/loginForm'

const Login = ({navigation}) => {
  const [inputs, setInputs] = React.useState({
    username: '',
    password: '',
  });

  useFocusEffect(() => {
    stillConnected(navigation);
  });

  const submitForm = () => {
    const {username, password} = inputs;

    axios({
      method: 'POST',
      url: 'https://easy-login-api.herokuapp.com/users/login',
      data: {
        username,
        password,
      },
    })
      .then(async res => {
        console.log(res);
        await AsyncStorage.setItem('token', res.headers['x-access-token']);
        navigation.navigate('MangaList');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <View>
      <Text>Page Login</Text>
      <NavigationButton
        onPress={() => navigation.navigate('MangaList')}
        label="Vers la liste des mangas"
      />
      <LoginForm
        setInputs={setInputs}
        submitForm={submitForm}
        inputs={inputs}
      />
    </View>
  );
};

export default Login;
