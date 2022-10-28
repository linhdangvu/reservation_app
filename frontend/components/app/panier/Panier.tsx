import { Text, View } from '../../Themed';
import { ScrollView, StyleSheet, TextInput, Picker, Modal, Button, requireNativeComponent } from 'react-native';

import CalendarPicker from 'react-native-calendar-picker';

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
    const [modalVisible, setModalVisible] = useState(false);

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
            // console.log("add")
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

    return (
        <View style={styles.container}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                setModalVisible(!modalVisible);
                }}
            >
                <CalendarPicker
                    onDateChange={setDate}
                    previousTitle='<'
                    nextTitle='>'
                    height={100}
                    width={100}
                    textStyle={{ color: "white" }}
                    selectedDayColor='#f1883f'
                />
            </Modal>
            <View style={{ flexDirection: 'row', backgroundColor: 'inherit', width: '100%'}}>
                <View style = {styles.selection}>
                    <Picker
                        selectedValue={selectedTime}
                        style={styles.input}
                        onValueChange={(itemValue: any, itemIndex: any) => setSelectedTime(itemValue)}
                    >
                        {optionsTime.map((item: any, index: number) =>
                            <Picker.Item label={item} value={item} key={index} />
                        )}

                    </Picker>
                    <Picker
                        selectedValue={selectedValue}
                        style={styles.input}
                        onValueChange={(itemValue: any, itemIndex: any) => setSelectedValue(itemValue)}
                    >
                        {options.map((item: any, index: number) =>
                            <Picker.Item label={item.label} value={item.label} key={index} />
                        )}

                    </Picker>
                </View>
                <View style={styles.addComp}>          
                    <Text style={styles.btnAdd} onPress={() => addTodo({ id: todoList.length + 1, text: selectedValue, time: selectedTime, date: date })}>
                        <FontAwesome size={30} name={'plus'} />
                    </Text>
                </View>
                
            </View>
            {/* List add */}
            <View style={{ flexDirection: 'column', backgroundColor: 'white', marginTop: 20, flex: 7, width: '100%' }}>
                {errors.map((item: String, index) => {
                    return <Text key={index} lightColor='red' darkColor='red' style={{ marginHorizontal: 20 }}>{item}</Text>
                })}
                {todoList.length !== 0 ?
                    <ScrollView showsVerticalScrollIndicator = {false}>
                        {todoList.map((item: any, index: number) =>
                            <View style={styles.reservation} key={index}>
                                <Text style={styles.seletedOption}>{item.text} - {item.date} - {item.time}</Text>
                                <Text style={styles.btnDelete} onPress={() => deleteTodo(item.id)}>
                                    <FontAwesome size={20} name={'trash'} />
                                </Text>
                            </View>
                        )}
                    </ScrollView> : <></>
                }
            </View>



            <View style={{ flexDirection: 'row', backgroundColor: 'inherit', marginTop: 20, flex: 1, width: '100%' }}>
                <Text style={{ color: 'black', fontSize: 16, flex: 1, textAlign: 'right', padding: 5 }}>Date :</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setDate}
                    value={date}
                />
                {/*
                    errors.length > 0 ?
                    
                        <Text style={{ color: 'red' }}>{errors}</Text>
                        : <></>
             */}

            </View>
            <View style={{ flexDirection: 'row', backgroundColor: 'inherit', marginTop: 20 }}>
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
        backgroundColor: '#dcdcdc',
        borderRadius: 10,
        flex: 1,
        alignItems: 'center',
        width: '75%',
        maxWidth: '750px',
        minWidth: '250px',
        marginVertical: 20,
        flexDirection: 'column',
        padding: 20
    },
    addComp: {
        flex: 1,
        backgroundColor: 'inherit', 
        alignItems: 'center',
    },
    selection:{
        flex: 5,
        backgroundColor: 'inherit', 
    },
    btnAdd: {
        color: '#0096FF',
        textAlign: 'center',
        border: '2px solid #0096FF',
        margin: 7,
        padding: 15,
        borderRadius: 50

    },
    btnDelete: {
        color: 'red',
        flex: 1
    },
    reservation: { 
        border: '1px solid gray',
        flexDirection: 'row', 
        backgroundColor: 'whitesmoke', 
        margin: 10 , 
        paddingVertical: 5,
        borderRadius: 5
    },
    seletedOption: {
        color: 'black',
        textAlign: 'flex-start',
        justifyContent: 'center',
        width: '70%',
        flex: 7,
        paddingLeft: 50
    },
    input: {
        padding: 5,
        textAlign: 'center',
        marginBottom: 5,
        borderRadius: 5,
        flex: 14,
        backgroundColor: 'white',
        minHeight: 35
    },
    btnValider: {
        color: 'white',
        backgroundColor: '#0096FF',
        alignSelf: 'center',
        textAlign: 'center',
        borderRadius: 5,
        padding: 10,
        width: 200
    }

})