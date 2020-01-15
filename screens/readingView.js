import React, {Component} from 'react';
import {StyleSheet, View, TouchableWithoutFeedback,TouchableHighlight, Text, FlatList} from 'react-native';
import Sentence from '../Components/Sentence/Sentence';
import Modal, { ModalContent } from 'react-native-modals';

import {connect} from 'react-redux'
import {indexRecent, updateVocabulary} from '../helper/actions/index'


class Reading extends Component {
    
  constructor(props) {
    super(props);
    const bookReading = this.props.navigation.getParam('book', 'what book is this?')
    console.log("Readdign this booook")
    this.state = {
      book: bookReading,
      visible: false
    };

  }  
  nextSentence() {
    this.props.updateVocabulary(this.state.book.text.esp[this.state.book.index_last_read]["translated"])
    var updatedIndex = {index_last_read: this.state.book.index_last_read + 1}
    
    if (this.state.book.index_last_read > this.state.book.text.en.length - 2) {
      updatedIndex = {index_last_read: 0}
    }
    this.setState({
      book: {...this.state.book, ...updatedIndex}
    });
    this.props.indexRecent(this.state.book)
  }

  closeModal() {
      this.setState({ visible: false });
  }

  lastSentence() {
    let book = {index_last_read: this.state.book.index_last_read > 0 ? this.state.book.index_last_read - 1 : 0}
    this.setState({
      book: {...this.state.book, ...book}
    });
  }
  report_translation() {
    alert('Thanks for tagging a translation error.')
    fetch('https://whispering-crag-91530.herokuapp.com/bug/tag', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'user': true,
      },
      body: JSON.stringify({
        sentenceIndex: this.state.book.index_last_read,
        bookID: this.state.book._id,
        text:  this.state.book.text.en[this.state.book.index_last_read],
        translation: this.state.book.text.esp[this.state.book.index_last_read].text,
        bookTitle: this.state.book.title ? this.state.book.title : 'What is the title?',
        authorName: this.state.book.author ? this.state.book.author : 'What is the title?',
      })
    }).then(res => res.json())
    .then(res => {
      alert(res);
    })
    .catch(error => {
      handleError(error, false);
    });
  }

  translationText(translation){
    return <Text style={styles.modal_text}>{`${translation[0]} - ${translation[1]}`}</Text>
  }

  render() {
    let currentText = this.state.book.text
    
    return (
      <View style={styles.mainContainer}>
        <View style={{display:'flex', flexDirection:'row'}}>
          <View style={{flex:5}}></View>
          <TouchableWithoutFeedback style={{ flex:1, alignSelf:'flex-end'}} onPress={() => (
            fetch('https://whispering-crag-91530.herokuapp.com/bug/tag', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'user': true,
              },
              body: JSON.stringify({
                sentenceIndex: this.state.book.index_last_read,
                bookID: this.state.book._id,
                text:  current.en[this.state.book.index_last_read],
                translation: currentText.esp[this.state.book.index_last_read].text,
                bookTitle: this.state.book.title ? this.state.book.title : 'What is the title?',
                authorName: this.state.book.author ? this.state.book.author : 'What is the title?',
              })
            }).then(res => res.json())
            .then(res => {
              alert('Thanks for tagging a translation error.')
            })
            .catch(error => {
              handleError(error, false);
            }),
            alert('Thanks for tagging a translation error.')
          )
          }>
            <View style={{width: 40, height: 40, margin: 5, padding: 5}}>
              <Text style={{ fontSize: 20, alignSelf: 'auto'}}>🚩</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View style={styles.container}>
          <View style={{alignContent:'flex-start', paddingBottom: 20}}>
            <Sentence text={currentText.en[this.state.book.index_last_read]}/>
            <TouchableHighlight style={styles.button} onLongPress={() => { this.setState({ visible: true });}}>
              <View style={styles.button}>
                <Sentence text={currentText.esp[this.state.book.index_last_read].text}/>
              </View>
            </TouchableHighlight>
          </View>
          <Modal
            visible={this.state.visible}
            onTouchOutside={()=> this.setState({ visible: false })}
          >
            <ModalContent>
              {
                currentText.esp[this.state.book.index_last_read].translated.map(element => (
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
  button: {
    backgroundColor: '#FEFBF7',
  },
});
export default connect(null, {indexRecent, updateVocabulary})(Reading);