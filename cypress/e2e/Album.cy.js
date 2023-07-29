describe('AlbumDetails', () => {
  before(() => {
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
    cy.visit('localhost:3000');
  });

  it('As a user, I should be able to click on a specific album and see its details', () => {
    cy.intercept(
      'GET',
      'https://api.discogs.com/database/search?q=outkast&type=master&key=mbubAaAXseWPUpaJLkKU&secret=TrELhUezCNdFoIfmoAdHZmfJIXljOSfW&format=vinyl&page=1',
      { fixture: 'results.json' }
    ).as('searchResults');

    cy.intercept(
      'GET',
      'https://api.discogs.com/database/search?type=master&format=vinyl&key=GimREdkHlKcSjALMSwEP&secret=RZbpExNDRyTdbTAaiVxiJpiYgOcydrMJ&page=1&per_page=5&sort=hot',
      {}

    );

    cy.get('.search--form').should('be.visible')
      .get('.search--input').type('outkast')
      .get('.search--button').click()
      .get('.results').should('be.visible');
  
    cy.get('#25976 > .results--image').first().click();

    const clickedAlbum = {
      "title": "Clicked Album Title",
      "artist": "Clicked Artist",
      "releaseDate": "2023-07-01",
      "genre": "Pop",
      "styles": ["Style1", "Style2"],
      "tracklist": ["Track 1", "Track 2", "Track 3"],
      "coverImg": "https://example.com/clicked_album_cover.jpg"
    };

    cy.get('.add-to-collections-button').scrollIntoView().should('be.visible');
    cy.get('.buttons-container > :nth-child(2)').should('be.visible');
  

    expect(clickedAlbum.title).to.equal('Clicked Album Title');
    expect(clickedAlbum.artist).to.equal('Clicked Artist');
    expect(clickedAlbum.releaseDate).to.equal('2023-07-01');
    expect(clickedAlbum.genre).to.equal('Pop');
    expect(clickedAlbum.styles).to.deep.equal(['Style1', 'Style2']);
    expect(clickedAlbum.tracklist).to.deep.equal(['Track 1', 'Track 2', 'Track 3']);
    expect(clickedAlbum.coverImg).to.equal('https://example.com/clicked_album_cover.jpg');

    // cy.contains('.buttons-container button', 'Add to journal entry').should('be.visible');
    // cy.get('h2').should('contain', 'Clicked Album Title');
    // cy.get('p').contains('Artist: Clicked Artist');
    // cy.get('p').contains('Release Date: 2023-07-01');
  })
})
