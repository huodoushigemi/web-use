const toArr = <T>(a: Arrable<T>) => isArr(a) ? a : (a == null ? <T[]>[] : [a])

export const isArr = <T>(a: unknown): a is T[] => Array.isArray(a)
export const toStr = (o: unknown) => Object.prototype.toString.call(o)
export const isObj = (o: unknown): o is object => toStr(o) == '[object Object]'

export const isNode = (node: unknown): node is Node => node instanceof Node
export const isEl = (node: Node): node is Element => node.nodeType == Node.ELEMENT_NODE
export const isHEl = (node: Node): node is HTMLElement => node instanceof HTMLElement

export function getScrollParent(el: Element, dir: 'x' | 'y' | 'xy') {
  while(el = el.parentElement!) {
    const { overflowY, overflowX } = getComputedStyle(el)
    let x = false, y = false
    if ((y = overflowY === 'auto' || overflowY === 'scroll') && dir == 'y') return el
    else if ((x = overflowX === 'auto' || overflowX === 'scroll') && dir == 'x') return el
    else if (x && y) return el
  }
}

type HTML = HTMLElementTagNameMap
type Tags = keyof HTML
type Obj = Record<string, any>
type Arrable<T> = T | T[]

export function h<K extends Tags, P = Partial<HTML[K]> & Obj>(tag: K, props?: P | null, children?: Node[]): HTML[K] & P
// @ts-ignore
export function h<K extends Tags>(tag: K, children?: Node[]): HTML[K]

export function h<K extends Tags>(tag: K, arg1: unknown, arg2: unknown) {
  const el = document.createElement(tag)
  if (isArr<Node>(arg1)) {
    el.replaceChildren(...arg1)
  }
  else if (isObj(arg1)) {
    Object.assign(el, arg1)
  }
  if (isArr<Node>(arg2)) {
    el.replaceChildren(...arg2)
  }
  return el
}
