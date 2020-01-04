import React, {Component} from 'react';
import {StyleSheet, View, TouchableWithoutFeedback,TouchableHighlight, Text} from 'react-native';
import Sentence from '../Components/Sentence/Sentence';
import {connect} from 'react-redux'


class FlashCard extends Component {
    
  constructor(props) {
    super(props);
    const bookReading = this.props.navigation.getParam('book', 'what book is this?')
    this.state = {
      currentSentenceIndex: 0,
      visible: false
    };
  }  
  nextSentence() {
    const currentSentenceIndex = this.state.currentSentenceIndex + 1
  
    this.setState({
      currentSentenceIndex
    });
  }

  lastSentence() {
    this.setState({
      currentSentenceIndex: this.state.currentSentenceIndex > 0 ? this.state.currentSentenceIndex - 1 : 0
    });
  }

  render() {
    this.storeData
    
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
                sentenceIndex: this.state.currentSentenceIndex,
                bookID: this.state.book._id,
                text:  this.state.book.text.en[this.state.currentSentenceIndex],
                translation: this.state.book.text.esp[this.state.currentSentenceIndex].text,
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
            <Sentence text={"Do you know how to say"}/>
            <TouchableHighlight style={styles.button} onLongPress={() => { this.setState({ visible: true });}}>
              <View style={styles.button}>
                <Sentence text={currentText.esp[this.state.currentSentenceIndex].text}/>
              </View>
            </TouchableHighlight>
          </View>
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
export default connect(null)(FlashCard);