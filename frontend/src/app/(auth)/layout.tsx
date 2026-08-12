import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Authentication',
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-black to-zinc-700 px-4">
      <h1 className="font-display text-2xl text-zinc-100 mb-10 tracking-wide">
        {process.env.NEXT_PUBLIC_APP_NAME ?? 'App'}
      </h1>
      <div className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 shadow-2xl backdrop-blur-sm">
        {children}
      </div>
    </div>
  )
}