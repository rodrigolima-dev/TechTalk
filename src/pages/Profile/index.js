import { View, Button } from 'react-native';
import { AuthContext } from '../../contexts/auth';
import { useContext } from 'react';

export default function Profile() {
  const { signOut } = useContext(AuthContext)

  return(
    <View>
      <Button
      title='Exit'
      onPress={() => signOut()}
      />
    </View>

  );

}