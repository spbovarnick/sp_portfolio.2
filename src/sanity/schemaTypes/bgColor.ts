import { defineField, defineType } from "sanity";

export default defineType({
  name: 'bgColor',
  title: "Background Color",
  type: "document",
  fields: [
    defineField({
      name: "hexCode",
      title: "Hex Color",
      type: "color",
      options: {
        disableAlpha: true,
      },
    }),
  ]
})