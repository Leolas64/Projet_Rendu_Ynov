import React from 'react';
import {Text, TextInput, View} from 'react-native';
import {NavigationButton} from '../button';

const LoginForm = ({setInputs, inputs, submitForm}) => {
  return (
    <View>
      <Text>Username</Text>
      <TextInput
        onChangeText={text => setInputs({...inputs, username: text})}
        value={inputs.username}
      />
      <Text>Password</Text>
      <TextInput
        onChangeText={text => setInputs({...inputs, password: text})}
        value={inputs.password}
      />
      <NavigationButton label="SUBMIT" onPress={submitForm} />
    </View>
  );
};

export default LoginForm;