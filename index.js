/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import React, {Component} from 'react';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './helper/reducers/index'
import {name as appName} from './app.json';

export default class Leo extends Component {

    constructor(props) {
        super(props);
        store = createStore(rootReducer)
    }
    
    
    render() {
        return (
            <Provider store={store}>
                <App />
            </Provider>
        );
    }   
}

AppRegistry.registerComponent(appName, () => Leo);
