//@ts-nocheck
import { useState } from 'react';
import PropTypes from 'prop-types';
import Scene from './Scene';
import DebugButton from '../../buttons/debug/Debug';
import { auth } from '../../../../pages/login/Auth';
import Emitter, { PROGRESS_UP, PROGRESS_DOWN } from '../../../../packages/emitter/Emitter';
import { track } from '../../../../packages/emitter/Tracking';

const SceneManager = props => {
  
  const [currentStep, setCurrentStep] = useState(1);

  const handlePreviousScene = () => {
    if (currentStep === 1) {
      return false;
    }

    setCurrentStep(currentStep - 1);

    Emitter.emit(PROGRESS_DOWN, { amount: auth.user.progress - 10 });
  };

  const handleNextScene = () => {
    const current = currentStep;
    const total = props.content.steps.length;

    if (current === total) {
      return false;
    }

    setCurrentStep(current + 1);

    Emitter.emit(PROGRESS_UP, { amount: auth.user.progress + 10 });

    track({
      section: props.identifier,
      action: 'next_scene|button_click',
      value: current,
    });
  };

  const steps = props.content.steps || [];
  const scenes = [];
  const last = steps.length - 1;

  for (const [index, step] of steps.entries()) {
    if (step.step === currentStep) {
      scenes.push(
        <Scene
          key={index}
          text={step.content}
          button={step.button}
          step={currentStep}
          className="m-auto w-3/5"
          next={handleNextScene}
          previous={handlePreviousScene}
          lastScene={step.lastScene || (last === index)}
          handleLastScene={props.handleLastScene}
          showAlien={step.showAlien}
          showBuggy={step.showBuggy || false}
          onCompleted={step.onCompleted || {}}
        />
      );
    }
  }

  return (
    <>
      <div className={`w-full -mt-20 ${props.className}`}>
        { scenes }
      </div>
      <DebugButton onClick={handlePreviousScene} value="previous" />
      <DebugButton onClick={handleNextScene} value="next" />
      <DebugButton onClick={props.handleLastScene} value="trigger last scene" />
    </>
  );
};

SceneManager.propTypes = {
  identifier: PropTypes.string,
  content: PropTypes.object,
  handleLastScene: PropTypes.func,
  className: PropTypes.string
};

SceneManager.defaultProps = {
  className: ''
};

export default SceneManager;
