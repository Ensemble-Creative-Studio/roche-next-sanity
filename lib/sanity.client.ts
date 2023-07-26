import {createClient} from "next-sanity"

export const projectId = 'reejd2e7';

export const dataset = "production";
const apiVersion = '2022-11-15'
const token = process.env.NEXT_WEBHOOK_SECRET
export const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
})