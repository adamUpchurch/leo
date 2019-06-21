import React, { Component } from 'react';
import {Text} from 'react-native';
import Sentence from './Components/Sentence/Sentence.js';

class Sentence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleText: "Title",
    };
  }

  render() {
    return (
      <Text>{this.props.text}</Text>
    );
  }
}

export default Sentence;