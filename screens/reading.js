/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import Sentence from '../Components/Sentence/Sentence';

import {localStorage} from '../helper/leo'


export default class Reading extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentSentenceIndex: 0,
      book: this.props.navigation.getParam('book', 'what book is this?')
    };
    this.storeData = this.storeData.bind(this);
  }

  componentDidMount(){
    localStorage.storeData('last_read', this.state.book.title)
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
