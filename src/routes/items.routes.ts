import { Router } from 'express';
import itemsControllers from '../controllers/items.controllers';
import itemsValidation from '../validations/items.validation';

const itemsRouter = Router();

itemsRouter.get('/', itemsValidation.getItemsValidation(), itemsControllers.getItems);
itemsRouter.get('/:id', itemsValidation.getItemValidation(), itemsControllers.getItem);
itemsRouter.post('/', itemsValidation.createItemValidation(), itemsControllers.createItem);
itemsRouter.put('/:id', itemsValidation.updateItemValidation(), itemsControllers.updateItem);
itemsRouter.delete('/:id', itemsValidation.deleteItemValidation(), itemsControllers.deleteItem);
itemsRouter.post('/:id/warehouse/:warehouseid', itemsValidation.deleteItemValidation(), itemsControllers.setWareHouseToItem);
itemsRouter.get('/warehouse/:warehouseid', itemsValidation.getItemInWarehouseValidation(), itemsControllers.getItemsInWarehouse);

export default itemsRouter;
