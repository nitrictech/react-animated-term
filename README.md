# @nitric/react-animated-term

![GitHub Workflow Status](https://img.shields.io/github/workflow/status/nitrictech/@nitric/react-animated-term/Tests?label=tests)
![Codecov](https://img.shields.io/codecov/c/github/nitrictech/@nitric/react-animated-term)
![npm (scoped)](https://img.shields.io/npm/v/@nitric/react-animated-term)
![npm](https://img.shields.io/npm/dw/@nitric/react-animated-term)

> Animated terminal component for [React](https://reactjs.org/)
>
> Rewrite of [react-animated-term](https://github.com/dongy7/react-animated-term) in Typescript with added features

<p align="center">
  <br>
  <img width="400" src="media/demo-basic.gif">
  <br>
  <br>
</p>

## Installation

```
npm install @nitric/react-animated-term
```

OR

```bash
yarn add @nitric/react-animated-term
```

You can then import `react-animated-term` and its styles.

```js
import Terminal from '@nitric/react-animated-term'
import '@nitric/react-animated-term/css/styles.css'
```

## Usage

The terminal commands and output lines are specified as an array of objects. The `text` field specifies the content of the line and `cmd` is used to specify whether the line is a command or an output. The `interval` prop specifies how often the terminal should be updated.

```js
import React from 'react'
import Terminal from '@nitric/react-animated-term'

const termLines = [
  {
    'text': 'ls',
    'cmd': true
  },
  {
    'text': 'index.js    package.json    node_modules',
    'cmd': false
  },
  {
    'text': '',
    'cmd': true
  }
]

const MyComponent = () => {
  return (
      <Terminal
        lines={termLines}
        interval={80}
      />
   )
}
```

### Framed Animation

<p align="center">
  <br>
  <img width="400" src="media/demo-spinner.gif">
  <br>
  <br>
</p>

You can also render output that consists of frames by specifying the individual frames. With a framed output, the `text` field specifies the final output that should be rendered after all the frames have been rendered. Delays can also be specified for individual frames and commands.

```js
import React from 'react'
import Terminal from '@nitric/react-animated-term'
const spinner = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏']
const termLines = [
  {
    text: 'node example.js',
    cmd: true,
    delay: 80
  },
  {
    text: '✔ Loaded app',
    cmd: false,
    repeat: true,
    repeatCount: 5,
    frames: spinner.map(function (spinner) {
      return {
        text: spinner + ' Loading app',
        delay: 40
      }
    })
  },
  {
    text: '',
    cmd: true
  }
]

const MyComponent = () => {
  return (
      <Terminal
        lines={termLines}
        interval={80}
      />
   )
}
```

### Themes

A white themed terminal is specified using the `white` prop.

<p align="center">
  <br>
  <img width="400" src="media/white-terminal.png">
  <br>
  <br>
</p>

```js
import React from 'react'
import Terminal from '@nitric/react-animated-term'

const MyComponent = () => {
  return (
      <Terminal
        lines={termLines}
        interval={80}
		white
      />
   )
}
```

### Props
| Property | Type | Default | Description |
|:---|:---|:---|:---|
| lines | array| undefined | array of terminal lines |
| interval | number | 100 | interval at which terminal output is updated in milliseconds |
| white | boolean | false | whether to render a white themed terminal |
| height | number | 240 | the height of the terminal |
| onCompleted | func | undefined | a function callback that gets called when the terminal animation has completed |

### Examples

You can view the deployed example from `examples/create-react-app` here: [react-animated-term.vercel.app](https://react-animated-term.vercel.app).

To run the examples, clone and install the dependencies:

```bash
git clone https://github.com/nitrictech/react-animated-term.git
yarn install
```

Then, run the `start` script and open up `http://localhost:3000`.

```bash
yarn start
```

## Credits

The original code was written by [dongy7](https://github.com/dongy7) under the [react-animated-term](https://github.com/dongy7/react-animated-term) repo.

The styling for the terminal was adapted from the [Hyper](https://hyper.is/) terminal.