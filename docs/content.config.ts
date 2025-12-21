import { defineContentConfig, defineCollection } from '@nuxt/content'
import { z } from 'zod'

export default defineContentConfig({
  collections: {
    docs: defineCollection({
      type: 'page',
      source: '**/*.md',
      schema: z.object({
        title: z.string().optional(),
        description: z.string().optional(),
        navigation: z.boolean().optional(),
        hero: z.object({
          title: z.string(),
          description: z.string().optional(),
          button: z.string().optional(),
        }).optional(),
        sections: z.array(z.object({
          title: z.string().optional(),
          description: z.string().optional(),
          slot: z.string().optional(),
          button: z.string().optional(),
          toolsCards: z.array(z.object({
            title: z.string(),
            description: z.string(),
            icon: z.string(),
            to: z.string(),
          })).optional(),
          projectCards: z.array(z.object({
            title: z.string(),
            description: z.string(),
            to: z.string(),
          })).optional(),
          avatarText: z.string().optional(),
        })).optional(),
        links: z.array(z.object({
          label: z.string(),
          to: z.string(),
          icon: z.string().optional(),
        })).optional(),
      }),
    }),
  },
})
