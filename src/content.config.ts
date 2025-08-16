import { defineCollection, z } from 'astro:content';

// Articles collection
const albumsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    release: z.string().transform((str) => new Date(str)),
    type: z.literal("album"),
    tracklist: z.array(
      z.object({
        title: z.string(),
        subitems: z.array(z.string()).optional(),
        duration: z.string().regex(/^\d+:\d{2}$/, {
          message: "Duration must be in mm:ss format",
        }),
      })
    ),
    bandcamp: z.string().optional(),
    applemusic: z.string().optional(),
    spotify: z.string().optional(),
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

const conventionsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    page: z.literal("conventions"),
    section: z.number(),
  }),
});

const corporatesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    page: z.literal("corporates"),
    section: z.number(),
  }),
});

const schoolsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    page: z.literal("schools"),
    section: z.number(),
  }),
});

const weddingsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    page: z.literal("weddings"),
    section: z.number(),
  }),
});

const otherservicesCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    page: z.literal("otherservices"),
    section: z.number(),
  }),
});



export const collections = {
  albums: albumsCollection,
  bios: biosCollection,
  events: eventsCollection,
  conventions: conventionsCollection,
  corporates: corporatesCollection,
  schools: schoolsCollection,
  weddings: weddingsCollection,
  otherservices: otherservicesCollection
};