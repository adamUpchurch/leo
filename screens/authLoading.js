import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';


export default class AuthLoading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: () => this._loadInitialState()
    }
    this._bootstrapAsync();

  }

  async _loadInitialState() {
    try {
      var accessToken = await AsyncStorage.getItem('accessToken');
      if (accessToken !== null){
        return accessToken
      }
      else {
        return null
      }

    } catch (error) {
    }
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(this.state.accessToken === null ? 'Nav' : 'App');
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}