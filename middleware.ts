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

    const metadataFiles = ['/robots.txt', '/sitemap.xml', '/favicon.ico']
    if (metadataFiles.some(file => pathname === file)) return
    const pathnameHasLocale = locales.some(
        (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    console.log(pathname);

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
        // Skip for api, favicon.ico, sitemap.xml, robots.txt (metadata files)
        '/((?!api|favicon.ico|sitemap.xml|robots.txt).*)',
        // Optional: only run on root (/) URL
        '/'
    ],
}