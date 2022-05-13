import { config } from 'dotenv'

config()

export default {
    port: process.env.PORT || 3000,
    db: {
        uri: process.env.MONGO_DB_URI || 'mongodb://localhost:27017/test',
    },
}