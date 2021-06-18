import {Configuration} from '@mia-platform/core'

const rowStyle = 'display: "flex"; flex-direction: "column"'
const columnStyle = 'display: "flex"; flex-direction: "row"'

type CreateFunction = (configuration: Configuration) => HTMLDivElement

const createRow: CreateFunction = (configuration: Configuration) => {
  const row = document.createElement('div')
  // @ts-ignore
  row.setAttribute('style', rowStyle)
  return row
}

const createColumn: CreateFunction = (configuration: Configuration) => {
  const column = document.createElement('div')
  // @ts-ignore
  column.setAttribute('style', columnStyle)
  return column
}

const importScript = (configuration: Configuration) => {
  const scriptElement = document.createElement('script')
  scriptElement.setAttribute('src', configuration.url || '')
  document.appendChild(scriptElement)
}

const enrichElementProps = (element: HTMLElement) => ([key, value]: string[]) => {
  element.setAttribute(key, value)
}

const createEnrichedElement = (configuration: Configuration) => {
  // @ts-ignore
  const element = document.createElement(configuration.tag)
  const enricher: any = enrichElementProps(element)
  Object.entries(configuration.config || {}).forEach(enricher)
  return element
}

const createElement = (configuration: Configuration) => {
  importScript(configuration)
  return createEnrichedElement(configuration)
}

const strategies = {
  row: createRow,
  column: createColumn,
  element: createElement
}

const createNode = (configuration: Configuration) => {
  const strategy = strategies[configuration.type]
  return strategy(configuration)
}

export default createNode
