import React from 'react'
import GetComponentStyle from './GetComponentStyle'
import Step from './Step'
import createStep from './Step/createStep'

/**
 * Wizard React component
 * generic component for creating Multi dimensional step navigation
 * @type {[type]}
 */
export default class Wizard extends React.Component {
  /**
   * tracks index of current step
   * @type {Number}
   */
  stepIndex = 0;
  getStep = () => this.stepIndex;
  stepNavigator = Wizard.processSteps(
    this.props.steps,
    this.getStep
  ); /* eslint-disable-line */

  state = {
    step: this.stepNavigator.next()
  }

  static defaultProps = {
    showStep: true,
    hideStepName: false,
    hideStepProgressBar: false,
    afterNavigationCallbackTimeout: 150
  }

  static * processSteps (steps, getStep) {
    while (steps[getStep()]) yield steps[getStep()]
  }

  /** TODO: this should use the reflect API */
  static showStep ({
    hideStepName,
    hideStepProgressBar,
    name,
    showStep,
    stepIndex,
    totalSteps
  }) {
    if (!showStep) return null

    return (
      <React.Fragment>
        {!hideStepName
          ? name
          : null
        }
        {!hideStepProgressBar
          ? (<progress
            className='progress-total-steps'
            value={`${stepIndex + 1}`}
            max={`${totalSteps}`} />)
          : null
        }
      </React.Fragment>
    )
  }

  static renderNavigationActions = ({
    nextStep,
    prevStep,
    showStep,
    stepIndex
  }) => (
    <React.Fragment>
      {
        <button
          className={`navigation-buttons left ${stepIndex === 0 ? 'disabled' : ''}`}
          disabled={stepIndex === 0}
          onClick={prevStep}
        >prev
        </button>
      }
      {showStep}
      {
        <button
          className='navigation-buttons right'
          onClick={nextStep}
        >next
        </button>
      }
    </React.Fragment>
  )

  componentDidUpdate (prevProps, prevState, snapshot) {
    if (
      prevState.step && prevState.step.value &&
      (this.state.step.done || prevState.step.value.id !== this.state.step.value.id)
    ) {
      setTimeout(() =>
        this.invokeNavigationCallback({
          step: prevState.step,
          navigationName: 'afterNavigation'
        }),
      this.props.afterNavigationCallbackTimeout
      )
    }
  }

  shouldNavigate = (
    direction,
    value = this.state.step.value
  ) => {
    if (value) {
      if (value.gotoStep) return (this.stepIndex = value.gotoStep())
      else return (direction && ++this.stepIndex) || --this.stepIndex
    }
  }

  invokeNavigationCallback = ({
    step = this.state.step,
    navigationName,
    isCompoundNavigation = false,
    direction
  }) => (
    (!isCompoundNavigation &&
      step.value &&
      navigationName &&
      step.value[navigationName] &&
      step.value[navigationName]()) ||

    (isCompoundNavigation &&
      this.callBeforeNavigationIfSet(
        direction,
        step)
    )

  )

  callBeforeNavigationIfSet = (
    direction,
    step
  ) => (
    !step.value
      ? null
      : direction > 0 && step.value.beforeNextNavigation
        ? step.value.beforeNextNavigation()
        : step.value.beforePrevNavigation
          ? step.value.beforePrevNavigation()
          : null
  )

  navigate = (
    direction = 1,
    shouldNavigate = this.shouldNavigate(direction),
    step = this.state.step
  ) => {
    if (shouldNavigate === false) return null

    // potentially next or prev
    this.invokeNavigationCallback({
      isCompoundNavigation: true,
      direction,
      step
    })

    this.invokeNavigationCallback({
      step,
      navigationName: 'beforeFinalNavigation'
    })

    this.setState({ step: this.stepNavigator.next() })
  }

  //* * TODO: refactor these to keep them DRY */
  nextStep = (e, value = this.state.step.value) => (
    (value.cancelNextNavigation &&
      !value.cancelNextNavigation() &&
      this.navigate(1)) ||
    (!value.cancelNextNavigation &&
    this.navigate(1))
  )
  prevStep = (e, value = this.state.step.value) => (
    (value.cancelPrevNavigation &&
      !value.cancelPrevNavigation() &&
      this.navigate(0)) ||
    (!value.cancelPrevNavigation &&
    this.navigate(0))
  )

  renderStep = (
    step = this.state.step
  ) => (
    step.value
      ? (
        <React.Fragment>
          <Step css={step.value.css}>
            {step.value.Comp}
          </Step>
          {
            Wizard.renderNavigationActions({
              prevStep: this.prevStep,
              nextStep: this.nextStep,
              stepIndex: this.stepIndex,
              showStep: Wizard.showStep({
                showStep: this.props.showStep,
                hideStepName: this.props.hideStepName,
                hideStepProgressBar: this.props.hideStepProgressBar,
                name: step.value.Comp.name,
                totalSteps: this.props.steps.length,
                stepIndex: this.stepIndex
              })
            })
          }
        </React.Fragment>
      )
      : null
  )

  // https://www.w3schools.com/css/css3_buttons.asp
  // TODO: this should be a prop
  static wizardCss = (
    `
      .navigation-buttons {
        background-color: #4CAF50; /* Green */
        border: none;
        color: white;
        padding: 15px 32px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        width: 100px;
        cursor: pointer;
      }

      .disabled {
        cursor: not-allowed;
      }

      .progress-total-steps {
        width: calc(100% - 200px)
      }
    `
  )

  render () {
    return (
      <div>
        {GetComponentStyle(Wizard.wizardCss)}
        {this.renderStep()}
      </div>
    )
  }
}

export {
  createStep,
  Step
}
