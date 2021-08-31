import React, {useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import {LoadingAnimation} from '@mia-platform/microlc-ui-components'

import viewEngine from '../composer/ViewEngine'
import useConfiguration from '../hooks/useConfiguration'

const requiredStringShape = PropTypes.shape({
  type: PropTypes.string.isRequired
})

const currentUserShape = PropTypes.shape({
  properties: PropTypes.shape({
    avatar: requiredStringShape.isRequired,
    email: requiredStringShape.isRequired,
    groups: PropTypes.shape({
      items: requiredStringShape.isRequired,
      type: PropTypes.string.isRequired
    }).isRequired,
    name: requiredStringShape.isRequired,
    nickname: requiredStringShape.isRequired
  }).isRequired,
  required: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  type: PropTypes.string.isRequired
}).isRequired

const propTypes = {
  configurationName: PropTypes.string.isRequired,
  currentUser: currentUserShape
}

type ComposerProps = PropTypes.InferProps<typeof propTypes>

const Composer: React.FC<ComposerProps> = ({configurationName, currentUser}) => {
  const configuration = useConfiguration(configurationName)
  const rootComponent = useRef<any>()

  useEffect(() => {
    if (configuration) {
      viewEngine([configuration], currentUser, rootComponent.current.parentElement)
    }
  }, [configuration, currentUser])

  return (
    configuration ? <div data-testid={'sibling-div'} ref={rootComponent}/> : <LoadingAnimation/>
  )
}

Composer.propTypes = propTypes

export default Composer
