import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.substring(7);

  try {
    // Fetch user's repositories
    const response = await fetch('https://api.github.com/user/repos?sort=updated&per_page=100', {
      headers: {
        Authorization: `Bearer ${token}`,
        'User-Agent': 'RepoScribe',
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch repositories' });
    }

    const repositories = await response.json();
    
    // Filter out forks and add only owned repositories
    const filteredRepos = repositories.filter((repo: any) => !repo.fork);
    
    res.status(200).json(filteredRepos);
  } catch (error) {
    console.error('Repositories fetch error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
