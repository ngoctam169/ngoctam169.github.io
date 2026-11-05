import { getEndorsements, incrementMetric } from '../server/core-db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const metrics = await incrementMetric('portfolioViews', 1);
    const endorsements = await getEndorsements();
    return res.status(200).json({
      ok: true,
      candidate: 'Nguyễn Ngọc Tâm (Ngọc Tâm)',
      role: 'Senior Full-Stack Developer & Real-Time Distributed Systems Architect',
      metrics,
      endorsements
    });
  } catch (err) {
    return res.status(500).json({ ok: false, error: String(err?.message || err) });
  }
}
