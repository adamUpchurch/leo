import React, {Component} from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableWithoutFeedback, Fragment} from 'react-native';
import {Books} from '../helper/leo'
import {connect} from 'react-redux'

function BookTile(props) {  
  const {navigate} = props.navigation;
  var book = props.book.item
  return (
      <TouchableWithoutFeedback onPress={() => {
        navigate('Reading', {book: book})
      }}>
          <View style={styles.bookContainer}>
            <Image style={{width: 50, height: 80, marginTop: 10, marginRight: 10}} source={{uri: book.cover}}/>
            <View style={styles.bookTile}>
              <Text style={styles.bookTileText}>{book.title}</Text>
              <Text style={styles.bookTileSummary}>{book.author}</Text>
              { book.author === 'Adam Upchurch' ? <Text style={styles.bookTileSummary}>{book.summary}</Text> : <Text style={styles.bookTileSummary}>{`${book.grade_level} grade level with ${book.word_count} words & ${book.unique_words} unique words`}</Text>}
            </View>
          </View>
        </TouchableWithoutFeedback>
  )
}

function BookList(props) {
  const bookList = props.bookList
  const navigation = props.navigation
  return <FlatList style={styles.container} data ={bookList} renderItem={ book => <BookTile navigation={navigation} book={book}/>}/>;
}

class Library extends Component {

  constructor(props) {
    super(props);
    }
  static navigationOptions = {
    title: '📚',
  };

  static navigationOptions = {
    headerTitle: () => <Text>Read Leo</Text>,
  };
  render() {
    var library = this.props.library
    
    return (
      <React.Fragment>
        <BookList bookList={library} navigation={this.props.navigation}/>
      </React.Fragment>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FEFBF7',
    padding: 10,
  },
  bookContainerTutorial: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#F7FAFE',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  bookContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FEFBF7',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    width: '100%',
  },
  bookTileText: {
    color: '#191919',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bookTileSummary: {
    color: 'grey',
    fontSize: 12,
    paddingTop: 5,
    width: 300
  },
  bookTile: {
    height: 100,
    margin: 1,
    paddingBottom: 15,
    paddingTop: 15,
    marginRight: 15,
  },
});
const mapStateToProps = state => {
  var library = state.library[0]
  return { library }
}
export default connect(mapStateToProps)(Library);