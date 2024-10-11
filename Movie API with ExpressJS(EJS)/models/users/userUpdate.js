class UserUpdateDTO{
    constructor(requestData) {
        this.id = requestData.id,
        this.username = requestData.username,
        this.password = requestData.password,
        this.isactive = requestData.isactive
    }
}

module.exports = UserUpdateDTO