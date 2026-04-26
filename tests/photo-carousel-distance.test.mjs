// Pure-logic test for the circular distance calculation used by
// components/telehash/PhotoCarousel.tsx to decide which slides to render.
// The component renders only slides where distance <= 1 (current + adjacent),
// using wrap-around so the last and first photos are considered neighbors.
import { test } from 'node:test'
import assert from 'node:assert/strict'

/**
 * Mirror of the inline expression in PhotoCarousel.tsx:
 *   const distance = Math.min(
 *     Math.abs(i - index),
 *     photos.length - Math.abs(i - index),
 *   )
 */
function circularDistance(i, index, length) {
  const direct = Math.abs(i - index)
  return Math.min(direct, length - direct)
}

function shouldRender(i, index, length) {
  return circularDistance(i, index, length) <= 1
}

test('renders only the single photo when length is 1', () => {
  assert.equal(shouldRender(0, 0, 1), true)
})

test('renders both photos when length is 2 (every photo is adjacent)', () => {
  assert.equal(shouldRender(0, 0, 2), true)
  assert.equal(shouldRender(1, 0, 2), true)
})

test('renders current and both wrap-around neighbors with length 3', () => {
  // index=0 → render 0, 1, and 2 (because 2 wraps around to be adjacent to 0)
  assert.equal(shouldRender(0, 0, 3), true)
  assert.equal(shouldRender(1, 0, 3), true)
  assert.equal(shouldRender(2, 0, 3), true)
})

test('with 5 photos at index 0, renders 0/1/4 and skips 2/3', () => {
  assert.equal(shouldRender(0, 0, 5), true, 'current')
  assert.equal(shouldRender(1, 0, 5), true, 'next')
  assert.equal(shouldRender(2, 0, 5), false, 'skip')
  assert.equal(shouldRender(3, 0, 5), false, 'skip')
  assert.equal(shouldRender(4, 0, 5), true, 'wrap-around prev')
})

test('with 5 photos at middle index, renders index-1/index/index+1', () => {
  assert.equal(shouldRender(0, 2, 5), false)
  assert.equal(shouldRender(1, 2, 5), true)
  assert.equal(shouldRender(2, 2, 5), true)
  assert.equal(shouldRender(3, 2, 5), true)
  assert.equal(shouldRender(4, 2, 5), false)
})

test('with 5 photos at last index, wraps to first', () => {
  assert.equal(shouldRender(0, 4, 5), true, 'wrap-around next')
  assert.equal(shouldRender(1, 4, 5), false)
  assert.equal(shouldRender(2, 4, 5), false)
  assert.equal(shouldRender(3, 4, 5), true, 'prev')
  assert.equal(shouldRender(4, 4, 5), true, 'current')
})

test('large gallery: at index 10 of 20 photos, renders 9/10/11 only', () => {
  const length = 20
  const index = 10
  for (let i = 0; i < length; i++) {
    const expected = i === 9 || i === 10 || i === 11
    assert.equal(
      shouldRender(i, index, length),
      expected,
      `i=${i} expected ${expected}`,
    )
  }
})

test('counts always render exactly 3 (or fewer for tiny galleries)', () => {
  for (let length = 1; length <= 20; length++) {
    for (let index = 0; index < length; index++) {
      const renderedCount = Array.from({ length }, (_, i) =>
        shouldRender(i, index, length),
      ).filter(Boolean).length
      const expected = Math.min(3, length)
      assert.equal(
        renderedCount,
        expected,
        `length=${length} index=${index} rendered ${renderedCount}, expected ${expected}`,
      )
    }
  }
})
