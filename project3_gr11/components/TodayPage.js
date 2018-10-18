import React from "react";
import {dailyNotification} from "../api/pushNotifications";
import { Notifications } from "expo";
import {Container, Content, Footer, Header, Title} from "native-base";
import {TheList} from "./TheList";
import {NotificationSwitch} from "./NotificationSwitch";

export default class TodayPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //TODO: enableNotification should be saved via asyncStorage
            enableNotification: false
        }
    }

    //Toggle daily reminder
    toggleNotification = (value) => {
        this.setState({enableNotification: value});
        if (value == true) {
            //Schedule daily reminder
            dailyNotification();
        } else {
            //If toggle is of, remove scheduled notification
            Notifications.cancelAllScheduledNotificationsAsync();
        }
    }

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
                        <NotificationSwitch toggleNotif={this.toggleNotification}
                                            notifValue={this.state.enableNotification}/>
                    </Footer>
                </Container>
            );
        }
}