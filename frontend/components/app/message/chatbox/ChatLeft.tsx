import { Text, View } from '../../../Themed';
import { StyleSheet } from 'react-native';


const ChatLeft = (props: any) => {
    const spacers = <View style={{ width: '25%', backgroundColor: 'white' }} />

    return (
        <View style={styles.container}>
            <View style={styles.leftText}>
                <Text style={{ color: 'black' }}>{props.text}</Text>
                <Text style={{ color: '#4d7dc6', fontSize: 10, textAlign: 'left', marginTop: 5 }}>{props.time}</Text>
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
        backgroundColor: '#e0dedd',
        width: '50%',
        borderRadius: 10,
        padding: 10,
        margin: 5
    }
})