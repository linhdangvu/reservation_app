import { Text, View } from '../../../Themed';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import ChatLeft from './ChatLeft';
import ChatRight from './ChatRight';
import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import * as message from '../../../../data/message.json'
import moment from 'moment';


const ChatBox = (props: any) => {
    const route = useRoute()
    let clientId = ''
    let role = ''
    if (props.clientId && props.role) {
        // props => client
        clientId = props.clientId
        role = props.role
    } else {
        // no props => admin
        clientId = route.params?.clientId
        role = route.params?.role
    }

    console.log(role)
    const dataMessage = JSON.parse(JSON.stringify(message)).default.message
    const filteredMessage = dataMessage.filter((item: any) => {
        return item.clientId === Number(clientId)
    })
    // console.log(filteredMessage)
    let sortMessage = filteredMessage.sort((a: any, b: any) => {
        let t1 = a.time.split('/').join("").split(':').join("").split("-").join("")
        let t2 = b.time.split('/').join("").split(':').join("").split("-").join("")
        return t1 - t2
    })
    // console.log(sortMessage)
    const [text, onChangeText] = useState("")
    const [messageList, setMessageList] = useState(sortMessage)

    const sendMessage = () => {
        // add into list array
        const data = {
            id: dataMessage.length + 1,
            clientId: Number(clientId),
            messageFrom: role,
            text: text,
            time: moment().format("DD/MM/YYYY-HH:mm:ss").toString()
        }
        setMessageList([...messageList, data])
        console.log(messageList)

        // add to backend

        console.log("Send")
        onChangeText("")
    }



    return (
        <View style={styles.container}>
            <View style={styles.chatView}>
                {(role === 'admin') ? <View>
                    {messageList.map((item: any, index: number) => <View key={index} >
                        {(item.messageFrom === 'client') ? <ChatLeft text={item.text} time={item.time} /> : <ChatRight text={item.text} time={item.time} />
                        }
                    </View>)}
                </View> : <View>
                    {messageList.map((item: any, index: number) => <View key={index} >
                        {(item.messageFrom === 'client') ? <ChatRight text={item.text} time={item.time} /> : <ChatLeft text={item.text} time={item.time} />
                        }
                    </View>)}
                </View>
                }

            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="Message..."
                />
                <TouchableOpacity onPress={sendMessage} style={styles.btnSend}>
                    <Text style={{ color: 'black' }}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ChatBox

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        width: '95%'
    },
    inputView: {
        backgroundColor: 'white',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        margin: 10,
        alignItems: 'center',

    },
    input: {
        flex: 9,
        // justifyContent: 'center',
        borderWidth: 1,
        paddingHorizontal: 10,
        paddingVertical: 5
    },
    btnSend: {
        flex: 2,
        // justifyContent: 'center',
        marginLeft: 8,
        borderWidth: 1,
        backgroundColor: 'antiquewhite',
        paddingHorizontal: 10,
        paddingVertical: 5,
        textAlign: 'center'
    },
    chatView: {
        backgroundColor: 'white',
        flex: 10,
        margin: 10,
        borderWidth: 1,
        // width: '100%'
    }
})