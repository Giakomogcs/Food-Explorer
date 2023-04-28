const knex = require("../database/knex")

class PratosController{
  async create(request,response){
    const {name,category,price,description,Ingredients} = request.body
    const {user_id} = request.params

    const [prato_id] = await knex("pratos").insert({
      name,
      category,
      price,
      description,
      user_id
    })

    const IngredientsInsert = Ingredients.map(name => {
      return {
        prato_id,
        name,
        user_id
      }
    })

    await knex("Ingredients").insert(IngredientsInsert)

    response.json()
  }

  async show(request,response){
    const {id} = request.params
    const prato = await knex("pratos").where({id}).first()
    const Ingredients = await knex("Ingredients").where({prato_id: id}).orderBy("name")

    return response.json({
      ...prato,
      Ingredients
    })
  }
}
module.exports = PratosController