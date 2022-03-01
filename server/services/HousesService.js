import { dbContext } from "../db/DbContext"
import { BadRequest, Forbidden } from "../utils/Errors"


class HousesService {
    // NOTE login info needed
    async getById(id) {
        const house = await dbContext.Houses.findById(id)
        if(!house) {
            throw new BadRequest('Invalid House Id')
        }
        return house
    }

    async getAllHouses() {
        const houses = await dbContext.Houses.find({})
        return houses
    }

    async createHouse(body) {
        const houses = await dbContext.Houses.create(body)
        return houses
    }

    async editHouse(update) {
        const original = await this.getById(update.id)
        if(original.creatorId.toString() !== update.creatorId) {
            throw new Forbidden('Cannot edit someone elses house')
        }

        original.footage = update.footage ? update.footage : original.footage
        original.bedrooms = update.bedrooms ? update.bedrooms : original.bedrooms
        original.bathrooms = update.bathrooms ? update.bathrooms : original.bathrooms
        original.year = update.year ? update.year : original.year
        original.price = update.price ? update.price : original.price
        original.imgUrl = update.imgUrl ? update.imgUrl : original.imgUrl
        original.description = update.description ? update.description : original.description

        await original.save({runValidators: true})
        return original
    }

    async removeHouse(houseId, userId) {
        const house = await this.getById(houseId)
        if(house.creatorId.toString() !== userId) {
            throw new Forbidden('Cannot Delete Unowned House')
        }
        await dbContext.Houses.findByIdAndDelete(houseId)
    }
}

export const housesService = new HousesService()