import {defineCliConfig} from 'sanity/cli'
const projectId = 'reejd2e7';
const dataset = "production";
export default defineCliConfig({
  api: {
    projectId,
    dataset,
},
})
