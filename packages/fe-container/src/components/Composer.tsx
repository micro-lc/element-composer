import React, {useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import {LoadingAnimation} from '@mia-platform/microlc-ui-components'

import viewEngine from '../composer/ViewEngine'
import useConfiguration from '../hooks/useConfiguration'

const propTypes = {
  configurationName: PropTypes.string.isRequired,
  currentUser: PropTypes.object
}

type ComposerProps = PropTypes.InferProps<typeof propTypes> & {
  currentUser?: object
}

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
