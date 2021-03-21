<h2 align=center><a href="https://book-me-up.herokuapp.com/">Book Me Up</a></h2>

<h4 align=center><a href="https://github.com/natashamcintyre/bookmeup#screenshots">Screenshots</a> | <a href="https://github.com/natashamcintyre/bookmeup#tech-stack">Tech Stack</a> | <a href="https://github.com/natashamcintyre/bookmeup#features">Features</a> | <a href="https://github.com/natashamcintyre/bookmeup#installation">Installation</a> | <a href="https://github.com/natashamcintyre/bookmeup#tests">Testing</a> | <a href="https://github.com/natashamcintyre/bookmeup#how-to-use">How To Use</a> | <a href="https://github.com/natashamcintyre/bookmeup#credits">Credits</a></h4>

A web application to allow users to offer books to share with the community. This is the frontend, which communicates with the [backend](https://github.com/natashamcintyre/bookmeup-api) via API.

## Motivation
To demonstrate the ability to build a high quality single page web app, in a new framework as part of a team practising agile development that is focused on thorough test driven development process. Also, to enjoy ourselves.

## Build status
[![Build Status](https://travis-ci.com/argy-bargy/book_swap.svg?branch=main)](https://travis-ci.com/argy-bargy/book_swap)

## Code style
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com)

## Screenshots
![Home Screen](https://github.com/argy-bargy/book_swap/blob/main/screenshots/Screenshot%202021-03-01%20at%2015.28.59.png)

## Tech Stack
**Built with** (frontend)
  - [React](https://reactjs.org)
  - [Node.JS](https://nodejs.org)
  - [Atom](https://atom.io)
  - [Visual Studio Code](https://code.visualstudio.com)

## Features
Key Features:

  * Add a book to lend with a barcode scanner
  * Search for books by any keyword in the free search field.
  * See details of each book
  * See 'virtual library card' of prior readers
  * Request to borrow a book from the community library

## Code Example
  Frontend App.JS:
  ```
  Refactors needed:
  * Remove individual title, author, isbn variables from APP.js - DONE :)
  * Rename bookSearchToo - DONE :)
  * Refactoring a User object - DONE :)
  * Combine all three header components (possibly through composition: https://reactjs.org/docs/composition-vs-inheritance.html) - DONE :)
  * Create generic get request function with URL parameters
  * Error Handling Front End Set Up??
  * Refactor out BookHandler.js and UserHandler.js out of APP.js as modules?
  * Is there a better way of positioning API calls in the file structure?
  ```

## Installation
  To use locally, you will need to clone the [backend repo](https://github.com/natashamcintyre/bookmeup-api) as well. Please follow the instructions [here](https://github.com/natashamcintyre/bookmeup-api#installation) to get the backend installed. For the frontend, clone this repo, then:
  ```
  $ cd bookmeup
  $ npm install
  ```
  You will need npm, which is installed with Node.js. Please visit the [Node.js website](https://nodejs.org/en/download/) to download.

## API Reference
 This project utilizes the OpenLibrary Books API: https://openlibrary.org/dev/docs/api/books, to request all related book information.

## Tests
  Cypress for feature tests, Enzyme for React unit tests, and Mocha-Chai for Node.js tests.

  Run the following to for frontend test coverage:
  ```
  $ npm test -- --coverage --watchAll=false
  ```
  
  For end to end testing, ensure the [backend](https://github.com/natashamcintyre/bookmeup-api#how-to-use) is up and running, then:
  ```
  $ npm start
  $ npx cypress open
  ```
  
  ### Linting
  We are using ESlint.

  `$ npx eslint .`

## How to use?
Either visit the [live site](https://book-me-up.herokuapp.com/) or, to use locally:

The frontend and backend run independently on separate servers.

To use Book Me Up, start the backend server (instructions [here](https://github.com/natashamcintyre/bookmeup-api#how-to-use)) then, in a new terminal:

  ```
  $ npm start
  ```

## Credits

Team Argy-Bargy: [Aman Tank](https://github.com/AmanTank187), [Cathal Lavelle](https://github.com/calavell), [Chris Whitehouse](https://github.com/chriswhitehouse), [Kiki Dawson](https://github.com/kikidawson), [Natasha McIntyre](https://github.com/natashamcintyre) and [Will Dixon](https://github.com/WillDixon93)
