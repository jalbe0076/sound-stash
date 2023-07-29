describe('Login Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://api.discogs.com/database/search?type=master&format=vinyl&key=GimREdkHlKcSjALMSwEP&secret=RZbpExNDRyTdbTAaiVxiJpiYgOcydrMJ&page=1&per_page=5&sort=hot', {
      statusCode: 200
    })
    cy.visit('http://localhost:3000/login'); 
  });

  it('should be on the login page', () => {
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

  it('should log in with valid user1 credentials', () => {
    cy.fixture('mockUser1').as('user1')
      .get('@user1').then((user) => {
        cy.get('.username-field').type(user.username)
        .get('.password-field').type(user.password)
        .get('form > .standard-btn').click()
        .url().should('include', '/')
        .get('.banner-container').contains('h1', 'SOUND STASH')
      });
  })

  it('should log in with demo user1 button', () => {
    cy.get('[value="user1"]').click()
      .get('.username-field').should('have.value', 'user1')
      .get('.password-field').should('have.value', 'sound-stash')
      .get('form > .standard-btn').click()
      .url().should('include', '/')
      .get('.banner-container').contains('h1', 'SOUND STASH')
  })

  it('should log in with valid user2 credentials', () => {
    cy.fixture('mockUser2').as('user2')
      .get('@user2').then((user) => {
        cy.get('.username-field').type(user.username)
        .get('.password-field').type(user.password)
        .get('form > .standard-btn').click()
        .url().should('include', '/')
        .get('.banner-container').contains('h1', 'SOUND STASH')
      });
  })

  it('should log in with demo user2 button', () => {
    cy.get('[value="user2"]').click()
      .get('.username-field').should('have.value', 'user2')
      .get('.password-field').should('have.value', 'sound-stash')
      .get('form > .standard-btn').click()
      .url().should('include', '/')
      .get('.banner-container').contains('h1', 'SOUND STASH')
  })

  it('should log in with demo no user button', () => {
    cy.get('[value="no-user"]').click()
      .url().should('include', '/')
      .get('.banner-container').contains('h1', 'SOUND STASH')
  })

  it('should show an error message with invalid user credentials', () => {
    cy.get('.username-field').type('wrongUser');
    cy.get('.password-field').type('mySecretPassword');
    cy.get('form > .standard-btn').click();
    cy.get('.error-message').contains('p', 'Invalid username or password')
  });
});