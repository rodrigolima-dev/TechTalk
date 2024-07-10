import React from 'react';

import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Cancel} from './styles'

const CancelButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Cancel>Cancel</Cancel>
    </TouchableOpacity>
  );
};

export default CancelButton;