import { type SchemaTypeDefinition } from 'sanity'
import contact from './contact'
import infoPage from './infoPage'
import landingBlurb from './landingBlurb'
import portfolio from './portfolio'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [contact, infoPage, landingBlurb, portfolio],
}
