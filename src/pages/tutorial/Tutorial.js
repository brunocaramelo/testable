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
import { Sum } from '../../engine/strategies/Sum';
import { onHover } from '../../actions/guideAction';
import { track } from '../../emitter/Tracking';

const mapDispatchToProps = (dispatch) => {
  return {
    onHover: hovered => dispatch(onHover(hovered))
  };
};

export class Tutorial extends Component {

  state = {
    introEnabled: false,
    intro: introContent,
    showNext: false,
    currentHint: 0,
    code: '// seu código javascript'
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
    if (total === 3) {
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
    setTimeout(() => this.props.onHover(true), 100);

    track({
      section: 'tutorial',
      action: 'interface_tour_start'
    });
  }

  onValidCode = code => {
    // when it is not time to do the code yet and when
    // it is done with the sum and tries to add code again
    if (this.state.currentHint !== 3) {
      return;
    }

    if (Reason(code, Sum)) {
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

  levelUp = () => {
    Emitter.emit(LEVEL_UP);
  }

  handleProgress = () => {
    if (this.state.currentHint === 0) {
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
        <DebugButton onClick={this.levelUp} value="level up" />

        <Intro
          enabled={this.state.introEnabled}
          steps={this.state.intro.steps}
          initialStep={this.state.intro.initialStep}
          onExit={this.onFinishTooltip}
        />

        <EditorManager
          className="w-1/2 m-auto"
          onEnableTooltip={this.onEnableTooltip}
          onValidCode={{ 0: this.onValidCode} }
          code={{ 0: this.state.code} }
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
