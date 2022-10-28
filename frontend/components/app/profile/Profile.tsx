import { Text, View } from '../../Themed';
import { TextInput, StyleSheet, TouchableHighlight, Image, Switch } from 'react-native';
import React, { useContext, useState } from 'react';
import { UserContext } from '../../../contexts/UserContext';
import { setUser, verifEmail, verifPassword } from '../../../helpers/LoginHelpers';
import { useNavigation } from '@react-navigation/native';
// import data from "../../../data/users.json"
import { getUserInfo } from '../../../helpers/LoginHelpers';
import { verifFirstname, verifPasswordconfirm, verifPhone } from '../../../helpers/SignUpHelpers';
import { getUsersList, updatePass, updateUsersList } from '../../../helpers/UsersHelpers';

// export type UserProps = {
//     id: number;
//     image: string;
//     lastname: string;
//     firstname: string;
//     email: string;
//     phone: string;
//     password: string;
//     role: string
// };

export default function Profile() {
    const navigation = useNavigation()
    const userData = getUserInfo().user
    let Users = {
        id: userData.id,
        image: userData.image,
        lastname: userData.lastname,
        firstname: userData.firstname,
        email: userData.email,
        phone: userData.phone,
        password: userData.password,
        role: userData.role
    }
    // let Index = 0
    // console.log(Users)


    const [image, setImage] = useState(Users.image)
    const [lastname, setLastname] = useState(Users.lastname)
    const [firstname, setFirstname] = useState(Users.firstname)
    const [email, setEmail] = useState(Users.email)
    const [phone, setPhone] = useState(Users.phone)

    const [password, setPassword] = useState("")
    const [confirmation, setConfirmation] = useState("")
    const [errors, setErrors] = useState(Array<String>())
    const [isSelected, setSelection] = useState(false);
    const notif = localStorage.getItem('notification')
    const notifBoolean = () => {
        if (notif === "false") return false
        else return true
    }
    console.log(notif, Boolean(notif))
    const [isEnabled, setIsEnabled] = useState(notifBoolean);
    const toggleSwitch = () => {
        setIsEnabled(previousState => !previousState);
        localStorage.setItem('notification', (!isEnabled).toString())
        if (!isEnabled) alert("Notification active")

    };

    // console.log('data', isEnabled)

    // const Profile = ({ user }: { user: UserProps }) => {
    //     data.users.splice(Index, 1, user)

    // }


    const verifProfile = () => {
        let errorEmail = verifEmail(email);
        let errorPhone = verifPhone(phone);
        let errorFirstname = verifFirstname(firstname);
        let errorLastname = verifFirstname(lastname);
        let errorsForm = [];
        // manque verifphone
        if (errorEmail !== "") errorsForm.push(errorEmail)
        if (errorPhone !== "") errorsForm.push(errorPhone)
        if (errorFirstname !== "") errorsForm.push(errorFirstname)
        if (errorLastname !== "") errorsForm.push(errorLastname)
        setErrors(errorsForm);
        if (errorsForm.length == 0) {
            let user: any = {
                id: Users.id,
                image: image,
                lastname: lastname,
                firstname: firstname,
                email: email,
                phone: phone,
                password: Users.password,
                role: Users.role
            }
            setUser(user)
            updateUsersList(user)
        }
    }
    const updatePassword = () => {
        let errorPassword = verifPassword(password);
        let errorConfirmation = verifPasswordconfirm(password, confirmation);
        let errorsForm = [];
        // manque verifphone
        if (errorPassword !== "") errorsForm.push(errorPassword)

        if (errorConfirmation !== "") errorsForm.push(errorConfirmation)
        setErrors(errorsForm)
        if (errorsForm.length == 0) {
            let user: any = {
                id: Users.id,
                image: image,
                lastname: lastname,
                firstname: firstname,
                email: email,
                phone: phone,
                password: password,
                role: Users.role
            }
            setUser(user)
            updatePass(user)

        }
    }

    {/*
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
*/}



    return (
        <View style={styles.containers}>
            <View style={{ flexDirection: 'row', backgroundColor: 'inherit' }}>
                <View style={{ flex: 2, padding: 10, backgroundColor: 'inherit' }}>
                    <Image
                        style={styles.img}
                        source={{ uri: Users.image }}
                    />
                </View>
                <View style={{ flex: 3, backgroundColor: 'inherit' }}>
                    <TextInput style={styles.textInput}
                        value={lastname}
                        onChangeText={setLastname}
                        placeholder="Last Name" />
                    <TextInput style={styles.textInput}
                        value={firstname}
                        onChangeText={setFirstname}
                        placeholder="First Name" />
                    <TextInput style={styles.textInput}
                        value={email}
                        onChangeText={setEmail}
                        placeholder="Email" />
                    <TextInput style={styles.textInput}
                        value={phone}
                        onChangeText={setPhone}
                        placeholder="Phone" />

                </View>
            </View>
            <TouchableHighlight style={styles.button}
                onPress={verifProfile}>
                <Text style={styles.buttonText}>Update profile</Text>
            </TouchableHighlight>
            <View style={{ backgroundColor: 'inherit' }}>
                <TextInput style={styles.textInput}
                    value={password}
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    placeholder="Password" />
                <TextInput style={styles.textInput}
                    value={confirmation}
                    secureTextEntry={true}
                    onChangeText={setConfirmation}
                    placeholder="Confirmation" />
                <TouchableHighlight style={styles.button}
                    onPress={updatePassword}>
                    <Text style={styles.buttonText}>Update password</Text>
                </TouchableHighlight>
            </View>
            <View style={{ backgroundColor: 'inherit', alignSelf: 'center', flexDirection: 'row' }}>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
                <Text style={styles.notifText}>Active Notifications</Text>
            </View>
            {errors.map((item: String, index) => {
                return <Text key={index} lightColor='red' darkColor='red' style={{ marginHorizontal: 22 }}>{item}</Text>
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    containers: {
        backgroundColor: '#ededec', //'#dcdcdc',
        borderRadius: 10,
        marginTop: 20,
        //border: '1px solid #0096FF',
        padding: 20,
        width: '75%',
        maxWidth: '750px',
        minWidth: '250px'
    },
    textInput: {
        maxHeight: 35,
        marginHorizontal: 12,
        marginVertical: 5,
        border: '1px solid #8d8f8e',
        borderRadius: 5,
        padding: 10,
        flex: 1,
        backgroundColor: "inherit",
    },
    button: {
        backgroundColor: '#0096FF',
        alignSelf: 'flex-end',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 20,
        margin: 10,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    },
    img: {
        height: '100%',
        minHeight: '100',
        resizeMode: 'stretch',
        borderRadius: 10,
    },
    notifText: {
        fontSize: 18,
        color: 'black',
        padding: 10,
        marginTop: '-15px',
    }
});