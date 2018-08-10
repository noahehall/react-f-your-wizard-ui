# react-f-your-wizard-ui

> Reusable React component for creating multi-dimensional Wizard User Interfaces

[![NPM](https://img.shields.io/npm/v/react-f-your-wizard-ui.svg)](https://www.npmjs.com/package/react-f-your-wizard-ui) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```sh
npm install --save react-f-your-wizard-ui
```

## Usage

```js
import React, { Component } from 'react'

import Wizard from 'react-f-your-wizard-ui'

class Example extends Component {
  render () {
    return (
      <Wizard
        steps={[ /* array of step definitions */]}
        showStep, // if step metadata (name, progressBar) should be displayed
        hideStepName={false}, // if step name should be hidden
        hideStepProgressBar={false}, // if Wizard Progress Bar should be hidden
        afterNavigationCallbackTimeout={150}, // delay in milliseconds before after navigation callback is invoked
      />
    )
  }
}
```

# Step Definition
```js
import { createStep } from 'react-f-your-wizard-ui';

const stepOne = createStep({
  afterNavigation = () => 'Function to call after navigation is complete',
  beforeFinalNavigation = () => 'Function to call before navigation is complete',
  beforeNextNavigation = () => 'Function to call before forward navigation is started',
  beforePrevNavigation = () => 'Function to call before backward navigation is started',
  cancelNextNavigation = () => 'return true if forward navigation should be canceled and no other navigation callbacks should be invoked',
  cancelPrevNavigation = () => 'return true if backward navigation should be canceled and no other navigation callbacks should be invoked ',
  gotoStep = () => 'function returning the index number of step to render when NEXT is clicked',
  onError = () => 'Function to call if error is thrown during step lifecycle',
  Comp = <div>Any valid JSX</div>,
  css = `Any valid CSS as a template string`,
})

```

## License

MIT © [noahehall](https://github.com/noahehall)
