import { Text, View } from '../../Themed';
import { StyleSheet } from 'react-native';
import AdminMessage from './AdminMessage';
import ClientMessage from './ClientMessage';
import { getUserInfo } from '../../../helpers/LoginHelpers';


const Message = () => {
    const role = getUserInfo().user.role
    const clientId = getUserInfo().user.id

    return (
        <View style={styles.container}>
            {(role === 'admin') ? <AdminMessage /> : <ClientMessage id={clientId} />}
        </View>
    )
}

export default Message

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        width: '95%'
    }
})