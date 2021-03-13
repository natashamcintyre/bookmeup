import React, { Component } from 'react'
import BookList from './components/bookList.js'
import ErrorHandler from './components/errorHandler.js'
import Navigation from './components/navigation.js'
import Header from './components/header.js'
import UserSignin from './components/userSignin'
import UserSignup from './components/userSignup'
import IsbnSearchModal from './components/isbnSearchModal.js'
import {
  Switch,
  Route,
  HashRouter,
  Redirect
} from 'react-router-dom'

import axios from 'axios'
// const PORT = 'https://book-me-up.herokuapp.com/https://git.heroku.com/bookmeup-api.git'
const PORT = 'http://localhost:3001'
const OPENLIBRARY = 'https://openlibrary.org'

class BookMeUp extends Component {
  constructor () {
    super()
    this.state = {
      books: [],
      book: { title: '', authors: [{ name: '' }] },
      currentUser: { displayName: '' }
    }
  }

  getBooks = () => {
    axios.get(`${PORT}/`)
      .then((result) => {
        this.setBooks(result.data)
      })
      .catch((err) => {
        this.setError(err)
      })
  }

  submitBook = () => {
    axios.post(`${PORT}/add-book`, {
      book: JSON.stringify(this.state.book),
      user: this.state.currentUser
    })
      .then((result) => {
        this.getBooks()
        alert('Book has been added to the bookshelf. Your community thanks you.')
      })
      .catch((err) => {
        this.setError(err)
        alert('Book has not been added to bookshelf. Please double check the fields.')
      })
  }

  submitSearchString = (searchString) => {
    axios.get(`${PORT}/search?searchString=${searchString}`, {

    })
      .then((result) => {
        this.setBooks(result.data)
      })
      .catch((err) => {
        this.setError(err)
      })
  }

  submitISBN = (isbn) => {
    axios.get(`${OPENLIBRARY}/api/books?bibkeys=ISBN:${isbn}&format=json&jscmd=data`)
      .then((result) => {
        if (result === {}) {
          alert('Could not find book. Please try again')
        } else {
          this.setBook(result.data[`ISBN:${isbn}`])
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  userAPI = (route, userData) => {
    axios.post(`${PORT}/${route}`, userData)
      .then((result) => {
        if (result.data.success) {
          this.setCurrentUser(result.data)
          this.setLocalStorage(result.data)
          return <Redirect exact to="/" />
        }
      })
      .catch((err) => {
        this.setError(err)
      })
  }

  logout = () => {
    axios.post(`${PORT}/logout`).then((result) => {
      this.setCurrentUser({ displayName: '' })
      localStorage.clear()
      return <Redirect to='/sign-up' />
    })
  }

  requestBook = (bookID) => {
    axios.post(`${PORT}/request-book`, {
      bookID: bookID,
      user: this.state.currentUser
    })
      .then((result) => {
        this.getBooks()
        alert('You have been added to the book. Arrange collection.')
      })
      .catch((err) => {
        this.setError(err)
        alert('You have not been added to the book. Please double check the fields.')
      })
  }

  setError (error) {
    this.setState({
      error: error
    })
  }

  setBooks (books) {
    this.setState({
      books: books
    })
  }

  componentDidMount () {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      this.setCurrentUser(user)
    } else {
      this.setCurrentUser('')
    }
    this.getBooks()
  }

  setBook (book) {
    this.setState({
      book: book
    })
  }

  setCurrentUser (user) {
    this.setState({
      currentUser: user
    })
  }

  setLocalStorage (user) {
    localStorage.setItem('user', JSON.stringify(user))
  }

  render () {
    const aboutUsText = 'Trial text'
    return (
      <HashRouter>
        <div className="homepage">
          <ErrorHandler error={ this.state.error }/>
          <Navigation submitSearchString={ this.submitSearchString } logout={ this.logout } currentUser={ this.state.currentUser }/>
          {/* <Header addUser={ this.userAPI } signinUser={ this.userAPI } bookTitle={ this.state.book.title } bookAuthor={ this.state.book.authors[0].name } submitISBN={ this.submitISBN } submitBook={ this.submitBook } /> */}
          <Switch>
            <Route path="/sign-up">
              <Header> <UserSignup addUser={ this.userAPI }/> </Header>
            </Route>
            <Route path="/sign-in">
              <Header> <UserSignin signinUser={ this.userAPI }/> </Header>
            </Route>
            <Route exact path="/">
              <Header>
              {/* An idea to have one Modal that props are passed to to make it about us or isbn search */}
                <AboutUsModal>
                <h1>Welcome to Book Me Up!</h1>
                <button id="aboutUsButton" className="btn btn-lg m-2">About Book Me Up!</button>
                <button id="isbnSearchButton" className="btn btn-lg m-2" onClick={this.showModal}>Add a new book!</button>
                <IsbnSearchModal submitISBN={ this.props.submitISBN } submitBook={ this.props.submitBook } bookTitle={ this.props.bookTitle } bookAuthor={ this.props.bookAuthor } show={this.state.show} hideModal={this.hideModal}/>
              </Header>
              <BookList books={ this.state.books } requestBook= { this.requestBook }/>
            </Route>
          </Switch>
        </div>
      </HashRouter>
    )
  }
}

export default BookMeUp
