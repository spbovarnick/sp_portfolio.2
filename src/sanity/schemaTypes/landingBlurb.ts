import { defineField, defineType } from "sanity";

export default defineType({
  name: 'landingBlurb',
  title: 'Landing Blurb',
  type: 'document',
  fields: [
    defineField({
      name: 'blurb',
      title: 'Blurb',
      type: 'text',
      description: 'The very short blurb that will appear on the landing/homepage',
      validation: (rule) => rule.required(),
    }),
  ]
})