describe('should be able to view collections', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://api.discogs.com/database/search?type=master&format=vinyl&key=GimREdkHlKcSjALMSwEP&secret=RZbpExNDRyTdbTAaiVxiJpiYgOcydrMJ&page=1&per_page=5&sort=hot', {
       statusCode:200,
       fixture: 'trending.json'
    }).as('trending')

    cy.visit('http://localhost:3000/login')
  })

  it('Should not be see the collections tab if no user is logged in ', () => {
    cy.wait('@trending').then(() => {
      cy.get('[value="no-user"]').click()
      .url().should('include', '/')
      .get('[href="/collections"]').should('not.exist')
    })
  })

  it('should have a saved collection if a user is logged in and have it display the users saved collection', () => {
    cy.wait('@trending').then(() => {
      cy.get('[value="user2"]').click()
        .get('form > .standard-btn').click()
        .url().should('include', '/')
        .get('[href="/collections"]').click()
        .get('.album--grid').find('.results--card').should('have.length', 5)
        .get('.results--card').find('.results--image').first().should('have.attr', 'alt', 'In Times New Roman... by Queens Of The Stone Age') 
          .next().contains('p', 'In Times New Roman...')
          .next().contains('p', 'Queens Of The Stone ...')
        .get('.results--card').find('.results--image').last().should('have.attr', 'alt', 'Delta Kream by The Black Keys')
          .next().contains('p', 'Delta Kream')
          .next().contains('p', 'The Black Keys')
    })
  })

  it.only('should display a message if there are no albums in the collection', () => {
    cy.wait('@trending').then(() => {
      cy.get('[value="user1"]').click()
        .get('form > .standard-btn').click()
        .url().should('include', '/')
        .get('[href="/collections"]').click()
        .get('.album--grid').find('.results--card').should('have.length', 0)
        .get('h2').contains('No albums in collection')
    })
  })
})
