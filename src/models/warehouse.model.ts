import { Schema, model, Document } from "mongoose";

export interface IWarehouse extends Document {
    name: string;
    address: {
        city: string;
        street: string;
        postal_codes: number;
        state: string;
        country: string;
    };
}

const warehouseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        city: {
            type: String,
            required: true
        },
        street: {
            type: String,
            required: true
        },
        postal_codes: {
            type: String,
            required: false,
            default: null
        },
        state: {
            type: String,
            required: false,
        },
        country: {
            type: String,
            required: true
        }
    },
    deletedAt: {
        type: Date,
        default: null
    }
}, { timestamps: true });

export const Warehouse = model<IWarehouse>("Warehouse", warehouseSchema);
