import React from "react";
import {dailyNotification} from "../api/pushNotifications";
import { Notifications } from "expo";
import {Container, Content, Footer, Header, Title} from "native-base";
import {TheList} from "./TheList";
import {NotificationSwitch} from "./NotificationSwitch";
import {StyleSheet} from "react-native";

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
                    <Header transparent style={styles.header}>
                        <Title style={styles.title}>T  O  D  A  Y   L  I  S  T</Title>
                    </Header>
                    <Content style={styles.container}>
                        {/*<AddTodo/>*/}
                        <TheList />
                        {/*Toggle daily reminder*/}
                    </Content>
                    <Footer style={styles.footer}>
                        <NotificationSwitch toggleNotif={this.toggleNotification}
                                            notifValue={this.state.enableNotification}/>
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