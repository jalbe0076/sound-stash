
describe('Journal userflow test', () => {
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
    cy.visit('http://localhost:3000/login'); 
    cy.fixture('mockUser2').as('user2')
      .get('@user2').then((user) => {
        cy.get('.username-field').type(user.username)
        .get('.username-field').should('have.attr', 'value', 'user2')
        .get('.password-field').type(user.password)
        .get('.password-field').should('have.attr', 'value', 'sound-stash')
        .get('form > .standard-btn').click()
      })
    
    cy.get('[href="/journal"]').click()
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

  it('As a logged in user I should see be able to toggle the visibility of notes', () => {
    cy.visit('http://localhost:3000/login'); 
    cy.fixture('mockUser2').as('user2')
      .get('@user2').then((user) => {
        cy.get('.username-field').type(user.username)
        .get('.username-field').should('have.attr', 'value', 'user2')
        .get('.password-field').type(user.password)
        .get('.password-field').should('have.attr', 'value', 'sound-stash')
        .get('form > .standard-btn').click()
      })

    cy.get('[href="/journal"]').click()
      .url().should('include', '/journal')
      .get('.notes-icon').first().click()
      .get('.entry-notes').should('be.visible').contains('Coding session music lol')
      .get('.notes-icon').first().click()
      .get('.entry-notes').should('not.exist')
  })

  it('As a user I should be able to add a journal entry w date and notes', () => {
    cy.visit('http://localhost:3000/login'); 
    cy.fixture('mockUser2').as('user2')
      .get('@user2').then((user) => {
        cy.get('.username-field').type(user.username)
        .get('.username-field').should('have.attr', 'value', 'user2')
        .get('.password-field').type(user.password)
        .get('.password-field').should('have.attr', 'value', 'sound-stash')
        .get('form > .standard-btn').click()
      })

    const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    cy.get('.search--input').type('outkast')
      .get('.search--button').click()
      .url().should('include', '/outkast/1')
      .get('.results--card').first().click()
      .get('.journal-button').click()
      .url().should('include', '/albums/25976')
      .get('.date-input')
      .should('have.value', currentDate)
      .get('textarea').type('Friday night vibes').should('have.value', 'Friday night vibes')
      .get('.form-submit').click()
      .url().should('include', '/journal')
      .get('.journal').find('.entry').should('have.length', '5')
      .get('.entry-date').first().contains(currentDate)
      .get('.entry-title').first().contains('Aquemini')
      .get('.entry-artist').first().contains('OutKast')
  })

  it('As a user I should be able to add a journal entry w/o notes', () => {
    cy.visit('http://localhost:3000/login'); 
    cy.fixture('mockUser2').as('user2')
      .get('@user2').then((user) => {
        cy.get('.username-field').type(user.username)
        .get('.username-field').should('have.attr', 'value', 'user2')
        .get('.password-field').type(user.password)
        .get('.password-field').should('have.attr', 'value', 'sound-stash')
        .get('form > .standard-btn').click()
      })

    const currentDate = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    cy.get('.search--input').type('outkast')
      .get('.search--button').click()
      .url().should('include', '/outkast/1')
      .get('.results--card').first().click()
      .url().should('include', '/albums/25976')
      .get('.journal-button').click()
      .get('.date-input')
      .should('have.value', currentDate)
      .get('.form-submit').click()
      .url().should('include', '/journal')
      .get('.entry-date').first().contains(currentDate)
      .get('.entry-title').first().contains('Aquemini')
      .get('.entry-artist').first().contains('OutKast')
      .get('.journal').find('.notes-icon').should('have.length', '4')
  })


  it('As a user I should be able to delete a journal entry', () => {
    cy.visit('http://localhost:3000/login'); 
    cy.fixture('mockUser2').as('user2')
      .get('@user2').then((user) => {
        cy.get('.username-field').type(user.username)
        .get('.username-field').should('have.attr', 'value', 'user2')
        .get('.password-field').type(user.password)
        .get('.password-field').should('have.attr', 'value', 'sound-stash')
        .get('form > .standard-btn').click()
      })
    
    cy.get('[href="/journal"]').click()
      .get('.entry-delete').first().click()
      .get('.journal').find('.entry').should('have.length', '3')
  })

  it('As a user I should see a message telling me to search an album to add to my journal if there are no entries save', () => {
    cy.visit('http://localhost:3000/login')
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
    
    cy.get('[href="/journal"]').click()
      .get('.no-entries').should('be.visible').contains('Search an album to add to your journal')
  })

})

