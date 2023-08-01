import {defineField, defineType, defineArrayMember} from 'sanity'
import {orderRankField, orderRankOrdering} from '@sanity/orderable-document-list'

export default defineType({
    name: 'brands',
    title: 'Brands',
    type: 'document',
    orderings: [orderRankOrdering],

    fields: [
      orderRankField({ type: "brands" }),

        {
            name: 'name',
            title: 'Name',
            type: 'string',
          },
          {
          name: 'slug',
          title: 'Slug',
          type: 'slug',
          options: {
          source: 'name',
          maxLength: 96
          }
          },
          defineField({
            name: 'text',
            description:
              'Brand description',
            title: 'Text',
         
            type: 'array',
            of: [
              defineArrayMember({
                type: 'block',
                marks: {
                  annotations: [
                    {
                      name: 'link',
                      type: 'object',
                      title: 'Link',
                      fields: [
                        {
                          name: 'href',
                          type: 'url',
                          title: 'Url',
                        },
                      ],
                    },
                  ],
                },
              }),
            ],
          }),
          {
            name: 'imageCover',
            type: 'image',
            title: 'Image Cover',
         
            // hidden: ({document}) => document?.title !== 'Home Page',
        },
        {
            
          title: "Image collection",
          name: "image",
          type: "array",
          of: [
            {
              title: "Image",
              name: "image",
              type: "image"
            }
          ]
        }
      ]
    });