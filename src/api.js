function handleError(res) {
  if(!res.ok) {
    throw new Error(`HTTP Error: ${res.status} -- Please try again later`)
  }
  return res.json()
}
  
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
          const splitTitle = result.title.split(' - ')
          const [artist, title] = splitTitle
          return {
            masterId: result.master_id,
            title,
            artist,
            thumb: result.thumb,
            coverImage: result.cover_image
          }
      })
    }))
}
  
export { getTrendingAlbums, getAlbumsByMasterId, getAlbumsByGenre, searchAlbums }
