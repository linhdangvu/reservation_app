import { Text, View } from '../../Themed';
import { StyleSheet, TouchableOpacity, Button, Linking, Text as DefaultText, View as DefaultView, Image, Pressable, PressableProps } from 'react-native'
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
                <Text style={styles.textDetails}>
                    {article.details}
                </Text>

            </View>

            <Text style={styles.textUrl} onPress={() => Linking.openURL(article.link)}>
                <FontAwesome size={30} name={'share-alt'} />
            </Text>

            <TouchableOpacity activeOpacity={0.5} style={styles.btnRetour} onPress={() => navigation.goBack()}>Retour</TouchableOpacity>

            {/*
            <View style={{  flex: 1, marginTop: 10, alignItems: 'flex-end' }}>
                <Text style={styles.textUrl} onPress={() => Linking.openURL(article.link)}>
                    <FontAwesome size={30} name={'share-alt'} />
                </Text>
            </View>
            <View style={{ flex: 1, marginTop: 40 }}>
                <TouchableOpacity activeOpacity={0.5} style={styles.btnRetour} onPress={() => navigation.goBack()}>Retour</TouchableOpacity>
            </View>
            */}

        </View >
    )
}

export default ArticleDetails

const styles = StyleSheet.create({
    container: {
        //   paddingTop: 50,
        backgroundColor: 'inherit',
        margin: 10,
        flex: 1,
        width: '75%',
        maxWidth: '750px',
        minWidth: '250px',
    },
    text: {
        border: 'solid 1px gray',
        backgroundColor: '#c6cccb',
        marginTop: 20,
        padding: 15,
        flex: 1,
        borderRadius: 10,
        height: '40vw',
        // maxHeight:'210px',
        minHeight: '180px',
        textAlign: 'center',

    },
    textTitle: {
        color: 'black',
        fontSize: 20,
        fontWeight: '700',
    },
    textDescription: {
        color: 'black',
        fontSize: 16,
        fontStyle: 'italic',
    },
    textDetails: {
        color: 'gray',
    },
    stretch: {
        //width: 'inherit',
        height: '40vw',
        maxHeight: '300px',
        minHeight: '180px',
        resizeMode: 'stretch',
        borderRadius: 10,
    },
    btnRetour: {
        borderRadius: 5,
        border: '1px solid steelblue',
        width: 'fit-content',
        paddingHorizontal: 20,
        paddingVertical: 8,
        marginTop: '-37px',
        color: '#c6cccb',
    },
    textUrl: {
        color: '#c6cccb',
        border: '1px solid steelblue',
        borderRadius: 5,
        width: 'fit-content',
        paddingHorizontal: 5,
        paddingVertical: 3,
        alignSelf: 'flex-end',
        marginTop: '15px',

    },
    textRetour: {
        color: 'black',
    }
});