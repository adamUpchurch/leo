import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator, getActiveChildNavigationOptions } from 'react-navigation';

import Reading from './screens/reading';
import Library from './screens/library';
import Words from './screens/words';

const TabNavigator = createBottomTabNavigator(
  {
    Library: {
      screen: Library,
      navigationOptions: ({ navigation }) => ({
        title: '📚'
      }),},
    Words: {
      screen: Words,
      navigationOptions: ({ navigation }) => ({
        title: '🧠'
      }),}
  },
  {
    tabBarOptions: {
      activeBackgroundColor: '#e4e1de',
      inactiveBackgroundColor: '#fefdfb',
      labelStyle: {
        fontSize: 36,
      },
    }
  }

);

const HomeStack = createStackNavigator({
  Tabs: TabNavigator,
  Reading: Reading,
},
);

const AppNavigator = createSwitchNavigator({
  Home: HomeStack
});


export default AppNavigator