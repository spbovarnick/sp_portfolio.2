'use client'

/**
 * This configuration is used to for the Sanity Studio that’s mounted on the `/app/admin/[[...tool]]/page.tsx` route
 */

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

// Go to https://www.sanity.io/docs/api-versioning to learn how API versioning works
import {apiVersion, dataset, projectId} from './src/sanity/env'
import {schema} from './src/sanity/schemaTypes'
import {structure} from './src/sanity/structure'

const singletonTypes = new Set(['tagline', 'contact', 'infoPage', ])

const singletonActions = new Set(["publish", "discardChanges", "restore"])

const userTools = ['structure']

export default defineConfig({
  basePath: '/admin',
  projectId,
  dataset,
  scheduledPublishing: {
    enabled: false
  },
  // Add and edit the content schema in the './sanity/schemaTypes' folder
  plugins: [
    structureTool({structure}),
    // Vision is for querying with GROQ from inside the Studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({defaultApiVersion: apiVersion}),
  ],
  tools: (prev, context) => {
    const { currentUser } = context
    if (currentUser?.roles.find((role) => role.name != 'administrator')) {
      return prev.filter((tool) => userTools.includes(tool.name))
    }

    return [...prev]
  },
  schema: {
    types: schema.types,
    // Filter out singleton types from the global “New document” menu options
    templates: (templates) => templates.filter(({schemaType}) => !singletonTypes.has(schemaType))
  },
  document: {
    actions: (input, context) => singletonTypes.has(context.schemaType) ? input.filter(({ action }) => action && singletonActions.has(action)) : input
  }
})