import data from '../data/photos.json';

export type Photo = (typeof data)[number];

const byId = new Map(data.map((p) => [p.id, p]));

export function photo(id: string): Photo {
  const p = byId.get(id);
  if (!p) throw new Error(`Bilinmeyen fotoğraf: ${id}`);
  return p;
}

/** Bir sayfada kullanılan fotoğrafların kaynak bilgisi; footer'da tek satırda gösterilir. */
export const photosFor = (ids: string[]) => [...new Set(ids)].map(photo);
