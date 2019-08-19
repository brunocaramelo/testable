import React, { Component } from 'react';
import { Redirect } from 'react-router';
import Emitter, { PROGRESS_UP, LEVEL_UP } from '../../emitter/Emitter';
import { track } from '../../emitter/Tracking';
import { auth } from '../../pages/login/Auth';
import Reason from '../../engine/Reason';
import EditorManager from '../../components/editor-manager/EditorManager';
import Guide from '../../components/editor-manager/Guide';
import Intro from '../intro/Intro';
import {SOURCE_CODE, TEST_CODE} from '../../constants/editor';
import {executeTestCase} from '../../engine/Tester';

/**
 * @param {any} OriginalComponent 
 * @param {string} code 
 * @param {string} test
 * @param {array} strategyTests
 * @param {object} guideContent
 * @param {string} whenDoneRedirectTo 
 * @param {Number} waitCodeToBeExecutedOnStep 
 * @param {Number} enableEditorOnStep 
 * @param {string} trackSection 
 * @param {function} reasonStrategy
 */
const Wrapped = (
  OriginalComponent,
  code,
  test,
  strategyTests,
  guideContent,
  whenDoneRedirectTo,
  waitCodeToBeExecutedOnStep,
  enableEditorOnStep,
  trackSection,
  reasonStrategy,
  disableEditor,
  introContent,
  enableIntroOnStep) => {
  class Rocket extends Component {

    state = {
      code: {
        [SOURCE_CODE]: code,
        [TEST_CODE]: test
      },
      editorOptions: {
        [SOURCE_CODE]: {
          readOnly: true
        },
        [TEST_CODE]: {}
      },
      done: false,
      showNext: false,
      currentHint: 0,
      initialStep: 0,
      introEnabled: false,
      intro: introContent || {
        steps: [],
        initialStep: 0
      },
      editorError: false,
    };

    componentDidMount() {
      track({
        section: trackSection,
        action: `${trackSection}_start`
      });
    }

    onValidCode = (code, i) => {
      if (this.state.currentHint !== enableEditorOnStep || i === disableEditor) {
        return;
      }
      let current = Object.assign({}, this.state.code);

      current[i] = code;

      this.setState({
        ...this.state.code, code: current
      });

      const strategyResult = Reason(code, reasonStrategy);
      const codeAndTestCase = `${this.state.code[SOURCE_CODE]} ${this.state.code[TEST_CODE]}`;

      if (strategyResult && executeTestCase(codeAndTestCase, strategyResult, strategyTests)) {
        Emitter.emit(LEVEL_UP);

        track({
          section: trackSection,
          action: `${trackSection}:valid_code`
        });

        this.setState({
          //@ts-ignore
          ...this.state.currentHint, currentHint: this.state.currentHint + 1,
          ...this.state.showNext, showNext: false
        });
      }
    }

    onErrorCode = (error, i) => {
      this.setState({
        //@ts-ignore
        ...this.state.editorError, editorError: error
      });
    }

    onGuideFinishedTyping = () => {
      if (this.state.currentHint === waitCodeToBeExecutedOnStep) {
        const currentState = Object.assign({}, this.state);
        currentState.editorOptions[TEST_CODE].className = 'attention';
        this.setState(currentState);

        setTimeout(() => {
          const currentState = Object.assign({}, this.state);
          currentState.editorOptions[TEST_CODE].className = '';
          this.setState(currentState);
        }, 3000);
        return;
      }

      this.setState({
        //@ts-ignore
        ...this.state.showNext, showNext: true
      });
    }

    handleProgress = () => {
      if (this.state.currentHint === enableIntroOnStep) {
        this.toogleToolTip();
        track({
          section: trackSection,
          action: `next_guide_hint:started_tooltip_${trackSection}`
        });

        return;
      }

      const next = this.state.currentHint + 1;
      const total = guideContent.length;
      const isNotLast = next < total;

      if (isNotLast) {
        this.setState({
          //@ts-ignore
          ...this.state.currentHint, currentHint: next,
          ...this.state.showNext, showNext: false
        });

        Emitter.emit(PROGRESS_UP, { amount: auth.user.progress + 10 });

        track({
          section: trackSection,
          action: 'next_guide_hint:button_click',
          value: next
        });

        return;
      }

      this.setState({
        //@ts-ignore
        ...this.state.done, done: true
      });
    }

    toogleToolTip = () => {
      this.setState({
        //@ts-ignore
        ...this.state.introEnabled, introEnabled: true
      });
    }

    onFinishTooltip = () => {
      if (this.state.currentHint !== enableIntroOnStep) {
        return;
      }

      Emitter.emit(LEVEL_UP);
      this.setState({
        //@ts-ignore
        ...this.state.introEnabled, introEnabled: false,
        ...this.state.currentHint, currentHint: 1 + this.state.currentHint,
        ...this.state.showNext, showNext: false
      });
    }

    render() {
      if (this.state.done) {
        return (<Redirect to={whenDoneRedirectTo} />);
      }

      return (
        <div className="flex flex-col">
          { OriginalComponent && <OriginalComponent state={this.state} /> }

          <Intro
            enabled={this.state.introEnabled}
            steps={this.state.intro.steps}
            initialStep={this.state.intro.initialStep}
            onExit={this.onFinishTooltip}
          />

          <div className="flex justify-center editor-container">
            <EditorManager
              editor={2}
              style={{ width: '46%'}}
              className="m-5"
              code={this.state.code}
              onValidCode={{ [SOURCE_CODE]: this.onValidCode, [TEST_CODE]: this.onValidCode }}
              onErrorCode={{ [SOURCE_CODE]: this.onErrorCode, [TEST_CODE]: this.onErrorCode }}
              options={ this.state.editorOptions }
            />
          </div>

          <Guide
            guideContent={guideContent}
            showNext={this.state.showNext}
            handleProgress={this.handleProgress}
            currentHint={this.state.currentHint}
            onFinishedTyping={this.onGuideFinishedTyping}
            invalidCode={this.state.editorError}
          />
        </div>
      );
    }
  }
  return Rocket;
};

export default Wrapped;