export const applyProps = (element: HTMLElement, props: Record<string, any> = {}) => {
  Object.entries(props).forEach(([key, value]) => {
    // @ts-ignore
    element[key] = value
  })
}

export const applyAttributes = (element: HTMLElement, attributes: Record<string, any> = {}) => {
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value))
}
