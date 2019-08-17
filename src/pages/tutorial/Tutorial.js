import React, { Component } from 'react';
import { Redirect } from 'react-router';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import tutorialContent from './tutorial-content';
import introContent from './intro-content';
import EditorManager from '../../components/editor-manager/EditorManager';
import Intro from '../../components/intro/Intro';
import Guide from '../../components/editor-manager/Guide';
import DebugButton from '../../components/debug/Button';
import { auth } from '../../pages/login/Auth';
import Emitter, { LEVEL_UP, PROGRESS_UP } from '../../emitter/Emitter';
import Reason from '../../engine/Reason';
import { Sum, testCase as sumTestCase } from '../../engine/strategies/Sum';
import { onHover } from '../../actions/guideAction';
import { track } from '../../emitter/Tracking';
import { executeTestCase } from '../../engine/Tester';
import {SOURCE_CODE} from '../../constants/editor';

const mapDispatchToProps = (dispatch) => {
  return {
    onHover: hovered => dispatch(onHover(hovered))
  };
};

const FIRST_STEP = 0;
const WAIT_FOR_CODE_ON_STEP = 3;

export class Tutorial extends Component {

  state = {
    introEnabled: false,
    intro: introContent,
    showNext: false,
    currentHint: 0,
    code: '// seu código javascript',
    editorOptions: {
      [SOURCE_CODE]: {
        className: '',
        readOnly: true
      }
    }
  };

  componentDidMount() {
    track({
      section: 'tutorial',
      action: 'tutorial_start'
    });
  }

  onFinishTooltip = () => {
    this.props.onHover(false);
    this.setState({
      // @ts-ignore
      ...this.state.introEnabled, introEnabled: false,
      ...this.state.showNext, showNext: false,
      ...this.state.currentHint, currentHint: this.state.currentHint + 1
    });
    track({
      section: 'tutorial',
      action: 'interface_tour_end'
    });
  }

  onFinishedTyping = () => {
    const total = this.state.currentHint;
    if (total === WAIT_FOR_CODE_ON_STEP) {
      const currentState = Object.assign({}, this.state);
      currentState.editorOptions[SOURCE_CODE].className = 'attention';
      currentState.editorOptions[SOURCE_CODE].readOnly = false;
      this.setState(currentState);

      setTimeout(() => {
        const currentState = Object.assign({}, this.state);
        currentState.editorOptions[SOURCE_CODE].className = '';
        this.setState(currentState);
      }, 3000);

      return;
    }

    this.setState({
      //@ts-ignore
      ...this.state.showNext, showNext: true
    });
  }

  onEnableTooltip = () => {
    this.setState({
      //@ts-ignore
      ...this.state.introEnabled, introEnabled: true
    });
    this.props.onHover(true);

    track({
      section: 'tutorial',
      action: 'interface_tour_start'
    });
  }

  onValidCode = code => {
    // when it is not time to do the code yet and when
    // it is done with the sum and tries to add code again
    if (this.state.currentHint !== WAIT_FOR_CODE_ON_STEP) {
      return;
    }

    const strategyResult = Reason(code, Sum);

    if (strategyResult && executeTestCase(code, strategyResult, sumTestCase)) {
      track({
        section: 'tutorial',
        action: 'sum:valid_code',
        value: code
      });
      Emitter.emit(LEVEL_UP);
      this.nextHint();
    }
  }

  nextHint = () => {
    const next = this.state.currentHint + 1;
    const total = tutorialContent.length;

    if (next < total) {
      Emitter.emit(PROGRESS_UP, { amount: auth.user.progress + 10 });

      this.setState({
        // @ts-ignore
        ...this.state.currentHint, currentHint: next,
        ...this.state.showNext, showNext: false
      });

      track({
        section: 'tutorial',
        action: 'next_guide_hint:button_click',
        value: next
      });

      return;
    }

    auth.updateUserInfo({
      tutorial: false
    });

    track({
      section: 'tutorial',
      action: 'tutorial_end'
    });

    setTimeout(() => {
      this.setState({
        tutorialDone: true
      });
    }, 1000);
  }

  handleProgress = () => {
    if (this.state.currentHint === FIRST_STEP) {
      this.onEnableTooltip();
      return;
    }

    this.nextHint();
  }

  render() {
    if (this.state.tutorialDone) {
      return (<Redirect to="/tutorial-end" />);
    }

    return (
      <React.Fragment>
        <DebugButton onClick={this.onEnableTooltip} value="enable introjs" />
        <DebugButton onClick={this.nextHint} value="Forward" />

        <Intro
          enabled={this.state.introEnabled}
          steps={this.state.intro.steps}
          initialStep={this.state.intro.initialStep}
          onExit={this.onFinishTooltip}
        />

        <EditorManager
          className="w-1/2 m-auto"
          onEnableTooltip={this.onEnableTooltip}
          onValidCode={{ [SOURCE_CODE]: this.onValidCode} }
          code={{ [SOURCE_CODE]: this.state.code} }
          options={ this.state.editorOptions }
        />

        <Guide
          guideContent={tutorialContent}
          showNext={this.state.showNext}
          handleProgress={this.handleProgress}
          currentHint={this.state.currentHint}
          onFinishedTyping={this.onFinishedTyping}
        />
      </React.Fragment>
    );
  }
}

Tutorial.propTypes = {
  onHover: PropTypes.func
};

export default connect(null, mapDispatchToProps)(Tutorial);
