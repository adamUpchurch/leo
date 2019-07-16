import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';

import Reading from './screens/reading';
import Library from './screens/library';
import AuthLoading from './screens/authLoading';
import Login from './screens/login';
import Signup from './screens/signup';
import ProfileScreen from './screens/ProfileScreen';
import HomeScreen from './screens/HomeScreen';



// const AuthStack = createStackNavigator({
//   Login: {screen: Login},
//   Signup: {screen: Signup}
// })

const AppStack = createStackNavigator({
  Library: {screen: Library},
  Reading: {screen: Reading}
  },
  {
    initialRouteName: 'Library',
  }
)

const Navigation = createStackNavigator({
  Home: { screen: HomeScreen },
  Profile: { screen: ProfileScreen }
},
{
  initialRouteName: 'Home',
}
);

export default createSwitchNavigator(
  {
    AuthLoading: AuthLoading,
    App: AppStack,
    // Auth: AuthStack,
    Nav: Navigation
  },
  {
    initialRouteName: 'AuthLoading',
  }
)