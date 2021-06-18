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
import './public-path'
import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter} from 'react-router-dom'
import {IntlProvider} from 'react-intl'

import App from './App'
import messages from './strings'

const navigatorLanguage = navigator.language.substring(0, 2)
const language = messages[navigatorLanguage] ? navigatorLanguage : 'en'

const rootComponent = () => (
  <IntlProvider locale={language} messages={messages[language]}>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <App />
    </BrowserRouter>
  </IntlProvider>
)

function retrieveContainer (props: any) {
  const {container} = props
  return container ? container.querySelector('#root') : document.querySelector('#microlc-element-composer')
}

function render (props: any) {
  ReactDOM.render(rootComponent(), retrieveContainer(props))
}

export async function mount (props: any) {
  render(props)
}

export async function unmount (props: any) {
  ReactDOM.unmountComponentAtNode(retrieveContainer(props))
}

export async function bootstrap () {

}

// @ts-ignore
if (!window.__POWERED_BY_QIANKUN__) {
  render({})
}
