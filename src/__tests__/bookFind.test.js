import React from 'react'
import BookFind from '../components/bookFind.js'

describe('bookSearch', () => {
  it('renders without crashing', () => {
    const component = mount(<BookFind />)
    expect(component).toMatchSnapshot()
  })

  it('has input textbox for ISBN', () => {
    const component = mount(<BookFind />)
    expect(component.exists('input#ISBNSearch')).toBe(true)
  })

  it('has submit button', () => {
    const component = mount(<BookFind />)
    expect(component.exists('button#search')).toBe(true)
  })

  it('should update state title when text entered', () => {
    const component = mount(<BookFind />)
    component.find('input#ISBNSearch').simulate('change', {
      target: { value: 'test_isbn' }
    })
    expect(component.state('isbn')).toEqual('test_isbn')
  })

  it('Clear message box on submit', () => {
    const component = mount(<BookFind submitISBN={ function (item) { return true } }/>)
    component.find('input#ISBNSearch').simulate('change', {
      target: { value: 'test_title' }
    })
    expect(component.state('isbn')).toEqual('test_title')
    component.find('form').simulate('submit')

    expect(component.find('input#ISBNSearch').props().value).toEqual('')
    expect(component.state('isbn')).toEqual('')
  })
})
