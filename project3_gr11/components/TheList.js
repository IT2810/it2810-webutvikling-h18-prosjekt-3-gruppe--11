import React, { Component } from 'react';
import {ListView, TextInput, View} from 'react-native';
import {Button, CheckBox, Icon, List, ListItem, Text } from 'native-base';

export class TheList extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            newTodoInput: "",
            // Array of todos
            listOfTodos: [
                { id: 2, task: "Bli ferdig med denne greia" },
                { id: 4, task: "En oppgave" },
                { id: 6, task: "En annen oppgave som har veldig lang tekst Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor" },
                { id: 8, task: "Fullført oppgave" },
                { id: 10, task: "Jeg hater denne lista" },
            ],
            // Array with checked todos
            selectedTodoId: []
        };
    }

    // Add data from inputfield with date and push it in the todolist
    addNewTodoInput = (txt) => {
        let listOfTodos = this.state.listOfTodos;
        listOfTodos.push({id: new Date(), task: txt});
        // Set the list
        this.setState({listOfTodos})
    }

    // Takes the uncheck or check a item from the list
    onCheckBoxPress(id) {
        let checkBoxState = this.state.selectedTodoId;
        if ( checkBoxState.includes( id ) ) {
            // Delete item from id which unchecks it
            checkBoxState.splice( checkBoxState.indexOf(id), 1 );
        } else {
            // Add item to array which checks it
            checkBoxState.push( id );
        }

        // Set the new array of checked items
        this.setState({
            selectedTodoId: checkBoxState
        });
        console.log(this.state.selectedTodoId);
    }

    // Deletes the selected item from the list
    deleteRow(secId, rowId, rowMap) {
        // Grab reference to this row
        rowMap[`${secId}${rowId}`].props.closeRow();
        const newData = [...this.state.listOfTodos];
        // Shrink the list from the rowsId
        newData.splice(rowId, 1);
        // Set the new array above
        this.setState({ listOfTodos: newData });
        const mordi = {hei: secId, hallo: rowId, fardi: rowMap};
        console.log(mordi.hei);
        console.log(mordi.hallo);
    }
    render() {
        // Checks if  row is changes and set it as true,
        // and set the new defines the new related data to the data source
        // r1 = old, r2 = new (if it's alike then it's true and row is changed)
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return (
            <View>
                <TextInput
                    placeholder='Enter a task...'
                    onChangeText= {(text) => this.setState({task:text})}
                />
                <Button bordered
                        onPress={() =>  this.addNewTodoInput(this.state.task)}>
                    <Text> add </Text>
                </Button>
                <List
                    rightOpenValue={-75}
                    enableEmptySections={true}
                    // Set the datasource to the array with the list of todos
                    dataSource={this.ds.cloneWithRows(this.state.listOfTodos)}
                    renderRow={(listOfTodos) =>
                        <ListItem>
                            <CheckBox
                                /* Set a todo to check if the ID is in the array */
                                checked={this.state.selectedTodoId.includes(listOfTodos.id)}
                                /* Add/delete todo from/to array if it's checked or unchecked */
                                onPress={()=>this.onCheckBoxPress(listOfTodos.id)}
                            />
                            <Text>{listOfTodos.task}</Text>
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