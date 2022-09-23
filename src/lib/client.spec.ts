import test from 'ava';
import dotenv from 'dotenv';

dotenv.config();

import { Client } from './client';

test('login', async (t) => {
  const client = new Client();

  const res = await client.login({
    email: process.env.TEST_EMAIL ?? '',
    password: process.env.TEST_PASSWORD ?? '',
  });

  t.pass(res);
});
