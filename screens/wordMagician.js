import React, {Component} from 'react';
import { FlatList, StyleSheet, Text, View, ScrollView, TouchableWithoutFeedback} from 'react-native';
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
    var stats = this.props.learningData

    function WordTile(props) {  
      var word = props.word.item
      return (
          <TouchableWithoutFeedback onPress={() => {
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
    function Stats() {

      return (
          <React.Fragment>
              <View style={styles.container}>
                <Text style={styles.WordTileText}>Word Wizard 🧙‍♂️</Text>
                <View style={styles.containerRows}>
                  <View style={styles.container}>
                    <Text style={styles.StatsText}>Words Read:</Text>
                    <Text style={styles.StatsText}>{stats.totalWordsExposedTo}</Text>
                  </View>
                  <View style={styles.container}>
                    <Text style={styles.StatsText}>Unique Words:</Text>
                    <Text style={styles.StatsText}>{words.length}</Text>
                  </View>
                </View>
                {/* <Text style={styles.WordTileText}>Current Streaks:</Text>
                <View style={styles.containerRows}>
                  <View style={styles.container}>
                    <Text style={styles.StatsText}>Days in a row:</Text>
                    <Text style={styles.StatsText}>{Math.floor((stats.currentDayStreak) / 86400000)}</Text>
                  </View>
                  <View style={styles.container}>
                    <Text style={styles.StatsText}>Weeks in a row:</Text>
                    <Text style={styles.StatsText}>{Math.floor((stats.currentWeekStreak) / 86400000)}</Text>
                  </View>
                </View>
                <Text style={styles.WordTileText}>Streaks Record:</Text>
                <View style={styles.containerRows}>
                  <View style={styles.container}>
                    <Text style={styles.StatsText}>Days in a row:</Text>
                    <Text style={styles.StatsText}>{Math.floor((stats.mostDayStreak) / 604800000)}</Text>
                  </View>
                  <View style={styles.container}>
                    <Text style={styles.StatsText}>Weeks in a row:</Text>
                    <Text style={styles.StatsText}>{Math.floor((stats.mostWeekStreak) / 604800000)}</Text>
                  </View>
                </View> */}
              </View>
          </React.Fragment>
      );
    }


    return (
      <ScrollView>
        <Stats />
        <WordList wordList={words}/>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFBF7',
    padding: 5,
  },
  containerRows: {
    flexDirection: "row",
    padding: 10,
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    color: '#191919',
    alignItems: 'center',
    fontSize: 18,
  },
  wordContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  WordTileText: {
    color: '#191919',
    fontWeight: 'bold',
    alignItems: 'center',
    fontSize: 24,
  },
  StatsText: {
    color: '#191919',
    alignItems: 'center',
    fontSize: 18,
  },
  WordTile: {
    height: 55,
    alignItems: 'center',
    paddingBottom: 15,
    paddingTop: 15,
    
  },
});

const mapStateToProps = state => {
  words = Object.values(state['vocabulary'].vocab)
  learningData = state['vocabulary']
  return { words, learningData }
}

export default connect(mapStateToProps)(Words);