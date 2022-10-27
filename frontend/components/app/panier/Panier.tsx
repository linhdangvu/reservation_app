import { Text, View } from '../../Themed';
import { ScrollView, StyleSheet, TextInput, Picker, Button, requireNativeComponent } from 'react-native';

import { getUserInfo } from '../../../helpers/LoginHelpers';
import { useState } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import moment from 'moment';
import { setCalendar, verifDate } from '../../../helpers/ReservationHelpers';

export type TodoList = {
    id: number,
    text: string
};

const Panier = () => {
    const [selectedValue, setSelectedValue] = useState("One");

    const options = [
        {
            id: 1,
            label: "One",
            value: "one"
        },
        {
            id: 2,
            label: "Two",
            value: "two"
        },
        {
            id: 3,
            label: "Three",
            value: "three"
        }
    ]

    const [date, setDate] = useState(moment().format("DD/MM/YYYY-HH:mm:ss").toString())
    const [errors, setErrors] = useState("")

    const [todoList, setTodoList] = useState(Array<TodoList>)

    const addTodo = (item: any) => {
        setTodoList([...todoList, item])
    }

    const deleteTodo = (todoId: number) => {
        const newList = todoList.filter((item) => item.id !== todoId)
        setTodoList(newList)
    }

    const reservation = (date: string) => {
        const errorData = verifDate(date)
        setErrors(errorData)
        if (errors === "") {
            const data = {
                date: date.slice(6, 10) + "-" + date.slice(3, 5) + "-" + date.slice(0, 2),
                title: date,
                description: todoList,
                userId: getUserInfo().user.id
            }
            setCalendar(data)
            // console.log(data)
        }
    }

    const space = <View style={{ backgroundColor: 'white', width: 30 }} />
    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', backgroundColor: 'white', marginTop: 20 }}>
                <Picker
                    selectedValue={selectedValue}
                    style={{ height: 50, width: 150, }}
                    onValueChange={(itemValue: any, itemIndex: any) => setSelectedValue(itemValue)}
                >
                    {options.map((item: any, index: number) =>
                        <Picker.Item label={item.label} value={item.label} key={index} />
                    )}

                </Picker>
                {space}
                <Text style={styles.btnAdd} onPress={() => addTodo({ id: todoList.length + 1, text: selectedValue })}>
                    <FontAwesome size={30} name={'plus'} />
                </Text>
            </View>
            {/* List add */}
            <View style={{ flexDirection: 'column', backgroundColor: 'white', marginTop: 20, flex: 7, width: '80%' }}>
                {todoList.length !== 0 ?
                    <ScrollView>
                        {todoList.map((item: any, index: number) =>
                            <View style={{ flexDirection: 'row', backgroundColor: 'white', marginBottom: 10 }} key={index}>
                                <Text style={styles.seletedOption}>{item.text}</Text>
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
                {
                    errors !== "" ?
                        <Text style={{ color: 'black' }}>{errors}</Text>
                        : <></>
                }

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
        marginTop: 10
    },
    btnValider: {
        borderWidth: 1,
        color: 'black',
        padding: 5,
        margin: 10
    }
})