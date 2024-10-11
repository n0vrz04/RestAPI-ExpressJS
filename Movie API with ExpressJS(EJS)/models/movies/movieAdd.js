class MovieAddDTO{
    constructor(requestData) {
        this.imdb = requestData.imdb,
        this.title = requestData.title,
        this.description = requestData.description
    }
}

module.exports = MovieAddDTO