//cores VERDE: #28A745 CINZA: #36393F
import { StatusBar, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import Routes from './src/routes';

export default function TechTalk() {
 return (
   <NavigationContainer>
    <StatusBar backgroundColor="#36393F" barStyle='light-content' 
    translucent={false}/>

    <Routes/>
   </NavigationContainer>
  );
}