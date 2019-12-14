import { createStackNavigator, createSwitchNavigator } from 'react-navigation';

import Reading from './screens/reading';
import Library from './screens/library';
import Tutorial from './screens/tutorial';

const libraryStack = createStackNavigator({
  Library: {screen: Library},
  Reading: {screen: Reading}
  },
  {
    initialRouteName: 'Library',
  }
)
const learningStack =  createStackNavigator({
  Library: {screen: Library},
  Reading: {screen: Reading}
  },
  {
    initialRouteName: 'Library',
  }
)

export default createSwitchNavigator(
  {
    library: libraryStack,
    learning: learningStack
  },
  {
    initialRouteName: 'library',
  }
)