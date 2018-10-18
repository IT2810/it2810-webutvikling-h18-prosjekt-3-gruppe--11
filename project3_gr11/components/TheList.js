import React, { Component } from 'react';
import {ListView, TextInput, View} from 'react-native';
import {Button, CheckBox, Icon, List, ListItem, Text } from 'native-base';

export class TheList extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            task: "",
            //Takes in an array of to-do's
            listOfTodos: [
                { id: 2, task: "Bli ferdig med denne greia" },
                { id: 4, task: "En oppgave" },
                { id: 6, task: "En annen oppgave som har veldig lang tekst Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor" },
                { id: 8, task: "Fullført oppgave" },
                { id: 10, task: "Jeg hater denne lista" },
            ],
            selectedTodoId: []
        };
    }

    addNewTodoInput = (txt) => {
        if (!(this.state.task === "")) {
            let listOfTodos = this.state.listOfTodos;
            listOfTodos.push({id: new Date(), task: txt});
            this.setState({listOfTodos})
            console.log(txt);
        }
    }

    onCheckBoxPress(id) {
        let tmp = this.state.selectedTodoId;

        if ( tmp.includes( id ) ) {
            tmp.splice( tmp.indexOf(id), 1 );
        } else {
            tmp.push( id );
        }

        this.setState({
            selectedTodoId: tmp
        });
    }

    deleteRow(secId, rowId, rowMap) {
        rowMap[`${secId}${rowId}`].props.closeRow();
        const newData = [...this.state.listOfTodos];
        newData.splice(rowId, 1);
        this.setState({ listOfTodos: newData });
    }
    render() {
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
                    dataSource={ds.cloneWithRows(this.state.listOfTodos)}
                    renderRow={(listOfTodos) =>
                    <ListItem>
                        <CheckBox
                            checked={this.state.selectedTodoId.includes(listOfTodos.id)}
                            onPress={()=>this.onCheckBoxPress(listOfTodos.id)}
                        />
                        <Text>{listOfTodos.task}</Text>
                    </ListItem>}
                    renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                    <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                    <Icon active name="trash" />
                    </Button>
                    }
                    />
        </View>
        );
    }
}



