import type { NextApiRequest, NextApiResponse } from 'next';
import { SIGNATURE_HEADER_NAME, isValidSignature } from '@sanity/webhook';

export const config = {
  api: {
    bodyParser: false,
  },
};

async function readBody(req: NextApiRequest) {
  const chunks: Buffer[] = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString('utf8');
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(405).json({ msg: 'Method not allowed' });

  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) return res.status(500).json({ err: 'Missing secret' });

  try {
    const body = await readBody(req);
    const signature = req.headers[SIGNATURE_HEADER_NAME];
    if (typeof signature !== 'string' || !(await isValidSignature(body, signature, secret)))
      return res.status(401).json({ msg: 'Invalid request!' });

    const { slug } = JSON.parse(body);
    await res.revalidate(`/agency`);
    await res.revalidate(`/brands`);
    await res.revalidate(`/`);
    await res.revalidate(`/contact`);
    await res.revalidate(`/legal`);
    if (slug) await res.revalidate(`/brands/${slug}`);

    res.status(200).json({ msg: 'Pages revalidated.' });
  } catch (error) {
    res.status(500).json({ err: 'Something went Wrong!' });
  }
};

export default handler;
