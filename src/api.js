function searchAlbums(query, page) {
  return fetch(`https://api.discogs.com/database/search?q=${query}&type=master&key=mbubAaAXseWPUpaJLkKU&secret=TrELhUezCNdFoIfmoAdHZmfJIXljOSfW&format=vinyl&page=${page}`)
    .then(res => {
      if (!res.ok) {
      throw new Error('Albums not found')
      }
      return res.json()})
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

export { searchAlbums }