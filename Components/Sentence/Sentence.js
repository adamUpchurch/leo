import React, { Component } from 'react';
import {Text} from 'react-native';

class Sentence extends Component {
  constructor(props) {
    super(props);
    console.log(this.props)
    this.state = {
      titleText: "Title",
    };
  }

  styles = {
    book_text: {
      fontSize: 22,
      textAlign: 'center',
      margin: 10,
    },
  }

  render() {
    return (
      <Text style={this.styles.book_text}>{this.props.text}</Text>
    );
  }
}

export default Sentence;