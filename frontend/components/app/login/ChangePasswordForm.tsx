import { Text, View } from '../../Themed';
import { TextInput, StyleSheet, TouchableHighlight, CheckBox } from 'react-native';
import React, { useContext, useState } from 'react';
import { verifPassword } from '../../../helpers/LoginHelpers';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getUsersList, updatePass } from '../../../helpers/UsersHelpers';


export default function ChangePasswordForm() {
    const navigation = useNavigation()
    const route = useRoute()
    const [email, setEmail] = useState(route.params?.email)
    const [password, setPassword] = useState("")
    const [passwordconfirm, setPasswordConfirm] = useState("")
    const [errors, setErrors] = useState(Array<String>())
    const [isSelected, setSelection] = useState(false);
    const usersData = getUsersList()
    const changePass = (email: string, pass: string) => {
        let usersList = getUsersList()
        const userData = usersList.filter((item: any) => {
            return item.email === email
        })
        // setUser(userData)
        userData[0].password = pass
        // console.log(userData)
        updatePass(userData[0])
        // const notif = localStorage.getItem('notification')
        // if (notif === "true") {
        alert("Notification: Change password successful")
        // }
    }

    const verifLogin = () => {
        let errPass = verifPassword(password)
        let errPassConf = verifPassword(passwordconfirm)
        let errorsForm = [];
        // if (errorPassword != "") errorsForm.push(errorPassword);
        if (errPass != "") errorsForm.push(errPass)
        if (errPassConf != "") errorsForm.push(errPassConf)
        if (password !== passwordconfirm) errorsForm.push("Password is not the same")
        setErrors(errorsForm);
        if (errorsForm.length == 0) {
            // login({ password: password, email: email })
            changePass(email, password)
            navigation.navigate('Login')
        }
    }

    return (
        <View style={styles.containers}>
            <Text style={styles.labelText}>Password:</Text>
            <View style={styles.inputLine}>
                <TextInput style={styles.textInput}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    placeholder="password" />
            </View>
            <Text style={styles.labelText}>Password:</Text>
            <View style={styles.inputLine}>
                <TextInput style={styles.textInput}
                    value={passwordconfirm}
                    onChangeText={setPasswordConfirm}
                    secureTextEntry={true}
                    placeholder="password confirmation" />
            </View>
            {errors.map((item: String, index) => {
                return <Text key={index} lightColor='red' darkColor='red' style={{ marginHorizontal: 22 }}>{item}</Text>
            })}

            <TouchableHighlight style={styles.button}
                onPress={verifLogin}>
                <Text style={styles.buttonText}>Change password</Text>
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



