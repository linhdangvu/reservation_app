import { Text, View } from '../../Themed';
import { TextInput, StyleSheet, TouchableHighlight, Image, Switch } from 'react-native';
import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { verifEmail, verifPassword } from '../../../helpers/LoginHelpers';
import { useNavigation } from '@react-navigation/native';
import data from "../data/users.json"

export type UserProps = {
    id: number;
    image: string;
    lastname: string;
    firstname: string;
    email: string;
    phone: string
};

export default function Profile() {
    const navigation = useNavigation()

    let Users = {
        id: 0,
        image: "",
        lastname: "",
        firstname: "",
        email: "",
        phone: ""
    }

    data.map((item: UserProps)=> {
        if (item.email == localStorage.getItem("user") ){
            Users = item
        }
    })

    

    const [image, setImage]       = useState(Users.image)
    const [lastname, setLastname] = useState(Users.lastname)
    const [firstname, setFirstname] = useState(Users.firstname)
    const [email, setEmail] = useState(Users.email)
    const [phone, setPhone] = useState(Users.phone)

    const [password, setPassword] = useState("")
    const [confirmation, setConfirmation] = useState("")
    const [errors, setErrors] = useState(Array<String>())
    const [isSelected, setSelection] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);



    const Profile = ({ user }: { user: UserProps }) => {
        data[Users.id].push(user)
    }

    
    const verifProfile = () => {
        let errorEmail = verifEmail(email);
        let errorsForm = [];
        let user = {
            id: 0,
            image: image,
            lastname: lastname,
            firstname: firstname,
            email: email,
            phone: phone
        }
        if (errorEmail != "") errorsForm.push(errorEmail)
        setErrors(errorsForm);
        if (errorsForm.length == 0) {
            Profile({ user: user })
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
            <View style={{flexDirection: 'row', marginTop: 20}}>
                <View style={{flex: 2}}>
                    <Image
                        style = {styles.img}
                        source={{ uri: Users.image }}
                    />
                </View>
                <View style={{flex: 3}}>
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
                <Text style={styles.buttonText}>Update</Text>
            </TouchableHighlight>
            <View>
                <TextInput style={styles.textInput}
                    value={password}
                    onChangeText={setPassword}
                    placeholder="Password" />
                <TextInput style={styles.textInput}
                    value={confirmation}
                    onChangeText={setConfirmation}
                    placeholder="Confirmation" />
                <TouchableHighlight style={styles.button}
                    onPress={verifProfile}>
                    <Text style={styles.buttonText}>Update</Text>
                </TouchableHighlight>
            </View>
            <View style={styles.containers}>
                <Switch
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
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
    img: {
        width: 'inherit',
        height: '40vw',
        maxHeight:'300px',
        minHeight:'180px',
        resizeMode: 'stretch',
        borderTopStartRadius : 10,
        borderTopEndRadius: 10
    }
});