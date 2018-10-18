import React from "react";
import {dailyNotification} from "../api/pushNotifications";
import { Notifications } from "expo";
import {Container, Content, Footer, Header, Title} from "native-base";
import {TheList} from "./TheList";
import {NotificationSwitch} from "./NotificationSwitch";
import { storeData, retrieveData } from "../api/AsyncStorage";

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
                <Header transparent style={{backgroundColor: "#f2c413"}}>
                    <Title>Moren din sin liste</Title>
                </Header>
                <Content>
                    {/*<AddTodo/>*/}
                    <TheList />
                    {/*Toggle daily reminder*/}
                </Content>
                <Footer>
                    {/*LOCAL NOTIFICATION, switch*/}
                    <NotificationSwitch toggleNotif={this.toggleNotification} notifValue={this.state.enableNotification}/>
                </Footer>
            </Container>
        );
    }
}