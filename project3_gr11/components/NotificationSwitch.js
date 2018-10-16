//Switch for enabling notification for daily reminder
import React, { Component } from 'react';
import { Switch, View, Text } from 'react-native';

export class NotificationSwitch extends Component {
    render() {
        return (
            <View>
                <Text>Enable daily reminder</Text>
            <Switch
                onValueChange={this.props.toggleNotif}
                value={this.props.notifValue}
            />
            </View>
        )
    }
}

