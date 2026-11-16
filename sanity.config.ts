import {defineConfig} from 'sanity'
import { DocumentIcon } from '@sanity/icons/Document'

import {visionTool} from '@sanity/vision'
import {structureTool} from 'sanity/structure'
import {orderableDocumentListDeskItem} from '@sanity/orderable-document-list'
import {schemaTypes} from './schemas'
import StudioNavbar from './app/(user)/components/StudioNavbar'
const projectId = 'reejd2e7';
const dataset = "production";

export default defineConfig({
  basePath: "/studio",
  name: 'default',
  title: 'Roche Agency',

  projectId,
  dataset,

  plugins: [structureTool({
    structure: (S, context) => {
      return S.list()
        .title('Content')
        .items([
          orderableDocumentListDeskItem({type: 'brands',     title: 'Brands', S, context}),          // ... add all other desk items here.
          orderableDocumentListDeskItem({type: 'page',  icon: DocumentIcon,   title: 'Pages  ', S, context}),          // ... add all other desk items here.
        ])
    }
  }), visionTool()],

  studio:{
components: {
  navbar: StudioNavbar,
}
  },

  schema: {
    types: schemaTypes,
  },
})
