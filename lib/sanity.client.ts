import {createClient} from "next-sanity"

export const projectId = 'reejd2e7';

export const dataset = "production";
const apiVersion = '2025-11-01'
export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    perspective: 'published',
})
