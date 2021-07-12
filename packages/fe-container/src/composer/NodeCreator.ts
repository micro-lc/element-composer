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
import {ReplaySubject, Subject} from 'rxjs'

const rowStyle = 'display: flex; flex-direction: column'
const columnStyle = 'display: flex; flex-direction: row'

type CreateFunction = (configuration: Configuration) => HTMLDivElement
type CreateInitialFunction = (initialStyle: string) => CreateFunction

const registeredBus: Record<string, Subject<any>> = {}

const createDiv: CreateInitialFunction = (initialStyle: string) => (configuration: Configuration) => {
  const divElement = document.createElement('div')
  divElement.setAttribute('style', `${initialStyle}; ${configuration.style || ''}`)
  return divElement
}

const createRow: CreateFunction = createDiv(rowStyle)

const createColumn: CreateFunction = createDiv(columnStyle)

const importScript = (configuration: Configuration) => {
  const scriptElement = document.createElement('script')
  scriptElement.setAttribute('src', configuration.url || '')
  scriptElement.setAttribute('type', 'module')
  document.head.appendChild(scriptElement)
}

const enrichElementProps = (element: HTMLElement) => ([key, value]: any[]) => {
  // @ts-ignore
  element[key] = value
}

const retrieveEventBus = (configuration: Configuration): Subject<any> | undefined => {
  let eventBus
  if (configuration.busDiscriminator) {
    eventBus = registeredBus[configuration.busDiscriminator] || new ReplaySubject<any>()
    registeredBus[configuration.busDiscriminator] = eventBus
  }
  return eventBus
}

const createEnrichedElement = (configuration: Configuration, defaultEventBus: Subject<any>) => {
  // @ts-ignore
  const element = document.createElement(configuration.tag)
  const eventBus = retrieveEventBus(configuration) || defaultEventBus
  const additionalProps = {eventBus, style: configuration.style || ''}
  Object.entries({...configuration.config || {}, ...additionalProps}).forEach(enrichElementProps(element))
  return element
}

const createElement = (configuration: Configuration, eventBus: Subject<any>) => {
  importScript(configuration)
  return createEnrichedElement(configuration, eventBus)
}

const strategies = {
  row: createRow,
  column: createColumn,
  element: createElement
}

const createNode = (configuration: Configuration, eventBus: Subject<any>) => {
  const strategy = strategies[configuration.type]
  return strategy(configuration, eventBus)
}

export default createNode
