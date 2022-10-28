// add Users function
import * as users from '../data/users.json'

const setUsersToLocal = () => {
    localStorage.setItem('usersList', JSON.stringify(users.users))
    // console.log(JSON.stringify(users.users))
}

const addUsers = (user: any) => {
    if (localStorage.getItem('usersList')) {
        let userLocal: any = localStorage.getItem('usersList')
        let userData = [...JSON.parse(userLocal), user]
        // console.log(userData)
        localStorage.setItem('usersList', JSON.stringify(userData))
    } else {
        console.log("There no users data")
    }
}

const getUsersList = () => {
    if (localStorage.getItem('usersList')) {
        let userLocal: any = localStorage.getItem('usersList')
        return JSON.parse(userLocal)
    } else {
        console.log("There no users data")
        return []
    }
}

const updateUsersList = (user: any) => {
    if (localStorage.getItem('usersList')) {
        let userLocal: any = getUsersList()
        // let data = JSON.parse(userLocal)
        let ndata = userLocal.map((item: any) => {
            if (item.id === user.id) {
                return { ...item, lastname: user.lastname, firstname: user.firstname, email: user.email, phone: user.phone }
            } else {
                return item
            }
        })
        // console.log(ndata)
        localStorage.setItem('usersList', JSON.stringify(ndata))
    } else {
        console.log("There no users data")
    }
}

const updatePass = (user: any) => {
    if (localStorage.getItem('usersList')) {
        let userLocal: any = getUsersList()
        // let data = JSON.parse(userLocal)
        let ndata = userLocal.map((item: any) => {
            if (item.id === user.id) {
                return { ...item, password: user.password }
            } else {
                return item
            }
        })
        // console.log(ndata)
        localStorage.setItem('usersList', JSON.stringify(ndata))
    } else {
        console.log("There no users data")
    }
}

function sleep(ms: any) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

export { setUsersToLocal, addUsers, getUsersList, updateUsersList, sleep, updatePass }