import React from 'react';
import { ScrollView, StyleSheet, View} from 'react-native';
import {AppLoading, Asset, Font, Icon, Notifications} from 'expo';
import {Container, Content, Header, Title} from "native-base";
import {SwipeableList} from "./components/SwipableList";
import {listData} from "./constants/ToDosListData";
import AddTask from "./components/AddTask";
import {dailyNotification} from "./api/pushNotifications";
import {NotificationSwitch} from "./components/NotificationSwitch";

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

    constructor(props) {
        super(props);
        this.state ={
            //TODO: enableNotification should be saved via asyncStorage
            enableNotification: false
        }
    }

    //Toggle daily reminder
    toggleNotification = (value) => {
        this.setState({enableNotification: value});
        if(value == true) {
            //Schedule daily reminder
            dailyNotification();
        } else {
            //If toggle is of, remove scheduled notification
            Notifications.cancelAllScheduledNotificationsAsync();
        }
    }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
            <Header transparent style={{backgroundColor: "#f2c413"}}>
                <Title>Moren din sin liste</Title>
            </Header>
            <ScrollView style={styles.container}>
                <Container>
                    <Content>
                        <AddTask/>
                        <SwipeableList todos={listData}/>
                    </Content>
                    {/*Toggle daily reminder*/}
                    <NotificationSwitch toggleNotif={this.toggleNotification} notifValue={this.state.enableNotification}/>
                </Container>
            </ScrollView>
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        ...Icon.Ionicons.font,
        'roboto-bold': require('./assets/fonts/Roboto-Bold.ttf'),
        'Roboto_medium': require('./assets/fonts/Roboto-Medium.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
