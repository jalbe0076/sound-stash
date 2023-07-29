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
        .url().should('include', '/');
      });
  })

  it.skip('should log in with valid user2 credentials', () => {
    cy.get('@users').then((users) => {
      const user = users[1]; 
      cy.get('.username-field').type(user.username);
      cy.get('.password-field').type(user.password);
      cy.get('.login-button').click();
      cy.url().should('include', '/trending');

    });
  })
  it.skip('should show an error message with invalid user credentials', () => {
    cy.get('@users').then((users) => {
      const invalidUser = { username: 'baduser', password: 'badpassword' };
      cy.get('.username-field').type(invalidUser.username);
      cy.get('.password-field').type(invalidUser.password);
      cy.get('.login-button').click();
      cy.on('window:alert', (text) => {
        expect(text).to.equal('Invalid username or password');
      });
    });
  });
});