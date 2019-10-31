import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';

import Reading from './screens/reading';
import Library from './screens/library';

const AppStack = createStackNavigator({
  Library: {screen: Library},
  Reading: {screen: Reading}
  },
  {
    initialRouteName: 'Library',
  }
)


export default createSwitchNavigator(
  {
    App: AppStack,
  },
  {
    initialRouteName: 'App',
  }
)