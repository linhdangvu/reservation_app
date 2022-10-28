import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';
import ChangePasswordForm from '../components/app/login/ChangePasswordForm';

export default function ChangePasswordScreen({ navigation }: RootStackScreenProps<'ChangePassword'>) {
  return (
    <View style={styles.container}>
      <ChangePasswordForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#241f1f",
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black'
  },
  // separator: {
  //   marginVertical: 30,
  //   height: 1,
  //   width: '80%',
  // },
});
