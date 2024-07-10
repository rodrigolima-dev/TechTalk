import { Alert, View } from 'react-native';
import {Container, Button, ButtonText, Input} from './styles'

import { useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../contexts/auth';
import { useContext } from 'react';

import storage from '@react-native-firebase/storage'
import firestore from '@react-native-firebase/firestore'

export default function NewPost() {
  const navigation = useNavigation();
  const [post, setPost] = useState();
  const { user } = useContext(AuthContext)

  async function handlePost() {
    if (post === '') {
      Alert.alert('Please fill in the field.')
      return;
    }

    let avatarUrl = null;

    try {
      let response = await storage().ref('users').child(user?.uid)
      .getDownloadURL();

      avatarUrl = response;

    } catch (error) {
      avatarUrl = null;
    }


    await firestore().collection('posts')
    .add({
      created: new Date(),
      content: post,
      autor: user.name,
      likes: 0,
      avatarUrl,
      userId: user.uid
    })
    .then(() => {
      setPost('')
      navigation.goBack();
    })
    .catch((error) => {
      console.log(error)
    })



  }




  useLayoutEffect(() => {
    const options = navigation.setOptions({
      headerRight: () => (
        <Button onPress={() => handlePost()}>
          <ButtonText>Post</ButtonText>
        </Button>
      )
    })
  },[navigation, post])
  
  return(
    <Container>
      <Input
      placeholder="What's happening?"
      placeholderTextColor={"rgba(255, 255, 255, 0.4)"}
      multiline={true}
      maxLength={300}
      value={post}
      onChangeText={(text) => setPost(text)}
      autoCorrect={false}
      />
    </Container>

  );


}