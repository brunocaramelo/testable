import React, { Component } from 'react';
import content from './completed-content.json';
import SceneManager from '../../components/scene-manager/SceneManager';

export default class Completed extends Component {

  render() {
    return (
      <SceneManager
        identifier="completed"
        content={content}
        handleLastScene={ () => {} }
      />
    );
  }
}
