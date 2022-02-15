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
import type { Line } from './Renderer';

const terminalContent = function* (lines: Line[]) {
  if (lines.length === 0) {
    return [];
  }

  let lineIndex = 0;
  let linePosition = 0;
  let cmdTimer = null;
  let frameIndex = 0;
  let frameTimer = null;
  let frameRepeatCounter = 0;

  // The current contents of the terminal
  const buffer = [];

  while (true) {
    if (lineIndex < lines.length) {
      // next line is an output line
      if (!lines[lineIndex].cmd) {
        const frames = lines[lineIndex].frames;

        // a static line, add it to buffer and move to next line
        if (!frames) {
          buffer.push({
            id: lineIndex,
            text: lines[lineIndex].text,
            cmd: false,
            current: false,
          });

          yield buffer;
          linePosition = 0;
          lineIndex++;
        } else if (frameIndex < frames.length) {
          // this is the first frame
          if (frameIndex === 0) {
            // push the line's frame onto buffer only if this is the first time
            // rendering this line
            if (!frameTimer && frameRepeatCounter === 0) {
              buffer.push({
                id: lineIndex,
                text: frames[0].text,
                cmd: false,
                current: true,
              });
            }
          }

          // show the current frame's text
          buffer[lineIndex].text = frames[frameIndex].text;

          // start a timer to render the next frame only after the delay
          if (frameTimer == null) {
            if (!isNaN(frames[frameIndex].delay)) {
              frameTimer = setTimeout(() => {
                clearTimeout(frameTimer);
                frameTimer = null;
                frameIndex++;
              }, frames[frameIndex].delay);
              // yield here to avoid condition where frameIndex goes out of bounds
              // from the timeout
              yield buffer;
            } else {
              frameIndex++;
            }
          }
        } else {
          const { repeat, repeatCount } = lines[lineIndex];

          // if current line should be repeated, reset frame counter and index
          if (repeat && frameRepeatCounter <= repeatCount) {
            frameRepeatCounter++;
            frameIndex = 0;
          } else {
            // if final frame specified, use it as the text
            if (lines[lineIndex].text) {
              buffer[lineIndex].text = lines[lineIndex].text;
            }

            // move to next line
            buffer[lineIndex].current = false;
            linePosition = 0;
            frameIndex = 0;
            frameRepeatCounter = 0; // fix multiple repeats
            lineIndex++;
          }
        }
      } else if (linePosition > lines[lineIndex].text.length) {
        // move to next line
        // if the line is the last line, current set to true to render cursor
        buffer[lineIndex].current = lineIndex === lines.length - 1;
        linePosition = 0;
        lineIndex++;
      } else {
        if (linePosition === 0 && !cmdTimer) {
          buffer.push({
            id: lineIndex,
            text: '',
            cmd: lines[lineIndex].cmd,
            current: true,
          });
        }

        // set text for the line as all the text before or at the position
        buffer[lineIndex].text = lines[lineIndex].text.substring(
          0,
          linePosition
        );

        // only move to next line position if no delay specified
        // or timer for current position has expired
        if (cmdTimer == null) {
          const delay = lines[lineIndex].delay;
          if (!isNaN(delay)) {
            cmdTimer = setTimeout(() => {
              clearTimeout(cmdTimer);
              cmdTimer = null;
              linePosition++;
            }, delay);
          } else {
            linePosition++;
          }
        }
      }
      yield buffer;
    } else {
      // no more lines to process
      // signal finsihed to allow renderer to stop querying for new terminal content
      return buffer;
    }
  }
};

export default terminalContent;
