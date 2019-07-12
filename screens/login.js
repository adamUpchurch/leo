import React, { Component } from 'react';

import {
    Alert,
    AppRegistry,
    Button,
    Platform,
    StyleSheet,
    Text,
    View
} from 'react-native';

import Auth0 from 'react-native-auth0';

var {credentials} = require('../config/keys');
const auth0 = new Auth0(credentials);

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = { accessToken: null };
    }

    _onLogin = () => {
        auth0.webAuth
            .authorize({
                scope: 'openid profile email',
                audience: 'https://' + credentials.domain + '/userinfo'
            })
            .then(credentials => {
                Alert.alert(
                    'Success',
                    'AccessToken: ' + credentials.accessToken, [{
                        text: 'OK',
                        onPress: () => console.log('OK Pressed')
                    }], { cancelable: false }
                );
                this.setState({ accessToken: credentials.accessToken });
            })
            .catch(error => console.log(error));
    };

    _onLogout = () => {
        if (Platform.OS === 'android') {
            this.setState({ accessToken: null });
        } else {
            auth0.webAuth
                .clearSession({})
                .then(success => {
                    this.setState({ accessToken: null });
                })
                .catch(error => console.log(error));
        }
    };

    render() {
        let loggedIn = this.state.accessToken === null ? false : true;
        return ( 
        <View style = { styles.container }>
            <Text style = { styles.header }> Login </Text>    
            <Text>
                You are { loggedIn ? '' : 'not ' } logged in . </Text>    
                <Button onPress = { loggedIn ? this._onLogout : this._onLogin }
                title = { loggedIn ? 'Log Out' : 'Log In' }/>
        </View >
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    header: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10
    }
});

// import React from 'react';
// import {
//     View,
//     Button,
//     TextInput
// } from 'react-native';

// import AsyncStorage from '@react-native-community/async-storage';
// // import console = require('console');

// export default class Login_ extends React.Component {
//     static navigationOptions = {
//         title: 'Please sign in',
//     };

//     constructor(props) {
//         super(props);
//         this.state = {
//             username: '',
//             password: ''
//         }
//     }

//     checkLogin() {
        
//     }

//     render() {
//         return (
//         <View style={{padding: 10}}>
//             <TextInput
//                 style={{height: 60, fontSize: 20}}
//                 placeholder="Email"
//                 onChangeText={(username) => this.setState({username: username.toLowerCase()})}
//                 value={this.state.username}
//                 />
//             <TextInput
//                 style={{height: 60, fontSize: 20}}
//                 placeholder="Password"
//                 onChangeText={(password) => this.setState({password: password})}
//                 value={this.state.password}
//                 secureTextEntry={true}
//                 />
//             <Button title="Sign in!" onPress={this._signInAsync} />
//         </View>
//         );
//     }
    
//     _signInAsync = async () => {
//         const { username, password } = this. state

//         console.warn(username, password)

//         if(username == 'adam' && password == 'tucker') {
//             await AsyncStorage.setItem('userToken', 'abc');
//             this.props.navigation.navigate('authLoading')
//         } else {
//             this.props.navigation.navigate('authLoading')
//         }
//     };
//     }