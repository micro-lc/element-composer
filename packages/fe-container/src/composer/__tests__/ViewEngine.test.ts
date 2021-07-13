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
      '<div style="display: flex; flex-direction: column; ">' +
      '</div>' +
      '</div>')
  })

  it('create correctly a column', () => {
    const type: 'column' = 'column'
    const rowConfig = {type}
    const viewBuilt = viewEngine([rowConfig])
    expect(viewBuilt.outerHTML).toBe('<div>' +
      '<div style="display: flex; flex-direction: row; ">' +
      '</div>' +
      '</div>')
  })

  it('create correctly a column inside a row', () => {
    const column: 'column' = 'column'
    const row: 'row' = 'row'
    const rowConfig = {type: row, content: [{type: column}]}
    const viewBuilt = viewEngine([rowConfig])
    expect(viewBuilt.outerHTML).toBe('<div>' +
      '<div style="display: flex; flex-direction: column; ">' +
      '<div style="display: flex; flex-direction: row; ">' +
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
    const viewBuilt = viewEngine([rowConfig])
    expect(viewBuilt.outerHTML).toBe('<div>' +
      '<div style="display: flex; flex-direction: column; ">' +
      '<div style="display: flex; flex-direction: row; ">' +
      '<button style=""></button>' +
      '</div>' +
      '</div>' +
      '</div>')
    const button = viewBuilt.getElementsByTagName('button')[0]
    expect(button.eventBus).not.toBeUndefined()
  })

  it('create correctly an element inside a styled column inside a row', () => {
    const column: 'column' = 'column'
    const row: 'row' = 'row'
    const element: 'element' = 'element'
    const rowConfig = {
      type: row,
      content: [{
        type: column,
        style: 'width: 89%',
        content: [{
          type: element,
          tag: 'button',
          url: 'https://google.it',
          config: {'attribute-a': 'value-a'}
        }]
      }]
    }
    const viewBuilt = viewEngine([rowConfig])
    expect(viewBuilt.outerHTML).toBe('<div>' +
      '<div style="display: flex; flex-direction: column; ">' +
      '<div style="display: flex; flex-direction: row; width: 89%">' +
      '<button style=""></button>' +
      '</div>' +
      '</div>' +
      '</div>')
    const button = viewBuilt.getElementsByTagName('button')[0]
    expect(button.eventBus).not.toBeUndefined()
  })

  it('2 elements have the same bus', () => {
    const column: 'column' = 'column'
    const row: 'row' = 'row'
    const element: 'element' = 'element'
    const rowConfig = {
      type: row,
      content: [{
        type: column,
        style: 'width: 89%',
        content: [{
          type: element,
          tag: 'button',
          url: 'https://google.it',
          config: {'attribute-a': 'value-a', id: 'button'}
        }, {
          type: element,
          tag: 'button',
          url: 'https://google.it',
          config: {'attribute-a': 'value-a', id: 'button1'}
        }]
      }]
    }
    const viewBuilt = viewEngine([rowConfig])
    const button = viewBuilt.getElementsByTagName('button')[0]
    const button1 = viewBuilt.getElementsByTagName('button')[1]
    expect(button.eventBus).toBe(button1.eventBus)
  })

  it('2 elements have different bus using a discriminator', () => {
    const column: 'column' = 'column'
    const row: 'row' = 'row'
    const element: 'element' = 'element'
    const rowConfig = {
      type: row,
      content: [{
        type: column,
        style: 'width: 89%',
        content: [{
          type: element,
          tag: 'button',
          url: 'https://google.it',
          config: {'attribute-a': 'value-a'}
        }, {
          type: element,
          tag: 'button',
          url: 'https://google.it',
          busDiscriminator: 'button-1',
          config: {'attribute-a': 'value-a'}
        }]
      }]
    }
    const viewBuilt = viewEngine([rowConfig])
    const button = viewBuilt.getElementsByTagName('button')[0]
    const button1 = viewBuilt.getElementsByTagName('button')[1]
    expect(button.eventBus).not.toBe(button1.eventBus)
  })

  it('2 elements have same bus using a discriminator, 1 has different bus without discriminator', () => {
    const column: 'column' = 'column'
    const row: 'row' = 'row'
    const element: 'element' = 'element'
    const rowConfig = {
      type: row,
      content: [{
        type: column,
        style: 'width: 89%',
        content: [{
          type: element,
          tag: 'button',
          url: 'https://google.it',
          busDiscriminator: 'button-1',
          config: {'attribute-a': 'value-a'}
        }, {
          type: element,
          tag: 'button',
          url: 'https://google.it',
          config: {'attribute-a': 'value-a'}
        }, {
          type: element,
          tag: 'button',
          url: 'https://google.it',
          busDiscriminator: 'button-1',
          config: {'attribute-a': 'value-a'}
        }]
      }]
    }
    const viewBuilt = viewEngine([rowConfig])
    const button = viewBuilt.getElementsByTagName('button')[0]
    const button1 = viewBuilt.getElementsByTagName('button')[1]
    const button2 = viewBuilt.getElementsByTagName('button')[2]
    expect(button.eventBus).not.toBe(button1.eventBus)
    expect(button2.eventBus).not.toBe(button1.eventBus)
    expect(button.eventBus).toBe(button2.eventBus)
  })
})
