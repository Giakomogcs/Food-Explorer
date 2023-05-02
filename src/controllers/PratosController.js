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

    response.json("Prato criado com sucesso!")
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

  async index(request, response){
    const {name, user_id, Ingredients} = request.query

    let pratos;

    if(Ingredients){
      const filterIngredients = Ingredients.split(',').map(ingredient => ingredient.trim())

      pratos = await knex("Ingredients")
        .select([
          "pratos.id",
          "pratos.name",
          "pratos.user_id"
        ])
        .where("pratos.user_id", user_id)
        .whereLike("pratos.name", `%${name}%`)
        .whereIn("Ingredients.name",filterIngredients)
        .innerJoin("pratos", "pratos.id", "Ingredients.prato_id")
        .orderBy("pratos.name")

    } else {
      pratos = await knex("pratos")
        .where({user_id})
        .whereLike('name', `%${name}%`)
        .orderBy("name")
    }

    const userIngredients = await knex("Ingredients").where({user_id})
    const pratosWithIngredients = pratos.map(prato =>{
      const pratoIngredients = userIngredients.filter(Ingredients => Ingredients.prato_id === prato.id)

      return{
        ...prato,
        Ingredients: pratoIngredients
      }
    })

    return response.json(pratosWithIngredients)

  }

  async delete(request, response){
    const {id} = request.params

    await knex("pratos").where({id}).delete()

    return response.json("Prato deletado com sucesso!")
  }
}
module.exports = PratosController