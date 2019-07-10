import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';

import Reading from './screens/reading';
import Library from './screens/library';
import AuthLoading from './screens/authLoading';
import Login from './screens/login';
import Signup from './screens/signup';

// export default class App extends Component {
  
//   render() {
//     return (
//       <AppContainer />
//     );
//   }
// };

export default class App extends Component {

  render() {
    return (
      <AppStack />
    );
  }
};
const AppContainer = createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    App: AppStack,
    Auth: AuthStack
  },
  {
    initialRouteName: 'AuthLoading'
  }))

const AuthStack = createStackNavigator(
  {
    Login: {screen: Login},
    Signup: {screen: Signup}
  },
  {
    initialRouteName: 'Login',
  }
  )



  const AppStack = createStackNavigator({
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
