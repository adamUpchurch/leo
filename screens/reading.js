/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Button, Alert, TouchableWithoutFeedback} from 'react-native';
import Sentence from '../Components/Sentence/Sentence';
import AsyncStorage from '@react-native-community/async-storage';


export default class Reading extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentSentenceIndex: 0,
    };
    this.storeData = this.storeData.bind(this);
  }

  book = this.props.navigation.getParam('book', 'what book is this?');

  componentDidMount(){
    this.storeData()
  }

  nextSentence() {
    this.setState({
      currentSentenceIndex: this.state.currentSentenceIndex + 1
    });
    if (this.state.currentSentenceIndex > this.book.en.length - 2) {
      this.changeBook()
      this.setState({
        currentSentenceIndex: 0
      });
    }
  }

  lastSentence() {
    this.setState({
      currentSentenceIndex: this.state.currentSentenceIndex - 1
    });
    if (this.state.currentSentenceIndex < 1) {
      this.setState({
        currentSentenceIndex: 0
      });
    }
  }

  storeData = async () => {
    try {
      await AsyncStorage.setItem('last_read', this.book.title)
    } catch (e) {
      // saving error
    }
  }

  render() {
    this.storeData
    return (
      <View style={styles.container}>
        <View style={{alignContent:'flex-start'}}>
          <Sentence text={this.book.en[this.state.currentSentenceIndex]}/>
          <Sentence text={this.book.esp[this.state.currentSentenceIndex]}/>
        </View>
        <View style={{display: 'flex', flexDirection: 'row', position: 'absolute', zIndex:1}}>
            <TouchableWithoutFeedback onPress={() => this.lastSentence()}>
              <View style={{width: 250, height: 450, margin: 20}} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.nextSentence()}>
              <View style={{width: 250, height: 450, margin: 20}} />
            </TouchableWithoutFeedback>
        </View>

      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEFBF7',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 15,
  },
});
