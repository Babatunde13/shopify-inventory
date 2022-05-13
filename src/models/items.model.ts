import { Schema, model, Document } from 'mongoose'

export interface IItem extends Document {
    name: string;
    description: string;
    price: number;
    image: string;
    quantity: number;
    createdAt: Date;
    updatedAt: Date;
}

const itemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    images: [{
        type: String,
    }, {
        default: []
    }],
    quantity: {
        type: Number,
        required: true,
        min: 0
    },
    deletedAt: {
        type: Date,
        default: null
    },
    warehouse: {
        type: Schema.Types.ObjectId,
        ref: 'Warehouse'
    }
}, { timestamps: true })

export const Item = model<IItem>('Item', itemSchema)
