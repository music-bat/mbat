import { Connection, node, relation } from 'cypher-query-builder';
console.debug('[Parse Cloud] Parse.Cloud function "fetchGroupPlaylist" mounted');

export async function fetchGroupPlaylist(req: Parse.Cloud.FunctionRequest & { params: { groupId?: string } }) {
  const { groupId } = req.params;
  const db = new Connection(process.env.NEO4J_URL || 'bolt://localhost', {
    username: process.env.NEO4J_USERNAME || '',
    password: process.env.NEO4J_PASSWORD || '',
  });
  const query = db
    .merge([node('group', 'Group', { id: groupId })])
    .merge([node('track', 'Track')])
    .merge([node('group'), relation('out', 'rel', 'LikesTrack', { id: groupId }), node('track')])
    .return('COUNT(track) as likes, track')
    .orderBy('likes', 'desc')
    .limit(200);
  return await query.run();
}
