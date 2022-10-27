import { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import ChatBox from '../components/app/message/chatbox/ChatBox';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';

export default function ChatBoxScreen({ navigation }: RootTabScreenProps<'ChatBox'>) {
  const [text, onChangeText] = useState("")
  return (
    <View style={styles.container}>
      <ChatBox />
      {/* <View style={styles.inputView}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Message..."
        />
        <TouchableOpacity style={styles.btnSend}>
          Send
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#241f1f',
    flexDirection: 'column',

  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  // inputView: {
  //   backgroundColor: 'white',
  //   flexDirection: 'row',
  //   flex: 1,
  //   // justifyContent: 'flex-end'
  // },
  // input: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   borderWidth: 1,
  //   paddingHorizontal: 10,
  //   paddingVertical: 5
  // },
  // btnSend: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   marginLeft: 8,
  //   borderWidth: 1,
  //   backgroundColor: 'antiquewhite',
  //   paddingHorizontal: 10,
  //   paddingVertical: 5
  // },
});
