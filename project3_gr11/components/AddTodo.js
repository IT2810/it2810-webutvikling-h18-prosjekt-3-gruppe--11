import React, { Component } from 'react';
import {TextInput, Button, ScrollView, View} from "react-native";
import {ListItem, Text} from 'native-base';
export default class AddTodo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newTodoInput: []
        };
    }

    addNewTodoInput = (txt) => {
        let newTodoInput = this.state.newTodoInput;
        newTodoInput.push(<ListItem><Text>{txt}</Text></ListItem>);
        this.setState({newTodoInput})
    }


    render() {
        return (
            <ScrollView>
                <View>
                    <TextInput
                        placeholder='Enter a task...'
                        onChangeText= {(text) => this.setState({task:text})}
                    />
                    <Button
                        title="Add"
                        onPress={() =>  this.addNewTodoInput(this.state.task)}
                    />
                    {this.state.newTodoInput.map((value) => {
                        return value
                    })}
                </View>
            </ScrollView>
        );
    }
}