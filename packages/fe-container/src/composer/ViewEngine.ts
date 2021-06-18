import {Configuration} from '@mia-platform/core'

import createNode from './NodeCreator'

const configurations: Configuration = {
  type: 'row',
  content: [{
    type: 'column',
    content: [{
      type: 'element',
      tag: 'button',
      url: 'https://...',
      config: {
        'attribute-name': 'attribute-value'
      }
    }]
  }]
}

const viewEngine = (configurations: Configuration[], root: HTMLElement = document.createElement('div')) => {
  configurations.forEach(configuration => {
    const createdNode = createNode(configuration)
    viewEngine(configuration.content || [], createdNode)
    root.appendChild(createdNode)
  })
  return root
}

export default viewEngine
