import { defineCollection, z } from 'astro:content';

// Articles collection
const albumsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    release: z.string().transform((str) => new Date(str)),
    // summary: z.string().optional(), // Change from 'description' to match your frontmatter
    // tags: z.array(z.string()).optional(),
    type: z.literal("album"), // Enforce that 'type' must be 'article'
    tracklist: z.array(
      z.object({
        title: z.string(),
        duration: z.string().regex(/^\d+:\d{2}$/, {
          message: "Duration must be in mm:ss format",
        }),
      }),
    ),
    // url: z.string(), // Optional if needed; otherwise, you can remove this if you don’t plan to use it
  }),
});

const biosCollection = defineCollection({
  schema: z.object({
    name: z.string(),
    position: z.string(),
    type: z.literal("bio"), // Enforce that 'type' must be 'article'
  }),
});

const eventsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string().transform((str) => new Date(str)),
    location: z.string(),
    type: z.literal("event"), // Enforce that 'type' must be 'article'
    private: z.boolean(),
    tickets: z.string()
  }),
});


export const collections = {
  albums: albumsCollection,
  bios: biosCollection,
  events: eventsCollection
};