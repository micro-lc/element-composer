import React from 'react'
import {render, waitFor} from '@testing-library/react'
import nock from 'nock'

import Composer from './Composer'

nock.disableNetConnect()

describe('Composer tests', () => {
  it('correctly show loading', () => {
    const composer = render(<Composer configurationName={'test'}/>)
    expect(composer.findByTestId('svgContainer')).toBeTruthy()
  })

  it('correctly show configuration', async () => {
    nock('http://localhost')
      .get('/api/v1/microlc/configuration/test')
      .reply(200, {
        type: 'row'
      })
    const composer = render(<Composer configurationName={'test'}/>)
    await waitFor(() => expect(composer.findByTestId('sibling-div')).toBeTruthy())
  })
})
