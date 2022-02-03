import React from 'react'
import {render, waitFor} from '@testing-library/react'
import fetchMock from 'fetch-mock'

import Composer from './Composer'

const DOCUMENT_FRAGMENT_TYPE = 11 // https://developer.mozilla.org/en-US/docs/Web/API/Node/nodeType

describe('Composer tests', () => {
  afterEach(() => {
    fetchMock.resetBehavior()
  })

  it('correctly show loading', () => {
    const composer = render(<Composer configurationName={'test'}/>)
    expect(composer.findByTestId('svgContainer')).toBeTruthy()
  })

  it('correctly show configuration', async () => {
    fetchMock.getOnce('/api/v1/microlc/configuration/test', {
      type: 'row'
    })
    const composer = render(<Composer configurationName={'test'}/>)
    await waitFor(() => expect(composer.findByTestId('sibling-div')).toBeTruthy())
  })

  it('correctly apply document fragment', async () => {
    const webComponentTag = 'my-web-component'
    fetchMock.getOnce('/api/v1/microlc/configuration/test', {
      type: 'element',
      tag: webComponentTag
    })

    const composer = render(<Composer configurationName={'test'}/>)

    await waitFor(() => expect(composer.container.querySelector(webComponentTag)).toBeTruthy())

    const rootNode = composer.container.querySelector(webComponentTag)?.getRootNode()
    expect(rootNode).not.toBe(document)
    expect(rootNode?.nodeType).toBe(DOCUMENT_FRAGMENT_TYPE)
  })
})
