import { createStackNavigator, createSwitchNavigator, createBottomTabNavigator, getActiveChildNavigationOptions } from 'react-navigation';

import Reading from './screens/readingView';
import Library from './screens/libraryList';
import Bookshelf from './screens/readingList';
import Words from './screens/wordMagician';
import BookDetail from './screens/bookDetail';

const TabNavigator = createBottomTabNavigator(
  {
    Bookshelf: {
      screen: Bookshelf,
      navigationOptions: ({ navigation }) => ({
        title: '📖'
      }),
    },
    Library: {
      screen: Library,
      navigationOptions: ({ navigation }) => ({
        title: '📚'
      }),
    },
    Words: {
      screen: Words,
      navigationOptions: ({ navigation }) => ({
        title: '🧙‍♂️'
      }),
    },
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
  BookDetail: BookDetail,
},
);

const AppNavigator = createSwitchNavigator({
  Home: HomeStack
});


export default AppNavigator
