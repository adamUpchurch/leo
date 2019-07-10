import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
  Button
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


export default class Signup extends React.Component {
    static navigationOptions = {
        title: 'Please sign up',
    };
    
    render() {
        return (
        <View>
            <Button title="Sign in!" onPress={this._signInAsync} />
        </View>
        );
    }
    
    _signInAsync = async () => {
        await AsyncStorage.setItem('userToken', 'abc');
        this.props.navigation.navigate('App');
    };
    }