import { Auth0Provider } from "@bcwdev/auth0provider";
import { housesService } from "../services/HousesService";
import BaseController from "../utils/BaseController";
import { logger } from "../utils/Logger";


export class HousesController extends BaseController {
    constructor(){
        super('api/houses')
        this.router
            .get('', this.getAllHouses)
            .get('/:id', this.getById)

            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createHouse)
            .put('/:id', this.editHouse)
            .delete('/:id', this.removeHouse)
        
    }

    async getById(req, res, next) {
        try {
            const houses = await housesService.getById(req.params.id)
            return res.send(houses)
        } catch (error) {
            next(error)
        }
    }

    async getAllHouses(req, res, next){
        try {
            const houses = await housesService.getAllHouses()
            return res.send(houses)
        } catch (error) {
            next(error)
        }
    }

    async createHouse(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const house = await housesService.createHouse(req.body)
            return res.send(house)
        } catch (error) {
            next(error)
        }
    }

    async editHouse(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            req.body.id = req.params.id
            const update = await housesService.editHouse(req.body)
            return res.send(update) 
        } catch (error) {
            next(error)
        }
    }

    async removeHouse(req, res, next) {
        try {
            const userId = req.userInfo.id
            const houseId = req.params.id
            await housesService.removeHouse(houseId, userId)
            return res.send('Removed House')
        } catch (error) {
            next(error)
        }
    }
    
}