/**
 * @license
 * MIT License
 *
 * Copyright (c) 2019 Alexis Munsayac
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 *
 * @author Alexis Munsayac <alexis.munsayac@gmail.com>
 * @copyright Alexis Munsayac 2019
 */
import {
  Matcher, Sequence, Feed, Alternation, Quantifier, CharSet,
} from '../../src';
import Multiplication from './multiplication';

const Add = new CharSet('+');
const Sub = new CharSet('-');

export default class Addition extends Matcher {
  // eslint-disable-next-line class-methods-use-this
  parse(feed) {
    // eslint-disable-next-line class-methods-use-this
    if (feed instanceof Feed) {
      const r = new Sequence([
        new Multiplication(),
        new Quantifier(
          new Sequence([
            new Alternation([Add, Sub]),
            new Addition(),
          ]),
          0,
        ),
      ]).parse(feed);
      const quantified = r[1];
      const sequence = quantified[0];
      if (sequence instanceof Array) {
        if (sequence[0] === '-') {
          return r[0] - sequence[1];
        }
        if (sequence[0] === '+') {
          return r[0] + sequence[1];
        }
      }
      return r[0];
    }
    return undefined;
  }
}