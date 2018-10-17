import React, { Component } from 'react';
import {Button, Input, Item, Text} from 'native-base';
export default class AddTask extends Component {
    constructor(props) {
        super(props);
        const title = "";
        const completed = false;
        const createdAt = "";

        this.state = {
            title,
            completed,
            createdAt,
        };
    }

    setStateUtil = (property, value) => {
        this.setState({
            [property]: value,
        });
    }
    render() {
        const { completed, title } = this.state;
        const { onPress, onCancel } = this.props;
        return (
            <Item bordered>
                <Input placeholder='Enter a task...'
                       onChangeText = { (txt) => this.setStateUtil("title", txt) }
                       onSubmitEditing = { () => onPress( this.state ) }
                />
                <Button bordered>
                    <Text> YO </Text>
                </Button>
            </Item>
        );
    }
}