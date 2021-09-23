import React, {useEffect, useRef} from 'react'
import PropTypes from 'prop-types'
import {LoadingAnimation} from '@mia-platform/microlc-ui-components'

import viewEngine from '../composer/ViewEngine'
import useConfiguration from '../hooks/useConfiguration'

const currentUserShape = PropTypes.shape({
  avatar: PropTypes.string,
  email: PropTypes.string.isRequired,
  groups: PropTypes.arrayOf(PropTypes.string.isRequired),
  name: PropTypes.string.isRequired,
  nickname: PropTypes.string
})

const propTypes = {
  configurationName: PropTypes.string.isRequired,
  currentUser: currentUserShape,
  headers: PropTypes.object
}

type ComposerProps = PropTypes.InferProps<typeof propTypes>

const Composer: React.FC<ComposerProps> = ({configurationName, currentUser, headers}) => {
  const configuration = useConfiguration(configurationName)
  const rootComponent = useRef<any>()

  useEffect(() => {
    if (configuration) {
      // @ts-ignore
      viewEngine([configuration], currentUser, headers, rootComponent.current.parentElement)
    }
  }, [configuration, currentUser, headers])

  return (
    configuration ? <div data-testid={'sibling-div'} ref={rootComponent}/> : <LoadingAnimation/>
  )
}

Composer.propTypes = propTypes

export default Composer
