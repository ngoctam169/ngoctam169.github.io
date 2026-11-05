import { getEndorsements, addEndorsement } from '../server/core-db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    if (req.method === 'POST') {
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
      const created = await addEndorsement(body);
      const endorsements = await getEndorsements();
      return res.status(201).json({ ok: true, created, endorsements });
    }
    const endorsements = await getEndorsements();
    return res.status(200).json({ ok: true, endorsements });
  } catch (err) {
    return res.status(500).json({ ok: false, error: String(err?.message || err) });
  }
}
