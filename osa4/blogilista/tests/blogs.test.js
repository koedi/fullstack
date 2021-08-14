const { test, expect } = require('@jest/globals')
const list_helper = require('../utils/list_helper')


test('babbys first', () => {
  const result = list_helper.dummy({})
  expect(result).toBe(1)
})