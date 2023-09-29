/*
Copyright 2022, Nitric Technologies Pty Ltd.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
import * as React from 'react';
import classNames from 'classnames';

const cursor = <span className="Terminal-cursor" />;
const prompt = (prefix) => (
  <span className="Terminal-prompt">{prefix || '$'} </span>
);

const renderLines = (lines) => {
  return lines.map((line) => {
    return (
      <React.Fragment key={line.id}>
        {line.cmd ? prompt(line.prompt) : ''}
        {line.element ? (
          line.element
        ) : line.text ? (
          <span style={{ color: line.color }}>{line.text}</span>
        ) : (
          line.text
        )}
        {line.current ? cursor : ''}
        <br />
      </React.Fragment>
    );
  });
};

const getWindowStyle = (white: boolean) => {
  return classNames({
    'Terminal-window': true,
    'Terminal-window-white': white,
  });
};

const getTerminalStyle = (code: boolean) => {
  return classNames({
    'Terminal-term': true,
    'Terminal-term-code': code,
  });
};

const getButtonStyle = (type: string) => {
  return classNames({
    'Terminal-btn': true,
    'Terminal-btn-close': type === 'close',
    'Terminal-btn-minimize': type === 'minimize',
    'Terminal-btn-maximize': type === 'maximize',
  });
};

const getBodyStyle = (code: boolean) => {
  return classNames({
    'Terminal-body': true,
    'Terminal-body-animated': !code,
  });
};

const getConsoleStyle = (code: boolean, white: boolean) => {
  return classNames({
    'Terminal-console': true,
    'Terminal-console-code': code,
    'Terminal-console-white': white,
  });
};

export interface TerminalProps {
  white?: boolean;
  height?: number;
  code?: boolean;
  onReplay?: () => void;
  completed?: boolean;
  replay?: boolean;
}

const Terminal: React.FC<TerminalProps> = ({
  children,
  white,
  height,
  code,
  onReplay,
  completed,
  replay = true,
}) => {
  const btnClassName = white
    ? 'Terminal-control-btn Terminal-control-btn-white'
    : 'Terminal-control-btn';

  return (
    <div className={getWindowStyle(white)}>
      <div
        className={getTerminalStyle(code)}
        style={height ? { height } : null}
      >
        <div className="Terminal-header">
          <span className={getButtonStyle('close')} />
          <span className={getButtonStyle('minimize')} />
          <span className={getButtonStyle('maximize')} />
        </div>
        <div className={getBodyStyle(code)}>
          <div className={getConsoleStyle(code, white)}>
            {code ? (
              <code className="Terminal-code">{children}</code>
            ) : (
              <div>
                <div className="Terminal-code">{renderLines(children)}</div>
                {completed && replay ? (
                  <a className={btnClassName} onClick={() => onReplay()}>
                    Replay
                  </a>
                ) : null}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
