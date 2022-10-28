
import * as users from '../data/users.json'
import { getUsersList } from './UsersHelpers';

export function verifPassword(password: string) {
    if (password == "") {
        return "Please write password"
    }
    return ""
}

export function verifEmail(email: string) {
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (email == "" || email.length < 3 || !reg.test(email)) {
        return "Enter valid email";
    }
    // if (email != user.email) {
    //     return "There are no email like this.";
    // }
    return "";
}

// const usersData = JSON.parse(JSON.stringify(users)).default.users
const usersData: any = getUsersList()

export function verifUsers(email: string, password: string) {
    return usersData.some((item: any) => {
        return item.email === email && item.password === password
    })
}

export function setUserInfo(user: any) {
    // console.log("???3", email)
    // const user = usersData.filter((item: any) => {
    //     return item.email === email
    // })
    // console.log(JSON.stringify(user))
    localStorage.setItem('user', JSON.stringify(user))
}



export function setUser(data: string) {
    // const user = usersData.filter((item: any) => {
    //     return item.email === email
    // })
    // console.log(JSON.stringify(user))
    localStorage.setItem('user', JSON.stringify([data]))
    const notif = localStorage.getItem('notification')
    if (notif === "true") {
        alert("Notification: Save user succesfull")
    }
}

export function getUserInfo() {
    const user: any = localStorage.getItem('user')
    console.log(JSON.parse(user).pop())
    return { user: JSON.parse(user).pop() }
}

