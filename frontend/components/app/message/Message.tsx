import { Text, View } from '../../Themed';
import { StyleSheet } from 'react-native';
import AdminMessage from './AdminMessage';
import ClientMessage from './ClientMessage';



const Message = () => {
    const role = 'admin'

    return (
        <View style={styles.container}>
            {(role === 'admin') ? <AdminMessage /> : <ClientMessage />}
        </View>
    )
}

export default Message

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        width: '80%'
    }
})