import { Text, View } from '../../Themed';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as client from '../../../data/users.json'
import { useNavigation } from '@react-navigation/native';

const AdminMessage = () => {


    let dataClient = JSON.parse(JSON.stringify(client)).default.users

    dataClient = dataClient.filter((item: any) => {
        return item.role === "client"
    })

    const navigation = useNavigation()



    return (
        <View style={styles.container}>
            {
                dataClient.map((item: any, index: number) => {
                    return <TouchableOpacity activeOpacity={0.5} style={styles.chatList} onPress={() => navigation.navigate('ChatBox', { clientId: item.id, role: "admin" })} key={index}>
                        <Image style={styles.avatar} source={{ uri: item.image }} />
                        <View style={styles.nameClient}>
                            <Text style={{ color: 'black', fontWeight: '600' }}>{item.firstname} {item.lastname}</Text>
                        </View>

                    </TouchableOpacity>
                }
                )
            }


        </View >
    )
}

export default AdminMessage

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'inherit',
        justifyContent: 'center',
        width: '90%',
        minWidth: '250px'

    },
    chatList: {
        padding: 10,
        borderWidth: 1,
        marginTop: 10,
        flex: 1,
        backgroundColor: '#81807f',
        flexDirection: 'row',
        borderRadius: 10
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    nameClient: {
        backgroundColor: 'inherit',
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'flex-start',
        paddingLeft: 10
    }
})