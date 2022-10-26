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
                            <Text style={{ color: 'black' }}>{item.firstname} {item.lastname}</Text>
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
        backgroundColor: 'white',
        justifyContent: 'center',

    },
    chatList: {
        padding: 10,
        borderWidth: 1,
        marginTop: 10,
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'row'
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 50
    },
    nameClient: {
        backgroundColor: 'white',
        flex: 1,
        justifyContent: 'center', alignItems: 'center'
    }
})