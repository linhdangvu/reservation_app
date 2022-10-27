import { Text, View } from '../../Themed';
import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import CalendarPicker from 'react-native-calendar-picker';

import * as data from '../../../data/calendar.json'
import moment from 'moment';

import { getUserInfo } from '../../../helpers/LoginHelpers';


const Calendar = () => {

    const userId = getUserInfo().user.id

    const [selectedStartDate, setSelectedStartDate] = useState(moment);
    const startDate = selectedStartDate
        ? selectedStartDate.format('YYYY-MM-DD').toString()
        : ''
    const dataCalendar = JSON.parse(JSON.stringify(data))
    const info = dataCalendar.default.filter((item: any) => { return item.date === startDate && item.userId === userId })
    let vw = (window.innerWidth)*0.7
    let vh = (window.innerHeight)*0.5
    if(vw < 300){ vw = 300}
    if(vh < 300){ vh = 300}



    return (
        <View style={styles.container}>

            <CalendarPicker 
                    onDateChange={setSelectedStartDate} 
                    previousTitle= '<'
                    nextTitle='>'
                    height={vh}
                    width = {vw}
                    textStyle = {{color: "white"}}
                    selectedDayColor = '#f1883f'
            />
            {info.map((item: any, index: number) => {
                return (
                    <View style={styles.dayInfo} key={index}>
                        {/* <Text style={{ color: 'black' }}>{startDate}</Text> */}
                        <Text style={styles.textHeader}>{item.title}</Text>
                        <Text style={styles.textInfo}>{item.description}</Text>
                    </View>
                )
            })}


        </View>

    )
}

export default Calendar

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'inherit',
        width: '80%'
    },
    dayInfo: {
        backgroundColor: 'bisque',
        flex: 1,
        marginTop: 10,
        justifyContent: 'center',
        padding: 10,
        border: '1px solid orange',
        borderRadius: 5
    },
    textInfo: {
        color: 'black',
        textAlign: 'center',
    },
    textHeader: {
        color: 'black',
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '700'
    }
})