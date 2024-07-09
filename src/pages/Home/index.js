import { Alert, View } from 'react-native';
import {Container, ButtonPost} from './styles'

import Feather from 'react-native-vector-icons/Feather'
import { useNavigation } from '@react-navigation/native';


export default function Home() {
  const navigation = useNavigation();

  return(
    <Container>
      <ButtonPost onPress={() => navigation.navigate('NewPost')}>
        <Feather name="edit-2" color="#fff" size={25}/>
      </ButtonPost>
    </Container>
  );
 
}