describe('AlbumDetails', () => {
  beforeEach(() => {
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
        body: {
          "title": "Clicked Album Title",
          "artist": "Clicked Artist",
          "releaseDate": "2023-07-01",
          "genre": "Pop",
          "styles": ["Style1", "Style2"],
          "tracklist": ["Track 1", "Track 2", "Track 3"],
          "coverImg": "https://example.com/clicked_album_cover.jpg"
        }
      }
    ).as('getClickedAlbum');

    cy.visit('http://localhost:3000/login');
    cy.fixture('mockUsers').as('users');
  });

  it('As a user, I should be able to click on a specific album and see its details', () => {
    cy.visit('http://localhost:3000/login');
    cy.fixture('mockUsers').as('users');
  
    cy.get('@users').then((users) => {
      const user = users[1];
      cy.get('.username-field').type(user.username);
      cy.get('.password-field').type(user.password);
      cy.get('.login-button').click();
      cy.get('.search--form').should('be.visible');
      cy.get('.search--input').type('outkast');
      cy.get('.search--button').click();
      cy.get('.results').should('be.visible');
      cy.get('#25976 > .results--image').first().click();


      cy.get('.add-to-collections-button').should('be.visible');
      cy.get('.buttons-container > :nth-child(2)').should('be.visible');
    });
  });
  
   
    // cy.get('h2').should('contain', 'Clicked Album Title');
    // cy.get('p').contains('Artist: Clicked Artist');
    // cy.get('p').contains('Release Date: 2023-07-01');
  })

