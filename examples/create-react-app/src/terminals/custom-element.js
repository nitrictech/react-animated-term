// Copyright 2022, Nitric Technologies Pty Ltd.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
const spinnerFrames = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴', '⠦', '⠧', '⠇', '⠏'];
const spinner = [
  {
    text: 'node example.js',
    element: (
      <>
        <span
          style={{
            background: 'lightgreen',
            color: 'black',
          }}
        >
          node
        </span>{' '}
        Loaded app
      </>
    ),
    cmd: true,
    delay: 80,
  },
  {
    text: '✔ Loaded app',
    element: (
      <>
        <span
          style={{
            color: 'green',
          }}
        >
          ✔
        </span>{' '}
        Loaded app
      </>
    ),
    cmd: false,
    repeat: true,
    repeatCount: 1,
    frames: spinnerFrames.map(function (spinner) {
      return {
        text: spinner + ' Loading app',
        delay: 80,
      };
    }),
  },
  {
    text: '',
    cmd: true,
  },
];

export default spinner;
