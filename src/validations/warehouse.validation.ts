import { celebrate } from 'celebrate'
import Joi from 'joi'

class WarehouseValidation {
    public createWarehouseValidation () {
        return celebrate({
            body: Joi.object({
                name: Joi.string().required(),
                address: Joi.object({
                    city: Joi.string().required(),
                    street: Joi.string().optional(),
                    postal_codes: Joi.string().optional(),
                    state: Joi.string().required(),
                    country: Joi.string().required()
                }).required()
            })
        })
    }
    
    public getWareHousesValidation () {
        return celebrate({
            query: Joi.object({
                page: Joi.string().optional(),
                limit: Joi.string().optional(),
                name: Joi.string().optional(),
            })
        })
    }

    public getWareHouseValidation () {
        return celebrate({
            params: Joi.object({
                id: Joi.string().required()
            })
        })
    }
}

export default new WarehouseValidation()
