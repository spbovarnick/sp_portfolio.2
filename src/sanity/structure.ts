import type { StructureResolver } from 'sanity/structure';
import At from './icons/at';
import About from './icons/info';
import {FolderIcon} from '@sanity/icons'
import { orderableDocumentListDeskItem } from '@sanity/orderable-document-list';
import { Tag } from './icons/tag';
import PaintBucket from './icons/bucket';

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S, context) =>
  S.list()
    .title('Content')
    .items([
      orderableDocumentListDeskItem({
        icon: FolderIcon,
        title: 'Portfolio',
        type: 'portfolio',
        S,
        context
      }),
      S.divider(),
      S.listItem()
        .title('Tagline')
        .id('tagline')
        .icon(() => Tag({ size: '512' }))
        .child(
          S.editor()
            .id('tagline')
            .schemaType('tagline')
            .documentId('tagline')
            .title('Tagline')
        ),
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
        .title('Background Color')
        .id('bgColor')
        .icon(() => PaintBucket({ size: '512' }))
        .child(
          S.editor()
            .id('bgColor')
            .schemaType('bgColor')
            .documentId('bgColor')
            .title('Background Color')
        )
    ])