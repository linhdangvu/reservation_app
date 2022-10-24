import { StatusBar } from 'expo-status-bar';
import { Platform, ScrollView, StyleSheet } from 'react-native';
import * as React from 'react';
import EditScreenInfo from '../components/EditScreenInfo';
import { Button, Text, View } from '../components/Themed';
import { UserContext } from '../contexts/UserContext';
import { RootStackScreenProps } from '../types';
import ArticleItem, { ArticleProps } from '../components/acceuil/ArticleItem';
import data from "../data/articles.json"



export default function MainScreen({ navigation }: RootStackScreenProps<'Main'>) {

  const { token } = React.useContext(UserContext);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Accueil</Text>
      <ScrollView style={styles.articlieView} contentContainerStyle={{ flex: 1 }}>
        {data.map((item: ArticleProps, index) => {
          return <ArticleItem article={item} key={index} />
        })}
      </ScrollView>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      {!token ?
        <Button onPress={() => { navigation.navigate("Login"); console.log('This is login') }} text="Login" />
        : <View />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "whitesmoke"
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    paddingTop: 8
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',

  },
  articlieView: {
    // width: '80%',

  }
});
