import React, { Component } from 'react';
import {ListView, StyleSheet, TextInput, View} from 'react-native';
import {Button, CheckBox, Icon, List, ListItem, Text } from 'native-base';
import { retrieveData, storeData} from "../api/AsyncStorage";

export class TheList extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            task: "",
            // Array of todos
            listOfTodos: [],
            // Array with checked todos
            selectedTodoId: [],
        };
    }

    // Retrieve list data from AsyncStorage
    componentWillMount() {
        retrieveData('todoData').then((item) => {
            if(!(item === null)) {
                this.setState ({
                    listOfTodos: (item)
                });
            }
        }).catch((error) => {
            console.log("Promise is rejected: " + error);
        });
        retrieveData('checkedTodoData').then((item) => {
            if(!(item === null)) {
                this.setState ({
                    selectedTodoId: (item)
                });
            }
        }).catch((error) => {
            console.log("Promise is rejected: " + error);
        });
    }

    // Add data from inputfield with date and push it in the todolist
    addNewTodoInput = (txt) => {
        if (!(this.state.task === "")) {
            let listOfTodos = this.state.listOfTodos;
            listOfTodos.push({id: new Date(), task: txt});
            storeData('todoData', listOfTodos);
            // Set the list
            this.setState({listOfTodos: listOfTodos})
        }
    }

    // Takes the uncheck or check a item from the list
    // Source: https://github.com/GeekyAnts/NativeBase/issues/989
    onCheckBoxPress(id) {
        let tmp = this.state.selectedTodoId;

        if ( tmp.includes( id ) ) {
            // Shrink the list from the rowsId
            tmp.splice( tmp.indexOf(id), 1 );
        } else {
            tmp.push( id );

        }
        storeData('checkedTodoData', tmp);
        // Set the new array above
        this.setState({selectedTodoId: tmp});

    if (this.state.listOfTodos.length == this.state.selectedTodoId.length){
    alert("Yay, you did everything today! Good job! (≧▽≦)");
}
    }

    // Deletes the selected item from the list
    deleteRow(secId, rowId, rowMap) {
        // Grab reference to this row
        rowMap[`${secId}${rowId}`].props.closeRow();
        const newData = [...this.state.listOfTodos];
        newData.splice(rowId, 1);
        this.setState({ listOfTodos: newData });
        storeData('todoData', newData);
    }

    render() {
        // Checks if  row is changes and set it as true,
        // and set the new defines the new related data to the data source
        // r1 = old, r2 = new (if it's alike then it's true and row is changed)
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return (
            <View>
                <TextInput multiline = {true} style={styles.input}
                    placeholder='Enter a task...'
                    // Set entered text into a state called task
                    onChangeText= {(text) => this.setState({task:text})}
                />
                <Button bordered style={styles.button}
                    // Takes task above as an argument and add it into the array
                    onPress={() =>  this.addNewTodoInput(this.state.task)}>
                    <Text style={styles.btntxt}> add </Text>
                </Button>
                <List style={styles.listcontainer}
                    rightOpenValue={-75}
                    enableEmptySections={true}
                    // Set the datasource to the array with the list of todos
                    dataSource={ds.cloneWithRows(this.state.listOfTodos)}
                    renderRow={(listOfTodos) =>
                    <ListItem>
                        <CheckBox
                            /* Set a todo to check if the ID is in the array */
                            checked={this.state.selectedTodoId.includes(listOfTodos.id)}
                            /* Add/delete todo from/to array if it's checked or unchecked */
                            onPress={()=>this.onCheckBoxPress(listOfTodos.id)}
                        />
                        <Text style={styles.textcontainer}>{listOfTodos.task}</Text>
                    </ListItem>}
                    renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                        /* Takes the references to the selected row and takes it in the function */
                    <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                    <Icon active name="trash" />
                    </Button>
                    }
                    />
        </View>
        );
    }
}

const styles = StyleSheet.create({
    textcontainer: {
        margin: 8,
    },
    input: {
        marginRight: 10,
        marginLeft: 10,
        marginTop: 10,
        fontSize: 30,
    },
    button: {
        alignSelf: 'center',
        width: '90%',
        height: 60,
        marginTop: 10,
        marginBottom: 10,

    },
    listcontainer: {
        marginLeft: 20,
    },
    btntxt: {
        marginLeft: '40%',
    }
});


