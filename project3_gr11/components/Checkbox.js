import React, { Component } from 'react';
import {Body, CheckBox, ListItem, Text} from "native-base";

export class Checkbox extends Component{
    constructor(props) {
        super(props);
        this.state={
            checked: false,
        }
    }
    render() {
        return (
            <CheckBox
                checked={this.state.checked}
                onPress={() => this.setState({checked: !this.state.checked})}/>
        )
    }
}