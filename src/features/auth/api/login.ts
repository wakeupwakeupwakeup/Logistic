import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/shared/lib'
import { AdminService } from '@/features/auth/model/AdminModel'
import { compare } from '@node-rs/bcrypt'

export async function loginHandler(request: NextRequest) {
    try {
        await connectToDatabase()
        const body = await request.json()
        const { login, password } = body

        const user = await AdminService.findByLogin(login)
        if (!user) {
            return NextResponse.json(
                { error: 'Неверный логин или пароль' },
                { status: 401 }
            )
        }

        const isPasswordValid = await compare(password, user.password)
        if (!isPasswordValid) {
            return NextResponse.json(
                { error: 'Неверный логин или пароль' },
                { status: 401 }
            )
        }
        await AdminService.updateSession(user.login, true)

        return NextResponse.json({ message: 'Успешный вход' }, { status: 200 })
    } catch (error) {
        console.error('Ошибка при обработке входа', error)
        return NextResponse.json(
            { error: 'Внутренняя ошибка сервера' },
            { status: 500 }
        )
    }
}
