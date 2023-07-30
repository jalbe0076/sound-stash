describe('Login Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://api.discogs.com/database/search?type=master&format=vinyl&key=GimREdkHlKcSjALMSwEP&secret=RZbpExNDRyTdbTAaiVxiJpiYgOcydrMJ&page=1&per_page=5&sort=hot', {
      statusCode: 200,
      fixture: 'trending.json'
    }).as('trending')
    cy.visit('http://localhost:3000/login'); 
  });

  it('should be on the login page', () => {
    cy.wait('@trending').then(() => {
      cy.url().should('include', '/login')
        .get('.logo').should('have.attr', 'src', '/images/logo.png')
        .get('.username-field').should('have.attr', 'placeholder', 'Username')
        .get('.password-field').should('have.attr', 'placeholder', 'Password')
        .get('form > .standard-btn').contains('button', 'LOGIN')
        .get('.demo-user-container').children().should('have.length', 3)
        .get('[value="no-user"]').contains('button', 'DEMO NO USER')
        .get('[value="user1"]').contains('button', 'DEMO USER 1')
        .get('[value="user2"]').contains('button', 'DEMO USER 2')
      })
    })

  it('should log in with valid user1 credentials', () => {
    cy.wait('@trending').then(() => {
      cy.fixture('mockUser1').as('user1')
        .get('@user1').then((user) => {
          cy.get('.username-field').type(user.username)
          .get('.username-field').should('have.attr', 'value', 'user1')
          .get('.password-field').type(user.password)
          .get('.password-field').should('have.attr', 'value', 'sound-stash')
          .get('form > .standard-btn').click()
          .url().should('include', '/')
          .get('.banner-container').contains('h1', 'SOUND STASH')
      });
    })
  })

  it('should log in with demo user1 button', () => {
    cy.wait('@trending').then(() => {
      cy.get('[value="user1"]').click()
      .get('.username-field').should('have.value', 'user1')
      .get('.password-field').should('have.value', 'sound-stash')
      .get('form > .standard-btn').click()
      .url().should('include', '/')
      .get('.banner-container').contains('h1', 'SOUND STASH')
    })  
  })

  it('should log in with valid user2 credentials', () => {
    cy.fixture('mockUser2').as('user2')
      .get('@user2').then((user) => {
        cy.get('.username-field').type(user.username)
        .get('.username-field').should('have.attr', 'value', 'user2')
          .get('.password-field').type(user.password)
          .get('.password-field').should('have.attr', 'value', 'sound-stash')
        .get('form > .standard-btn').click()
        .url().should('include', '/')
        .get('.banner-container').contains('h1', 'SOUND STASH')
      });
  })

  it('should log in with demo user2 button', () => {
    cy.wait('@trending').then(() => {
      cy.get('[value="user2"]').click()
        .get('.username-field').should('have.value', 'user2')
        .get('.password-field').should('have.value', 'sound-stash')
        .get('form > .standard-btn').click()
        .url().should('include', '/')
        .get('.banner-container').contains('h1', 'SOUND STASH')   
    })
  })

  it('should log in with demo no user button', () => {
    cy.wait('@trending').then(() => {    
      cy.get('[value="no-user"]').click()
        .url().should('include', '/')
        .get('.banner-container').contains('h1', 'SOUND STASH')
    })
  })

  it('should show an error message with invalid user credentials', () => {
    cy.wait('@trending').then(() => {      
      cy.get('.username-field').type('wrongUser')
        .get('.password-field').type('mySecretPassword')
        .get('form > .standard-btn').click()
        .get('.error-message').contains('p', 'Invalid username or password')
    })
  });

  it('Should tell the user if there is an error with the server 404', () => {
    cy.intercept('GET', 'https://api.discogs.com/database/search?type=master&format=vinyl&key=GimREdkHlKcSjALMSwEP&secret=RZbpExNDRyTdbTAaiVxiJpiYgOcydrMJ&page=1&per_page=5&sort=hot', {
      statusCode: 404
    })
      .get('h2').contains('HTTP Error: 404 -- Please try again later')
  })

  it('Should tell the user if there is an error with the server 500', () => {
    cy.intercept('GET', 'https://api.discogs.com/database/search?type=master&format=vinyl&key=GimREdkHlKcSjALMSwEP&secret=RZbpExNDRyTdbTAaiVxiJpiYgOcydrMJ&page=1&per_page=5&sort=hot', {
      statusCode: 500
    })
      .get('h2').contains('HTTP Error: 500 -- Please try again later')
  })
});