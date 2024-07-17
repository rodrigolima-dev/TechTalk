import { useNavigation } from '@react-navigation/native';
import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import {Container, ListPosts} from './styles'

import firestore from '@react-native-firebase/firestore'
import PostsList from '../../components/PostsList';
import { AuthContext } from '../../contexts/auth';

export default function PostsUser({ route }) {
  const { title, userId } = route.params
  const { user } = useContext(AuthContext)

  const [loading, setLoading] = useState(true)
  const [posts, setPosts] = useState()

  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title === '' ? '' : title
    });

  },[navigation, title])

  useEffect(() => {

    const subscriber = firestore().collection('posts')
    .where('userId', '==', userId)
    .orderBy('created', 'desc')
    .onSnapshot( snapshot => {
      const postsList = [];

      snapshot.forEach( doc => {
        postsList.push({
          ...doc.data(),
          id: doc.id
        });
      });

      setPosts(postsList)
      setLoading(false)

    })

    return () => subscriber();

  
  },[])


  return(
    <Container>
      {
        loading ?
        (
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator size={50} color={"#28A745"}/>
          </View>
        ) : 
        (
          <ListPosts
          showsVerticalScrollIndicator={false}
          data={posts}
          renderItem={({item}) => <PostsList data={item} userId={user.uid}/>}
          />
        )

      }


    </Container>
  );
    
}