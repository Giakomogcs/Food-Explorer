const knex = require("../database/knex");
const AppError = require("../utils/AppError");
const DiskStorage = require("../providers/DiskStorage")

class PratosPictureController {
  async update(request, response){
    const id = request.params
    const pictureFilename = request.file.filename

    const diskStorage = new DiskStorage()

    const prato = await knex("pratos")
    .where(id).first();

    if(!prato) {
      throw new AppError("Prato não encontrado!", 401)
    }

    if(prato.picture){
      await diskStorage.deleteFile(prato.picture)
    }

    const filename= await diskStorage.saveFile(pictureFilename)
    prato.picture = filename

    await knex("pratos").update(prato).where(id)

    return response.json(prato)
  }
}

module.exports = PratosPictureController