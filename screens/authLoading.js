import React from 'react';

import {
  ActivityIndicator,
  StatusBar,
  View,
} from 'react-native';

import {localStorage} from '../helper/leo';
import AsyncStorage from '@react-native-community/async-storage';


export default class AuthLoading extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: AsyncStorage.getItem('accessToken').then( result => JSON.parse(result.accessToken))
    }
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(this.state.accessToken !== null ? 'App' : 'Nav');

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