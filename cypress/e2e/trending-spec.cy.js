describe('should be able to view collections', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://api.discogs.com/database/search?type=master&format=vinyl&key=GimREdkHlKcSjALMSwEP&secret=RZbpExNDRyTdbTAaiVxiJpiYgOcydrMJ&page=1&per_page=5&sort=hot',
      {
       statusCode:201,
       fixture: 'trending.json'
      }
    )

    cy.visit('http://localhost:3000/trending')
  })

  it('should have trending albums and tabs when a user is logged in', () => {
    cy.get
      .get('.banner-container').contains('h1', 'SOUND STASH')
      .get('.banner-container').contains('a', 'DISCOVER')
      .get('.recommendedContainer').find('.link').should('have.length', 5).first().find('img').should('have.attr', 'src')
      .get('.recommendedContainer').find('.link').first().find('.album').contains('p', 'Queens')
      .get('.recommendedContainer').find('.link').last().find('img').should('have.attr', 'src')
      .get('.recommendedContainer').find('.link').last().find('.album').contains('p', 'Akira')
      .get('.banner-container').contains('a', 'COLLECTIONS').click()
      .get('.album--grid').find('.results--card').should('have.length', 5).first().find('img').should('have.attr', 'src')
      .get('.album--grid').find('.results--card').first().contains('p', 'In Times New')
      .get('.results--card').next().contains('p', 'Star Wars')
      .get('.album--grid').find('.results--card').last().find('img').should('have.attr', 'src')
      .get('.album--grid').find('.results--card').last().contains('p', 'Delta Kream')
  })
})