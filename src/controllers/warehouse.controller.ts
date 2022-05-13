import { Request, Response } from "express";
import { Warehouse } from "../models/warehouse.model";

export interface GetWarehouseQuery {
    page: string;
    limit: string;
}

class WarehouseController {
    public async getWarehouses(req: Request, res: Response) {
        const { limit, page } = req.query as unknown as GetWarehouseQuery;
        const warehouses = await Warehouse.find({ deletedAt: null })
            .limit(parseInt(limit) || 20)
            .skip(parseInt(page) || 1)
            .sort({ createdAt: -1 })
            .select("-deletedAt -__v");
        const totalDocuments = await Warehouse.countDocuments({ deletedAt: null });
        res.status(200).json({
            data: {
                edges: warehouses,
                meta: {
                    page: parseInt(page) || 1,
                    limit: parseInt(limit) || 20,
                    hasNexPage: totalDocuments > (parseInt(page) || 1) * warehouses.length,
                    hasPreviousPage: parseInt(page) > 1,
                    totalDocuments
                }
            },
            status: true,
            message: "Warehouses fetched successfully"
        });
    }

    public async getWarehouse(req: Request, res: Response) {
        try {
            const warehouse = await Warehouse.findOne({ _id: req.params.id, deletedAt: null }).select("-deletedAt -__v");
            if (!warehouse) {
                res.status(404).json({
                    message: "Warehouse not found",
                    status: false
                });
            }
    
            res.status(200).json({
                data: warehouse,
                status: true
            });
        } catch (error) {
            res.status(500).json({
                status: false,
                errors: (error as Error).message
            });
        }
    }

    public async createWarehouse(req: Request, res: Response) {
        try {
            const warehouse = await Warehouse.create(req.body);
            // delete deletedAt and __v from the response
            const warehouseWithoutDeletedAt = warehouse.toObject();
            delete warehouseWithoutDeletedAt.deletedAt;
            delete warehouseWithoutDeletedAt.__v;
            res.status(201).json({
                data: warehouseWithoutDeletedAt,
                message: "Warehouse created successfully",
                status: true
            });
        } catch (error) {
            res.status(500).json({
                error: (error as Error).message,
                status: false,
            });
        }
    }
}

export default new WarehouseController();
