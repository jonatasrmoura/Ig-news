/**
 * @description Acesso ao banco de dados Faunadb
 */

import { Client } from 'faunadb';

export const fauna = new Client({
  secret: process.env.FAUNADB_KEY,
  // domain: 'db.us.fauna.com',
});
