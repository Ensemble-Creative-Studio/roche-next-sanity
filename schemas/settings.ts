import {defineField, defineType} from 'sanity'

export default defineType({
    name: 'settings',
    title: 'Settings',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
          },
        {
            
          title: "Navigation",
          name: "navigation",
          type: "array",
          of: [
            {
              title: "Menu Title",
              name: "menuTitle",
              type: "string"
            },
            // {
            //   title: "Menu Link",
            //   name: "menuLink",
            //   type: "reference"
            // }
          ]
        }
      ]
    });