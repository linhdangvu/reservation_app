import { Text, View } from '../../Themed';
import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import CalendarPicker from 'react-native-calendar-picker';

import * as data from '../../../data/calendar.json'

const Calendar = () => {

    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const startDate = selectedStartDate
        ? selectedStartDate.format('YYYY-MM-DD').toString()
        : '';
    console.log(startDate)

    const info = data.filter((item) => { return item.date === startDate })
    console.log(info)
    return (
        <View style={styles.container}>

            <CalendarPicker onDateChange={setSelectedStartDate} />
            {info.map((item) => {
                return (
                    <View style={styles.dayInfo}>
                        {/* <Text style={{ color: 'black' }}>{startDate}</Text> */}
                        <Text style={styles.textInfo}>{item.title}</Text>
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