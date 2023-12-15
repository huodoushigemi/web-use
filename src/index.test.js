import { test, it, expect } from 'vitest'
import { getScrollParent, h } from './index'

it('h', () => {
  expect(h('div', { className: 'xx' }))
  .toMatchObject({ tagName: 'DIV', className: 'xx' })

  expect(h('div', { className: 'xx' }, [h('span')]).children[0])
  .toMatchObject({ tagName: 'SPAN' })
})

it('getScrollParent', () => {
  let span

  h('div', { id: 'xy', style: 'overflow-x: auto; overflow-y: auto' }, [
    h('div', [
      h('div', { id: 'xxx', style: 'overflow-x: auto; overflow-y: hidden' }, [
        h('div', [
          h('div', { id: 'yyy', style: 'overflow-x: hidden; overflow-y: auto' }, [
            span = h('span', { innerText: 'span' })
          ])
        ])
      ])
    ])
  ])
  
  expect(getScrollParent(span, 'x'))
  .toMatchObject({ id: 'xxx' })

  expect(getScrollParent(span, 'y'))
  .toMatchObject({ id: 'yyy' })

  expect(getScrollParent(span, 'xy'))
  .toMatchObject({ id: 'xy' })

  expect(getScrollParent(span))
  .toMatchObject({ id: 'xy' })

  h('div', [span])

  expect(getScrollParent(span))
  .toBeUndefined()
})