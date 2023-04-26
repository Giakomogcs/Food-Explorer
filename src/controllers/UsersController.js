const AppError = require("../utils/AppError")
const sqliteConnection = require('../database/sqlite')
const {hash} = require("bcrypt")

class UsersController{
  async create(request,response){
    const {name, email, password, isAdmin} = request.body

    const database = await sqliteConnection()
    const checkUserExists = await database.get("SELECT * FROM users WHERE email = (?)", [email])

    if(checkUserExists){
      throw new AppError("Esse e-mail já está em uso")
    }

    const hashedPassword = await hash(password, 8)

    await database.run("INSERT INTO users (name, email, password, isAdmin) VALUES (?,?,?,?)",
    [name,email,hashedPassword,isAdmin?isAdmin:false])

    response.status(201).json({name, email, password:hashedPassword, isAdmin})
  }
}
module.exports = UsersController