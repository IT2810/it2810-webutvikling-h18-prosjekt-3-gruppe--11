import React, { Component } from 'react';
import {CheckBox} from "native-base";

export class Checkbox extends Component{
    constructor(props) {
        super(props);
        this.state = {
            checked: false,
        }
    }
    {/* Creates a checkbox */}
    render() {
        return (
            <CheckBox
                checked={this.state.checked}
                onPress={() => this.setState({checked: !this.state.checked})}/>
        )
    }
}