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
import React, {useEffect, useRef} from 'react'
import {IntlProvider} from 'react-intl'
import {BrowserRouter} from 'react-router-dom'
import {Configuration} from '@mia-platform/core'
import PropTypes from 'prop-types'

import viewEngine from './composer/ViewEngine'
import messages from './strings'

const navigatorLanguage = navigator.language.substring(0, 2)
const language = messages[navigatorLanguage] ? navigatorLanguage : 'en'

type RootComponentProps = {configuration: Configuration, windowProxy?: Window}

const RootComponent: React.FC<RootComponentProps> = ({configuration, windowProxy = window}) => {
  const rootComponent = useRef<any>()

  useEffect(() => {
    if (configuration?.type) {
      const components = viewEngine([configuration], windowProxy)
      rootComponent.current.parentElement.appendChild(components)
    }
  }, [configuration, windowProxy])

  return (
    <IntlProvider locale={language} messages={messages[language]}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <div ref={rootComponent}/>
      </BrowserRouter>
    </IntlProvider>
  )
}

RootComponent.propTypes = {
  configuration: PropTypes.any,
  windowProxy: PropTypes.any
}

export default RootComponent
