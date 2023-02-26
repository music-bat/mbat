import { Artist, Track } from 'spotify-api.js';
import { Connection, node, relation } from 'cypher-query-builder';

type Neo4jSyncJobAttributes = {
  items: { track: Track }[];
  user: Parse.User;
};

export async function writeLibraryToDb(req: Parse.Cloud.AfterSaveRequest | Parse.Cloud.FunctionRequest) {
  console.log('writeLibraryToDb');
  console.time('library import took');
  let job: Parse.Object<Neo4jSyncJobAttributes>;
  if (req.user) {
    const id = (req as Parse.Cloud.FunctionRequest).params.id;
    job = await new Parse.Query<Parse.Object<Neo4jSyncJobAttributes>>('Neo4jSyncJob').get(id);
  } else {
    job = (req as Parse.Cloud.AfterSaveRequest<Parse.Object<Neo4jSyncJobAttributes>>).object;
  }

  await job.fetchWithInclude('user', { useMasterKey: true });
  console.log('writeLibraryToDb - job', job.id);

  const db = new Connection(process.env.NEO4J_URL || 'bolt://localhost', {
    username: process.env.NEO4J_USERNAME || '',
    password: process.env.NEO4J_PASSWORD || '',
  });

  const items = job.attributes.items;
  const user = job.get('user');
  const groups = await user.relation('groups').query().find({ useMasterKey: true });
  for (const [i, item] of items.entries()) {
    const added = await addTrack(db, job.get('user'), item.track);
    console.log(`${added ? '        imported' : 'skipped existing'} track ${i}/${items.length}`, item.track.name)

    for (const group of groups) {
      await likeTrackForGroup(db, group as Parse.Object<{ name: string }>, item.track.id, user.id);
    }
    for (const artist of item.track.artists) {
      await addArtist(db, item.track, artist);
    }
  }
  await db.close();
  await job.destroy({ useMasterKey: true });
  console.log(`Successful imported ${job.attributes.items.length} tracks!`);
  console.timeEnd('library import took');
}

async function addTrack(db: Connection, user: Parse.User, t: Track) {
  const now = Date.now();
  const { id, uri, name, duration, popularity, previewURL, explicit } = t;

  const trackToSave: Pick<Track, 'id' | 'uri' | 'name' | 'duration' | 'popularity' | 'previewURL' | 'explicit'> & {
    image: string;
    artists: string;
    genres: string;
    createdAt: number;
  } = {
    id,
    uri,
    name,
    duration: duration || 0,
    popularity,
    previewURL: previewURL || '',
    explicit,
    image: t.album.images[0]?.url || '',
    artists: (t.artists || [])
      .map((a) => a.name)
      .filter(Boolean)
      .join(', '),
    genres: (t.album.genres || []).join(', '),
    createdAt: Date.now()
  };
  const query = db
    .merge([node('user', 'User', { id: user.id, name: user.getUsername() })])
    .merge([node('track', 'Track', trackToSave)])
    .merge([node('user'), relation('out', 'rel', 'LikesTrack', { likedByUserWithId: user.id }), node('track')])
    .return('track');
  const [{track}] = await query.run();

  // return true if track has been added, false if the track has already been imported for this user
  return track.properties.createdAt > now
}

async function likeTrackForGroup(db: Connection, group: Parse.Object<{ name: string }>, trackId: string, userId: string) {
  const query = db
    .matchNode('track', 'Track', { id: trackId })
    .matchNode('user', 'User', { id: userId })
    .merge([node('group', 'Group', { id: group.id, name: group.attributes.name })])
    .merge([node('group'), relation('out', 'rel', 'LikesTrack', { likedByUserWithId: userId }), node('track')])
    .merge([node('user'), relation('out', 'rel2', 'IsMemberOf', { userId: userId }), node('group')]);
  await query.run();
}

async function addArtist(db: Connection, track: Track, artist: Artist) {
  const { id: trackId } = track;
  const { id, uri, name, popularity, genres } = artist;
  const artistToSave: Pick<Artist, 'id' | 'uri' | 'name' | 'popularity' | 'genres'> = {
    id,
    uri,
    name,
    popularity: popularity || -1,
    genres: genres || [],
  };
  const query = db
    .matchNode('track', 'Track', { id: trackId })
    .merge([node('artist', 'Artist', artistToSave)])
    .merge([node('artist'), relation('out', 'rel', 'IsArtistOf'), node('track')]);
  await query.run();
}
