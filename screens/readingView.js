import React, {Component} from 'react';
import {StyleSheet, View, TouchableWithoutFeedback,TouchableHighlight, Text} from 'react-native';
import Modal, { ModalContent } from 'react-native-modals';

import {connect} from 'react-redux'
import {indexRecent, updateVocabulary} from '../helper/actions/index'

class Reading extends Component {
  constructor(props) {
    super(props);
    const book_title = this.props.navigation.getParam('book_title', 'what book is this?')
    this.state = {
      title: book_title,
      isModalVisible: false,
      index_last_read: this.props.library[book_title].index_last_read
    };

  }  
  render() {
    let library = this.props.library
    let title = this.state.title
    let index_last_read = this.state.index_last_read
    let currentText = library[title].text
    
    return (
      <View style={styles.container}>

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
                sentenceIndex: index_last_read,
                bookID: library[title]._id,
                text:  currentText.en[index_last_read],
                translation: currentText.esp[index_last_read].text,
                bookTitle: library[title].title ? library[title].title : 'What is the title?',
                authorName: library[title].author ? library[title].author : 'What is the title?',
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
          <View style={{alignContent:'flex-start', paddingBottom: 10}}>
            <Text style={styles.text}>{currentText.en[index_last_read]}</Text>
            <TouchableHighlight style={styles.button} onLongPress={() => { this.setState({ visible: true });}}>
              <View style={styles.button}>
              <Text style={styles.text}>{currentText.esp[index_last_read].text}</Text>
              </View>
            </TouchableHighlight>
          </View>

          <Modal
            visible={this.state.visible}
            onTouchOutside={()=> this.setState({ visible: false })}
          >
            <ModalContent>
              {
                currentText.esp[index_last_read].translated.map(element => (
                  <Text style={styles.text}>{`${element[0]} - ${element[1]}`}</Text>
                ))
              }
            </ModalContent>
          </Modal>
          <View style={{display: 'flex', flexDirection: 'row', zIndex:1}}>
              <TouchableWithoutFeedback onPress={() => this.lastSentence()}>
                <View style={{width: '45%', height: 500}} />
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={() => this.nextSentence()}>
                <View style={{width: '45%', height: 500}} />
              </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    );
  }

  nextSentence() {
    let book = this.props.library[this.state.title]
    var index_last_read;

    if (book.index_last_read > book.text.en.length - 2) {
      index_last_read = 0
    } else {
      index_last_read = book.index_last_read + 1
    }

    let book_delta = {index_last_read}
    
    
    this.props.updateVocabulary(book.text.esp[book.index_last_read]["translated"])
    this.props.indexRecent({...book, ...book_delta})
    this.setState({index_last_read})
  }

  lastSentence() {
    let book = this.props.library[this.state.title]
    let index_last_read = book.index_last_read > 0 ? book.index_last_read - 1 : 0
    let book_delta = {index_last_read}
    book = {...book, ...book_delta}
    this.props.indexRecent(book)
    this.setState({index_last_read})
  }

  flagError() {
    fetch('https://whispering-crag-91530.herokuapp.com/bug/tag', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'user': true,
              },
              body: JSON.stringify({
                sentenceIndex: index_last_read,
                bookID: library[title]._id,
                text:  current.en[index_last_read],
                translation: currentText.esp[index_last_read].text,
                bookTitle: library[title].title ? library[title].title : 'What is the title?',
                authorName: library[title].author ? library[title].author : 'What is the title?',
              })
            }).then(res => res.json())
            .then(res => {
              alert('Thanks for tagging a translation error.')
            })
            .catch(error => {
              handleError(error, false);
            }),
            alert('Thanks for tagging a translation error.')

  }

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'column-reverse',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#FEFBF7',
  },
  text: {
    fontSize: 23,
    textAlign: 'center',
    margin: 5,
  },
  button: {
    backgroundColor: '#FEFBF7',
  }
});

const mapStateToProps = state => {
  var library = Object.values(state.library)
  return state
}

export default connect(mapStateToProps, {indexRecent, updateVocabulary})(Reading);