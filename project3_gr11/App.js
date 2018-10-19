import React from 'react';
import { StyleSheet, View} from 'react-native';
import {AppLoading, Asset, Font, Icon } from 'expo';
import TodayPage from "./components/TodayPage";

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };
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
            <TodayPage/>
        </View>
      );
    }
  }

    _loadResourcesAsync = async () => {
        return Promise.all([
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
