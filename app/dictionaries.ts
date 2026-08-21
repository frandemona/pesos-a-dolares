import 'server-only'
import { Locales } from './models'

const dictionaries = {
    en: () => import('../dictionaries/en.json').then((module) => module.default),
    es: () => import('../dictionaries/es.json').then((module) => module.default),
}

/**
 * Loads the dictionary for a given locale.
 *
 * @param {Locales} locale - The locale to load ('en' | 'es').
 * @returns {Promise<Record<string, any>>} The dictionary object.
 */
export const getDictionary = async (locale: Locales) => {
    const dictionaryLoader = dictionaries[locale]
    if (!dictionaryLoader) {
        throw new Error(`Dictionary for locale "${locale}" not found`)
    }
    return dictionaryLoader()
}