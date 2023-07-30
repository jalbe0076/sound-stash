function handleError(res) {
  if(!res.ok) {
    throw new Error(`HTTP Error: ${res.status} -- Please try again later`)
  }
  return res.json()
}

const getRecommendedAlbums = (albumID) => {
  return fetch(`https://api.discogs.com/masters/${albumID}?key=GimREdkHlKcSjALMSwEP&secret=RZbpExNDRyTdbTAaiVxiJpiYgOcydrMJ`)
    .then(res => handleError(res))
    .then(data => fetch(`https://api.discogs.com/database/search?type=master&format=vinyl&key=GimREdkHlKcSjALMSwEP&secret=RZbpExNDRyTdbTAaiVxiJpiYgOcydrMJ&page=1&per_page=5&genre=${data.genres[0]}`))
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      handleError(res);
    });
};
  
const getTrendingAlbums = () => {
  return fetch('https://api.discogs.com/database/search?type=master&format=vinyl&key=GimREdkHlKcSjALMSwEP&secret=RZbpExNDRyTdbTAaiVxiJpiYgOcydrMJ&page=1&per_page=5&sort=hot')
      .then(res => handleError(res))
}
  
const getAlbumsByMasterId = (albumID) => {
  return fetch(`https://api.discogs.com/masters/${albumID}?key=GimREdkHlKcSjALMSwEP&secret=RZbpExNDRyTdbTAaiVxiJpiYgOcydrMJ`)
      .then(res => handleError(res))
      
}

const getAlbumsByGenre = (genre) => {
  return fetch(`https://api.discogs.com/database/search?type=master&format=vinyl&key=GimREdkHlKcSjALMSwEP&secret=RZbpExNDRyTdbTAaiVxiJpiYgOcydrMJ&page=1&per_page=50&genre=${genre}`)
      .then(res => handleError(res))
}
  
function searchAlbums(query, page) {
  return fetch(`https://api.discogs.com/database/search?q=${query}&type=master&key=mbubAaAXseWPUpaJLkKU&secret=TrELhUezCNdFoIfmoAdHZmfJIXljOSfW&format=vinyl&page=${page}`)
    .then(res => handleError(res))
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

export function getAlbumDetails(albumID) {
  return fetch(`https://api.discogs.com/masters/${albumID}?key=GimREdkHlKcSjALMSwEP&secret=RZbpExNDRyTdbTAaiVxiJpiYgOcydrMJ`)
    .then(response => handleError(response))
    .then(data => {
      const artistNames = Array.isArray(data.artists)
        ? data.artists.map(artist => artist.name).join('/')
        : 'Unknown Artist';

      return {
        title: data.title ,
        artist: artistNames,
        releaseDate: data.year,
        genre: data.genres,
        styles: data.styles,
        tracklist: data.tracklist?.map(track =>{
          return `${track.position} ${track.title} ${track.duration}`  
        }) ?? [],
        coverImg: data.images[0] ? data.images[0].uri : process.env.PUBLIC_URL + "/images/broken-record-lightcoral.png"
      };
    })
}


export { getTrendingAlbums, getAlbumsByMasterId, getAlbumsByGenre, searchAlbums, getRecommendedAlbums }

