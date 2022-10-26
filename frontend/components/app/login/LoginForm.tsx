import { Text, View } from '../../Themed';
import { TextInput, StyleSheet, TouchableHighlight, CheckBox } from 'react-native';
import React, { useContext, useState } from 'react';
import { verifEmail, verifPassword, verifUsers, setUserInfo } from '../../../helpers/LoginHelpers';
import { useNavigation } from '@react-navigation/native';

export default function LoginForm() {
    const navigation = useNavigation()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState(Array<String>())
    const [isSelected, setSelection] = useState(false);

    const login = ({ email, password }: { email: string, password: string }) => {
        if (isSelected) {
            console.log("Need to set cookie")
        }
        if (typeof (Storage) !== 'undefined') {
            localStorage.setItem("token", "aqwxszedc");
            setUserInfo(email)
            window.location.href = "main"
        } else {
            alert("No support storage")
        }
    }

    const verifLogin = () => {
        let errorPassword = verifPassword(password),
            errorEmail = verifEmail(email);
        let errorsForm = [];
        if (errorPassword != "") errorsForm.push(errorPassword);
        if (errorEmail != "") errorsForm.push(errorEmail)
        if (!verifUsers(email, password)) errorsForm.push("Email or password not correct")
        setErrors(errorsForm);
        if (errorsForm.length == 0) {
            login({ password: password, email: email })
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
            <Text style={styles.labelText}>Password:</Text>
            <View style={styles.inputLine}>
                <TextInput style={styles.textInput}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password" />
            </View>
            {errors.map((item: String, index) => {
                return <Text key={index} lightColor='red' darkColor='red' style={{ marginHorizontal: 10 }}>{item}</Text>
            })}
            <View style={styles.checkboxContainer}>
                <CheckBox
                    value={isSelected}
                    onValueChange={setSelection}
                    style={styles.checkbox}
                />
                <Text style={styles.labelCheckBox}>Remember Me</Text>
            </View>
            <TouchableHighlight style={styles.button}
                onPress={verifLogin}>
                <Text style={styles.buttonText}>Sign in</Text>
            </TouchableHighlight>
            <View style={styles.footerLogin}>
                <Text style={styles.textFooter}>New around here ?
                    <Text onPress={() => { navigation.navigate('Inscription') }} style={styles.sousTextFooter}>Sign Up</Text>
                </Text>
                <Text style={styles.textFooter}>Forgot your Password ?</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containers: {
        backgroundColor: 'white',
        border: 'solid 1px black',
        width: '80%',
    },
    inputLine: {
        flexDirection: 'row',
        marginHorizontal: 10,
        // marginVertical: 10,
        flex: 1,
        backgroundColor: 'white',
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
        borderWidth: 1,
        padding: 10,
        flex: 1

    },
    button: {
        backgroundColor: '#0096FF',
        padding: 10,
        margin: 20,
        width: 'fit-content'
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    },
    checkboxContainer: {
        flexDirection: "row",
        marginHorizontal: 20,
        backgroundColor: 'white',
        marginTop: 10
    },
    checkbox: {
        alignSelf: "center",

    },
    labelCheckBox: {
        color: 'black',
        marginLeft: 10
    },
    footerLogin: {
        backgroundColor: 'white',
        borderTopWidth: 1,
    },
    textFooter: {
        color: 'black',
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    sousTextFooter: {
        color: 'black',
        marginLeft: 5
    }
});

