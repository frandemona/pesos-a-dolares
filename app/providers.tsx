'use client'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'

if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
        person_profiles: 'identified_only', // or 'always' to create profiles for anonymous users as well
    })
}

export default function CSPostHogProvider({ children }: Readonly<{
    children: React.ReactNode;
}>) {
    if (process.env.NODE_ENV !== 'production') {
        return <>{children}</>
    }

    return (
        <PostHogProvider client={posthog} >
            {children}
        </PostHogProvider>
    )
}