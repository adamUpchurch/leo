import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';

import Reading from './screens/reading';
import Library from './screens/library';
import AuthLoading from './screens/authLoading';
import Login from './screens/login';
import Signup from './screens/signup';


const AuthStack = createStackNavigator({
  Login: {screen: Login},
  Signup: {screen: Signup}
})

const AppStack = createStackNavigator({
  Library: {screen: Library},
  Reading: {screen: Reading}
})

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
)