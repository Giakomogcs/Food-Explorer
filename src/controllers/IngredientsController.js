const knex = require("../database/knex")

class IngredientsController {
  async index(request, response){
    const user_id = request.user.id

    const Ingredients = await knex("Ingredients")
      .where({user_id})

      return response.json(Ingredients)
  }
}

module.exports = IngredientsController