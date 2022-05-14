# Shopify Inventory

Welcome to the Shopify Inventory API. You can access the API from the [Shopify API](https://shopify-inventory--babatunde13.repl.co/).

## API Documentation

### Introduction

View, Create, Update and Delete Inventories and their warehouse

### Overview

This API does not have any form of authentication.

### Status Codes

#### status codes for errors

1. 400 - Bad request error
2. 404 - Not Found Error
3. 500 - Server Error

#### Status Codes For Success Response

1. 200 - OK
2. 201 - Created

#### Response Format

##### Error Response

```json
{
 "status": false,
 "errors: ""
}
```

##### Success Response

```json
{
 "message": "<string>",
 "status": true,
 "data": "<object>"
}
```

### Endpoints

Base URL: [https://shopify-inventory--babatunde13.repl.co/api/v1/](https://shopify-inventory--babatunde13.repl.co/api/v1/)

1. `/` - Home route
    **Method - GET**
2. `/inventories` - Get all inventories
    **Method - GET**
    **Query**
    1. `limit` - number of items to be returned
    2. `page` - page number
    3. `name` - name of the inventory
3. `/inventories/<inventory_id>` - Get a single inventory
    **Method - GET**
4. `/inventories/<inventory_id>` - Update a single inventory
    **Method - PUT**
    **Body**
    1. `description` - description of the inventory(optional)
    2. `quantity` - quantity of the inventory(optional)
    3. `price` - price of the inventory(optional)
    4. `images` - images of the inventory(optional)
5. `/inventories/<inventory_id>` - Delete a single inventory
    **Method - DELETE**
6. `/inventories` - Create a new inventory
    **Method - POST**
    **Body**
    1. `name` - name of the inventory
    2. `description` - description of the inventory
    3. `quantity` - quantity of the inventory
    4. `price` - price of the inventory
    5. `images` - images of the inventory(optional)
7. `/inventories/<inventory_id>/warehouse/:warehouseid` - Set a warehouse for an inventory
    **Method - POST**
8. /warehouse - Get all warehouses
    **Method - GET**
    **Query**
    1. `limit` - number of items to be returned
    2. `page` - page number
    3. `name` - name of the warehouse
9. `/warehouse` - Create a new warehouse
    **Method - POST**
    **Body**
    1. `name` - name of the warehouse
    2. `address` - Warehouse address object
            a. `street` - street of the warehouse
            b. `city` - city of the warehouse
            c. `state` - state of the warehouse
            d. `postal_code` - postal_code/zip of the warehouse(optional)
            e. `country` - country of the warehouse
10. `/warehouse/<warehouse_id>` - Get a single warehouse
    **Method - GET**
11. `/warehouse/<warehouse_id>/inventories` - Get all inventories for a warehouse
    **Method - GET**
