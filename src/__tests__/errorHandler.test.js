import React from 'react'
import ErrorHandler from '../components/errorHandler'
import errorMock from '../__mocks__/error.json'

describe('Error', () => {
  it('renders without crashing', () => {
    const component = mount(<ErrorHandler/>)
    expect(component).toMatchSnapshot()
  })

  it('empty without error', () => {
    const component = shallow(<ErrorHandler/>)
    expect(component.find('#error').text()).toBe('')
  })

  it('displays with error', async () => {
    const component = mount(<ErrorHandler error={errorMock}/>)
    await component.update()
    expect(component.find('#error').text()).toBe('Error: This isn`t working again! {this.props.error.response.data}')
  })
})
