
export async function getLatestGames(page=1) {
    const LATEST_GAMES = 
      `https://internal-prod.apigee.fandom.net/v1/xapi/finder/metacritic/web?sortBy=-metaScore&productType=games&page=${page}&offset=0&limit=24&apiKey=1MOZgmNFxvmljaQR1X9KAij9Mo4xAY3u`;
    //const rawData = await fetch(LATEST_GAMES);
    
    const response = await fetch(LATEST_GAMES);
    const json = await response.json();

    const {data: {items}} = json;

    return items.map((item) => {
        const { description, slug, releaseDate, image, criticScoreSummary, title  } = item;
        const { score } = criticScoreSummary;

        const { bucketType, bucketPath } = image;
        const img = `https://www.metacritic.com/a/img/${bucketType}${bucketPath}`;

        return {
            description,
            releaseDate,
            score,
            slug,
            title,
            image: img
        };
    });
}


export async function getLatestMovies() {

    const the_movie_db_api = `https://api.themoviedb.org/3/trending/movie/day?language=es-CO`;
    const token = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5MzllN2JlZTQ5MDM0MTI0YWIxMTY4NzIyNTkzYzZiMyIsIm5iZiI6MTcyMTU5MjcxNi42NjU5NjMsInN1YiI6IjViNjFmYmQ4OTI1MTQxNDA2ODAxOTUxNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8xZ_xUGu-gtwtE5et9SaPjbsKTF-BTX42zQiRrPFIwk'
    
    const response = await fetch(the_movie_db_api, {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    });
    const json = await response.json();

    const {
        results
    } = json;

    return results.map((movie) => {
        const { id, name, title, original_title, original_name, overview, backdrop_path, poster_path, popularity } = movie;

        const back_image = `https://image.tmdb.org/t/p/w500/${backdrop_path}`;
        const front_image = `https://image.tmdb.org/t/p/w500/${poster_path}`;

        return {
            id: id,
            name,
            title,
            original_name,
            original_title,
            slug: id+5,
            description: overview,
            back_image,
            front_image,
            popularity
        }
    })

}

