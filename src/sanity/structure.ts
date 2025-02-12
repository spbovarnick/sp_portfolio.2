import type { StructureResolver } from 'sanity/structure';
import At from './icons/at';
import About from './icons/info';
import Blurb from './icons/blurb';
import Portfolio from './icons/portfolio';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Contact Info')
        .id('contact')
        .icon(() => At({ size: '512' }))
        .child(
          S.editor()
            .id('contact')
            .schemaType('contact')
            .documentId('contact')
            .title('Contact Info')
        ),
      S.listItem()
        .title('Info Page')
        .id('infoPage')
        .icon(() => About({ size: '512' }))
        .child(
          S.editor()
            .id('infoPage')
            .schemaType('infoPage')
            .documentId('infoPage')
            .title('Info Page')
        ),
      S.listItem()
        .title('Landing Blurb')
        .id('landingBlurb')
        .icon(() => Blurb({ size: '512' }))
        .child(
          S.editor()
            .id('landingBlurb')
            .schemaType('landingBlurb')
            .documentId('landingBlurb')
            .title('Landing Blurb')
        ),
      S.divider(),
      S.documentTypeListItem('portfolio')
        .title('Portfolio')
        .icon(() => Portfolio({ size: '512' })),
    ])