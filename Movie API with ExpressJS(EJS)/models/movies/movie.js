class Movie{
    constructor(row){
        this.id = row.id,
        this.imdb = row.imdb,
        this.title = row.title,
        this.description = row.description,
        this.deleted = row.deleted
    }

    static mapAll(dbRows){
        const rows = []
        for(const row of dbRows){
            const movie = new Movie(row)
            rows.push(movie)
        }
        return rows
    }

    static mapOne(row){
        const movie = new Movie(row)

        return movie
    }
}

module.exports = Movie