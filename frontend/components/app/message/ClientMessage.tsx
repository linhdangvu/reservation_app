import { Text, View } from '../../Themed';
import { StyleSheet } from 'react-native';
import ChatBox from './chatbox/ChatBox';


const ClientMessage = () => {
    // for backend & data
    const clientId = 2

    return (
        <View style={styles.container}>
            {/* {navigation.navigate('ChatBox', { clientId: clientId, role: "client" })} */}
            <ChatBox clientId={clientId} role="client" />
        </View>
    )
}

export default ClientMessage

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        width: '95%'
    }
})