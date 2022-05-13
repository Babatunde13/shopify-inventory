import mongoose from 'mongoose'

export interface IConnectOptions {
    createIndexOnConnect?: boolean;
    indexSpec?: object;
    collection?: string;
}

export default async function connectToDb(uri: string, options: IConnectOptions = {}) {
    try {
        await mongoose.connect(uri, {})
        if (options.createIndexOnConnect && options.collection) {
            await createIndex(options.collection, options.indexSpec)
        }
            
        return {
            data: {}
        }
    } catch (error) {
        console.log('Error connecting to MongoDB:', (error as Error).message)
        return {
            error: new Error('Error connecting to MongoDB: ' + (error as Error).message)
        }
    }
}

export async function disconnectFromDb() {
    try {
        await mongoose.disconnect();
        console.log('Disconnected from MongoDB');
        return {
            data: {}
        }
    } catch (error) {
        console.log('Error disconnecting from MongoDB:', (error as Error).message);
        return {
            error: new Error('Error disconnecting from MongoDB: ' + (error as Error).message)
        }
    }
}

export async function createIndex (collection: string, index: any, options: any = {}) {
    try {
        const indexName = await mongoose.connection.db.collection(collection).createIndex(index, options)
        console.log('Created index on collection', collection, 'with name', indexName)
        return {
            data: {}
        }
    } catch (error) {
        return {
            error: new Error('Error creating index: ' + (error as Error).message)
        }
    }
}

export async function getIndexes (collection: string, indexName?: any) {
    try {
        const index = await mongoose.connection.db.collection(collection).indexes()
        if (indexName) {
            return {
                data: index.find(index => index.name === indexName)
            }
        }
        return {
            data: index
        }
    } catch (error) {
        return {
            error: new Error('Error getting index: ' + (error as Error).message)    
        }
    }
}

export async function getDbName () {
    try {
        const dbName = mongoose.connection.db.databaseName;
        return {
            data: dbName
        }
    }
    catch (error) {
        return {
            error: new Error('Error getting db name: ' + (error as Error).message)
        }
    }
}
