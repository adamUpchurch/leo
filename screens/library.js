/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {ScrollView, Button, StyleSheet, Text, View, Image, TouchableWithoutFeedback} from 'react-native';
import async from 'async';
import {Books, localStorage} from '../helper/leo'

export default class Library extends Component {

  constructor(props) {
    super(props);
    this.state = {
      last_read: ''
    }
    }
  static navigationOptions = {
    title: 'Library',
  };

  componentWillMount(){
    localStorage.getData('last_read').then((last_read) => this.setState({last_read}))
  }

  render() {
    const {navigate} = this.props.navigation;
    
    function BookTile(props) {
      
      var book = props.book

      
      return (
          <TouchableWithoutFeedback onPress={() => {
              navigate('Reading', {book: book})
            }}>
            <View style={styles.bookContainer}>
              <Image style={{width: 50, height: 80, marginTop: 10, marginRight: 10}} source={{uri: book.cover}}/>
              <View style={styles.bookTile}>
                <Text style={styles.bookTileText}>{book.title}</Text>
                <Text style={styles.bookTileSummary}>{book.author}</Text>
                <Text style={styles.bookTileSummary}>{book.summary}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
      )
    }

    function BookList(props) {
      const listBooks = props.books.map((book) =>
        // Correct! Key should be specified inside the array.
        <BookTile book={book} />
      )
      return (
          <ScrollView style={styles.container}>
              {listBooks}
          </ScrollView>
      );
    }


    return (
      <React.Fragment>
        <Button
          onPress={() => (
            async.series([
              localStorage.logout,
              this.props.navigation.navigate('Nav')
            ])
            )}
          title="Logout"
        />
        <Text>{this.state.last_read}</Text>
        <BookList books={Books}/>
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
    fontSize: 12,
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