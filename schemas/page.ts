import {defineField, defineType, defineArrayMember} from 'sanity'
interface CustomDocumentType {
    _id: string;
    title: string;
  }
export default defineType({
    name: 'page',
    type: 'document',
    fields: [
        {
            name: 'title',
            type: 'string',
            title: 'Title',
            validation: Rule => Rule.required(),
            readOnly: ({ document }) => !document?.publishedOnce,
        },
        {
            name: 'videoBackground',
            type: 'url',
            title: 'Video Background URL',
            hidden: ({document}) => document?.title !== 'Home Page',
        },
        {
            name: 'description',
            type: 'text',
            title: 'Description',
            hidden: ({document}) => document?.title !== 'Home Page',
        },
        {
            name: 'image1',
            type: 'image',
            title: 'Image',
            hidden: ({document}) => document?.title !== 'Agency',
            // hidden: ({document}) => document?.title !== 'Home Page',
        },
        defineField({
            name: 'text1',
            description:
              '',
            title: 'Text',
            hidden: ({document}) => document?.title !== 'Agency',
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
            name: 'image7',
            type: 'image',
            title: 'Image',
            hidden: ({document}) => document?.title !== 'Agency',
        },
          {
            name: 'image2',
            type: 'image',
            title: 'Double Image',
            hidden: ({document}) => document?.title !== 'Agency',
        },
          {
            name: 'image3',
            type: 'image',
            title: 'Double Image',
            hidden: ({document}) => document?.title !== 'Agency',
        },
        defineField({
            name: 'text2',
            description:
              '',
            title: 'Text',
            hidden: ({document}) => document?.title !== 'Agency',
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
            name: 'image4',
            type: 'image',
            title: ' Image',
            hidden: ({document}) => document?.title !== 'Agency',
        },
          {
            name: 'image5',
            type: 'image',
            title: 'Double Image',
            hidden: ({document}) => document?.title !== 'Agency',
        },
          {
            name: 'image6',
            type: 'image',
            title: 'Double Image',
            hidden: ({document}) => document?.title !== 'Agency',
        },
        defineField({
          name: 'textContact',
          description:
            '',
          title: 'Text',
          hidden: ({document}) => document?.title !== 'Contact',
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
                        validation: Rule => Rule.uri({
                          scheme: ['http', 'https', 'mailto', 'tel']
                        })
                      },
                    ],
                  },
                ],
              },
            }),
          ],
        }),
        {
          name: 'imageContact',
          type: 'image',
          title: ' Image',
          hidden: ({document}) => document?.title !== 'Contact',
      },
      defineField({
        name: 'textLegal',
        description:
          '',
        title: 'Text',
        hidden: ({document}) => document?.title !== 'Legal',
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
                      validation: Rule => Rule.uri({
                        scheme: ['http', 'https', 'mailto', 'tel']
                      })
                    },
                  ],
                },
              ],
            },
          }),
        ],
      }),
    ],
    orderings: [
      {
        title: 'Order old to new',
        name: 'releaseDateDesc',
        by: [
          {field: '_createdAt', direction: 'asc'}
        ]
      },
    ]  
}
)
