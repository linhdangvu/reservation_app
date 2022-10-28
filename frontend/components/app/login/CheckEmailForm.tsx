import { Text, View } from '../../Themed';
import { TextInput, StyleSheet, TouchableHighlight, CheckBox } from 'react-native';
import React, { useContext, useState } from 'react';
import { verifEmail, verifPassword, setUserInfo, verifUsers, verifUsersEmail } from '../../../helpers/LoginHelpers';
import { useNavigation } from '@react-navigation/native';
import { getUsersList } from '../../../helpers/UsersHelpers';


export default function CheckEmailForm() {
    const navigation = useNavigation()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState(Array<String>())
    const usersData = getUsersList()

    const checkForm = () => {
        let errorEmail = verifEmail(email);
        let errorsForm = [];
        if (errorEmail != "") errorsForm.push(errorEmail)
        if (!verifUsersEmail(email)) errorsForm.push("Email not existe")
        setErrors(errorsForm);
        if (errorsForm.length == 0) {
            navigation.navigate('ChangePassword', { email: email })
        }
    }

    return (
        <View style={styles.containers}>
            <Text style={styles.labelText}>Email:</Text>
            <View style={styles.inputLine}>
                <TextInput style={styles.textInput}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="email@example.com" />
            </View>
            {errors.map((item: String, index) => {
                return <Text key={index} lightColor='red' darkColor='red' style={{ marginHorizontal: 22 }}>{item}</Text>
            })}

            <TouchableHighlight style={styles.button}
                onPress={checkForm}>
                <Text style={styles.buttonText}>Check Email</Text>
            </TouchableHighlight>

        </View>
    )
}

const styles = StyleSheet.create({
    containers: {
        backgroundColor: '#dcdcdc',
        borderRadius: 10,
        padding: 20,
        width: '75%',
        maxWidth: '750px',
        minWidth: '250px'
    },
    inputLine: {
        flexDirection: 'row',
        marginHorizontal: 10,
        // marginVertical: 10,
        flex: 1,
        backgroundColor: 'inherit',
    },
    labelText: {
        marginHorizontal: 20,
        marginVertical: 10,
        // flex: 1,
        color: 'black',
        fontWeight: '700'
    },
    textInput: {
        height: 40,
        margin: 12,
        border: '1px solid #8d8f8e',
        borderRadius: 5,
        padding: 10,
        flex: 1,
        //backgroundColor: "white"
    },
    button: {
        backgroundColor: '#0096FF',
        alignSelf: 'center',
        borderRadius: 5,
        padding: 10,
        margin: 20,
        width: 200
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    },
    checkboxContainer: {
        flexDirection: "row",
        marginHorizontal: 20,
        backgroundColor: 'inherit',
        marginTop: 10,
        paddingLeft: 1
    },
    checkbox: {
        alignSelf: "center",
        backgroundColor: "inherit",
    },
    labelCheckBox: {
        color: 'black',
        marginLeft: 10
    },
    footerLogin: {
        backgroundColor: 'inherit',
        borderTopWidth: 1,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingTop: 20
    },
    textFooter: {
        color: 'black',
        fontSize: 11,
        paddingHorizontal: 20,
        paddingVertical: 5
    },
    sousTextFooter: {
        color: 'steelblue',
        marginLeft: 5
    }
});

