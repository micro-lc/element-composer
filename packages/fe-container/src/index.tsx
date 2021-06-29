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
import ReactDOM from 'react-dom'

import viewEngine from './composer/ViewEngine'
import {ReplaySubject, Subscription} from 'rxjs'

const CONTAINER_ID = '#microlc-element-composer'

let subscription: Subscription

function retrieveContainer (props: any) {
  const {container} = props
  return container ? container.querySelector(CONTAINER_ID) : document.querySelector(CONTAINER_ID)
}

function render (props: any) {
  const container = retrieveContainer(props)
  const eventBus = new ReplaySubject<any>()
  if (mustLogEvents()) {
    subscription = eventBus.subscribe(eventLogger)
  }
  viewEngine([props.elementsConfiguration], container, eventBus)
}

export async function mount (props: any) {
  render(props)
}

export async function unmount (props: any) {
  if (mustLogEvents()) {
    subscription.unsubscribe()
  }
  ReactDOM.unmountComponentAtNode(retrieveContainer(props))
}

export async function bootstrap () {

}

function mustLogEvents () {
  return process.env.NODE_ENV !== 'production'
}

function eventLogger (event: any) {
  const loggedContent = {
    time: new Date(),
    content: event
  }
  // eslint-disable-next-line
  console.log(loggedContent)
}

// @ts-ignore
if (!window.__POWERED_BY_QIANKUN__) {
  render({})
}
