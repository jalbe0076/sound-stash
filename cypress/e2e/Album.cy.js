describe('AlbumDetails', () => {
  it('As a user, I should be able to click on a specific album and see its details', () => {
    cy.visit('localhost:3000');
    
    cy.intercept('GET', 'https://api.discogs.com/database/search?q=outkast&type=master&key=mbubAaAXseWPUpaJLkKU&secret=TrELhUezCNdFoIfmoAdHZmfJIXljOSfW&format=vinyl&page=1',
      { fixture: 'results.json' }).as('searchResults');

      cy.intercept ('GET', 'https://api.discogs.com/database/search?type=master&format=vinyl&key=GimREdkHlKcSjALMSwEP&secret=RZbpExNDRyTdbTAaiVxiJpiYgOcydrMJ&page=1&per_page=5&sort=hot', {})
      

    cy.get('.search--form').should('be.visible')
      .get('.search--input').type('outkast')
      .get('.search--button').click()
      .get('.results').should('be.visible')
      .get('.results--grid').find('.results--card').first().click();
    
      cy.fixture('clickedAlbum').then((clickedAlbum) => {
        cy.intercept('GET', 'https://api.discogs.com/masters/25976?key=GimREdkHlKcSjALMSwEP&secret=RZbpExNDRyTdbTAaiVxiJpiYgOcydrMJ', (req) => {
          req.reply(clickedAlbum);
        }).as('getClickedAlbum');
  
        cy.wait('@getClickedAlbum');

  
        // cy.get('h2').should('have.text', clickedAlbum.title);
        // cy.get('.App > :nth-child(1) > :nth-child(3)').should('have.text', 'Artist: Clicked Artist');
        // cy.get('.App > :nth-child(1) > :nth-child(4)').should('have.text', 'Release Date: 2023-07-01');
        // cy.get('.album-genre').should('have.text', 'Genre: Pop');
        // cy.get('.album-styles').should('have.text', 'Style1, Style2');
        // cy.get('.album-cover').should('have.attr', 'src').should('include', 'https://example.com/clicked_album_cover.jpg');

        // cy.get('.add-to-journal-button').should('be.visible');
        // cy.get('.add-to-collections-button').should('be.visible');
      });
    });
  });
