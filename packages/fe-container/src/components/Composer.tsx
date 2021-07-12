import React, {useEffect, useRef} from 'react'
import {ReplaySubject} from 'rxjs'
import PropTypes from 'prop-types'
import {LoadingAnimation} from '@mia-platform/microlc-ui-components'

import viewEngine from '../composer/ViewEngine'
import useConfiguration from '../hooks/useConfiguration'

const propTypes = {
  configurationName: PropTypes.string.isRequired
}

type ComposerProps = PropTypes.InferProps<typeof propTypes>

const Composer: React.FC<ComposerProps> = ({configurationName}) => {
  const configuration = useConfiguration(configurationName)
  const rootComponent = useRef<any>()

  useEffect(() => {
    if (configuration) {
      viewEngine([configuration], rootComponent.current.parentElement)
    }
  }, [configuration])

  return (
    configuration ? <div data-testid={'sibling-div'} ref={rootComponent}/> : <LoadingAnimation/>
  )
}

Composer.propTypes = propTypes

export default Composer
