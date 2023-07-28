
describe('template spec', () => {
  beforeEach(() => {
    
    cy.intercept('GET', 'https://api.discogs.com/database/search?type=master&format=vinyl&key=GimREdkHlKcSjALMSwEP&secret=RZbpExNDRyTdbTAaiVxiJpiYgOcydrMJ&page=1&per_page=5&sort=hot',
    {
     statusCode:201,
     fixture: 'trending.json'
    }).as('getTrending')
    
    cy.intercept('GET', 'https://api.discogs.com/database/search?q=outkast&type=master&key=mbubAaAXseWPUpaJLkKU&secret=TrELhUezCNdFoIfmoAdHZmfJIXljOSfW&format=vinyl&page=1',
    {fixture: 'results.json'}).as('getSearch')
    
    cy.intercept('GET', 'https://api.discogs.com/masters/25976?key=GimREdkHlKcSjALMSwEP&secret=RZbpExNDRyTdbTAaiVxiJpiYgOcydrMJ',
    {fixture: 'aquemini.json'}).as('aquemini')
  })
  
  it('As a logged in user I should see the appropriate journal entries with date, title, artist, and rating', () => {
    
    cy.visit('localhost:3000/journal')
      .wait('@getTrending')
      .get('.journal').find('.entry').should('have.length', '4')
      .get('.entry-date').first().contains('July 27, 2023')
      .get('.entry-title').first().contains('Ace Frehley')
      .get('.entry-artist').first().contains('Kiss / Ace Frehley')
      .get('.rating').first().should('be.visible')
      .get('.entry-date').last().contains('July 21, 2023')
      .get('.entry-title').last().contains('Aida')
      .get('.entry-artist').last().contains('Derek Bailey')
      .get('.rating').last().should('be.visible')
  })

  it('As a user I should be able to add a journal entry w date and notes', () => {
    const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    cy.visit('localhost:3000/')
      .get('.search--input').type('outkast')
      .get('.search--button').click()
      .get('.results--card').first().click()
      .get('button').eq(1).click()
      .get('.date-input').should('have.value', currentDate)
      .get('textarea').type('Friday night vibes').should('have.value', 'Friday night vibes')
      .get('.form-submit').click()
      .get('.journal').find('.entry').should('have.length', '5')
      .get('.entry-date').first().contains(currentDate)
      .get('.entry-title').first().contains('Aquemini')
      .get('.entry-artist').first().contains('OutKast')
  })


  it('As a user I should be able to delete a journal entry', () => {
    cy.visit('localhost:3000/journal')
      .get('.entry-delete').first().click()
      .get('.journal').find('.entry').should('have.length', '3')
  })

})

