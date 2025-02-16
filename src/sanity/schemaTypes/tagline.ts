import { defineField, defineType } from "sanity";

export default defineType({
  name: 'tagline',
  title: 'Tagline',
  type: 'document',
  fields: [
    defineField({
      name: 'copy',
      title: 'Copy',
      type: 'text',
      description: 'A one-sentence tag that will appear on the home page along with your body of work and also at the top of your info page',
      validation: rule => rule.required(),
    })
  ]
})