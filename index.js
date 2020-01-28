/**
 * @format
 */

import React, {Component} from 'react';
import {AppRegistry, AppState} from 'react-native';
import App from './App';
import AsyncStorage from '@react-native-community/async-storage';


import { Provider } from 'react-redux'
import { createStore } from 'redux'
import {name as appName} from './app.json';

import rootReducer from './helper/reducers/index'
import { select } from 'async';
import reducers from './helper/reducers/index';

export default class Leo extends Component {

    constructor(props) {
        super(props);
        store = createStore(rootReducer)
        this.state = {
            isStoreLoading: false,
            store: store
        }
    }
    
    componentWillMount() {
        var self = this;
        AppState.addEventListener('change', this._handleAppStateChange.bind(this));
        this.setState({isStoreLoading: true})
        console.log('Component is mounting!')

        AsyncStorage.getItem('@LIBRARY').then( library => {
            console.log("Library: ", library)
            if (library) {
                
                library = JSON.parse(library)
                console.log(library)
                var initialStore = {library}
        
                AsyncStorage.getItem('@VOCABULARY').then( vocabulary => {
                    if (vocabulary) {
                        vocabulary = JSON.parse(vocabulary)
                        console.log(vocabulary)
                        initialStore = {...initialStore, vocabulary}
                        select.setState({store: createStore(reducers, initialStore)})
                    } else self.setState({store, isStoreLoading: false})
        
                }).catch(error=>{
                    self.setState({store: createStore(reducers, initialStore)})
                })
        
            } else {
                self.setState({isStoreLoading: false})
            }
        }).catch(error => {
            self.setState({isStoreLoading: false})
        })
    }
    componentWillUnmount() {
        console.log('Component unmounting')
        console.log(this.state)
        AppState.removeEventListener('change', this._handleAppStateChange.bind(this));
    }

    _handleAppStateChange(currentAppState) {
        console.log('_handleAppStateChange')
        console.log(this.state)
        console.log(currentAppState)
        let storingValue = this.state.store
        AsyncStorage.setItem('@LIBRARY', JSON.stringify(storingValue.library))
        AsyncStorage.setItem('@VOCABULARY', JSON.stringify(storingValue.vocabulary))
    }
    
    render() {
        // if (this.state.isStoreLoading){
        //     return <React.Text>{`Loading...`}</React.Text>
        // } else {

            return (
                <Provider store={this.state.store}>
                    <App />
                </Provider>
            );
        // }
    }   
}

AppRegistry.registerComponent(appName, () => Leo);
