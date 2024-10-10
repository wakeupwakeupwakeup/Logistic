import mongoose, { Document, Schema } from 'mongoose'
import { connectToDatabase } from '@/shared/lib'

interface IAdmin extends Document {
    login: string
    password: string
    active_web_session: boolean
}

const adminSchema = new Schema<IAdmin>({
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    active_web_session: { type: Boolean, default: false },
})

const AdminModel =
    mongoose.models.Admin || mongoose.model<IAdmin>('Admin', adminSchema)

export class AdminService {
    static async findByLogin(login: string): Promise<IAdmin | null> {
        await connectToDatabase()
        return AdminModel.findOne({ login }).exec()
    }

    static async isLoginExists(login: string): Promise<boolean> {
        await connectToDatabase()
        const user = await AdminModel.findOne({ login }).exec()
        return user !== null
    }

    static async updateSession(login: string, active: boolean): Promise<void> {
        await connectToDatabase()
        await AdminModel.updateOne(
            { login },
            { $set: { active_web_session: active } }
        ).exec()
    }
}
