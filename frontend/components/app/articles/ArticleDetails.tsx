import { Text, View } from '../../Themed';
import { Image, StyleSheet, TouchableOpacity, Button, Linking } from 'react-native'
import { RootStackScreenProps } from '../../../types';
import { useNavigation } from '@react-navigation/native';
import { ArticleProps } from './ArticleItem'
import { FontAwesome } from '@expo/vector-icons';

const ArticleDetails = ({ article }: { article: ArticleProps }) => {

    const navigation = useNavigation()

    return (
        <View style={styles.container}
        >
            <Image
                style={styles.stretch}
                source={{ uri: article.image }} />
            <View style={styles.text}>
                <Text style={styles.textTitle}>
                    {article.title}
                </Text>
                <Text style={styles.textDescription}>
                    {article.description}
                </Text>
            </View>
            <View style={{ backgroundColor: 'white', flex: 1, alignItems: 'flex-end' }}>
                <Text style={styles.textUrl} onPress={() => Linking.openURL(article.link)}>
                    <FontAwesome size={30} name={'share-alt'} />
                </Text>
            </View>
            <View style={{ backgroundColor: 'white', flex: 1 }}>
                <TouchableOpacity activeOpacity={0.5} style={styles.btnRetour} onPress={() => navigation.goBack()}>Retour</TouchableOpacity>
            </View>

        </View >
    )
}

export default ArticleDetails

const styles = StyleSheet.create({
    container: {
        //   paddingTop: 50,
        backgroundColor: 'white',
        margin: 10,
        flex: 1
    },
    text: {
        border: 'solid 1px gray',
        backgroundColor: 'white',
        marginTop: 20,
<<<<<<< Updated upstream
        padding: 10,
        flex: 1
=======
        padding: 15,
        flex: 1,
        borderRadius: 10,
        height: '25vw',
       // maxHeight:'210px',
        minHeight:'80px',
        textAlign: 'center',

>>>>>>> Stashed changes
    },
    textTitle: {
        color: 'black',
    },
    textDescription: {
        color: 'black',
<<<<<<< Updated upstream

=======
        fontSize: 16,
        fontStyle: 'italic',
        paddingTop: 20
    },
    textDetails: {
        color: 'gray',
        paddingVertical: 20
>>>>>>> Stashed changes
    },
    stretch: {
        width: 300,
        height: 150,
        resizeMode: 'stretch',
        border: 'solid 1px black',
    },
    btnRetour: {
        marginTop: 5,
        border: 'solid 1px black',
        width: 'fit-content',
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    textUrl: {
        color: 'black',
        marginTop: 5,
        border: 'solid 1px black',
        width: 'fit-content',
        paddingHorizontal: 10,
        paddingVertical: 5,

    }
});