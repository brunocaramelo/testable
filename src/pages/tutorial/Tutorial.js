/* eslint no-eval: 0 */
import React, { Component } from 'react';
import Profile from '../../components/profile/Profile';
import Level from '../../components/level/Level';
import SvgBuggy from '../../components/buggy/SvgBuggy';
import Editor from '../../components/editor/Editor';
import AnimatedText from '../../components/text-keyboard-animation/AnimatedText';
import TutorialSteps from './TutorialSteps';
import Background from '../../components/background/Background';
import intro from './intro';
import { auth } from '../../pages/login/Auth';

import 'intro.js/introjs.css';
import './tutorial.scss';

const isDebug = process.env.REACT_APP_DEBUG || false;
const testCode = `describe('comportamento', function() {
  it('deve somar um mais um', function() {

  })
})
`;

export default class Tutorial extends Component {

  constructor() {
    super();
    this.state = {
      user: {},
      codeResult: '',
      code: 'var a = 1;',
      showNext: false,
      testCode: testCode,
      showTestCase: 'hidden',
      currentHint: 0,
      hints: [
        {
          'line': 'Mas antes de começar vamos ver algumas coisas  .  .  . ',
          'key': 0,
          'style': 'text-white font-semibold text-xl'
        },
        {
          'line': 'Vamos praticar! Como você faria para escrever uma função de soma?',
          'key': 1,
          'style': 'text-white font-semibold text-xl'
        }
      ],
      introEnabled: false,
      intro: intro
    };

    this.codeChanged = this.codeChanged.bind(this);
    this.onEnableTooltip = this.onEnableTooltip.bind(this);
    this.onFinishedTyping = this.onFinishedTyping.bind(this);
    this.onExit = this.onExit.bind(this);
    this.goToIntroduction = this.goToIntroduction.bind(this);
    this.handleProgress = this.handleProgress.bind(this);
    this.renderHint = this.renderHint.bind(this);
  }

  onExit() {
    this.setState({
      ...this.state.introEnabled, introEnabled: false,
      ...this.state.showNext, showNext: false,
      ...this.state.currentHint, currentHint: this.state.currentHint + 1
    });
  }

  onEnableTooltip() {
    this.setState({
      ...this.state.introEnabled, introEnabled: true
    });
  }

  onFinishedTyping() {
    const total = this.state.hints.length;
    if (total === 2) {
      return;
    }

    this.setState({
      ...this.state.showNext, showNext: true
    });
  }

  codeChanged(code) {
    try {
      const result = eval(code);
      this.setState({
        ...this.state.codeResult, codeResult: result ? result.toString(): ''
      });
    } catch (error) {
      this.setState({
        ...this.state.codeResult, codeResult: error.message
      });
    }
  }

  componentDidMount() {
    this.setState({
      ...this.state.user, user: auth.user
    });
  }

  goToIntroduction() {
    auth.updateUserInfo({
      tutorial: false,
      level: 2
    });
    window.location.reload();
  }

  handleProgress() {
    if (this.state.currentHint === 0) {
      this.onEnableTooltip();
    }
  }

  renderHint() {
    return this.state.hints.map((item, index) => {
      if (index === this.state.currentHint) {
        return <AnimatedText
          text={[
            item
          ]}
          onFinishedTyping={this.onFinishedTyping}
        />;
      }

      return false;
    });
  }

  render() {
    return (
      <Background>
        <TutorialSteps
          enabled={this.state.introEnabled}
          steps={this.state.intro.steps}
          initialStep={this.state.intro.initialStep}
          onExit={this.onExit}
        />

        {isDebug && <button className="bg-white m-2" onClick={this.goToIntroduction}>go back to introduction</button>}
        {isDebug && <button className="bg-white m-2" onClick={this.onEnableTooltip}>enable introjs</button>}
        {isDebug && <button className="bg-white m-2" onClick={this.onExit}>end introjs</button>}

        <div className="flex justify-between pl-3 pr-3 mt-3">
          <div className="user-progress">
            <Level progress="50" level={this.state.user.level} />
          </div>

          <div className="user-info">
            <Profile user={this.state.user} />
          </div>
        </div>

        <div className="flex w-full justify-center relative">
          <img src="assets/logo.png" className="h-8 hidden lg:block" alt="logotipo" />
        </div>

        <div className="mt-5">
          <div className="flex justify-center">
            <Editor
              value={this.state.code}
              codeChanged={this.codeChanged}
              className="source-code m-5 border-2 border-testable-blue-overlay"
            />

            <Editor
              value={this.state.testCode}
              className={`test-code m-5 border-2 border-testable-blue-overlay ${this.state.showTestCase}`}
            />
          </div>

          <p className="m-auto mb-5 text-red font-medium" style={{ minWidth: '45%', maxWidth: '45%' }}>
            {this.state.codeResult}
          </p>
        </div>

        <div className="flex justify-center p-12 min-h-screen bg-testable-overlay">
          <div className="flex flex-col justify-start relative" style={{ minWidth: '45%', maxWidth: '45%' }}>
            <SvgBuggy
              className="absolute pin-t"
              style={{
                transform: 'scaleX(-1)',
                width: '250px',
                marginTop: '-180px',
                marginLeft: '-270px'
              }}
            />
            {this.renderHint()}
            {this.state.showNext && <button onClick={this.handleProgress} className="self-end no-underline text-white font-bold p-3">Proximo ></button>}
          </div>
        </div>
      </Background>
    );
  }
}