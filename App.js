import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';

import Reading from './screens/reading';
import Library from './screens/library';
import Words from './screens/words';

const TabNavigator = createBottomTabNavigator({
  Library: Library,
  Words: Words,
});

const HomeStack = createStackNavigator({
  Tabs: TabNavigator,
  Reading: Reading,
  /* any other route you want to render above the tab bar */
  // navigationOptions: ({ navigation }) => ({
  //   headerShown: 'none',
  // })
});

const AppNavigator = createSwitchNavigator({
  Home: HomeStack
});


export default AppNavigator