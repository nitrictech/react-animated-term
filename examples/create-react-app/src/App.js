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
import Renderer, { Code } from '@nitric/react-animated-term';
import basicLines from './terminals/basic';
import spinnerLines from './terminals/spinner';
import progressLines from './terminals/progress';
import '@nitric/react-animated-term/css/styles.css';

function App() {
  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <h1>React Animated Terminal</h1>
      <h2>Basic Example</h2>
      <div style={{ width: '380px' }}>
        <Renderer lines={basicLines} interval={80} white />
      </div>

      <h2>Repeated Frames Example</h2>
      <div style={{ width: '380px' }}>
        <Renderer lines={spinnerLines} interval={10} />
      </div>

      <h2>Progress Bar Example</h2>
      <div style={{ width: '480px' }}>
        <Renderer lines={progressLines} interval={5} />
      </div>

      <h2>Code Example</h2>
      <div style={{ width: '380px' }}>
        <Code white>
          {`import mod from 'mod';
export default mod;`}
        </Code>
      </div>
    </div>
  );
}

export default App;
