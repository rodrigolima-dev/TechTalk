import { ActivityIndicator, Alert, InputAccessoryView, Text, View } from 'react-native';
import { Container, Logo, Input, Button, ButtonText, SignUpButton, SignUpText } from './styles';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/auth';
import AsyncStorage from '@react-native-community/async-storage';



export default function Login() {
  const [login, setLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { signIn, signUp, loadingAuth } = useContext(AuthContext)

  function handleLogin() {
    if(email === '' || password === '') {
      alert('Please fill out all fields.')
      return
    }
    signIn(email, password)

  }

  function handleSignUp () {
    if(name === '' || email === '' || password == '') {
      Alert.alert('Fill out all fields')
      return
    }

    signUp(email, password, name)
  }

  function toggleLogin() {
    setLogin(!login)
    setEmail('')
    setPassword('')
  }



  if(login) {
    return(
      <Container>
        <Logo
        source={require('../../assets/Logo.png')}
        />

        <Input
        placeholder='email@email.com'
        value={email}
        autoCapitalize='none'
        onChangeText={(text) => setEmail(text)}
        />

        <Input
        placeholder='*****'ButtonText
        value={password}
        secureTextEntry={true}
        onChangeText={(text) => setPassword(text)}
        />

        <Button onPress={() => handleLogin()}>
          {
            loadingAuth ? (
              <ActivityIndicator size={20} color='white'/>
            ) : (
              <ButtonText>Login</ButtonText>  
            )

          }
        </Button>

        <SignUpButton onPress={() => toggleLogin()}>
          <SignUpText>Create an account</SignUpText>
        </SignUpButton>

      </Container>
    );
  }
  
  return(
    <Container>
    <Logo
    source={require('../../assets/Logo.png')}
    />

    <Input
    placeholder='name'
    value={name}
    onChangeText={(text) => setName(text)}
    />

    <Input
    placeholder='email@email.com'
    value={email}
    autoCapitalize='none'
    onChangeText={(text) => setEmail(text)}
    />

    <Input
    placeholder='*****'ButtonText
    value={password}
    secureTextEntry={true}
    onChangeText={(text) => setPassword(text)}
    />

    <Button onPress={() => handleSignUp()}>
      {
        loadingAuth ? (
          <ActivityIndicator size={20} color="white"/>
        ) : (
          <ButtonText>SignUp</ButtonText>
        )
      }
    </Button>

    <SignUpButton onPress={() => toggleLogin()}>
      <SignUpText>I have an account</SignUpText>
    </SignUpButton>

  </Container>
  );

}