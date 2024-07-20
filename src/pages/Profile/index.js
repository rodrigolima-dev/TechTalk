import { AuthContext } from '../../contexts/auth';
import { useContext, useEffect, useState } from 'react';

import { Container, Name, UploadButton, UploadText, Avatar, Button, ButtonText,
Email, ModalContainer, ButtonBack, Input} from './styles'

import Header from '../../components/Header';
import Feather from 'react-native-vector-icons/Feather'
import firestore from '@react-native-firebase/firestore'
import storage from '@react-native-firebase/storage'


import { ActivityIndicator, Alert, Modal, Platform } from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import { useFocusEffect } from '@react-navigation/native';

export default function Profile() {
  const { user, signOut, storageUser, setUser } = useContext(AuthContext)

  const [open, setOpen] = useState(false)
  const [url, setUrl] = useState(null)
  const [name, setName] = useState(user?.name)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function load () {
      try {
        const response = await storage().ref('users').child(user.uid)
        .getDownloadURL();
  
        setUrl(response)

      } catch (error) {
        console.log(error)
      }
    }

    load()
  },[])



  async function update () {
    setLoading(true)
    if(name === '' || name === undefined) {
      Alert.alert('fill in all fields')
      setLoading(false)
      return;
    }

    await firestore().collection('users')
    .doc(user.uid)
    .update({
      name: name
    })

    //Search all posts by this user
    const postDocs = await firestore().collection('posts')
    .where('userId', '==', user.uid)
    .get();

    postDocs.forEach( async doc => {
      await firestore().collection('posts').doc(doc.id)
      .update({
        autor: name
      })
    })

    let data = {
      uid: user.uid,
      name: name,
      email: user.email
    }


    storageUser(data)
    setUser(data)
    setLoading(false)
    setOpen(false)
  }

  const uploadFile = () => {
    const options = {
      noData: true,
      mediaType: 'photo'
    };

    launchImageLibrary(options, response => {
      if(response.didCancel) {
        console.log('modal canceled')
      } else if (response.error) {
        console.log('Error: ', response.error)
      } else {

        updateFileFirebase(response)
        .then(() => {
          uploadAvatarPosts()
        })
        setUrl(response.assets[0].uri)
      }
    })
  }


  const updateFileFirebase = async (response) => {
    const fileSource = response.assets[0].uri;
    const storageRef = storage().ref('users').child(user.uid)

    return await storageRef.putFile(fileSource)
  }

  async function uploadAvatarPosts () {
    const storageRef = storage().ref('users').child(user.uid);
    const url = storageRef.getDownloadURL()
    .then( async image => {
      const postsDoc = await firestore().collection('posts')
      .where('userId', '==', user.uid).get();

      postsDoc.forEach( async doc => {
        await firestore().collection('posts').doc(doc.id)
        .update({
          avatarUrl: image
        })
      })
    })
    .catch((error) => {
      console.log(error)
    })
  }


  return(
    <Container>
      <Header/>
    { 
      url ?
      (
        <UploadButton onPress={() => uploadFile()}>
          <UploadText> + </UploadText>

          <Avatar
          source={{uri: url}}
          />
        </UploadButton>
      ) : 
      (
        <UploadButton onPress={() => uploadFile()}>
          <UploadText> + </UploadText>
        </UploadButton>
      )
    } 

    <Name>{user.name}</Name>
    <Email>{user.email}</Email>

    <Button bg="#28A745" onPress={() => setOpen(true)}>
      <ButtonText color="#fff">Update profile</ButtonText>
    </Button>

    <Button bg="#fff" onPress={() => signOut()}>
      <ButtonText color="#3b3b3b">Exit</ButtonText>
    </Button>

    <Modal visible={open} animationType="slide" transparent={true}>
      <ModalContainer>
        <ButtonBack>
          <Feather
            name="arrow-left"
            size={22}
            color="#121212"
          />
          <ButtonText color="#121212" onPress={() => setOpen(false)}>
            Back
          </ButtonText>
        </ButtonBack>

        <Input
        placeholder={user.name}
        value={name}
        onChangeText={(text) => setName(text)}
        />

        <Button bg="#28A745" onPress={() => update()}>
          {
            loading ?
            (
              <ActivityIndicator size={20} color={"#fff"}/>
            ) :
            (
              <ButtonText color="#fff">Update</ButtonText>
            )
          }
        </Button>

      </ModalContainer>
    </Modal>

    </Container>

  );
}