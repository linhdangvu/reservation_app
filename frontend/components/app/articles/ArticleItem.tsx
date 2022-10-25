import { Text, View } from '../../Themed';
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { RootStackScreenProps } from '../../../types';
import { useNavigation } from '@react-navigation/native';

export type ArticleProps = {
    image: string;
    title: string;
    description: string;
    link: string
};


const ArticleItem = ({ article }: { article: ArticleProps }) => {

    const navigation = useNavigation()

    return (
        <TouchableOpacity activeOpacity={0.9} style={styles.container}
            onPress={() => {
                // navigation.navigate('Login');
                console.log("Go to detail");
                navigation.navigate('ArticleDetails', {
                    item: article
                })
            }}>
            <Image
                style={styles.stretch}
                source={{ uri: article.image }} />
            <Text style={styles.textDescription}>
                {article.title}
            </Text>
        </TouchableOpacity>
    )
}

export default ArticleItem

const styles = StyleSheet.create({
    container: {
        //   paddingTop: 50,
        backgroundColor: 'white',
        margin: 10,
        border: 'solid 1px gray'

    },
    textDescription: {
        color: 'black',
        padding: 10
    },
    stretch: {
        width: 300,
        height: 150,
        resizeMode: 'stretch',
    },
});