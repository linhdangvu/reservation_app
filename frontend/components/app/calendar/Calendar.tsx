import { Text, View } from '../../Themed';
import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import CalendarPicker from 'react-native-calendar-picker';

import * as data from '../../../data/calendar.json'
import moment from 'moment';

import { getUserInfo } from '../../../helpers/LoginHelpers';
import { getCalendar } from '../../../helpers/ReservationHelpers';
import { useRoute } from '@react-navigation/native';


const Calendar = () => {
    const route = useRoute()
    const userId = getUserInfo().user.id
    const role = getUserInfo().user.role
    const arrCalendar = getCalendar()

    const [selectedStartDate, setSelectedStartDate] = useState(moment);
    const startDate = selectedStartDate
        ? selectedStartDate.format('YYYY-MM-DD').toString()
        : ''
    const dataCalendar = [...JSON.parse(JSON.stringify(data)).default, ...arrCalendar]
    console.log(dataCalendar)
    const info = dataCalendar.filter((item: any) => {
        return (role === 'admin' ? item.date === startDate : item.date === startDate && item.userId === userId)
    })


    return (
        <View style={styles.container}>

            <CalendarPicker onDateChange={setSelectedStartDate} />
            {info.map((item: any, index: number) => {
                return (
                    <View style={styles.dayInfo} key={index}>
                        {/* <Text style={{ color: 'black' }}>{startDate}</Text> */}
                        <Text style={styles.textInfo}>{item.title}</Text>
                        {
                            item.description.map((item2: string, index: number) =>

                                <Text style={styles.textInfo} key={index + 1}>{index + 1}. {item2.text}</Text>

                            )
                        }
                    </View>
                )
            })}


        </View>

    )
}

export default Calendar

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '80%'
    },
    dayInfo: {
        backgroundColor: 'bisque',
        flex: 1,
        marginTop: 10,
        justifyContent: 'center',
        padding: 10,
        borderWidth: 1,
        borderColor: 'orange'
    },
    textInfo: {
        color: 'black',
        textAlign: 'center',

    }
})