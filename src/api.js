const getTrendingAlbums = () => {
    return fetch('https://api.discogs.com/database/search?type=master&format=vinyl&key=GimREdkHlKcSjALMSwEP&secret=RZbpExNDRyTdbTAaiVxiJpiYgOcydrMJ&page=1&per_page=5&sort=hot')
        .then(res => {
            if (res.ok) {
                return res.json()
            }
            throw new Error('Something went wrong')
        })
        
}

const getRecommendedAlbums = (albumID) => {
    return fetch(`https://api.discogs.com/masters/${albumID}?key=GimREdkHlKcSjALMSwEP&secret=RZbpExNDRyTdbTAaiVxiJpiYgOcydrMJ`)
        .then(res => {
          if (res.ok) {
            return res.json()
          }
          throw new Error('Something went wrong')
        })
        .then(data => fetch(`https://api.discogs.com/database/search?type=master&format=vinyl&key=GimREdkHlKcSjALMSwEP&secret=RZbpExNDRyTdbTAaiVxiJpiYgOcydrMJ&page=1&per_page=5&genre=${data.genres[0]}`))
        .then(res => {
          if (res.ok) {
            return res.json()
          }
          throw new Error('Something went wrong')
        })
}
    

export {getTrendingAlbums, getRecommendedAlbums}