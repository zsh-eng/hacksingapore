// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { run } from '@/server/search';
import type { NextApiRequest, NextApiResponse } from 'next';



type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const result = await run();
  res.status(200).json({ name: 'John Doe' });
}
