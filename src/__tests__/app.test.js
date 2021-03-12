import React from 'react'
import BookMeUp from '../App'
import mockAxios from '../__mocks__/axios.js'
import errorMock from '../__mocks__/error.json'

describe('BookMeUp', () => {
  beforeEach(() => {
    mockAxios.post.mockImplementation(() =>
      Promise.resolve({ data: [] }))

    mockAxios.get.mockImplementation(() =>
      Promise.resolve({ data: [] }))
  })

  afterEach(() => {
    mockAxios.post.mockClear()
    mockAxios.get.mockClear()
  })

  it('Loads data from api', () => {
    mount(<BookMeUp />)
    expect(mockAxios.get).toHaveBeenCalledTimes(1)
  })

  it('Calls external api to get book details using isbn', () => {
    const component = mount(<BookMeUp />)
    component.find('input#ISBNSearch').simulate('change', { target: { value: 'test_ISBN' } })
    component.find('form#book_search').simulate('submit')
    expect(mockAxios.get).toHaveBeenCalledTimes(2)
    expect(mockAxios.get.mock.calls[1][0]).toBe('https://openlibrary.org/api/books?bibkeys=ISBN:test_ISBN&format=json&jscmd=data')
  })

  it('Renders the title of the book from openlibrary in the BookForm Title field', async () => {
    const component = mount(<BookMeUp />)

    mockAxios.get.mockImplementation(() =>
      Promise.resolve({ data: { 'ISBN:test_ISBN': { title: 'test_title', authors: [{ name: 'test_author' }] } } }))

    component.find('input#ISBNSearch').simulate('change', { target: { value: 'test_ISBN' } })
    component.find('form#book_search').simulate('submit')

    await component.find('BookSearch')
    await component.update()
    await component.find('BookForm').update()

    await component.find('p#book-title-confirmation').update()
    expect(component.find('p#book-title-confirmation').text()).toBe('Title: test_title')

    await component.find('p#book-author-confirmation').update()
    expect(component.find('p#book-author-confirmation').text()).toBe('Author: test_author')
  })

  it('renders without crashing', () => {
    const component = mount(<BookMeUp />)
    expect(component).toMatchSnapshot()
  })

  it('Changes the current user when user signs in', async () => {
    const component = mount(<BookMeUp />)
    const instance = component.instance()

    mockAxios.post.mockImplementation(() =>
      Promise.resolve({ data: { displayName: 'User', id: 'testid', success: 'Logged in as User.' } })
    )

    await instance.userAPI('User', 'password')

    expect(component.state('currentUser').displayName).toBe('User')
  })

  it('Changes the current user when user signs up', async () => {
    const component = mount(<BookMeUp />)
    const instance = component.instance()

    mockAxios.post.mockImplementation(() =>
      Promise.resolve({ status: 200, data: { displayName: 'User', id: 'testid', success: 'Logged in as User.' } })
    )

    await instance.userAPI('User', 'user@bookmeup.com', 'SW1A 1AA', 'password', 'password')

    expect(component.state('currentUser').displayName).toBe('User')
  })

  it('Changes the current user when user logout', async () => {
    const component = mount(<BookMeUp />)
    const instance = component.instance()

    mockAxios.post.mockImplementation(() =>
      Promise.resolve({ data: { success: true } })
    )

    await instance.userAPI('User', 'password')
    await instance.logout()

    expect(component.state('currentUser').displayName).toBe('')
  })

  it('submit book posts data', async () => {
    const component = mount(<BookMeUp />)
    const instance = component.instance()

    mockAxios.post.mockImplementation(() =>
      Promise.resolve({ data: { displayName: 'User', id: 'testid', success: 'Logged in as User.', email: 'test@example', location: 'test_postcode' } })
    )

    await instance.userAPI('User', 'password')

    expect(component.state('currentUser').displayName).toBe('User')

    mockAxios.get.mockImplementation(() =>
      Promise.resolve({ data: { 'ISBN:test_ISBN': { title: 'test_title', authors: [{ name: 'test_author' }], identifiers: { isbn_13: 'test_isbn' }, cover: { medium: 'test_url' } } } }))

    component.find('input#ISBNSearch').simulate('change', { target: { value: 'test_ISBN' } })
    component.find('form#book_search').simulate('submit')

    await component.find('BookSearch')
    await component.update()
    await component.find('div#book-confirmation').update()
    //
    mockAxios.get.mockImplementation(() =>
      Promise.resolve({ data: [{ _id: 'book_id', book: { title: 'test_title', authors: [{ name: 'test_author' }], identifiers: { isbn_13: 'test_isbn' }, cover: { medium: 'test_url' } }, user: { displayName: 'User', email: 'test@example', location: 'test_postcode' } }] }))
    //
    component.find('form#book_form').simulate('submit')
    //
    const book = JSON.stringify({ title: 'test_title', authors: [{ name: 'test_author' }], identifiers: { isbn_13: 'test_isbn' }, cover: { medium: 'test_url' } })
    const user = { displayName: 'User', id: 'testid', success: 'Logged in as User.', email: 'test@example', location: 'test_postcode' }
    const data = { book: book, user: user }

    expect(mockAxios.post).toHaveBeenCalledWith('http://localhost:3001/add-book', data)
  })
})

