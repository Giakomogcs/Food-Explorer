const knex = require("../database/knex")

class PratosController{
  async create(request,response){
    const {name,category,price,description,Ingredients} = request.body
    const user_id = request.user.id

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

    return response.json("Prato criado com sucesso!")
  }

  async update(request,response){
    let {name, category, price, description, Ingredients} = request.body
    const {id} = request.params
    console.log(id)

    const updated_at = Date.now()

    const prato = await knex.select("name", "category", "price", "description").from("pratos").where("id", id)
    console.log(prato)

    name = name ?? prato.name
    category = category ?? prato.category
    price = price ?? prato.price
    description = description ?? prato.description

    console.log(name)
    console.log(category)
    console.log(price)
    console.log(description)


    await knex.update({
      name,
      category,
      price,
      description,
      updated_at
    }).where("id", id)

    console.log("Fiz upgrade")

    const IngredientsInsert = Ingredients.map(name => {
      return {
        prato_id,
        name,
        updated_at
      }
    })

    await knex("Ingredients").update(IngredientsInsert).where("id", id)

    return response.status(200).json("Atualizado com sucesso!")
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
    const {name, Ingredients} = request.query
    const user_id = request.user.id

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