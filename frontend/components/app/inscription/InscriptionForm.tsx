import { Text, View } from '../../Themed';
import { TextInput, StyleSheet, TouchableHighlight, CheckBox, SliderComponent } from 'react-native';
import React, { useContext, useState } from 'react';
import { setUserInfo, verifEmail, verifPassword, verifUsers } from '../../../helpers/LoginHelpers';
import { useNavigation } from '@react-navigation/native';
import { addUsers, getUsersList, sleep } from '../../../helpers/UsersHelpers';


export default function InscriptionForm() {
    const navigation = useNavigation()
    const usersData = getUsersList()

    const [email, setEmail] = useState("")
    const [firstname, setFirstName] = useState("")
    const [lastname, setLastName] = useState("")
    const [password, setPassword] = useState("")
    const [passwordconfirm, setPasswordconfirm] = useState("")
    const [errors, setErrors] = useState(Array<String>())
    const [isSelected, setSelection] = useState(false);

    const signup = async (data: any) => {
        if (isSelected) {
            console.log("Need to set cookie")
        }
        if (typeof (Storage) !== 'undefined') {
            localStorage.setItem("token", "aqwxszedc");
            localStorage.setItem("email", data.email)
            localStorage.setItem("notification", "false")
            addUsers(data)
            // await sleep(1000)
            setUserInfo([data])
            // await sleep(1000)
            window.location.href = "main"
        } else {
            alert("No support storage")
        }
    }

    const verifLogin = () => {
        let errorPassword = verifPassword(password),
            errorEmail = verifEmail(email);
        let errorsForm = [];
        if (lastname == "") errorsForm.push("Write your lastname");
        if (firstname == "") errorsForm.push("Write your firstname");
        if (errorPassword != "") errorsForm.push(errorPassword);
        if (errorEmail != "") errorsForm.push(errorEmail)
        if (password !== passwordconfirm) errorsForm.push("Password is not the same")
        if (verifUsers(email, password)) errorsForm.push("Email or password exit")
        setErrors(errorsForm);
        if (errorsForm.length == 0) {
            const data = {
                "id": usersData.length + 1,
                "lastname": lastname,
                "firstname": firstname,
                "email": email,
                "phone": "0000000000",
                "password": password,
                "role": "client",
                "image": "https://img.static-rmg.be/a/view/q75/w/h/3322279/petr-sidorov-d3szbcaemhq-unsplash-jpg.jpg"
            }
            signup(data)
        }
    }

    return (
        <View style={styles.containers}>
            <Text style={styles.labelText}>First Name:</Text>
            <View style={styles.inputLine}>
                <TextInput style={styles.textInput}
                    value={firstname}
                    onChangeText={setFirstName}
                    placeholder="First Name" />
            </View>


            <Text style={styles.labelText}>Last Name:</Text>
            <View style={styles.inputLine}>
                <TextInput style={styles.textInput}
                    value={lastname}
                    onChangeText={setLastName}
                    placeholder="Last Name" />
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
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    placeholder="Password" />
            </View>



            <Text style={styles.labelText}>Confirm password:</Text>
            <View style={styles.inputLine}>
                <TextInput style={styles.textInput}
                    value={passwordconfirm}
                    secureTextEntry={true}
                    onChangeText={setPasswordconfirm}
                    placeholder="Password Confirm" />
            </View>



            {errors.map((item: String, index) => {
                return <Text key={index} lightColor='red' darkColor='red' style={{ marginHorizontal: 10 }}>{item}</Text>
            })}

            <TouchableHighlight style={styles.button}
                onPress={verifLogin}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    containers: {
        backgroundColor: '#dcdcdc',
        marginTop: 10,
        borderRadius: 10,
        border: '1px solid #0096FF',
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
        flex: 1

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
        backgroundColor: 'inherit',
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

