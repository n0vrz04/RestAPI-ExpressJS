class UserLoginDTO{
    constructor(reqData){
        this.username = reqData.username,
        this.password = reqData.password
    }
}

module.exports = UserLoginDTO