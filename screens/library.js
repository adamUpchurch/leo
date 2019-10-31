/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {FlatList, StyleSheet, Text, View, Image, TouchableWithoutFeedback, } from 'react-native';
import {Books} from '../helper/leo'
import {connect} from 'react-redux'

class Library extends Component {

  constructor(props) {
    super(props);
    }
  static navigationOptions = {
    title: 'Library',
  };

  render() {
    const {navigate} = this.props.navigation;
    var library = this.props.library ? this.props.library : Books

    function BookTile(props) {  
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
                  {/* <Text style={styles.bookTileSummary}>{book.summary}</Text> */}
                  <Text style={styles.bookTileSummary}>{`${book.grade_level} grade level with ${book.word_count} words & ${book.unique_words} unique words`}</Text>
                </View>
              </View>
            </TouchableWithoutFeedback>
      )
    }

    function BookList(props) {
      const bookList = props.bookList
      const listBooks = bookList.map((book) =>
        // Correct! Key should be specified inside the array.
        <BookTile book={book}/>
      )
      return (
          <FlatList style={styles.container} data ={bookList} renderItem = {
            book => <BookTile book={book}/>
          }/>
      );
    }


    return (
      <React.Fragment>
        {/* <Button></Button> */}
        <BookList bookList={library}/>
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
  bookContainer: {
    flex: 1,
    flexDirection: 'row',
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#FEFBF7',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },

  bookTileText: {
    color: '#191919',
    fontWeight: 'bold',
    fontSize: 16,
  },
  bookTileSummary: {
    color: 'grey',
    fontSize: 10,
    paddingTop: 5,
    width: 300
  },
  bookTile: {
    height: 100,
    margin: 1,
    paddingBottom: 15,
    paddingTop: 15,
    
  },
});

const mapStateToProps = state => {
  var library = state.library[0]
  
  return { library }
}

export default connect(mapStateToProps)(Library);