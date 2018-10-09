import React, { Component } from 'react';
import { ListView } from 'react-native';
import { CheckBox, Button, Icon, List, ListItem, Text, Body } from 'native-base';

export class SwipeableList extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            basic: true,
            //Takes in an array of to-do's
            listViewData: this.props.todos,
        };
    }
    deleteRow(secId, rowId, rowMap) {
        /*
        rowMap[`${secId}${rowId}`].props.closeRow();
        const newData = [...this.state.listViewData];
        newData.splice(rowId, 1);
        this.setState({ listViewData: newData });
        */
    }
    render() {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        return (
            /*Edit rightOpenValue for the size of the thrash can area*/
            <List
                rightOpenValue={-75}
                dataSource={this.ds.cloneWithRows(this.state.listViewData)}
                renderRow={data =>
                    <ListItem>
                        {/*TODO: Add to-do's here*/}
                        <CheckBox checked={false} />
                        <Body>
                        <Text> {data} </Text>
                        </Body>
                    </ListItem>}
                renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                    <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
                        {/*Thrash can icon heh*/}
                        <Icon active name="trash" />
                    </Button>}
            />
        );
    }
}





