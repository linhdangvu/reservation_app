import { Text, View } from '../../../Themed';
import { StyleSheet } from 'react-native';


const ChatLeft = (props: any) => {
    const spacers = <View style={{ width: '25%', backgroundColor: 'white' }} />

    return (
        <View style={styles.container}>
            <View style={styles.leftText}>
                <Text style={{ color: 'black' }}>{props.text}</Text>
                <Text style={{ color: 'black' }}>{props.time}</Text>
            </View>
            {spacers}
        </View>
    )
}

export default ChatLeft

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection: 'row',

    },
    leftText: {
        backgroundColor: 'white',
        width: '70%',
        borderWidth: 1,
        padding: 10,
        margin: 5
    }
})