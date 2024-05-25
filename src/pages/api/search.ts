import { run, vectorSearch } from '@/server/search';
import type { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

type Data = {
  name: string;
};

const inputSchema = z.object({
  query: z.string(),
});

export default async function handler(
  req: NextApiRequest,
  // TODO: change this to the appropriate update type
  res: NextApiResponse<any>
) {
  if (req.method !== 'POST') {
    return;
  }

  const body = req.body;
  const parsed = inputSchema.safeParse(body);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error });
    return;
  }

  const query = parsed.data.query;

  const results = await vectorSearch(query);
  res.status(200).json(results);
}
