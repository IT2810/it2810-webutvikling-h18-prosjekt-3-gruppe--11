//Expo API for local, scheduled notifications
import { Component } from 'react';
import { Permissions, Notifications } from 'expo';

export function pushNotification(){
    scheduledNotification();
}

async function _obtainUserFacingNotifPermissionsAsync() {
    let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
    if (permission.status !== 'granted') {
        permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            Alert.alert(`We don't have permission to present notifications.`);
        }
    }
    return permission;
};

//TODO: check scheduling notification, only if time < scheduled time
//Date object for selecting time of the day
let scheduledTime = new Date();
scheduledTime.setHours(9);
scheduledTime.setMinutes(0);
scheduledTime.setSeconds(0);

async function scheduledNotification(){
    await _obtainUserFacingNotifPermissionsAsync();
    Notifications.scheduleLocalNotificationAsync({

        title: 'What are you going to do today?',
        //TODO: Edit notification description
        body: 'You have X amount of tasks today.',
        data: {
            hello: 'there',
            future: 'self'
        },
        ios: {
            sound: true,
        },
        android: {
            vibrate: true,
        },
    },
    {
        //Edit time for scheduled notification
        time: scheduledTime.getTime(),
        repeat: "day"
    });
};
