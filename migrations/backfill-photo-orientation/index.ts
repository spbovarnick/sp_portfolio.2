import { at, defineMigration, set } from 'sanity/migrate'

interface ImageNode {
  _type: string
  orientation?: string
  asset?: { _ref?: string }
}

function dimensionsFromAssetRef(ref: string | undefined) {
  if (!ref) return null
  // Sanity image asset refs encode dimensions, e.g. "image-abc123-2000x3000-jpg"
  const match = ref.match(/-(\d+)x(\d+)-/)
  if (!match) return null
  return { width: Number(match[1]), height: Number(match[2]) }
}

export default defineMigration({
  title: 'Backfill photo orientation from image dimensions',
  documentTypes: ['portfolio'],

  migrate: {
    object(node, path, context) {
      const image = node as unknown as ImageNode
      if (image._type !== 'image') return

      // Don't touch photos that already have an explicit orientation set
      // (e.g. the 74 Duke photos Sarita already hand-picked as vertical)
      if (image.orientation) return

      const dimensions = dimensionsFromAssetRef(image.asset?._ref)
      if (!dimensions) return

      const orientation = dimensions.height > dimensions.width ? 'vertical' : 'landscape'

      return at('orientation', set(orientation))
    },
  },
})
