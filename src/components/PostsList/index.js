import { Text } from 'react-native';
import {Container, Avatar, Name, Header, ContentView, Content, Actions, Like,
TimePost, LikeButton} from './styles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { ptBR } from 'date-fns/locale'
import { formatDistance } from 'date-fns';


export default function PostsList({ data, userId}) {

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


    return(
        <Container>
            <Header>
                <Avatar
                source={require('../../assets/Avatar.png')}
                />
                <Name>{data?.autor}</Name>
            </Header>

            <ContentView>
                <Content>{data.content}</Content>
            </ContentView>

            <Actions>
                <LikeButton>
                    <MaterialCommunityIcons
                    name="heart-plus-outline"
                    size={20}
                    color="gray"
                    />
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
