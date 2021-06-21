/*
 * Copyright 2021 Mia srl
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import viewEngine from '../ViewEngine'

describe('ViewEngine tests', () => {
  it('create correctly a row', () => {
    const type: 'row' = 'row'
    const rowConfig = {type}
    const viewBuilt = viewEngine([rowConfig])
    expect(viewBuilt.outerHTML).toBe('<div>' +
      '<div style="display: &quot;flex&quot;; flex-direction: &quot;column&quot;">' +
      '</div>' +
      '</div>')
  })

  it('create correctly a column', () => {
    const type: 'column' = 'column'
    const rowConfig = {type}
    const viewBuilt = viewEngine([rowConfig])
    expect(viewBuilt.outerHTML).toBe('<div>' +
      '<div style="display: &quot;flex&quot;; flex-direction: &quot;row&quot;">' +
      '</div>' +
      '</div>')
  })

  it('create correctly a column inside a row', () => {
    const column: 'column' = 'column'
    const row: 'row' = 'row'
    const rowConfig = {type: row, content: [{type: column}]}
    const viewBuilt = viewEngine([rowConfig])
    expect(viewBuilt.outerHTML).toBe('<div>' +
      '<div style="display: &quot;flex&quot;; flex-direction: &quot;column&quot;">' +
      '<div style="display: &quot;flex&quot;; flex-direction: &quot;row&quot;">' +
      '</div>' +
      '</div>' +
      '</div>')
  })

  it('create correctly an element inside a column inside a row', () => {
    const column: 'column' = 'column'
    const row: 'row' = 'row'
    const element: 'element' = 'element'
    const rowConfig = {
      type: row,
      content: [{
        type: column,
        content: [{
          type: element,
          tag: 'button',
          url: 'https://google.it',
          config: {'attribute-a': 'value-a'}
        }]
      }]
    }
    document.appendChild = jest.fn()
    const viewBuilt = viewEngine([rowConfig], {})
    expect(viewBuilt.outerHTML).toBe('<div>' +
      '<div style="display: &quot;flex&quot;; flex-direction: &quot;column&quot;">' +
      '<div style="display: &quot;flex&quot;; flex-direction: &quot;row&quot;">' +
      '<button attribute-a="value-a" event-bus="[object Object]"></button>' +
      '</div>' +
      '</div>' +
      '</div>')
    expect(document.appendChild).toHaveBeenCalledTimes(1)
  })
})
