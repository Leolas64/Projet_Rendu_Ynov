import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const Button = ({onPress, label}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{label}</Text>
    </TouchableOpacity>
  );
};

export default Button;
