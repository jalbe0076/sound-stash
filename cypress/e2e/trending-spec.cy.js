describe('should be able to see a list of trending vinyl albums', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://api.discogs.com/database/search?type=master&format=vinyl&key=GimREdkHlKcSjALMSwEP&secret=RZbpExNDRyTdbTAaiVxiJpiYgOcydrMJ&page=1&per_page=5&sort=hot', {
       statusCode:200,
       fixture: 'trending.json'
    }).as('trending')
    cy.visit('http://localhost:3000/login')
  })

  it('Should see the navigation bar and trending albums when a user is logged in along with a logout button', () => {
    cy.wait('@trending').then(() => {
      cy.get('[value="user2"]').click()
        .get('form > .standard-btn').click()
        .url().should('include', '/')
        .get('.banner-container').contains('h1', 'SOUND STASH')
        .get('.banner-container').contains('a', 'DISCOVER')
        .get('.recommendedContainer').find('.link').should('have.length', 5).first().find('img').should('have.attr', 'src')
        .get('.recommendedContainer').find('.link').first().find('.album').contains('p', 'Queens')
        .get('.recommendedContainer').find('.link').last().find('img').should('have.attr', 'src')
        .get('.recommendedContainer').find('.link').last().find('.album').contains('p', 'Akira')
        .get('.logout-btn').contains('button', 'LOGOUT')
    })
  })

  it('Should see the same information when another user is logged in', () => {
    cy.wait('@trending').then(() => {      
      cy.get('[value="user1"]').click()
        .get('form > .standard-btn').click()
        .url().should('include', '/')
        .get('.banner-container').contains('h1', 'SOUND STASH')
        .get('.banner-container').contains('a', 'DISCOVER')
        .get('.recommendedContainer').find('.link').should('have.length', 5).first().find('img').should('have.attr', 'src')
        .get('.recommendedContainer').find('.link').first().find('.album').contains('p', 'Queens')
        .get('.recommendedContainer').find('.link').last().find('img').should('have.attr', 'src')
        .get('.recommendedContainer').find('.link').last().find('.album').contains('p', 'Akira')
        .get('.logout-btn').contains('button', 'LOGOUT')
    })
  })

  it('When no user is logged in we should not see the havigation bar or the logout button, a login button and trending albums should be visible', () => {
    cy.wait('@trending').then(() => {
      cy.get('[value="no-user"]').click()
      .url().should('include', '/')
      .get('.banner-container').contains('h1', 'SOUND STASH')
      .get('[href="/collections"]').should('not.exist')
      .get('[href="/journal"]').should('not.exist')
      .get('[href="/discover"]').should('not.exist')
      .get('.user-profile').contains('button', 'LOGIN')
    })
  })

  it('should be able to direct the user to login', () => {
    cy.wait('@trending').then(() => {
      cy.get('[value="no-user"]').click()
      .url().should('include', '/')
      .get('.user-profile').contains('button', 'LOGIN').click()
      .url().should('include', '/login')
      .get('.logo').should('have.attr', 'src', '/images/logo.png')
      .get('.username-field').should('have.attr', 'placeholder', 'Username')
      .get('.password-field').should('have.attr', 'placeholder', 'Password')
      .get('form > .standard-btn').contains('button', 'LOGIN')
    })
  })

  it('Should be able to logout a logged in user', () => {
    cy.wait('@trending').then(() => {      
      cy.get('[value="user1"]').click()
        .get('form > .standard-btn').click()
        .url().should('include', '/')
        .get('.logout-btn').contains('button', 'LOGOUT').click()
        .url().should('include', '/')
        .get('.banner-container').contains('h1', 'SOUND STASH')
        .get('[href="/collections"]').should('not.exist')
        .get('[href="/journal"]').should('not.exist')
        .get('[href="/discover"]').should('not.exist')
        .get('.user-profile').contains('button', 'LOGIN')
    })
  })

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
})