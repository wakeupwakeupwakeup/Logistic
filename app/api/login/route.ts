import { NextRequest } from 'next/server'
import { loginHandler } from '@/features/auth/api/login'

export async function POST(request: NextRequest) {
    return await loginHandler(request)
}
