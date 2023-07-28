function handleError(res) {
  throw new Error(`HTTP Error: ${res.status} -- Please try again later`);
}

const getTrendingAlbums = () => {
  return fetch('https://api.discogs.com/database/search?type=master&format=vinyl&key=GimREdkHlKcSjALMSwEP&secret=RZbpExNDRyTdbTAaiVxiJpiYgOcydrMJ&page=1&per_page=5&sort=hot')
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      handleError(res);
    });
};

const getRecommendedAlbums = (albumID) => {
  return fetch(`https://api.discogs.com/masters/${albumID}?key=GimREdkHlKcSjALMSwEP&secret=RZbpExNDRyTdbTAaiVxiJpiYgOcydrMJ`)
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      handleError(res);
    })
    .then(data => fetch(`https://api.discogs.com/database/search?type=master&format=vinyl&key=GimREdkHlKcSjALMSwEP&secret=RZbpExNDRyTdbTAaiVxiJpiYgOcydrMJ&page=1&per_page=5&genre=${data.genres[0]}`))
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      handleError(res);
    });
};

function searchAlbums(query, page) {
  return fetch(`https://api.discogs.com/database/search?q=${query}&type=master&key=mbubAaAXseWPUpaJLkKU&secret=TrELhUezCNdFoIfmoAdHZmfJIXljOSfW&format=vinyl&page=${page}`)
    .then(res => {
      if (!res.ok) {
        handleError(res);
      }
      return res.json();
    })
    .then(data => ({
      pagination: data.pagination,
      results: data.results
    }))
    .then(res => ({
      ...res,
      results: res.results.map(result => {
        const splitTitle = result.title.split(' - ');
        const [artist, title] = splitTitle;
        return {
          masterId: result.master_id,
          title,
          artist,
          thumb: result.thumb,
          coverImage: result.cover_image
        };
      })
    }));
}

function getAlbumDetails(albumID) {
  return fetch(`https://api.discogs.com/masters/${albumID}?key=GimREdkHlKcSjALMSwEP&secret=RZbpExNDRyTdbTAaiVxiJpiYgOcydrMJ`)
    .then(res => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(`HTTP Error: ${res.status} -- Please try again later!`);
      }
    })
    .then(data => {

      console.log('Album details and data:', data);
        return {
        title: data.title ?? 'Unknown Title',
        artist: data.artists?.[0]?.name ?? 'Unknown Artist',
        releaseDate: data.year ?? 'Unknown Release Date',
        genre: data.genres?.[0] ?? 'Unknown Genre',
        styles: data.styles ?? [],
        tracklist: data.tracklist?.map(track => track.title) ?? [],
        coverImg: data.images?.[0]?.uri ?? ''
        }    
        //returns object containing properties taken from API response
    })
    .catch(error => {
      console.log('Error:', error.message);
      throw error;
    });
}

export { getTrendingAlbums, getRecommendedAlbums, searchAlbums, getAlbumDetails };
