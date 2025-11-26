'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            })

            if (res.ok) {
                router.push('/admin')
            } else {
                const data = await res.json()
                setError(data.error || 'Invalid password')
            }
        } catch (err) {
            setError('Something went wrong')
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-foam mb-2">
                        <span className="text-iris">~/</span>admin
                    </h1>
                    <p className="text-muted">Enter password to continue</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="password"
                            className="w-full px-4 py-3 bg-surface border border-overlay rounded-lg text-text placeholder-muted focus:outline-none focus:border-iris transition"
                            autoFocus
                            disabled={loading}
                        />
                    </div>

                    {error && (
                        <p className="text-love text-sm">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading || !password}
                        className="w-full px-4 py-3 bg-iris text-base rounded-lg font-medium hover:bg-foam transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Checking...' : 'Login'}
                    </button>
                </form>

                <p className="text-center text-muted text-sm">
                    <kbd className="px-2 py-1 bg-surface border border-overlay rounded text-xs">Esc</kbd> to go back
                </p>
            </div>
        </div>
    )
}
