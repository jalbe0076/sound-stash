describe('Search', () => {
  beforeEach(() => {
    cy.visit('localhost:3000')
    cy.intercept('GET', 'https://api.discogs.com/database/search?q=outkast&type=master&key=mbubAaAXseWPUpaJLkKU&secret=TrELhUezCNdFoIfmoAdHZmfJIXljOSfW&format=vinyl&page=1',
      {fixture: 'results.json'})
    cy.intercept('GET', 'https://api.discogs.com/database/search?q=outkast&type=master&key=mbubAaAXseWPUpaJLkKU&secret=TrELhUezCNdFoIfmoAdHZmfJIXljOSfW&format=vinyl&page=2',
      {fixture: 'resultspage2.json'})
    cy.intercept('GET', 'https://api.discogs.com/database/search?q=awefdfi&type=master&key=mbubAaAXseWPUpaJLkKU&secret=TrELhUezCNdFoIfmoAdHZmfJIXljOSfW&format=vinyl&page=2',
      {fixture: 'resultspage2.json'})
  })


  it('As a user I should see an search bar, type Outkast, click the search button, and see 49 results each with an image, title, and artist', () => {
    cy.get('.search--form').should('be.visible')
      .get('.search--input').type('outkast')
      .get('.search--button').click()
      .get('.results').should('be.visible')
      .get('.results--grid').find('.results--card').should('have.length', '49')
      .get('.results--image').first().should('have.attr', 'src').should('include', "https://i.discogs.com/dVtSqyT5UzYBXNu7ugxNWDMAOGCjp9vOD14Vk5rBTTI/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE2OTMy/NS0xMzE2Mjk4MDE3/LmpwZWc.jpeg")
      .get('.results--card').first().contains('p', 'Aquemini')
      .get('.results--card').first().contains('p', 'OutKast')
      .get('.results--image').eq(1).should('have.attr', 'src').should('include', "https://i.discogs.com/H2bUY4mwkSHPDGNhfDWoSjXU4PTsPpiBc9xavmQWmXA/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIyNTE4/MS0xNjU2MzY4NDE3/LTI3MjMuanBlZw.jpeg")
      .get('.results--card').eq(1).contains('p', 'Stankonia')
      .get('.results--card').eq(1).contains('p', 'OutKast')
  })

  it('As a user I should see an search bar, type Outkast, press enter, and see 49 results each with an image, title, and artist', () => {
    cy.get('.search--form').should('be.visible')
      .get('.search--input').type('outkast{enter}')
      .get('.results').should('be.visible')
      .get('.results--grid').find('.results--card').should('have.length', '49')
      .get('.results--image').first().should('have.attr', 'src').should('include', "https://i.discogs.com/dVtSqyT5UzYBXNu7ugxNWDMAOGCjp9vOD14Vk5rBTTI/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE2OTMy/NS0xMzE2Mjk4MDE3/LmpwZWc.jpeg")
      .get('.results--card').first().contains('p', 'Aquemini')
      .get('.results--card').first().contains('p', 'OutKast')
      .get('.results--image').eq(1).should('have.attr', 'src').should('include', "https://i.discogs.com/H2bUY4mwkSHPDGNhfDWoSjXU4PTsPpiBc9xavmQWmXA/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIyNTE4/MS0xNjU2MzY4NDE3/LTI3MjMuanBlZw.jpeg")
      .get('.results--card').eq(1).contains('p', 'Stankonia')
      .get('.results--card').eq(1).contains('p', 'OutKast')
  })

  it('As a user I should see an search bar, type Outkast, see some results, and click the next button to see more results.  I should also be able to click the last button and see the previous results', () => {
    cy.get('.search--form').should('be.visible')
      .get('.search--input').type('outkast')
      .get('.search--button').click()
      .get('.results').should('be.visible')
      .get('.results--next').click()
      .get('.results--grid').find('.results--card').should('have.length', '23')
      .get('.results--image').first().should('have.attr', 'src').should('include', 'https://i.discogs.com/6RVqgRldFjNDvCyQWxtSbhXfkpLXBrmXzyQy7lRpEJM/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIyMzYy/MDMtMTQzNTU4ODgx/NS05ODM3LmpwZWc.jpeg')
      .get('.results--card').first().contains('p', 'Funkymix 73')
      .get('.results--card').first().contains('p', 'Various')
      .get('.results--image').eq(1).should('have.attr', 'src').should('include', "https://i.discogs.com/r4W2u-r1aRTzYJxlfplZLSVdRf9re2SktdUTGBplxqk/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTcwNzk3/OC0xMTUwMjcxNDYx/LmpwZWc.jpeg")
      .get('.results--card').eq(1).contains('p', 'Team Jedi Blends Vol...')
      .get('.results--card').eq(1).contains('p', 'Team Jedi')
      .get('.results--last').click()
      .get('.results').should('be.visible')
      .get('.results--grid').find('.results--card').should('have.length', '49')
      .get('.results--image').first().should('have.attr', 'src').should('include', "https://i.discogs.com/dVtSqyT5UzYBXNu7ugxNWDMAOGCjp9vOD14Vk5rBTTI/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE2OTMy/NS0xMzE2Mjk4MDE3/LmpwZWc.jpeg")
      .get('.results--card').first().contains('p', 'Aquemini')
      .get('.results--card').first().contains('p', 'OutKast')
      .get('.results--image').eq(1).should('have.attr', 'src').should('include', "https://i.discogs.com/H2bUY4mwkSHPDGNhfDWoSjXU4PTsPpiBc9xavmQWmXA/rs:fit/g:sm/q:40/h:150/w:150/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTIyNTE4/MS0xNjU2MzY4NDE3/LTI3MjMuanBlZw.jpeg")
      .get('.results--card').eq(1).contains('p', 'Stankonia')
      .get('.results--card').eq(1).contains('p', 'OutKast')
  })

  it('As a user, if there are no results I should see a no results for query message', () => {
    cy.get('.search--form').should('be.visible')
      .get('.search--input').type('awefdfi')
      .get('.search--button').click()
      .get('.results--none').should('be.visible')
      .get('.results--none').contains('awefdfi')
  })
})