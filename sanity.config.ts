import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
import {visionTool} from '@sanity/vision'
import { dashboardTool } from "@sanity/dashboard";
import { netlifyWidget } from "sanity-plugin-dashboard-widget-netlify";

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

  plugins: [deskTool(), visionTool(),
    dashboardTool({
      widgets: [
        netlifyWidget({
            title: 'My Netlify deploys',
            sites: [
           
              {
                title: 'Roche',
                apiId: '8ae1d4e4-c135-47d6-938d-513e0227fe7d',
                buildHookId: '64c0c8eb6194b335a98edecf',
                name: 'imaginative-cupcake-ba7eaa',
                url:'https://imaginative-cupcake-ba7eaa.netlify.app/'
              }
            ]
        })
      ]
    })],
  
  studio:{
components: {
  navbar: StudioNavbar,
}
  },

  schema: {
    types: schemaTypes,
  },
})
