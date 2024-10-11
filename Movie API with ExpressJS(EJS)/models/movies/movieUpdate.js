class MovieUpdateDTO{
    constructor(requestData) {
        this.id = requestData.id,
        this.imdb = requestData.imdb,
        this.title = requestData.title,
        this.description = requestData.description
    }
}

module.exports = MovieUpdateDTO