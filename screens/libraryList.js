import React, {Component} from 'react';
import { FlatList, StyleSheet, Text, View, Image, TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';
import Modal, { ModalContent } from 'react-native-modals';
import {toggleIsReading} from '../helper/actions/index'





class Library extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      bookInfo: null
    };
  }

  static navigationOptions = {
    title: '📚',
  };

  closeModal() {
    this.setState({ isModalVisible: false });
  }

  BookTile(book) {  
    const {navigate} = this.props.navigation;

    book = book.item

    return (
        <TouchableWithoutFeedback onPress={() => navigate('Reading', {book: book})}
        onLongPress={() => this.setState({ isModalVisible: true, bookInfo: book })}
        >
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

  BookList() {
    return <FlatList style={styles.container} data ={this.props.library} renderItem={ book => this.BookTile(book)} keyExtractor={book => book._id}/>;
  }

  updateIsReading() {
    this.props.toggleIsReading(this.state.bookInfo)
  }



  static navigationOptions = {
    headerTitle: () => <Text>Read Leo</Text>,
  };
  render() {
    return (
      <React.Fragment>
          <Modal
            visible={this.state.isModalVisible}
            onTouchOutside={()=> this.setState({ isModalVisible: false })}
          >
            <ModalContent>               
            <TouchableWithoutFeedback onPress={() => {
              this.props.navigation.navigate('BookDetail', {bookInfo: this.state.bookInfo})
              this.closeModal()
              }}>
               <View style={styles.ModalContent}>
                  <Text style={{ fontSize: 20, alignSelf: 'auto'}}>ℹ book details</Text>
                </View>
               </TouchableWithoutFeedback>
               <TouchableWithoutFeedback onPress={() => {
                 this.updateIsReading()
                 this.closeModal()
                 }}>
               <View style={styles.ModalContent}>
                  <Text style={{ fontSize: 20, alignSelf: 'auto'}}>{`📔 Remove from reading list`}</Text>
                </View>
               </TouchableWithoutFeedback>
               <View style={styles.ReviewContainer}>
                <TouchableWithoutFeedback onPress={() => fetch('http://localhost:3000/bookReview/create', {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                      'user': true,
                    },
                    body: JSON.stringify({...this.state.bookInfo, ...{isGoodReview: false}})
                  })
                    .then(res => res.json())
                    .then(res => {
                      alert('Thanks for review the book!')
                    })
                    .catch(error => {
                      handleError(error, false);
                    })
                }>
                <View style={styles.ModalContent}>
                    <Text style={{ fontSize: 20, alignSelf: 'auto'}}>{`👍 Do you love the book?!`}</Text>
                  </View>
                </TouchableWithoutFeedback>
               </View>
            </ModalContent>
          </Modal>
        {this.BookList()}
      </React.Fragment>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FEFBF7',
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
  ModalContent: {
    height: 40,
    width: 250,
    margin: 5,
  },
  ReviewContainer: {
    flex: 0,
  },
});
const mapStateToProps = state => {
  var library = state.library

  library = library.filter(book => !book.isCurrentlyReading)
  return { library }
}
export default connect(mapStateToProps, {toggleIsReading})(Library);