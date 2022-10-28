import { Text, View } from '../../../Themed';
import { StyleSheet } from 'react-native';


const ChatRight = (props: any) => {
    const spacer = <View style={{ width: '25%', backgroundColor: 'white' }} />

    return (
        <View style={styles.container}>
            <View style={styles.rightText}>
                <Text style={{ color: 'black' }}>{props.text}</Text>
                <Text style={{ color: '#4d7dc6', fontSize: 10, textAlign: 'right', marginTop: 5 }}>{props.time}</Text>
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
        backgroundColor: '#94bbf5',
        width: '50%',
        borderRadius: 10,
        padding: 10,
        margin: 5
    }
})