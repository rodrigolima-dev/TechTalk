import { View } from 'react-native';
import {Container, Button, ButtonText, Input} from './styles'
import { useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';


export default function NewPost() {
  const navigation = useNavigation();
  const [post, setPost] = useState();

  useLayoutEffect(() => {
    const options = navigation.setOptions({
      headerRight: () => (
        <Button>
          <ButtonText>Post</ButtonText>
        </Button>
      )
    })
  },[])
  
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