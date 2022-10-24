import { Button, Text, View } from '../Themed';
import { Image, StyleSheet } from 'react-native'

export type ArticleProps = {
    image: string;
    title: string;
    description: string;
};

const ArticleItem = ({ article }: { article: ArticleProps }) => {

    return (
        <Button style={styles.container} onPress={() => { showArticleInfo() }}>
            <Image
                style={styles.stretch}
                source={{ uri: article.image }} />
            <Text style={styles.textDescription}>
                {article.description}
            </Text>
        </Button>
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