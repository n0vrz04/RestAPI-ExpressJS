class UserAddDTO{
    constructor(requestData){
        this.username = requestData.username
        this.password = requestData.password
        this.isactive = requestData.isactive
    }
}

module.exports = UserAddDTO