//Expo API for local, scheduled notifications
import { Permissions, Notifications } from 'expo';

//Date object for selecting time of the day
let scheduledTime = new Date();
scheduledTime.setHours(9);
// scheduledTime.setMinutes(0);

//TODO: Edit notification description
const localNotification = {
    title: 'What are you going to do today?',
    ios: {
        sound: true,
    },
    android: {
        vibrate: true,
    }
};

const schedulingOptions =  {
    //Set time for notification
    time: scheduledTime.getTime(),
    //Repeat daily
    repeat: "day"
};

export function dailyNotification(){
    console.log("Scheduled notification set to: " + scheduledTime);
    scheduledNotification(schedulingOptions);

    //Trigger a local notification immediately, for testing purposes
    // Notifications.presentLocalNotificationAsync(localNotification);
}

async function obtainUserFacingNotifPermissionsAsync() {
    let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS);
    if (permission.status !== 'granted') {
        permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS);
        if (permission.status !== 'granted') {
            Alert.alert(`We don't have permission to present notifications.`);
        }
    }
    return permission;
}

async function scheduledNotification(scheduledFor){
    //Check for notification permission
    await obtainUserFacingNotifPermissionsAsync();
    //Schedule notification
    Notifications.scheduleLocalNotificationAsync(localNotification, scheduledFor );
}
