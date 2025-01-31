import 'server-only'
import { Locales } from './models'

const dictionaries = {
    en: () => import('../dictionaries/en.json').then((module) => module.default),
    es: () => import('../dictionaries/es.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locales) =>
    dictionaries[locale]()