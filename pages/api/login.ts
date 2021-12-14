import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  if (req.method === 'POST') {
    //Here should be the proper auth,
    //for now it just sends the request body(email and password) as the response.
    res.status(200).json(req.body);
  } else {
    res.status(405).send({ message: 'Only POST requests allowed' });
  }
}
