import { View } from 'react-native';
import { Container, LogoHeader } from './styles';

export default function Header() {
    return(
        <Container>
            <LogoHeader
            source={require('../../assets/Logo.png')}
            />
        </Container>
    );
}