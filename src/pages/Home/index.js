import { ActivityIndicator, Text, View } from 'react-native';
import {Container, ButtonPost, ListPosts} from './styles'

import Feather from 'react-native-vector-icons/Feather'
import Header from '../../components/Header';
import firestore from '@react-native-firebase/firestore'
import PostsList from '../../components/PostsList'

import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/auth';



export default function Home() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState([])

  const { user } = useContext(AuthContext)


  useEffect(() => {

    const subscriber = firestore()
    .collection('posts')
    .orderBy('created', 'desc')
    .onSnapshot( snapshot => {
      const postList = [];

      snapshot.forEach(doc => {
        postList.push({
          ...doc.data(),
          id: doc.id
        });
      });
        setPosts(postList)
        setLoading(false)
    });

    return () => subscriber();
  },[])



  return(
    <Container>
      <Header/>

      { loading ?
        (
          <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size={50} color={"#28A745"}/>
          </View>
        ) :
        
        (
          <ListPosts
          data={posts}
          renderItem={({item}) => <PostsList data={item} userId={user.uid}/>}
          />
        )
      }



      <ButtonPost onPress={() => navigation.navigate('NewPost')}>
        <Feather name="edit-2" color="#fff" size={25}/>
      </ButtonPost>
    </Container>
  );
 
}