import { isNonNull } from "~/lib/isNonNull";

export type Playlist = {
  title: string;
  url: string;
  date: string;
};

declare const _playlistKey: unique symbol;
type PlaylistKey = string & { [_playlistKey]: never };

const createPlaylistKey = (playlist: Playlist): PlaylistKey => {
  return `playlist-${playlist.date}-${playlist.title}` as PlaylistKey;
};

export const isPlaylistKey = (key: string): key is PlaylistKey => {
  return key.startsWith("playlist-");
};

export const getPlaylistKeys = async (prefix: string = "") => {
  const result = await PLAYLISTS.list({
    prefix: `playlist-${prefix}`,
  });
  const keys = result.keys.map<PlaylistKey>((key) => key.name as PlaylistKey);

  keys.reverse();
  return keys;
};

const convertPlaylist = (playlist: Playlist) => {
  return {
    ...playlist,
    year: parseInt(playlist.date.split("-")[0], 10),
  };
};

export const getPlaylist = async (id: PlaylistKey) => {
  const result = await PLAYLISTS.get<Playlist>(id, "json");
  if (!result) {
    return null;
  }
  return { ...convertPlaylist(result), id };
};

export const getPlaylists = async () => {
  const keys = await getPlaylistKeys();
  const playlists = await Promise.all(keys.map(getPlaylist));
  return playlists.filter(isNonNull);
};

export const getPlaylistsByYear = async (year: number) => {
  const keys = await getPlaylistKeys(`${year}-`);
  const playlists = await Promise.all(keys.map(getPlaylist));
  return playlists.filter(isNonNull);
};

export const createPlaylist = async (playlist: Playlist) => {
  const id = createPlaylistKey(playlist);
  await PLAYLISTS.put(id, JSON.stringify(playlist));
  return {
    id,
    ...playlist,
  };
};

export const deletePlaylist = async (id: PlaylistKey) => {
  await PLAYLISTS.delete(id);
};

export const updatePlaylist = async (id: PlaylistKey, playlist: Playlist) => {
  await PLAYLISTS.put(id, JSON.stringify(playlist));
  return {
    id,
    ...playlist,
  };
};
