import { Text, View } from '../../Themed';
import { TextInput, StyleSheet, TouchableHighlight, CheckBox } from 'react-native';
import React, { useContext, useState } from 'react';
import { verifEmail, verifPassword } from '../../../helpers/LoginHelpers';
import { useNavigation } from '@react-navigation/native';


export default function InscriptionForm() {
    const navigation = useNavigation()

    const [email, setEmail] = useState("")
    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [errors, setErrors] = useState(Array<String>())
    const [isSelected, setSelection] = useState(false);

    // login temporaire
    const user = {
        email: "test@test.com",
        password: "1234"
    }

    const login = ({ email, password }: { email: string, password: string }) => {
        if (isSelected) {
            console.log("Need to set cookie")
        }
        if (typeof (Storage) !== 'undefined') {
            localStorage.setItem("token", "aqwxszedc");
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
        if (email != user.email && password != user.password) errorsForm.push("Email or password not correct")
        setErrors(errorsForm);
        if (errorsForm.length == 0) {
            login({ password: password, email: email })
        }
    }

    return (
        <View style={styles.containers}>
            <Text style={styles.labelText}>First Name:</Text>
            <View style={styles.inputLine}>
                <TextInput style={styles.textInput}
                    value={firstname}
                    onChangeText={setFirstName} />
            </View>


            <Text style={styles.labelText}>Last Name:</Text>
            <View style={styles.inputLine}>
                <TextInput style={styles.textInput}
                    value={lastname}
                    onChangeText={setLastName} />
            </View>



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



            <Text style={styles.labelText}>Confirm password:</Text>
            <View style={styles.inputLine}>
                <TextInput style={styles.textInput}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password" />
            </View>



            {errors.map((item: String, index) => {
                return <Text key={index} lightColor='red' darkColor='red' style={{ marginHorizontal: 10 }}>{item}</Text>
            })}

            <TouchableHighlight style={styles.button}
                onPress={verifLogin}>
                <Text style={styles.buttonText}>Sign in</Text>
            </TouchableHighlight>
            <View style={styles.footerLogin}>
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

