import { celebrate } from 'celebrate'
import Joi from 'joi'

class ItemsValidation {
    public createItemValidation () {
        return celebrate({
            body: Joi.object({
                name: Joi.string().required(),
                description: Joi.string().required(),
                price: Joi.number().required(),
                quantity: Joi.number().required(),
                images: Joi.array().items(Joi.string()).optional()
            })
        })
    }
    
    public getItemsValidation () {
        return celebrate({
            query: Joi.object({
                page: Joi.string().optional(),
                limit: Joi.string().optional(),
                name: Joi.string().optional(),
            })
        })
    }

    public getItemValidation () {
        return celebrate({
            params: Joi.object({
                id: Joi.string().required()
            })
        })
    }

    public getItemInWarehouseValidation () {
        return celebrate({
            params: Joi.object({
                warehouseid: Joi.string().required()
            })
        })
    }

    public updateItemValidation () {
        return celebrate({
            params: Joi.object({
                id: Joi.string().required()
            }),
            body: Joi.object({
                name: Joi.string().optional(),
                description: Joi.string().optional(),
                price: Joi.number().optional(),
                quantity: Joi.number().optional(),
                images: Joi.array().items(Joi.string()).optional()
            })
        })
    }

    public setWareHouseToItemValidation () {
        return celebrate({
            params: Joi.object({
                id: Joi.string().required(),
                warehouseid: Joi.string().required()
            })
        })
    }

    public deleteItemValidation () {
        return celebrate({
            params: Joi.object({
                id: Joi.string().required()
            })
        })
    }
}

export default new ItemsValidation()
