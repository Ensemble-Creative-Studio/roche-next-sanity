import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
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

  plugins: [deskTool(), visionTool()],
  studio:{
components: {
  navbar: StudioNavbar,
}
  },

  schema: {
    types: schemaTypes,
  },
})
