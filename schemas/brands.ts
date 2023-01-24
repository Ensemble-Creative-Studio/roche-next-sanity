import {defineField, defineType, defineArrayMember} from 'sanity'

export default defineType({
    name: 'brands',
    title: 'Brands',
    type: 'document',
    fields: [
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