describe('BookMeUp erroring', () => {
  beforeEach(function () {
    mockAxios.post.mockImplementation(() =>
      Promise.reject(errorMock))

    mockAxios.get.mockImplementation(() =>
      Promise.reject(errorMock))
  })

  afterEach(function () {
    mockAxios.post.mockClear()
    mockAxios.get.mockClear()
  })

  it('loads err on GET err', async () => {
    const component = await mount(<BookMeUp />)

    await component.update()
    expect(mockAxios.get).toHaveBeenCalledTimes(1)
    expect(component.state().error).toEqual({ response: { data: 'error text from json mock' } })
    expect(component.find('#error').text()).toBe('Error: error text from json mock')
  })
})

xdescribe('user routes', () => {
  beforeEach(() => {
    mockAxios.post.mockImplementation(() =>
      Promise.resolve({ data: [] }))

    mockAxios.get.mockImplementation(() =>
      Promise.resolve({ data: [] }))
  })

  afterEach(() => {
    mockAxios.post.mockClear()
    mockAxios.get.mockClear()
  })

  it('successfully sends api request', () => {
    const component = mount(<BookMeUp />)

    mockAxios.post.mockImplementation(() =>
      Promise.resolve({ success: true }))

    expect(component.find())
  })

  it('redirects to homepage following successful signup', async () => {
    const component = mount(<BookMeUp />)

    mockAxios.post.mockImplementation(() =>
      Promise.resolve({ success: true }))

    expect(component.find('Link#new_user').exists()).toBe(true)
    component.find('Link#new_user').simulate('click')

    await component.find('UserSignup').update()
    expect(component.find('UserSignup').exists()).toBe(true)

    component.find('input#new_username').simulate('change', { target: { value: 'username3' } })
    component.find('input#new_email').simulate('change', { target: { value: 'email@email' } })
    component.find('input#new_location').simulate('change', { target: { value: 'location' } })
    component.find('input#new_password').simulate('change', { target: { value: 'password' } })
    component.find('input#new_passwordCheck').simulate('change', { target: { value: 'password' } })
    component.find('form#new_user_form').simulate('submit')

    expect(mockAxios.post).toHaveBeenCalledWith('http://localhost:3001/user-new',
      {
        username: 'username3',
        email: 'email@email',
        password: 'password',
        passwordCheck: 'password',
        location: 'location'
      })

    await component.update()
    expect(component.find('BookForm').exists()).toBe(true)
  })

  it('requests a book', async () => {
    const component = mount(<BookMeUp />)
    const instance = component.instance()

    mockAxios.post.mockImplementation(() =>
      Promise.resolve({ data: { displayName: 'User', id: 'testid', success: 'Logged in as User.', email: 'test@example', location: 'test_postcode' } })
    )

    await instance.signinUser('User', 'password')

    expect(component.state('currentUser').displayName).toBe('User')

    mockAxios.post.mockImplementation(() =>
      Promise.resolve({ success: true }))

    conponent.find('div#books_list').find('button').simulate('click')

    await component.find('button#book-request-button').update()

    component.find('button#book-request-button').simulate('click')

    expect(mockAxios.post).toHaveBeenCalledWith('http://localhost:3001/request-book',
      {
        bookID: 'test_BookID',
        user: { displayName: 'User', id: 'testid', success: 'Logged in as User.', email: 'test@example', location: 'test_postcode' }
      })
  })
})
