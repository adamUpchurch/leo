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

  closeModal() {
      this.setState({ visible: false });
  }

  lastSentence() {
    this.setState({
      currentSentenceIndex: this.state.currentSentenceIndex > 0 ? this.state.currentSentenceIndex - 1 : 0
    });
  }
  report_translation() {
    alert('Thanks for tagging a translation error.')

    var tag = fetch('https://whispering-crag-91530.herokuapp.com/bug/tag', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'user': true,
      },
      body: JSON.stringify({
        sentenceIndex: this.state.currentSentenceIndex,
        bookID: this.state.book._id,
        text:  this.state.book.text.en[this.state.currentSentenceIndex],
        translation: this.state.book.text.esp[this.state.currentSentenceIndex].text,
        bookTitle: this.state.book.title ? this.state.book.title : 'What is the title?',
        authorName: this.state.book.author ? this.state.book.author : 'What is the title?',
      })
    })
    console.log(tag.then(response => response))
  }

  render() {
    this.storeData
    currentText = this.state.book.text
    
    return (
      <View style={styles.mainContainer}>
        <View style={{display:'flex', flexDirection:'row'}}>
          <View style={{flex:5}}></View>
          <TouchableWithoutFeedback style={{ flex:1, alignSelf:'flex-end'}} onPress={this.report_translation}>
            <View style={{width: 40, height: 40, margin: 5, padding: 5}}>
              <Text style={{ fontSize: 20, alignSelf: 'auto'}}>🚩</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
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
            onTouchOutside={this.closeModal}
          >
            <ModalContent>
              {
                this.state.book.text.esp[this.state.currentSentenceIndex].translated.map(element => (
                  <Text style={styles.modal_text}>{`${element[0]} - ${element[1]}`}</Text>
                ))
              }
            </ModalContent>
          </Modal>
          <View style={{display: 'flex', flexDirection: 'row', zIndex:1}}>
              <TouchableWithoutFeedback onPress={() => this.lastSentence()}>
                <View style={{width: 250, height: 250, margin: '5%'}} />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => this.nextSentence()}>
                <View style={{width: 250, height: 250, margin: '5%'}} />
              </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    );
  }
};
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEFBF7',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEFBF7',
  },
  modal_text: {
    fontSize: 20,
    fontFamily: 'Cochin',
    textAlign: 'center',
    margin: 5,
  },
});
export default connect(null, {indexRecent, updateVocabulary})(Reading);