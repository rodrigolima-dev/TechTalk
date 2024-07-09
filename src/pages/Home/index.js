import { Alert, View } from 'react-native';
import {Container, ButtonPost} from './styles'

import Feather from 'react-native-vector-icons/Feather'


export default function Home() {
  return(
    <Container>
      <ButtonPost onPress={() => Alert.alert('write a post.')}>
        <Feather name="edit-2" color="#fff" size={25}/>
      </ButtonPost>
    </Container>
  );
 
}