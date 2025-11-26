import { SignJWT, jwtVerify } from 'jose'
import { cookies } from 'next/headers'

const SECRET = new TextEncoder().encode(
    process.env.JWT_SECRET || 'fallback-secret-key'
)

export async function createSession(userId: string) {
    const token = await new SignJWT({ userId })
        .setProtectedHeader({ alg: 'HS256' })
        .setExpirationTime('7d')
        .sign(SECRET)

    cookies().set('admin-session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
    })
}

export async function verifySession() {
    const token = cookies().get('admin-session')?.value

    if (!token) {
        return null
    }

    try {
        const verified = await jwtVerify(token, SECRET)
        return verified.payload.userId as string
    } catch (err) {
        return null
    }
}

export async function deleteSession() {
    cookies().delete('admin-session')
}
