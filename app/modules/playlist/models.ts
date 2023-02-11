import { z } from "zod";

export const PlaylistModel = z.object({
  name: z.string(),
  url: z.string(),
});

export type Playlist = z.infer<typeof PlaylistModel>;
