import { View } from 'react-native';
import { Container, AreaInput, Input, List } from './styles'
import { useEffect, useState } from 'react';

import Feather from 'react-native-vector-icons/Feather'
import firestore from '@react-native-firebase/firestore'
import SearchList from '../../components/SearchList'

export default function Search() {
  const [input, setInput] = useState('');
  const [users, setUsers] = useState([]);


  useEffect(() => {
    if(input === '' || input === undefined) {
      setUsers([])
      return;
    }

    const subscriber = firestore().collection('users')
    .where('name', '>=', input)
    .where('name', '<=', input + '\uf8ff')
    .onSnapshot( snapshot => {
      const usersList = [];

      snapshot.forEach(doc => {
        usersList.push({
          ...doc.data(),
          id: doc.id
        });
      });

      setUsers(usersList)
      console.log(usersList)

    });

    return () => subscriber();

  },[input])

  return (
    <Container>
      <AreaInput>
        <Feather
        name='search'
        color='#28A745'
        size={20}
        />

        <Input
        placeholder='Looking for someone?'
        placeholderTextColor={'#202225'}
        value={input}
        onChangeText={(text) => setInput(text)}
        />
      </AreaInput>

      <List
        showsVerticalScrollIndicator={false}
        data={users}
        keyExtractor={(item) => item.id }
        renderItem={({item}) => <SearchList data={item}/>}
      />
    </Container>
  );
}