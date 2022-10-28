import { Text, View } from '../../Themed';
import { ScrollView, StyleSheet, TextInput, Picker, Button, requireNativeComponent } from 'react-native';

import { getUserInfo } from '../../../helpers/LoginHelpers';
import { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import moment from 'moment';
import { compareDate, getCalendar, getCalendarList, setCalendar, verifDate } from '../../../helpers/ReservationHelpers';
import { useNavigation } from '@react-navigation/native';
import * as calendar from '../../../data/calendar.json'

export type TodoList = {
    id: number,
    text: string,
    time: string,
    date: string,
    who: string
};

const Panier = () => {
    const role = getUserInfo().user.role

    const [selectedValue, setSelectedValue] = useState("Tarot reading with Lucia");
    const [selectedTime, setSelectedTime] = useState("10:00");
    // const [selectedDuration, setSelectedDuration] = useState("Morning");
    const calendarData: any = getCalendarList()
    // const dataCalendar: any = [...JSON.parse(JSON.stringify(calendar)).default, ...arrCalendar]
    // console.log(dataCalendar)
    const options = [
        {
            id: 1,
            label: "Tarot reading with Lucia",
            value: "Lucia"
        },
        {
            id: 2,
            label: "Read your destiny with Yana",
            value: "Yana"
        },
        {
            id: 3,
            label: "Future prediction with Maria",
            value: "Maria"
        }
    ]

    const optionsTime = [
        "10:00", "11:00", "12:00", "14:00", "15:00", "16:00"
    ]
    const navigation = useNavigation()
    const [date, setDate] = useState(moment().format("DD/MM/YYYY").toString())
    const [errors, setErrors] = useState(Array<String>)

    const [todoList, setTodoList] = useState(Array<TodoList>)
    const [client, setClientName] = useState("")

    const convertFormDate = (date: string) => {
        // 27/10/2022 => 2022-10-27
        return date.slice(6, 10) + "-" + date.slice(3, 5) + "-" + date.slice(0, 2)
    }

    const addTodo = (item: any) => {
        // await sleep(1000)
        const convertDate = convertFormDate(item.date)
        const checkTime = todoList.some((it: any) =>
            it.time === item.time && it.date === convertDate && it.who === item.who
        )
        const checkCalendarData = calendarData.some((date: any) => {
            // console.log(date, item)
            return date.time === item.time && date.date === convertDate && date.who === item.who
        }
        )
        const checkWho = todoList.some((it: any) =>
            it.who === item.who
        )
        const errorData = verifDate(item.date)
        let errorForm = []
        if (errorData !== "") errorForm.push(errorData)
        if (!(!checkTime && !checkCalendarData)) {
            errorForm.push("Already existe")
        }
        // if (checkWho) {
        //     errorForm.push("This person is busy at that time")
        // }
        if (compareDate(item.date, item.time) <= 0) {
            errorForm.push("Try to add another time more newer")
        }
        setErrors(errorForm)
        if (errorForm.length === 0) {
            console.log("add")
            item.date = convertDate
            setTodoList([...todoList, item])
        }



    }

    const deleteTodo = (todoId: number) => {
        const newList = todoList.filter((item) => item.id !== todoId)
        setTodoList(newList)
    }

    const reservation = (date: string) => {
        // const errorData = verifDate(date)
        let errorForm = []
        // if (errorData === "") errorForm.push(errorData)
        if (todoList.length === 0) errorForm.push("Add some reservation")
        if (client === "" && role === 'admin') errorForm.push("Please write the name of client")
        setErrors(errorForm)

        if (errorForm.length === 0) {

            const listReservation = todoList.map((item) => {
                return {
                    date: date.slice(6, 10) + "-" + date.slice(3, 5) + "-" + date.slice(0, 2),
                    title: item.text,
                    description: "Intervenant: " + item.who + " \t Time: " + item.time + " \t Session: 1hr",
                    userId: getUserInfo().user.id,
                    time: item.time,
                    who: item.who,
                    clientName: client
                }
            })
            // console.log("SHOW LIST RESER", listReservation)
            setCalendar(listReservation)
            // console.log(data)
            const notif = localStorage.getItem('notification')
            if (notif === "true") {
                alert("Notification: Add to calendar")
            }
            setTodoList([])
            navigation.navigate('Calendar')
        }
    }

    const space = <View style={{ backgroundColor: 'white', width: 30 }} />
    return (
        <View style={styles.container}>

            <View style={{ flexDirection: 'row', backgroundColor: 'white', marginTop: 20 }}>
                <Picker
                    selectedValue={selectedValue}
                    style={{ height: 50, width: '95%', }}
                    onValueChange={(itemValue: any, itemIndex: any) => setSelectedValue(itemValue)}
                >
                    {options.map((item: any, index: number) =>
                        <Picker.Item label={item.label} value={item.label} key={index} />
                    )}

                </Picker>
                {space}

            </View>
            {role === 'admin' ? <View style={{ flexDirection: 'column', backgroundColor: 'white', marginTop: 20, flex: 1, width: '80%' }}>
                <Text style={{ color: 'black' }}>Name client :</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setClientName}
                    value={client}
                />
            </View> : <></>}

            <View style={{ flexDirection: 'row', backgroundColor: 'white', marginTop: 20 }}>
                <Picker
                    selectedValue={selectedTime}
                    style={{ height: 50, width: 150, }}
                    onValueChange={(itemValue: any, itemIndex: any) => setSelectedTime(itemValue)}
                >
                    {optionsTime.map((item: any, index: number) =>
                        <Picker.Item label={item} value={item} key={index} />
                    )}

                </Picker>
                {space}
                <Text style={styles.btnAdd} onPress={() => addTodo({ id: todoList.length + 1, text: selectedValue, time: selectedTime, date: date, who: (options.find((item) => item.label === selectedValue)?.value) })}>
                    <FontAwesome size={30} name={'plus'} />
                </Text>
            </View>
            {/* List add */}
            <View style={{ flexDirection: 'column', backgroundColor: 'white', marginTop: 20, flex: 7, width: '80%' }}>
                {errors.map((item: String, index) => {
                    return <Text key={index} lightColor='red' darkColor='red' style={{ marginHorizontal: 10 }}>{item}</Text>
                })}
                {todoList.length !== 0 ?
                    <ScrollView>
                        {todoList.map((item: any, index: number) =>
                            <View style={{ flexDirection: 'row', backgroundColor: 'white', marginBottom: 10 }} key={index}>
                                <Text style={styles.seletedOption}>{item.text} - {item.time} - {item.date}</Text>
                                {space}
                                <Text style={styles.btnDelete} onPress={() => deleteTodo(item.id)}>
                                    <FontAwesome size={30} name={'trash'} />
                                </Text>
                            </View>
                        )}
                    </ScrollView> : <></>
                }
            </View>



            <View style={{ flexDirection: 'column', backgroundColor: 'white', marginTop: 20, flex: 1, width: '80%' }}>
                <Text style={{ color: 'black' }}>Date :</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setDate}
                    value={date}
                />
            </View>
            <View style={{ flexDirection: 'row', backgroundColor: 'white', marginTop: 20 }}>
                <Text style={styles.btnValider} onPress={() => {
                    reservation(date)

                }}>Valider</Text>
            </View>
        </View>
    )
}

export default Panier

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        width: '80%',
        marginVertical: 20,
        flexDirection: 'column'
    },
    btnAdd: {
        color: 'black',
        flex: 1,
        // justifyContent: 'center',
        borderWidth: 1,
        margin: 5,
        paddingVertical: 3,
        paddingHorizontal: 7,
        borderRadius: 50
    },
    btnDelete: {
        color: 'black',

    },
    seletedOption: {
        backgroundColor: 'whitesmoke',
        color: 'black',
        borderWidth: 1,
        padding: 10,
        textAlign: 'center',
        justifyContent: 'center',
        width: '70%'
    },
    input: {
        padding: 5,
        textAlign: 'center',
        borderWidth: 1,
        marginTop: 5
    },
    btnValider: {
        borderWidth: 1,
        color: 'black',
        padding: 5,
        margin: 2
    }
})