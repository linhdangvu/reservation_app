import { Text, View } from '../../../Themed';
import { StyleSheet } from 'react-native';


const ChatRight = (props) => {
    const spacer = <View style={{ width: '25%', backgroundColor: 'white' }} />

    return (
        <View style={styles.container}>
            <View style={styles.rightText}>
                <Text style={{ color: 'black' }}>{props.text}</Text>
                <Text style={{ color: 'black' }}>{props.time}</Text>
            </View>
            {spacer}
        </View>
    )
}

export default ChatRight

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection: 'row-reverse',

    },
    rightText: {
        backgroundColor: 'white',
        width: '70%',
        borderWidth: 1,
        padding: 10,
        margin: 5
    }
})