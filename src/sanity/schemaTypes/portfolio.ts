import { defineField, defineType, SanityDocument } from "sanity";
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
      name: 'slug',
      title: 'URL Slug',
      type: 'slug',
      options: {
        source: (doc: SanityDocument) =>
          [doc.projectName, doc.projectLocation].filter(Boolean).join(' '),
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
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
        fields: [
          defineField({
            name: 'featured',
            title: 'Featured on Homepage',
            type: 'boolean',
            description: 'Feature this image on the homepage if project is selected to feature on homepage (max 2 per project)',
            initialValue: false,
          }),
          defineField({
            name: 'orientation',
            title: 'Display As',
            type: 'string',
            description: 'On the project page, Landscape crops this photo to fill the row edge-to-edge. Vertical shows the whole photo uncropped, letterboxed on the background color.',
            options: {
              list: [
                { title: 'Landscape (crop to fill)', value: 'landscape' },
                { title: 'Vertical (show full photo)', value: 'vertical' },
              ],
              layout: 'radio',
            },
            initialValue: 'landscape',
          }),
        ],
      }],
      validation: (rule) => rule.custom((photos, context) => {
        if (!Array.isArray(photos)) return true;
        const featuredCount = (photos as { featured?: boolean }[]).filter((p) => p.featured === true).length;
        if (featuredCount > 2) return 'Only 2 images per project can be featured on the homepage';
        const document = context.document as SanityDocument & { featured?: boolean };
        if (document?.featured && featuredCount < 1) {
          return 'Select at least 1 photo to feature before this project can appear on the homepage';
        }
        return true;
      }),
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Idenitfy select projects to appear on the home/landing page',
      initialValue: true,
      validation: (rule) => rule.custom((featured, context) => {
        if (!featured) return true;
        const document = context.document as SanityDocument & { photos?: { featured?: boolean }[] };
        const featuredPhotoCount = (document?.photos ?? []).filter((p) => p?.featured === true).length;
        if (featuredPhotoCount < 1) {
          return 'Mark at least 1 photo as "Featured on Homepage" in the Photos section before turning this on';
        }
        return true;
      }),
    }),
    defineField({
      name: 'homepageOrder',
      title: 'Homepage Order',
      type: 'number',
      description: 'Controls where this project appears on the homepage (lower numbers appear first). Only applies when Featured is on. Leave blank to show after ordered projects.',
      hidden: ({ document }) => !document?.featured,
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
  preview: {
    select: {
      title: 'projectName',
      featured: 'featured',
      homepageOrder: 'homepageOrder',
    },
    prepare({ title, featured, homepageOrder }) {
      const subtitle = !featured
        ? 'Not on homepage'
        : typeof homepageOrder === 'number'
          ? `On homepage — #${homepageOrder}`
          : 'On homepage — order not set';

      return {
        title: title || 'Untitled project',
        subtitle,
      };
    },
  },
})