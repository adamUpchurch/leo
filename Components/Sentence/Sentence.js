import React, { Component } from 'react';
import {Text} from 'react-native';

class Sentence extends Component {
  constructor(props) {
    super(props);
    this.state = {
      titleText: "Title",
    };
  }

  styles = {
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
  }

  render() {
    return (
      <Text style={this.styles.welcome}>{this.props.text}</Text>
    );
  }
}

export default Sentence;
