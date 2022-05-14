import { Request, Response } from 'express'
import { Item } from '../models/items.model'
import { Warehouse } from '../models/warehouse.model'

export interface GetItemsQuery {
    page: string
    limit: string
    name: string
}

class ItemsController {
    public async getItems(req: Request, res: Response) {
        try {
            const { limit, page, name } = req.query as unknown as GetItemsQuery
            const filter = name ? { name: { $regex: name, $options: 'i' }, deletedAt: null } : { deletedAt: null }
            const items = await Item.find(filter)
                .limit(parseInt(limit) || 20)
                .skip((parseInt(page) || 1) - 1)
                .sort({ createdAt: -1 })
                .populate('warehouse', '-deletedAt -__v')
                .select('-deletedAt -__v')
            const totalDocuments = await Item.countDocuments(filter)
            res.status(200).json({
                data: {
                    edges: items,
                    meta: {
                        page: parseInt(page) || 1,
                        limit: parseInt(limit) || 20,
                        hasNexPage: totalDocuments > (parseInt(page) || 1) * parseInt(limit) || 20,
                        hasPreviousPage: parseInt(page) > 1,
                        totalDocuments
                    }
                },
                status: true,
                message: 'Items fetched successfully'
            })
        } catch (error) {
            res.status(500).json({
                status: false,
                error: (error as Error).message
            })
        }
    }

    public async getItem(req: Request, res: Response) {
        try {
            const item = await Item.findOne({ _id: req.params.id, deletedAt: null })
                .populate('warehouse', '-deletedAt -__v')
                .select('-deletedAt -__v')
            if (!item) {
                return res.status(404).json({
                    error: 'Item not found',
                    status: false
                })
            }
    
            return res.status(200).json({
                data: item,
                status: true
            })
        } catch (error) {
            return res.status(500).json({
                status: false,
                error: (error as Error).message
            })
        }
    }

    public async createItem(req: Request, res: Response) {
        try {
            const newItem = new Item(req.body)
            const item = await newItem.save()
            const itemWithoutDeletedAt = item.toObject()
            delete itemWithoutDeletedAt.deletedAt
            delete itemWithoutDeletedAt.__v
            return res.status(201).json({
                data: itemWithoutDeletedAt,
                message: 'Item created successfully',
                status: true
            })
        } catch (error) {
            return res.status(500).json({
                error: (error as Error).message,
                status: false
            })
        }
    }

    public async updateItem(req: Request, res: Response){
        try {
            const item = await Item.findOneAndUpdate({ _id: req.params.id, deletedAt: null }, { $set: req.body})
                .populate('warehouse', '-deletedAt -__v')
                .select('-deletedAt -__v')
            if (!item) {
                return res.status(404).json({
                    message: 'Item not found',
                    status: false
                })
            }
            return res.status(201).json({
                data: item,
                message: 'Item updated successfully',
                status: true
            })
        } catch (error) {
            return res.status(500).json({
                error: (error as Error).message,
                status: false
            })
        }
    }

    public async deleteItem(req: Request, res: Response) {
        try {
            const item = await Item.findOneAndUpdate({ _id: req.params.id, deletedAt: null }, { deletedAt: new Date() }).select('-deletedAt -__v')
            return res.status(201).json({
                data: item,
                message: 'Item deleted successfully',
                status: true
            })
        } catch (error) {
            return res.status(500).json({
                error: (error as Error).message,
                status: false
            })
        }
    }

    public async setWareHouseToItem(req: Request, res: Response){
        try {
            const warehouse = await Warehouse.findOne({ _id: req.params.warehouseid, deletedAt: null })
            if (!warehouse) {
                return res.status(404).json({
                    error: 'Warehouse not found',
                    status: false
                })
            }
            const item = await Item.findOneAndUpdate({ _id: req.params.id, deletedAt: null }, { $set: { warehouse: warehouse._id } })
                .populate('warehouse', '-deletedAt -__v')
                .select('-deletedAt -__v')
            if (!item) {
                return res.status(404).json({
                    error: 'Item not found',
                    status: false
                })
            }
            return res.status(201).json({
                data: item,
                message: 'Warehouse set for item successfully',
                status: true
            })
        } catch (error) {
            return res.status(500).json({
                error: (error as Error).message,
                status: false
            })
        }
    }
}

export default new ItemsController()
