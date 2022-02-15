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
import termContent from './contentHandler';
import { Line } from './Renderer';

test('correctly handles empty content', () => {
  const lines = [];
  const content = termContent(lines);
  const { value, done } = content.next();
  expect(value).toEqual([]);
  expect(done).toBe(true);
});

test('correctly handles static cmd line', () => {
  const lines = [
    {
      text: 'ls',
      cmd: true,
    },
  ];
  const content = termContent(lines);
  let next = content.next();
  expect(next.value).toMatchSnapshot();
  expect(next.done).toBe(false);

  next = content.next();
  expect(next.value).toMatchSnapshot();
  expect(next.done).toBe(false);

  next = content.next();
  expect(next.value).toMatchSnapshot();
  expect(next.done).toBe(false);

  next = content.next();
  expect(next.value).toMatchSnapshot();
  expect(next.done).toBe(false);

  next = content.next();
  expect(next.value).toMatchSnapshot();
  expect(next.done).toBe(true);
});

test('correctly handles static output line', () => {
  const lines = [
    {
      text: 'foo',
      cmd: false,
    },
  ];
  const content = termContent(lines);
  let next = content.next();
  expect(next.value).toMatchSnapshot();
  expect(next.done).toBe(false);

  next = content.next();
  expect(next.value).toMatchSnapshot();
  expect(next.done).toBe(false);

  next = content.next();
  expect(next.value).toMatchSnapshot();
  expect(next.done).toBe(true);
});

test('correctly handles framed output', () => {
  const lines: Line[] = [
    {
      cmd: false,
      frames: [
        {
          text: '[------------------------------------------------] 0/100',
        },
        {
          text: '[################################################] 100/100',
        },
      ],
    },
  ];

  const content = termContent(lines);
  let next = content.next();
  expect(next.value).toMatchSnapshot();
  expect(next.done).toBe(false);

  next = content.next();
  expect(next.value).toMatchSnapshot();
  expect(next.done).toBe(false);

  next = content.next();
  expect(next.value).toMatchSnapshot();
  expect(next.done).toBe(false);

  next = content.next();
  expect(next.value).toMatchSnapshot();
  expect(next.done).toBe(true);
});
