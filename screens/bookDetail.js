import React, {Component} from 'react';
import { ScrollView, StyleSheet, Text, View, Image} from 'react-native';
import {connect} from 'react-redux';
import {toggleIsReading} from '../helper/actions/index'





class Library extends Component {
  constructor(props) {
    super(props);
    const book = this.props.navigation.getParam('book', 'what book is this?')
    this.state = {
      book: book
    };
  }

  static navigationOptions = {
    title: '📚',
  };

  closeModal() {
    this.setState({ isModalVisible: false });
  }

  BookHead() {  
    book = this.state.book
    return (
            <View style={styles.bookHead}>
              <Image style={{width: 50, height: 80, marginRight: 10}} source={{uri: book.cover}}/>
              <View style={styles.bookTile}>
                <Text style={styles.BookTitle}>{book.title}</Text>
                <Text style={styles.bookAuthor}>{book.author}</Text>
                <Text style={styles.bookSummary}>Publication Date: {book.PublicationDate ? book.PublicationDate : "N/A"}</Text>
              </View>
            </View>
    )
  }
  BookDetail() {  
    book = this.state.book
    return (
            <View style={styles.bookDetail}>
              <View style={styles.bookTile}>
                <Text style={styles.bookHeader}>Detail</Text>
                <Text style={styles.detailText}>Reading Level: {book.grade_level}</Text>
                <Text style={styles.detailText}>Total Words: {book.word_count}</Text>
                <Text style={styles.detailText}>Unique Words: {book.unique_words}</Text>
                <Text style={styles.detailText}>Original Language: {book.originalLanguage ? book.originalLanguage : "English"}</Text>
                <Text style={styles.detailText}>Have you completed this book? {book.hasFinished ? "Yes, you have!" : "No, but you should!"}</Text>
                <Text style={styles.detailText}>How far along are you? Ehh, about {(book.index_last_read / book.length).toFixed(2) * 100}%</Text>
              </View>
            </View>
    )
  }
  BookSummary() {  
    book = this.state.book

    return (
            <View style={styles.bookSummary}>
              <Text style={styles.bookHeader}>Summary</Text>
              <Text style={styles.bookSummary}>{`A book summary, sometimes called a synopsis, is the “cliff notes” version of a book. It recaps all the main ideas and does not include outside commentary. So, before going any further, make sure that what you want to write is, indeed, a book summary. If it is, you may proceed`}</Text>
            </View>
    )
  }

  updateIsReading() {
    this.props.toggleIsReading(this.state.bookInfo)
  }

  static navigationOptions = {
    headerTitle: () => <Text>Read Leo</Text>,
  };
  render() {
    return (
      <ScrollView style={styles.container}>
        {this.BookHead()}
        {this.BookDetail()}
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FEFBF7',
  },
  bookHead: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    fontSize: 20,
    width: '100%',
    paddingBottom: 10
  },
  bookDetail: {
    flex: 1,
    flexDirection: 'row',
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    width: '100%',
  },
  BookTitle: {
    color: '#191919',
    fontWeight: 'bold',
    fontSize: 16,
    paddingBottom: 10,
  },
  bookTitle: {
    color: '#191919',
    fontWeight: 'bold',
    fontSize: 14,
  },
  bookHeader: {
    color: '#191919',
    fontSize: 14,
    paddingBottom: 10,
    paddingTop: 10,
  },
  detailText: {
    color: '#191919',
    fontSize: 14,
    marginBottom: 5,
  },
  bookAuthor: {
    color: '#191919',
    fontSize: 14,
  },
  bookSummary: {
    color: '#191919',
    fontSize: 14,
  },
  bookTile: {
    margin: 1,
    paddingBottom: 15,
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

  library = Object.values(Library).filter(book => book.isCurrentlyReading)
  return { library }
}
export default connect(mapStateToProps, {toggleIsReading})(Library);