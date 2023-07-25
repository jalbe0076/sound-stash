describe('Login Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
    cy.fixture('mockUsers').as('users'); 
  });
  it('should log in with valid user1 credentials', () => {
    cy.get('@users').then((users) => {
      const user = users[0]; 
      cy.get('.username-field').type(user.username);
      cy.get('.password-field').type(user.password);
      cy.get('.login-button').click();
    });
  })
  it('should log in with valid user2 credentials', () => {
    cy.get('@users').then((users) => {
      const user = users[1]; 
      cy.get('.username-field').type(user.username);
      cy.get('.password-field').type(user.password);
      cy.get('.login-button').click();
    });
  })
  it('should show an error message with invalid user credentials', () => {
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