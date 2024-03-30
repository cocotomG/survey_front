export function getHtmlElementHeight(selector: string, includeMargin?: boolean): number {
  const el = document.querySelector(selector) as HTMLElement
  if (!el) {
    return 0
  }
  let height = el.offsetHeight
  if (includeMargin) {
    const margin = getHtmlElementMarginY(selector)
    height += margin
  }

  return height
}

export function getHtmlElementMarginY(selector: string) {
  const el = document.querySelector(selector) as HTMLElement
  if (!el) {
    return 0
  }
  const top = Number.parseInt(document.defaultView?.getComputedStyle(el).getPropertyValue('margin-top')
    .replace('px', '') as string)
  const bottom = Number.parseInt(document.defaultView?.getComputedStyle(el).getPropertyValue('margin-bottom')
    .replace('px', '') as string)

  return top + bottom
}

export function getHtmlElementMarginTop(selector: string) {
  const el = document.querySelector(selector) as HTMLElement
  if (!el) {
    return 0
  }
  return Number.parseInt(document.defaultView?.getComputedStyle(el).getPropertyValue('margin-top')
    .replace('px', '') as string)
}

export function getHtmleElementPaddingY(selector: string) {
  const el = document.querySelector(selector) as HTMLElement
  if (!el) {
    return 0
  }
  const top = Number.parseInt(document.defaultView?.getComputedStyle(el).getPropertyValue('padding-top')
    .replace('px', '') as string)
  const bottom = Number.parseInt(document.defaultView?.getComputedStyle(el).getPropertyValue('padding-bottom')
    .replace('px', '') as string)

  return top + bottom
}

export function getViewportHeight(el: HTMLElement) {
  const { clientHeight } = window.document.documentElement
  const { height: boxHeight, bottom: boxBottom } = getBoundingClientRect(el) as DOMRect
  const boxHiddenHeight = boxBottom - clientHeight
  if (boxHiddenHeight > 0) {
    return boxHeight - boxHiddenHeight
  } else {
    return boxHeight + (clientHeight - boxBottom)
  }
}

export function getBoundingClientRect(element: Element): DOMRect | number {
  if (!element || !element.getBoundingClientRect) {
    return 0
  }
  return element.getBoundingClientRect()
}
