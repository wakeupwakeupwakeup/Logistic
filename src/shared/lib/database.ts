import mongoose from 'mongoose'

const MONGODB_URI = process.env.DATABASE_URI + '/logistic'

if (!MONGODB_URI) {
    throw new Error(
        'Please define the MONGODB_URI environment variable inside .env.local'
    )
}

let isConnected: boolean = false

export async function connectToDatabase() {
    if (isConnected) {
        return Promise.resolve(true)
    }

    try {
        const { connection } = await mongoose.connect(MONGODB_URI as string)

        isConnected = connection.readyState === 1
        return Promise.resolve(isConnected)
    } catch (error) {
        console.error('Database connection error:', error)
        return Promise.reject(error)
    }
}
