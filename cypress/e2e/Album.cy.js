describe('AlbumDetails', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      'https://api.discogs.com/database/search?type=master&format=vinyl&key=GimREdkHlKcSjALMSwEP&secret=RZbpExNDRyTdbTAaiVxiJpiYgOcydrMJ&page=1&per_page=5&sort=hot',
      {
        statusCode: 200,
        fixture: 'trending.json'
      }
    ).as('loginSearch');
    
    cy.intercept(
      'GET',
      'https://api.discogs.com/database/search?q=outkast&type=master&key=mbubAaAXseWPUpaJLkKU&secret=TrELhUezCNdFoIfmoAdHZmfJIXljOSfW&format=vinyl&page=1',
      { fixture: 'results.json' }
    ).as('searchResults');

    cy.intercept(
      'GET',
      'https://api.discogs.com/masters/25976?key=GimREdkHlKcSjALMSwEP&secret=RZbpExNDRyTdbTAaiVxiJpiYgOcydrMJ',
      {
        statusCode: 200,
        fixture: 'clickedAlbum.json'
      }
    ).as('getClickedAlbum');

    cy.visit('http://localhost:3000/login');
    cy.fixture('mockUser1').as('user');
  });

  it('As a user, I should be able to click on a specific album and see its details', () => {
      cy.wait('@loginSearch').then(() => {
          cy.get('@user').then((user) => {
          cy.get('.username-field').type(`${user.username}`);
          cy.get('.password-field').type(`${user.password}`);
          cy.get('.login-form > .standard-btn').click();
          cy.get('.search--form').should('be.visible');
          cy.get('.search--input').type('outkast');
          cy.get('.search--button').click();
          cy.get('.results').should('be.visible');
          cy.get('.results--title').first().click();
          cy.get('.add-to-collections-button').should('be.visible');
          cy.get('.buttons-container > :nth-child(2)').should('be.visible');
      })
    });
  });
  
   
    // cy.get('h2').should('contain', 'Clicked Album Title');
    // cy.get('p').contains('Artist: Clicked Artist');
    // cy.get('p').contains('Release Date: 2023-07-01');
  })

