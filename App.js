import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';

import Reading from './screens/reading';
import Library from './screens/library';
import Tutorial from './screens/tutorial';

const TabNavigator = createBottomTabNavigator({
  Library: Library
});

const HomeStack = createStackNavigator({
  Tabs: TabNavigator,
  Reading: Reading,
  /* any other route you want to render above the tab bar */
  navigationOptions: ({ navigation }) => ({
    headerShown: 'none',
  }),
});

const AppNavigator = createSwitchNavigator({
  Home: HomeStack
});


export default AppNavigator