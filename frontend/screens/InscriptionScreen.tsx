import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import InscriptionForm from '../components/app/inscription/InscriptionForm';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';

export default function InscriptionScreen({ navigation }: RootStackScreenProps<'Inscription'>) {
  return (
    <View style={styles.container}>
<<<<<<< HEAD
<<<<<<< HEAD
=======
      {/* <Text style={styles.title}>Inscription</Text> */}
>>>>>>> main
=======
      {/* <Text style={styles.title}>Inscription</Text> */}
>>>>>>> 111ff8f (fix: conflict)
      {/* <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" /> */}
      <InscriptionForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#241f1f",
    minHeight: 700
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
<<<<<<< HEAD
<<<<<<< HEAD
  separator: {
    height: 1,
    width: '80%',
  },
=======
=======
>>>>>>> 111ff8f (fix: conflict)
  // separator: {
  //   marginVertical: 30,
  //   height: 1,
  //   width: '80%',
  // },
<<<<<<< HEAD
>>>>>>> main
=======
>>>>>>> 111ff8f (fix: conflict)
});
