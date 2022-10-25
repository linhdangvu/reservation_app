import { Text, View } from '../../Themed';
import { Image, StyleSheet, TouchableOpacity, Button } from 'react-native'
import { RootStackScreenProps } from '../../../types';
import { useNavigation } from '@react-navigation/native';
import { ArticleProps } from './ArticleItem'

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

            <TouchableOpacity activeOpacity={0.5} style={styles.btnRetour} onPress={() => navigation.goBack()}>Retour</TouchableOpacity>
        </View>
    )
}

export default ArticleDetails

const styles = StyleSheet.create({
    container: {
        //   paddingTop: 50,
        backgroundColor: 'white',
        margin: 10,


    },
    text: {
        border: 'solid 1px gray',
        backgroundColor: 'white',
        marginTop: 20,
        padding: 10
    },
    textTitle: {
        color: 'black',
    },
    textDescription: {
        color: 'black',

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
    }
});