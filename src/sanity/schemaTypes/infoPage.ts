import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'infoPage',
  title: 'Info Page',
  type: 'document',
  fields: [
    defineField({
      name: 'portrait',
      title: 'Portrait',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required().assetRequired(),
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'This text is used to optinmize accessibility',
          validation: (rule) => rule.required(),
        }),
        defineField({
          name: 'credit',
          title: 'Credit Name',
          type: 'string',
          description: 'Photographer credit for the photo',
        }),
        defineField({
          name: 'creditUrl',
          title: 'Credit URL',
          type: 'url',
          description: 'A URL for the credited photographer',
        })
      ]
    }),
    defineField({
      name: 'bioBlurb',
      title: 'Bio Blurb',
      type: 'text',
      description: 'A few sentences to describe yourself on your Info page',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'previousProjects',
      title: 'Previous Projects',
      type: 'array',
      of: [{
        type: 'document',
        fields: [
          defineField({
            name: 'projectName',
            title: 'Project Name',
            type: 'string',
            validation: rule => rule.required(),
          }),
          defineField({
            name: 'projectCity',
            title: 'Project City',
            type: 'string',
            validation: rule => rule.required(),
          }),
          defineField({
            name: 'studio',
            title: 'Studio or Employer',
            type: 'string',
          }),
        ]
      }],
    }),
    defineField({
      name: 'pressContact',
      title: 'Press Contact',
      type: 'email'
    })
  ]
})