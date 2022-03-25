import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (_req: NextApiRequest, res: NextApiResponse) => {
  if (!process.env.FRACTAL_AUTH_TOKEN) {
    // eslint-disable-next-line no-console
    console.error('FRACTAL_AUTH_TOKEN must be set');
  }
  try {
    const response = await fetch(
      'https://fractal-core-grpc-server-rest-2-tmg6xh47ja-uc.a.run.app/v1/scores',
      {
        body: JSON.stringify({
          projectId: '5701666712059904',
          scoreType: 'Kills',
          scoreValue: 1,
          tournamentId: 'test_one',
          userId: _req.body.userId,
        }),
        headers: { authorization: `Bearer ${process.env.FRACTAL_AUTH_TOKEN}` },
        method: 'POST',
      },
    );
    res.status(response.status).json(await response.json());
  } catch (err: unknown) {
    res.status(500).json({ message: err, statusCode: 500 });
  }
};

export default handler;
