import { useRoute } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet } from 'react-native';
import ArticleDetails from '../components/app/articles/ArticleDetails';

import { Text, View } from '../components/Themed';
import { RootStackScreenProps } from '../types';

// import { useRoute } from '@react-navigation/native';

export default function ArticleDetailScreen({ navigation }: RootStackScreenProps<'ArticleDetails'>) {
    const route = useRoute()
    // console.log(route.params.item.title)
    const item = route.params?.item
    return (
        <View style={styles.container}>
            {/* <Text style={styles.title}>Article Details</Text> */}
            <ArticleDetails article={item} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#241f1f",
<<<<<<< HEAD
<<<<<<< HEAD

=======
>>>>>>> main
=======
>>>>>>> 111ff8f (fix: conflict)
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
});
