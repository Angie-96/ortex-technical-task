import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === 'POST') {
    res.status(200).json(req.body);
  } else {
    res.status(405).send({ message: 'Only POST requests allowed' });
  }
}
