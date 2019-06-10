import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TypedText from './TypedText';
import ReactDOMServer from 'react-dom/server';

export default class AnimatedText extends Component {

  renderText() {
    const text = [];
    const prop = this.props.text || [];

    prop.forEach(element => {
      text.push(
        <p key={element.key} className={element.style}>{element.line}</p>
      );
    });

    return [ReactDOMServer.renderToStaticMarkup(text)];
  }

  render() {
    return (
      <TypedText
        strings={this.renderText()}
        onComplete={this.props.onFinishedTyping}
      />
    );
  }
}

AnimatedText.propTypes = {
  text: PropTypes.array,
  onFinishedTyping: PropTypes.func
};