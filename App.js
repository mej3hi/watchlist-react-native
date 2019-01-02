import React from 'react';
import Expo from 'expo'; // to include font from expo.
import { StyleProvider, Container } from 'native-base';
import getTheme from './native-base-theme/components';
import material from './native-base-theme/variables/material';

import MainScreen from './src/components/Main/MainNavigator';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isReady: false,
    };
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      Ionicons: require('native-base/Fonts/Ionicons.ttf'),
    });
    this.setState({ isReady: true });
  }
  render() {
    if (!this.state.isReady) {
      return <Expo.AppLoading />;
    }
    return (
      <StyleProvider style={getTheme(material)}>

        <MainScreen />

      </StyleProvider>
    );
  }
}