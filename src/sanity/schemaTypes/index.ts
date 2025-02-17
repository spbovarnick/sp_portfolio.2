import { type SchemaTypeDefinition } from 'sanity'
import contact from './contact'
import infoPage from './infoPage'
import portfolio from './portfolio'
import tagline from './tagline'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [contact, infoPage, portfolio, tagline],
}
