import { Text } from 'react-native';
import {Container, Avatar, Name, Header, ContentView, Content, Actions, Like,
TimePost, LikeButton} from './styles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { ptBR } from 'date-fns/locale'
import { formatDistance } from 'date-fns';
import { useState } from 'react';
import firestore, { firebase } from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native';


export default function PostsList({ data, userId}) {
    const [like, setLike] = useState(false)
    const navigation = useNavigation();

    function formatTimePost() {
        //Converter timestamp para Data
        const datePost = new Date(data.created.seconds * 1000)

        return formatDistance(
            new Date(),
            datePost,
            {
                locale: ptBR
            }
        )
    }

    async function likePost(id, likes) {
        setLike(true)
        const docId = `${userId}_${id}`

        //Checar se o post já foi curtido
        const doc = await firestore().collection('likes').doc(docId).get();

        if(doc.exists) {
            //Usuário ja curtiu o post.
            await firestore().collection('posts').doc(id).update({
                likes: likes - 1
            })

            await firestore().collection('likes').doc(docId).delete();
            setLike(false)
            return;
        }

        //Criar like
        await firestore().collection('likes').doc(docId).set({
            postId: id,
            userId: userId
        })

        //Somar like
        await firestore().collection('posts').doc(id).update({
            likes: likes + 1
        })
    }


    return(
        <Container>
            <Header onPress={() => navigation.navigate('PostsUser',
            {title: data.autor, userId: data.userId}
            )}>
                {
                    data.avatarUrl ?
                    (
                        <Avatar
                        source={{uri: data.avatarUrl}}
                        />
                    ) : 
                    (
                        <Avatar
                        source={require('../../assets/Avatar.png')}
                        />
                    )

                }


                <Name>{data?.autor}</Name>
            </Header>

            <ContentView>
                <Content>{data.content}</Content>
            </ContentView>

            <Actions>
                <LikeButton onPress={() => likePost(data.id, data.likes)}>
                    { like ? (
                        <MaterialCommunityIcons
                        name="heart"
                        size={20}
                        color="#e52246"
                        />
                    ) : (
                        <MaterialCommunityIcons
                        name="heart-plus-outline"
                        size={20}
                        color="gray"
                        />
                    )

                    }

                    <Like>
                        {data.likes === 0 ? '' : data?.likes}
                    </Like>
                </LikeButton>

                <TimePost>
                    {formatTimePost()}
                </TimePost>
            </Actions>

        </Container>
    );
}
