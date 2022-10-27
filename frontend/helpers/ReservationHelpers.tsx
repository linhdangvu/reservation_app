
import moment from 'moment'
import * as calendar from '../data/calendar.json'

const compareDate = (date: string) => {
    const now = moment().format("DD/MM/YYYY-HH:mm:ss").toString()
    let t1 = now.split('/').join("").split(':').join("").split("-").join("")
    let t2 = date.split('/').join("").split(':').join("").split("-").join("")
    return Number(t2) - Number(t1) // > 0 => OK
}

const checkDate = (date: string) => {
    const day = Number(date.slice(0, 2))
    const month = Number(date.slice(3, 5))
    const year = Number(date.slice(6, 10))
    // const hour = Number(date.slice(11, 13))
    // const minute = Number(date.slice(14, 16))
    // const second = 1 // not use 
    // console.log(day, month, year, hour, minute, second)
    // if (hour > 24 || minute > 59 || second > 59 || hour < 0 || minute < 0 || second < 0) {
    //     return false
    // }
    if (month > 12 || day > 31) {
        return false
    }
    if (month === 2) {
        if (year % 4 === 0 && day > 29) {
            return false
        }
        if (year % 4 !== 0 && day > 28) {
            return false
        }
    }
    if (month === 4 || month === 6 || month === 9 || month === 11) {
        if (day > 30) {
            return false
        }
    }
    return true
}

const verifDate = (date: string) => {
    const reg = /\d{2}\/\d{2}\/\d{4}\-\d{2}\:\d{2}\:\d{2}/;
    if (reg.test(date)) {
        if (compareDate(date) > 0) {
            if (checkDate(date)) {
                return ""
            } else {
                return "Not correct date"

            }
        } else {
            return "Date from the past"

        }
    } else {
        return "Need format dd/mm/yyyy-hh:mm"

    }
}

const setCalendar = (data: any) => {
    console.log(data)

    if (localStorage.getItem("calendar")) {
        const calendarData: any = localStorage.getItem('calendar')
        let obj = JSON.parse(calendarData)
        const nData = [...obj, data]
        console.log(nData)
        localStorage.setItem('calendar', JSON.stringify(nData))
    } else {
        console.log("NOOO")
        localStorage.setItem('calendar', JSON.stringify([data]))
    }
}

const getCalendar = () => {
    const data: any = localStorage.getItem('calendar')
    if (JSON.parse(data)) {
        return JSON.parse(data)
    } else {
        return []
    }

}

export { verifDate, setCalendar, getCalendar }