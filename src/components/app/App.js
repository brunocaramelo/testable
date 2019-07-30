import * as React from 'react';
import { Route } from 'react-router-dom';
import { AnimatedSwitch } from 'react-router-transition';
import AsyncComponent from './AsyncComponent';
import { mapStyles, bounceTransition } from './transition';
import ProtectedRoute from '../../pages/login/router/ProtectedRoute';
import Sidebar from '../sidebar/Sidebar';
import Queue from '../../queue/queue';
import Loading from '../loading/Loading';
import Emitter, { TRACKING } from '../../emitter/Emitter';
import { auth } from '../../pages/login/Auth';

import './app.scss';
 
/* eslint-disable-next-line */
const isDebug = process.env.REACT_APP_DEBUG || false;
const queue = new Queue();

const Introduction = AsyncComponent(() => {
  return import('../../pages/introduction/Introduction');
});

const Login = AsyncComponent(() => {
  return import('../../pages/login/Login');
});

const Tutorial = AsyncComponent(() => {
  return import('../../pages/tutorial/Tutorial');
});

const NotFound = AsyncComponent(() => {
  return import('../../pages/notfound/NotFound');
});

const TutorialEnd = AsyncComponent(() => {
  return import('../../pages/tutorial-end/TutorialEnd');
});

const TddIntro = AsyncComponent(() => {
  return import('../../pages/tdd-intro/TddIntro');
});

const Tdd = AsyncComponent(() => {
  return import('../../pages/tdd/Tdd');
});

const TddEnd = AsyncComponent(() => {
  return import('../../pages/tdd-end/TddEnd');
});

const Rocket01 = AsyncComponent(() => {
  return import('../../pages/rocket-01/Rocket01');
});

const Rocket02 = AsyncComponent(() => {
  return import('../../pages/rocket-02/Rocket02');
});

const Rocket03 = AsyncComponent(() => {
  return import('../../pages/rocket-03/Rocket03');
});

const Completed = AsyncComponent(() => {
  return import('../../pages/completed/Completed');
});

const Survey = AsyncComponent(() => {
  return import('../../pages/survey/Survey');
});

export default class App extends React.Component {

  state = {
    isFetchingAssets: true
  }

  async componentDidMount() {
    // @ts-ignore
    Emitter.addListener(TRACKING, data => {
      if (isDebug) {
        /* eslint-disable-next-line */
        console.warn(data);
        return;
      }

      auth.insertUserInfo(data, 'tracking');
    });

    await queue.fetch([
      'assets/buggy.png',
      'assets/alien.png',
      'assets/logo.png',
      'assets/stars.png',
      'assets/placeholder.svg',
      'assets/mp3/keyboard.mp3',
    ]);

    this.setState({
      isFetchingAssets: false
    });
  }

  componentWillUnmount() {
    Emitter.removeAllListeners(TRACKING);
  }

  render() {
    if (this.state.isFetchingAssets) {
      return (
        <Loading />
      );
    }

    return (
      <Sidebar>
        <AnimatedSwitch
          atEnter={bounceTransition.atEnter}
          atLeave={bounceTransition.atLeave}
          atActive={bounceTransition.atActive}
          mapStyles={mapStyles}
          className="App"
        >
          <Route exact path="/" component={Login} />
          <ProtectedRoute path="/intro" component={Introduction} />
          <ProtectedRoute path="/tutorial" component={Tutorial} />
          <ProtectedRoute path="/tutorial-end" component={TutorialEnd} />
          <ProtectedRoute path="/tdd-intro" component={TddIntro} />
          <ProtectedRoute path="/tdd" component={Tdd} />
          <ProtectedRoute path="/tdd-end" component={TddEnd} />
          <ProtectedRoute path="/rocket-01" component={Rocket01} />
          <ProtectedRoute path="/rocket-02" component={Rocket02} />
          <ProtectedRoute path="/rocket-03" component={Rocket03} />
          <ProtectedRoute path="/completed" component={Completed} />
          <ProtectedRoute path="/survey" component={Survey} />
          <Route path="*" component={NotFound} />
        </AnimatedSwitch>
      </Sidebar>
    );
  }
}
