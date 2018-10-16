import React, { Component } from 'react';
import { Input, Item } from 'native-base';
export default class InputField extends Component {
    render() {
        return (
            <Item bordered>
                <Input placeholder='Legg til et gjøremål...' />
            </Item>
        );
    }
}