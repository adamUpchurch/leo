/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Alert} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import Reading from './screens/reading';
import Library from './screens/library';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    return (
      <AppStackNavigator />
    );
  }
};

const AppStackNavigator = createStackNavigator({
  Library: {screen: Library},
  Reading: {screen: Reading}
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});
