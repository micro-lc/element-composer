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
import {Configuration} from '@mia-platform/core'
import {Subject, ReplaySubject} from 'rxjs'

import createNode from './NodeCreator'

const viewEngine = (configurations: Configuration[],
  windowProxy: Window,
  eventBus: Subject<any> = new ReplaySubject<any>(),
  root: HTMLElement = document.createElement('div')): HTMLElement => {
  configurations.forEach(configuration => {
    const createdNode = createNode(configuration, eventBus, windowProxy)
    viewEngine(configuration.content || [], windowProxy, eventBus, createdNode)
    root.appendChild(createdNode)
  })
  return root
}

export default viewEngine
