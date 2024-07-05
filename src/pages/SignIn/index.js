import { Alert, InputAccessoryView, Text, View } from 'react-native';
import { Container, Logo, Input, Button, ButtonText, SignUpButton, SignUpText } from './styles';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/auth';



export default function SignIn() {
  const [login, setLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { signUp } = useContext(AuthContext)

  function handleLogin() {
    if(email === '' || password === '') {
      alert('Please fill out all fields.')
    }
    Alert.alert('Login!')
  }

  function handleSignUp () {
    if(name === '' || email === '' || password == '') {
      console.log('Fill out all fields')
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
        onChangeText={(text) => setEmail(text)}
        />

        <Input
        placeholder='*****'ButtonText
        value={password}
        onChangeText={(text) => setPassword(text)}
        />

        <Button onPress={handleLogin}>
          <ButtonText>Login</ButtonText>
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
    onChangeText={(text) => setEmail(text)}
    />

    <Input
    placeholder='*****'ButtonText
    value={password}
    onChangeText={(text) => setPassword(text)}
    />

    <Button onPress={() => handleSignUp()}>
      <ButtonText>SignUp</ButtonText>
    </Button>

    <SignUpButton onPress={() => toggleLogin()}>
      <SignUpText>I have an account</SignUpText>
    </SignUpButton>

  </Container>
  );

}