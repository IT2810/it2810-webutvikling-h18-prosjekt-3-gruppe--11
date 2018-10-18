import React, { Component } from "react";
import { Platform, ScrollView, StyleSheet } from 'react-native';
import {Container, Content } from 'native-base';
import { SwipeableList } from "../components/SwipableList";
import { listData } from "../constants/ToDosListData";
import { AppHeader } from "../components/AppHeader";
import InputField from "../components/InputField";
import { dailyNotification } from "../api/pushNotifications";
import { NotificationSwitch } from "../components/NotificationSwitch";
import { Notifications } from 'expo';
import { storeData, retrieveData } from "../api/AsyncStorage";

export default class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
  };

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
      <ScrollView style={styles.container}>
            <Container>
                <AppHeader/>
                <Content>
                <InputField/>
                <SwipeableList todos={listData}/>
            </Content>
            {/*LOCAL NOTIFICATION, switch*/}
            <NotificationSwitch toggleNotif={this.toggleNotification} notifValue={this.state.enableNotification}/>
        </Container>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});