import { Router } from 'express'
import warehouseController from '../controllers/warehouse.controller'
import wareHouseValidation from '../validations/warehouse.validation'

const warehouseRouter = Router()

warehouseRouter.get('/', wareHouseValidation.getWareHousesValidation(), warehouseController.getWarehouses)
warehouseRouter.get('/:id', wareHouseValidation.getWareHouseValidation(), warehouseController.getWarehouse)
warehouseRouter.post('/', wareHouseValidation.createWarehouseValidation(), warehouseController.createWarehouse)
warehouseRouter.get('/:warehouseid/inventories', wareHouseValidation.getItemInWarehouseValidation(), warehouseController.getItemsInWarehouse)

export default warehouseRouter
