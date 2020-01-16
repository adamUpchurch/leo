module.exports = {
    nextSentence: ()=> {
        this.props.updateVocabulary(this.state.book.text.esp[this.state.book.index_last_read]["translated"])
        var updatedIndex = {index_last_read: this.state.book.index_last_read + 1}
        
        if (this.state.book.index_last_read > this.state.book.text.en.length - 2) {
          updatedIndex = {index_last_read: 0}
        }
        this.setState({
          book: {...this.state.book, ...updatedIndex}
        });
        this.props.indexRecent(this.state.book)
      },
      closeModal: ()=> {
          this.setState({ visible: false });
      },
      lastSentence: ()=> {
        let book = {index_last_read: this.state.book.index_last_read > 0 ? this.state.book.index_last_read - 1 : 0}
        this.setState({
          book: {...this.state.book, ...book}
        });
      },
      report_translation: ()=> {
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
      },
      translationText: (translation) => {
        return <Text style={styles.text}>{`${translation[0]} - ${translation[1]}`}</Text>
      }
}