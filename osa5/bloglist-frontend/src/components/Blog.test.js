import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const { test, expect, describe, beforeEach } = require('@jest/globals')

const mockHandler = jest.fn()

let user
let blog
let component


beforeEach(() => {
  user = {
    username: 'puavo',
    name: 'Paavo Väyrynen',
    id: 666
  }

  blog = {
    title: 'Kepu haisee',
    author: 'Väykkä',
    url: 'http://kepu.org',
    likes: 0
  }

  component = render(
    <Blog blog={blog} user={user} addLike={mockHandler}>
      <div className='testDiv' />
    </Blog>
  )
})



test('hello world', () => {
  const component = render(
    <Blog blog={blog} user={user} />
  )

  expect(component.container).toHaveTextContent(
    'Kepu haisee'
  )
})

describe('testing "show more" button functionality', () => {
  test('renders children', () => {
    expect(component.container.querySelector('.testDiv')).toBeDefined()
  })

  test('at start children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')

  })

  test('after clicking button, children are displayed', () => {
    const button = component.getByText('show more')
    fireEvent.click(button)
    const div = component.container.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

  describe('"like" button functionlity', () => {
    test('pushing like twice', () => {
      const likeButton = component.getByText('like')
      fireEvent.click(likeButton)
      fireEvent.click(likeButton)
      expect(mockHandler.mock.calls).toHaveLength(2)
    })
  })





})