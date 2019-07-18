import React, { Component } from 'react';
import { Redirect } from 'react-router';
import tddContent from './guide-content';
import introContent from './tdd-content';
import EditorManager from '../../components/editor-manager/EditorManager';
import Intro from '../../components/intro/Intro';
import Guide from '../../components/editor-manager/Guide';
import Emitter, { PROGRESS_UP, LEVEL_UP } from '../../emitter/Emitter';
import { track } from '../../emitter/Tracking';
import { auth } from '../login/Auth';
import DebugButton from '../../components/debug/Button';
import Loading from '../../components/loading/Loading';

const code = `function somar(a, b) {
  return a + b
}`;

const test = `function testeSomarNumerosPositivos() {
}`;

export default class Tdd extends Component {

  state = {
    code: {
      0: code,
      1: test
    },
    done: false,
    currentExercise: 0,
    showNext: false,
    currentHint: 0,
    initialStep: 0,
    introEnabled: false,
    intro: introContent,
    loading: false,
  };

  componentDidMount() {
    track({
      section: 'tdd',
      action: 'tdd_start'
    });
  }

  onValidCode = (code, i) => {
    let current = Object.assign({}, this.state.code);

    current[i] = code;

    this.setState({
      ...this.state.code, code: current
    });
  }

  onGuideFinishedTyping = () => {
    this.setState({
      //@ts-ignore
      ...this.state.showNext, showNext: true
    });
  }

  handleProgress = () => {
    if (this.state.currentHint === 1) {
      this.toogleToolTip();
      track({
        section: 'tdd',
        action: 'next_guide_hint:started_unit_test_tooltip'
      });
      
      return;
    }
    
    const next = this.state.currentHint + 1;
    const total = tddContent.length;
    const isNotLast = next < total;

    if (isNotLast) {
      this.setState({
        //@ts-ignore
        ...this.state.currentHint, currentHint: next,
        ...this.state.showNext, showNext: false
      });

      Emitter.emit(PROGRESS_UP, { amount: auth.user.progress + 10 });

      track({
        section: 'tdd',
        action: 'next_guide_hint:button_click',
        value: next
      });

      return;
    }

    this.setState({
      //@ts-ignore
      ...this.state.loading, loading: true
    });

    Emitter.emit(LEVEL_UP);
    
    track({
      section: 'tdd',
      action: 'tdd_end',
      value: next
    });

    setTimeout(() => {
      this.setState({
        //@ts-ignore
        ...this.state.loading, loading: false,
        ...this.state.done, done: true
      });
    }, 700);
  }

  toogleToolTip = () => {
    this.setState({
      //@ts-ignore
      ...this.state.introEnabled, introEnabled: true
    });
  }

  onFinishTooltip = () => {
    this.setState({
      //@ts-ignore
      ...this.state.introEnabled, introEnabled: false,
      ...this.state.currentHint, currentHint: 1 + this.state.currentHint,
      ...this.state.showNext, showNext: false
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <Loading />
      );
    }

    if (this.state.done) {
      return (<Redirect to="/completed" />);
    }

    return (
      <React.Fragment>
        <DebugButton onClick={this.toogleToolTip} value="enable tooltip"/>

        <Intro
          enabled={this.state.introEnabled}
          steps={this.state.intro.steps}
          initialStep={this.state.intro.initialStep}
          onExit={this.onFinishTooltip}
        />

        <div className="flex flex-col">
          <div className="flex justify-center editor-container">
            <EditorManager
              editor={2}
              className="w-2/5 m-5"
              code={this.state.code}
              onValidCode={{ 0: this.onValidCode, 1: this.onValidCode }}
            />
          </div>

          <Guide
            guideContent={tddContent}
            showNext={this.state.showNext}
            handleProgress={this.handleProgress}
            currentHint={this.state.currentHint}
            onFinishedTyping={this.onGuideFinishedTyping}
          />
        </div>
      </React.Fragment>
    );
  }
}
