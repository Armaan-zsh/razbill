import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { createSession } from '@/lib/auth'

export async function POST(request: NextRequest) {
    try {
        const { password } = await request.json()

        if (!password) {
            return NextResponse.json(
                { error: 'Password required' },
                { status: 400 }
            )
        }

        // Decode base64 hash to avoid PowerShell $ variable issues
        const hashB64 = process.env.ADMIN_PASSWORD_HASH_B64

        if (!hashB64) {
            return NextResponse.json(
                { error: 'Admin password not configured' },
                { status: 500 }
            )
        }

        const adminPasswordHash = Buffer.from(hashB64, 'base64').toString('utf-8')
        const isValid = await bcrypt.compare(password, adminPasswordHash)

        if (!isValid) {
            return NextResponse.json(
                { error: 'Invalid password' },
                { status: 401 }
            )
        }

        await createSession('admin')
        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Login error:', error)
        return NextResponse.json(
            { error: 'Server error' },
            { status: 500 }
        )
    }
}
