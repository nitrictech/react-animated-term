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
import Terminal, { TerminalProps } from './Terminal';
import termContent from './contentHandler';

export interface Line {
  delay?: number;
  text?: string;
  element?: React.ReactElement;
  color?: string;
  cmd?: boolean;
  repeat?: boolean;
  repeatCount?: number;
  frames?: Line[];
  prompt?: string | React.ReactNode;
  replay?: boolean;
}

export interface RendererProps
  extends Omit<TerminalProps, 'onReplay' | 'completed'> {
  lines: Line[];
  interval?: number;
  onCompleted?: (replay: () => void) => void;
}

const Renderer: React.FC<RendererProps> = ({
  lines: initialLines = [],
  interval = 100,
  onCompleted,
  ...rest
}) => {
  const [lines, setLines] = React.useState([]);
  const [completed, setCompleted] = React.useState(false);
  let intervalRef = React.useRef<NodeJS.Timer>();
  let contentRef = React.useRef<Generator>();

  React.useEffect(() => {
    contentRef.current = termContent(initialLines);

    intervalRef.current = setInterval(() => {
      const { value, done } = contentRef.current.next();
      if (value) {
        setLines([...lines, ...value]);
      }

      if (done) {
        clearTimeout(intervalRef.current);
        setCompleted(true);
      }
    }, interval);

    return () => clearTimeout(intervalRef.current);
  }, []);

  const replay = () => {
    contentRef.current = termContent(initialLines);
    setCompleted(false);

    intervalRef.current = setInterval(() => {
      if (contentRef.current) {
        const { value, done } = contentRef.current.next();
        setLines([...value]);
        if (done) {
          clearInterval(intervalRef.current);
          setCompleted(true);
        }
      }
    }, interval);
  };

  React.useEffect(() => {
    if (completed && typeof onCompleted !== 'undefined') {
      onCompleted(replay);
    }
  }, [completed]);

  return (
    <Terminal {...rest} onReplay={() => replay()} completed={completed}>
      {lines}
    </Terminal>
  );
};

export default Renderer;
