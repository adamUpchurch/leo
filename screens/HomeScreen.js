import React, { Component } from 'react';
import {
  Button,
  StyleSheet,
  View
} from 'react-native';

import LoginModal from '../modals/LoginModal'
import AsyncStorage from '@react-native-community/async-storage';

export default class HomeScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = { modalVisible: true };
      this.onAuth = this.onAuth.bind(this)
      this._storeData = this._storeData.bind(this)
    }
  
    static navigationOptions = {
      title: 'Home',
      headerLeft: false
    };

    _storeData = async (token) => {
      try {
        await AsyncStorage.setItem('accessToken', token);
      } catch (error) {
        // Error saving data
      }
    };


    onAuth = (credentials, profile) => {
      this.setState({modalVisible: false, token: credentials.accessToken}, () => {
          // this._storeData()
          this.props.navigation.navigate('Profile', {credentials: credentials, profile: profile}) 
        }
      )
    };

    render() {
      const { navigate } = this.props.navigation;
      return (
        <View style={styles.container}>
          {/* <Button
            onPress={() => this.setState({modalVisible: true})}
            title="Log In"
          /> */}
          <LoginModal modalVisible={this.state.modalVisible} onAuth={this.onAuth}/>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    }
  });