import { incrementMetric } from '../server/core-db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
    const key = String(body.metric || 'architectureInspections');
    const allowed = new Set([
      'portfolioViews',
      'aiAuditRuns',
      'architectureInspections',
      'cvDownloads',
      'recruiterShortlists'
    ]);
    const safeKey = allowed.has(key) ? key : 'architectureInspections';
    const metrics = await incrementMetric(safeKey, 1);
    return res.status(200).json({ ok: true, metrics });
  } catch (err) {
    return res.status(500).json({ ok: false, error: String(err?.message || err) });
  }
}
