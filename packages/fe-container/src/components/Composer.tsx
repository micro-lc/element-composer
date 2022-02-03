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

const createDocumentFragment = (rootComponent: React.MutableRefObject<any>) => {
  const documentFragment = new DocumentFragment()
  const oldInsertBefore = documentFragment.insertBefore
  // @ts-ignore
  documentFragment.insertBefore = function (name, constructor, options) {
    const oldInsertBeforeResult = Reflect.apply(oldInsertBefore, documentFragment, arguments)
    rootComponent.current.parentElement.appendChild(documentFragment)
    return oldInsertBeforeResult
  }
  return documentFragment
}

const Composer: React.FC<ComposerProps> = ({configurationName, currentUser, headers}) => {
  const configuration = useConfiguration(configurationName)
  const rootComponent = useRef<any>()

  useEffect(() => {
    if (configuration) {
      const documentFragment = createDocumentFragment(rootComponent)
      // @ts-ignore
      viewEngine([configuration], currentUser, headers, rootComponent.current.parentElement, documentFragment)
    }
  }, [configuration, currentUser, headers])

  return (
    configuration ? <div data-testid={'sibling-div'} ref={rootComponent}/> : <LoadingAnimation/>
  )
}

Composer.propTypes = propTypes

export default Composer
