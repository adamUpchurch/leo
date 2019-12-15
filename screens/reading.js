/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, View, TouchableWithoutFeedback,TouchableHighlight, Text} from 'react-native';
import Sentence from '../Components/Sentence/Sentence';
import Modal, { ModalContent } from 'react-native-modals';

import {connect} from 'react-redux'
import {indexRecent, updateVocabulary} from '../helper/actions/index'


class Reading extends Component {

  constructor(props) {
    super(props);
    const bookReading = this.props.navigation.getParam('book', 'what book is this?')
    this.state = {
      currentSentenceIndex: bookReading.index_last_read,
      book: bookReading,
      visible: false
    };
  }

  
  nextSentence() {
    console.log(this.state.book.text["esp"][this.state.currentSentenceIndex]["translated"])
    this.props.updateVocabulary(this.state.book.text["esp"][this.state.currentSentenceIndex]["translated"])
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
    _onLongPressButton() {
    alert('You long-pressed the button!')
  }

  render() {
    this.storeData
    currentText = this.state.book.text
    return (
      <View style={styles.container}>
        <View style={{alignContent:'flex-start', paddingBottom: 20}}>
          <Sentence text={currentText.en[this.state.currentSentenceIndex]}/>
          <TouchableHighlight onLongPress={() => { this.setState({ visible: true });}}>
            <View style={styles.button}>
              <Sentence text={currentText.esp[this.state.currentSentenceIndex].text}/>
            </View>
          </TouchableHighlight>
        </View>
        <Modal
          visible={this.state.visible}
          onTouchOutside={() => {
            this.setState({ visible: false });
          }}
        >
          <ModalContent>
            {
              this.state.book.text.esp[this.state.currentSentenceIndex].translated.map(element => (
                <Text>{`${element[0]} - ${element[1]}`}</Text>
              ))
            }
          </ModalContent>
        </Modal>
        <View style={{display: 'flex', flexDirection: 'row', zIndex:1}}>
            <TouchableWithoutFeedback onPress={() => this.lastSentence()}>
              <View style={{width: 250, height: 200, margin: '5%'}} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => this.nextSentence()}>
              <View style={{width: 250, height: 200, margin: '5%'}} />
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

export default connect(null, {indexRecent, updateVocabulary})(Reading);