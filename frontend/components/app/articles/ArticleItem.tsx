import { Text, View } from '../../Themed';
import { Image, StyleSheet, TouchableOpacity } from 'react-native'
import { RootStackScreenProps } from '../../../types';
import { useNavigation } from '@react-navigation/native';

export type ArticleProps = {
    image: string;
    title: string;
    description: string;
    details: string;
    link: string
};


const ArticleItem = ({ article }: { article: ArticleProps }) => {

    const navigation = useNavigation()

    return (
        <TouchableOpacity activeOpacity={0.9} style={styles.container}
            onPress={() => {
                // navigation.navigate('Login');
                // console.log("Go to detail");
                navigation.navigate('ArticleDetails', {
                    item: article
                })
            }}>
            <Image
                style={styles.stretch}
                source={{ uri: article.image }} />
            <Text style={styles.textTitle}>
                {article.title}
            </Text>
            <Text style={styles.textDescription}>
                {article.description}
            </Text>
        </TouchableOpacity>
    )
}

export default ArticleItem

const styles = StyleSheet.create({
    container: {
        //   paddingTop: 50,
        backgroundColor: '#c6cccb',
        margin: 10,
        border: 'none',
        borderRadius: 10,

    },
    textTitle: {
        color: 'black',
        padding: 10,
        textAlign: 'center',
        fontSize: '24px',
        fontWeight: 'bold',
        fontStyle: 'italic',
        /*
        height: '20vw',
        maxHeight:'150px',
        minHeight:'60px',
        */
    },
    textDescription: {
        color: 'grey',
        padding: 10,
        marginBottom: 10,
        textAlign: 'center',
        fontSize: '18px'
    },
    stretch: {
        width: 'inherit',
        height: '40vw',
        maxHeight: '300px',
        minHeight: '180px',
        resizeMode: 'stretch',
        borderTopStartRadius: 10,
        borderTopEndRadius: 10
    },
});