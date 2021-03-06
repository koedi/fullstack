describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'test',
      username: 'test',
      password: 'test'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })


  it('Login form is shown', function () {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('test')
      cy.get('#password').type('test')
      cy.get('#login-button').click()
      cy.contains('test logged in')
    })


    it('fail with wrong credentials', function () {
      cy.get('#username').type('testi')
      cy.get('#password').type('test')
      cy.get('#login-button').click()
      cy.contains('Wrong username or password')
    })
  })


  describe('When logged in', function () {
    beforeEach(function () {
      cy.get('#username').type('test')
      cy.get('#password').type('test')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function () {
      cy.get('#newBlog-button').click()
      cy.get('#blog-title').type('Aku on paras')
      cy.get('#blog-author').type('Iines Ankka')
      cy.get('#blog-url').type('https://aku.ankka.com')
      cy.get('#createBlog-button').click()

      cy.contains('A new blog "Aku on paras" by Iines Ankka added')
      cy.contains('Aku on paras')
      cy.contains('Iines Ankka')
      cy.contains('https://aku.ankka.com')
    })

    it('A blog can be liked', function () {
      cy.get('#newBlog-button').click()
      cy.get('#blog-title').type('Aku on paras')
      cy.get('#blog-author').type('Iines Ankka')
      cy.get('#blog-url').type('https://aku.ankka.com')
      cy.get('#createBlog-button').click()

      cy.get('#more-button').click()
      cy.get('#like-button').click()
      cy.contains('likes: 1')
    })

    it('Created blog can be removed', function () {
      cy.get('#newBlog-button').click()
      cy.get('#blog-title').type('Aku on paras')
      cy.get('#blog-author').type('Iines Ankka')
      cy.get('#blog-url').type('https://aku.ankka.com')
      cy.get('#createBlog-button').click()
      cy.get('#more-button').click()

      cy.get('#remove-button').click()
      cy.contains('blog removed')
    })



  })


})
