import React from "react";
import {dailyNotification} from "../api/PushNotifications";
import { Notifications } from "expo";
import {Container, Content, Footer, Header, Title} from "native-base";
import {TheList} from "./TheList";
import {NotificationSwitch} from "./NotificationSwitch";
import {storeData, retrieveData, removeData} from "../api/AsyncStorage";
import {StyleSheet} from "react-native";

export default class TodayPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            enableNotification: false
        }
    }

    componentWillMount() {
        /*LOCAL NOTIFICATION*/
        //Promise object retrieved from retrieveData is handled here
        //Get state of enabledNotification saved in Asyncstorage
        retrieveData('dailyReminder').then((item) => {
            this.setState ({
                enableNotification: (item === true)
            });
        }).catch((error) => {
            console.log("Promise is rejected: " + error);
        });
    }

    /*LOCAL NOTIFICATION*/
    //Toggle daily reminder
    toggleNotification = (value) => {
        this.setState({enableNotification: value});
        if(value === true) {
            //Schedule daily reminder
            dailyNotification();
        } else {
            //If toggle is off, remove scheduled notification
            Notifications.cancelAllScheduledNotificationsAsync();
        }
        //Save toggled daily reminder to AsyncStorage
        storeData('dailyReminder', value);
    };

    render() {
        return (
            <Container>
                <Header transparent style={styles.header}>
                    <Title style={styles.title}>T O D A Y   L I S T</Title>
                </Header>
                <Content style={styles.container}>
                    {/*<AddTodo/>*/}
                    <TheList />
                    {/*Toggle daily reminder*/}
                </Content>
                <Footer style={styles.footer}>
                    {/*LOCAL NOTIFICATION, switch*/}
                    <NotificationSwitch toggleNotif={this.toggleNotification} notifValue={this.state.enableNotification}/>
                </Footer>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
    },
    footer: {
        backgroundColor: "#33ccff",
    },
    title: {
        fontSize: 33,
        marginTop: 13,
    },
    header: {
        height: 100,
        backgroundColor: "#33ccff",
    },
});