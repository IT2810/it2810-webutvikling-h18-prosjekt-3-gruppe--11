import React, { Component } from 'react';
import {ListView, StyleSheet, TextInput, View} from 'react-native';
import {Button, CheckBox, Icon, List, ListItem, Text } from 'native-base';
import {removeData, retrieveData, storeData} from "../api/AsyncStorage";

export class TheList extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            task: "",
            //Takes in an array of to-do's
            listOfTodos: [],
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

    addNewTodoInput = (txt) => {
        if (!(this.state.task === "")) {
            let listOfTodos = this.state.listOfTodos;
            listOfTodos.push({id: new Date(), task: txt});
            storeData('todoData', listOfTodos);
            this.setState({listOfTodos: listOfTodos})
        }
    }

    onCheckBoxPress(id) {
        let tmp = this.state.selectedTodoId;

        if ( tmp.includes( id ) ) {
            tmp.splice( tmp.indexOf(id), 1 );
        } else {
            tmp.push( id );

        }
        storeData('checkedTodoData', tmp);
        this.setState({selectedTodoId: tmp});

    if (this.state.listOfTodos.length == this.state.selectedTodoId.length){
    alert("Yay, you did everything today! Good job! (≧▽≦)");
}
    }

    deleteRow(secId, rowId, rowMap) {
        rowMap[`${secId}${rowId}`].props.closeRow();
        const newData = [...this.state.listOfTodos];
        newData.splice(rowId, 1);
        this.setState({ listOfTodos: newData });
        storeData('todoData', newData);
    }

    render() {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return (
            <View>
                <TextInput multiline = {true} style={styles.input}
                    placeholder='Enter a task...'
                    onChangeText= {(text) => this.setState({task:text})}
                />
                <Button bordered style={styles.button}
                    onPress={() =>  this.addNewTodoInput(this.state.task)}>
                    <Text style={styles.btntxt}> add </Text>
                </Button>
                <List style={styles.listcontainer}
                    rightOpenValue={-75}
                    enableEmptySections={true}
                    dataSource={ds.cloneWithRows(this.state.listOfTodos)}
                    renderRow={(listOfTodos) =>
                    <ListItem>
                        <CheckBox
                            checked={this.state.selectedTodoId.includes(listOfTodos.id)}
                            onPress={()=>this.onCheckBoxPress(listOfTodos.id)}
                        />
                        <Text style={styles.textcontainer}>{listOfTodos.task}</Text>
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


