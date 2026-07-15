import { z } from "zod";

export const DestinationSchema = z.object({
  slug: z.string(),
  name: z.string(),
  description: z.string(),
  distance: z.string(),
  travel: z.string(),
  image: z.string(),
  alt: z.string(),
});

export const DestinationsResponseSchema = z.object({
  data: z.array(DestinationSchema),
});

export type Destination = z.infer<typeof DestinationSchema>;

export type DestinationView = Destination & {
  webp: string;
};

export function toDestinationView(destination: Destination): DestinationView {
  return {
    ...destination,
    webp: destination.image.replace(/\.png$/, ".webp"),
  };
}
