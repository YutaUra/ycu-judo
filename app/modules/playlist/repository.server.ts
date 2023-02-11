import { isNonNull } from "~/lib/isNonNull";

export type Playlist = {
  id: string;
  title: string;
  url: string;
};

export const getPlaylistKeys = async () => {
  const result = await PLAYLISTS.list();
  return result.keys.map((key) => key.name);
};

export const getPlaylist = async (id: string) => {
  const result = await PLAYLISTS.get<Playlist>(id, "json");
  return result;
};

export const getPlaylists = async () => {
  const keys = await getPlaylistKeys();
  const playlists = await Promise.all(keys.map(getPlaylist));
  return playlists.filter(isNonNull);
};

export const createPlaylist = async (playlist: Omit<Playlist, "id">) => {
  const id = "playlist-" + playlist.url;
  await PLAYLISTS.put(id, JSON.stringify(playlist));
  return {
    id,
    ...playlist,
  };
};

export const deletePlaylist = async (id: string) => {
  await PLAYLISTS.delete(id);
};

export const updatePlaylist = async (playlist: Playlist) => {
  await PLAYLISTS.put(playlist.id, JSON.stringify(playlist));
  return playlist;
};
