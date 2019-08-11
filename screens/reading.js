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

import {connect} from 'react-redux'
import {indexRecent} from '../helper/actions/index'


class Reading extends Component {

  constructor(props) {
    super(props);
    const bookReading = this.props.navigation.getParam('book', 'what book is this?')
    this.state = {
      currentSentenceIndex: bookReading.index_last_read,
      book: bookReading
    };
  }


  nextSentence() {
    
    const currentSentenceIndex = this.state.currentSentenceIndex + 1

    this.props.indexRecent(this.state.book._id, currentSentenceIndex, this.state.book.title)

    this.setState({
      currentSentenceIndex
    });
    if (this.state.currentSentenceIndex > this.state.book.text.en.length - 2) {
      this.setState({
        currentSentenceIndex: 0
      });
    }
  }

  lastSentence() {
    this.setState({
      currentSentenceIndex: this.state.currentSentenceIndex > 0 ? this.state.currentSentenceIndex - 1 : 0
    });
  }

  render() {
    this.storeData
    return (
      <View style={styles.container}>
        <View style={{alignContent:'flex-start'}}>
          <Sentence text={this.state.book.text.en[this.state.currentSentenceIndex]}/>
          <Sentence text={this.state.book.text.esp[this.state.currentSentenceIndex]}/>
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

// const mapStateToProps = state => state.library[0].find( (book) => book._id === action.bookID)

export default connect(null, {indexRecent})(Reading);