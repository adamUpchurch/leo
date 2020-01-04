import React, {Component} from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux'

class Words extends Component {

  constructor(props) {
    super(props);
    }
  static navigationOptions = {
    title: 'Words',
  };

  render() {
    const {navigate} = this.props.navigation;
    var words = this.props.words

    function WordTile(props) {  
      var word = props.word.item
      return (
          <TouchableWithoutFeedback onPress={() => {
            // navigate to initiate flashcard game????
          }}>
              <View style={styles.wordContainer}>
                <View style={styles.WordTile}>
                  <Text style={styles.WordTileText}>{`${word.text} - ${word.translated} - ${word.exposures}`}</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
      )
    }

    function WordList(props) {
      const wordList = props.wordList
      return (
          <FlatList style={styles.container} data ={wordList} renderItem = {
            word => <WordTile word={word}/>
          }/>
      );
    }


    return (
      <React.Fragment>
        <WordList wordList={words}/>
      </React.Fragment>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#FEFBF7',
    padding: 10,
  },
  wordContainerTutorial: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#F7FAFE',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  wordContainer: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEFBF7',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },

  WordTileText: {
    color: '#191919',
    fontWeight: 'bold',
    alignItems: 'center',
    fontSize: 24,
  },
  WordTile: {
    height: 55,
    alignItems: 'center',
    paddingBottom: 15,
    paddingTop: 15,
    
  },
});

const mapStateToProps = state => {
  if(state['library'].length == 1) {
    var words = [
      {
        text: "hola",
        translated: "hello",
        exposures: 1
      }
    ]  
    return { words }
  }
  else {
    words = Object.values(state['library'][1])
    return { words }
  }
}

export default connect(mapStateToProps)(Words);