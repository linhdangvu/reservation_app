import { Text, View } from '../../../Themed';
import { StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import ChatLeft from './ChatLeft';
import ChatRight from './ChatRight';
import { useRoute } from '@react-navigation/native';
import { useState } from 'react';
import * as message from '../../../../data/message.json'
import moment from 'moment';
import { getMessageList, setMessage } from '../../../../helpers/MessageHelpers';


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
    const dataMessage = getMessageList()
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

        // add to backend but local temporaire
        setMessage(data)

        console.log("Send")
        onChangeText("")
    }



    return (
        <View style={styles.container}>
            <View style={styles.chatView}>
                <View style={styles.header}>
                    Name
                </View>
                <ScrollView showsHorizontalScrollIndicator={false} contentContainerStyle={{ flex: 1 }}>
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
                </ScrollView>

            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeText}
                    value={text}
                    placeholder="Message..."
                />
                <TouchableOpacity onPress={sendMessage} style={styles.btnSend}>
                    <Text style={{ color: 'white' }}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ChatBox

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'inherit',
        flex: 1,
        width: '95%'
    },
    inputView: {
        backgroundColor: 'inherit',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'center',
        margin: 10,
        alignItems: 'center',
        paddingHorizontal: 10

    },
    input: {
        flex: 9,
        // justifyContent: 'center',*
        height: 45,
        borderWidth: 1,
        borderRadius: 15,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: "white"
    },
    btnSend: {
        flex: 2,
        // justifyContent: 'center',
        height: 45,
        marginLeft: 8,
        borderWidth: 1,
        backgroundColor: '#0096FF',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 10,
        textAlign: 'center'
    },
    chatView: {
        backgroundColor: 'white',
        flex: 10,
        margin: 20,
        borderWidth: 1,
        borderRadius: 10,
        padding: 20
        // width: '100%'
    },
    header: {
        textAlign: 'center',
        paddingVertical: '15px',
        backgroundColor: 'inherit',
        borderBottomWidth: 1,
        marginBottom: 10,
    }
})