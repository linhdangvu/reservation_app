import * as message from '../data/message.json'

// data from local
const setMessageToLocal = () => {
    localStorage.setItem('message', JSON.stringify(message.message))
}

const getMessageList = () => {
    if (localStorage.getItem('message')) {
        let messageLocal: any = localStorage.getItem('message')
        return JSON.parse(messageLocal)
    } else {
        console.log("There no message data")
        return []
    }
}

const setMessage = (data: any) => {
    // console.log(data)

    if (localStorage.getItem("message")) {
        const messageData: any = getMessageList()
        // let obj = JSON.parse(calendarData)
        // console.log(obj, "erz")
        const nData = [...messageData, data]
        // console.log("SEE DATA", nData)
        localStorage.setItem('message', JSON.stringify(nData))
    } else {
        // console.log("NOOO")
        localStorage.setItem('message', JSON.stringify(data))
    }
}

export { setMessageToLocal, getMessageList, setMessage }