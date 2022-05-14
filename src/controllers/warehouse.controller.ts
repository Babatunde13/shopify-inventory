import { Request, Response } from 'express'
import { Item } from '../models/items.model'
import { Warehouse } from '../models/warehouse.model'

export interface GetWarehouseQuery {
    page: string
    limit: string
}

class WarehouseController {
    public async getWarehouses(req: Request, res: Response) {
        try {
            const { limit, page } = req.query as unknown as GetWarehouseQuery
            const warehouses = await Warehouse.find({ deletedAt: null })
                .limit(parseInt(limit) || 20)
                .skip((parseInt(page) || 1) - 1)
                .sort({ createdAt: -1 })
                .select('-deletedAt -__v')
            const totalDocuments = await Warehouse.countDocuments({ deletedAt: null })
            const hasNextPage = totalDocuments > ((parseInt(page) || 1) * parseInt(limit) || 20)
            res.status(200).json({
                data: {
                    edges: warehouses,
                    meta: {
                        page: parseInt(page) || 1,
                        limit: parseInt(limit) || 20,
                        hasNextPage,
                        hasPreviousPage: parseInt(page) > 1,
                        totalDocuments
                    }
                },
                status: true,
                message: 'Warehouses fetched successfully'
            })
        } catch (error) {
            res.status(500).json({
                status: false,
                error: (error as Error).message
            })
        }
    }

    public async getWarehouse(req: Request, res: Response) {
        try {
            const warehouse = await Warehouse.findOne({ _id: req.params.id, deletedAt: null }).select('-deletedAt -__v')
            if (!warehouse) {
                res.status(404).json({
                    message: 'Warehouse not found',
                    status: false
                })
            }
    
            res.status(200).json({
                data: warehouse,
                status: true
            })
        } catch (error) {
            res.status(500).json({
                status: false,
                error: (error as Error).message
            })
        }
    }

    public async createWarehouse(req: Request, res: Response) {
        try {
            const newWarehouse = new Warehouse(req.body)
            const warehouse = await newWarehouse.save()
            const warehouseWithoutDeletedAt = warehouse.toObject()
            delete warehouseWithoutDeletedAt.deletedAt
            delete warehouseWithoutDeletedAt.__v
            res.status(201).json({
                data: warehouseWithoutDeletedAt,
                message: 'Warehouse created successfully',
                status: true
            })
        } catch (error) {
            res.status(500).json({
                error: (error as Error).message,
                status: false,
            })
        }
    }

    public async getItemsInWarehouse(req: Request, res: Response) {
        try {
            const item = await Item.find({ warehouse: req.params.warehouseid, deletedAt: null })
                .select('-deletedAt -__v')
                .populate('warehouse', '-deletedAt -__v')
            if (!item) {
                return res.status(404).json({
                    error: 'No items found in this warehouse',
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
}

export default new WarehouseController()
