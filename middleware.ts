import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { NextRequest, NextResponse } from "next/server";
import { locales } from './app/models';

// Get the preferred locale, similar to the above or using a library
function getLocale(acceptLanguageHeader: string) {
    const headers = { 'accept-language': acceptLanguageHeader }
    let languages = new Negotiator({ headers }).languages()
    let defaultLocale = 'en'

    return match(languages, locales, defaultLocale) // -> 'en'
}

export function middleware(request: NextRequest) {
    // Check if there is any supported locale in the pathname
    const { pathname } = request.nextUrl
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (pathnameHasLocale) return

    // Redirect if there is no locale
    const locale = getLocale(request.headers.get("accept-language") || '')
    request.nextUrl.pathname = `/${locale}${pathname}`
    // e.g. incoming request is /
    // The new URL is now /en/
    return NextResponse.redirect(request.nextUrl)
}

export const config = {
    matcher: [
        // Skip all internal paths (_next)
        '/((?!_next).*)',
        // Optional: only run on root (/) URL
        '/'
    ],
}