

describe('Blog app', function() {
  beforeEach(function() {
    //cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })


  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('inkku69')
      cy.get('#password').type('salasana')
      cy.contains('login').click()
      cy.contains('Iines Ankka logged in')
    })


    it('fail with wrong credentials', function() {
      cy.get('#username').type('iines')
      cy.get('#password').type('salasana')
      cy.contains('login').click()
      cy.contains('Wrong username or password')
    })
  })



})
