
import moment from 'moment'
import * as calendar from '../data/calendar.json'

const convertReverseDate = (date: string) => {
    // 2022-10-27 => DD/MM/YYYY
    return date.slice(8, 10) + "/" + date.slice(5, 7) + "/" + date.slice(0, 4)
}

const compareDate = (date: string, time: string) => {
    const formDate = date + "-" + time
    console.log(formDate)
    const now = moment().format("DD/MM/YYYY-HH:mm").toString()
    let t1 = now.split('/').join("").split(':').join("").split("-").join("")
    let t2 = formDate.split('/').join("").split(':').join("").split("-").join("")
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
    // const convert = convertReverseDate(date)
    const reg = /^\d{2}\/\d{2}\/\d{4}$/;
    if (reg.test(date)) {
        if (checkDate(date)) {
            return ""
        } else {
            return "This date not exist"
        }

    } else {
        return "Need format dd/mm/yyyy"
    }
}

const setCalendar = (data: any) => {
    console.log(data)

    if (localStorage.getItem("calendar")) {
        const calendarData: any = getCalendarList()
        // let obj = JSON.parse(calendarData)
        // console.log(obj, "erz")
        const nData = [...calendarData, ...data]
        // console.log("SEE DATA", nData)
        localStorage.setItem('calendar', JSON.stringify(nData))
    } else {
        // console.log("NOOO")
        localStorage.setItem('calendar', JSON.stringify(data))
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

// data from local
const setCalendarToLocal = () => {
    localStorage.setItem('calendar', JSON.stringify(calendar.calendar))
}

const getCalendarList = () => {
    if (localStorage.getItem('calendar')) {
        let calendarLocal: any = localStorage.getItem('calendar')
        return JSON.parse(calendarLocal)
    } else {
        console.log("There no calendar data")
        return []
    }
}


export { verifDate, setCalendar, getCalendar, compareDate, checkDate, setCalendarToLocal, getCalendarList }