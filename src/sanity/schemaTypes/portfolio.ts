import { defineField, defineType } from "sanity";
import { orderRankField, orderRankOrdering } from "@sanity/orderable-document-list";

export default defineType({
  name: 'portfolio',
  title: 'Portfolio',
  type: 'document',
  orderings: [orderRankOrdering],
  fields: [
    defineField({
      name: 'projectName',
      title: 'Project Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'photos',
      title: 'Photos',
      type: 'array',
      of: [{
        type: 'image',
        validation: (rule) => rule.required(),
        options: {
          hotspot: true
        },
      }],
    }),
    orderRankField({ type: 'category' }),
    defineField({
      name: 'projectLocation',
      title: 'Project Location',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
    }),
    defineField({
      name: 'contractee',
      title: 'Contractee',
      type: 'string',
    }),
    defineField({
      name: 'photoCredit',
      title: 'Photo Credit(s)',
      type: 'array',
      of: [{
        type: 'document',
        fields: [
          defineField({
            name: 'photogName',
            title: 'Photographer Name',
            type: 'string',
            validation: (rule) => rule.required(),
          }),
          defineField({
            name: 'photogUrl',
            title: 'Photographer Site URL',
            type: 'url',
          }),
        ]
      }]
    }),
    defineField({
      name: 'projectType',
      title: 'Project Type',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
  ],
})