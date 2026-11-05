import { saveContactInquiry, getMetrics } from '../server/core-db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
    const inquiry = await saveContactInquiry(body);
    const metrics = await getMetrics();
    return res.status(201).json({
      ok: true,
      message:
        'Yêu cầu phỏng vấn / liên hệ với Nguyễn Ngọc Tâm đã được ghi nhận vào Database thành công!',
      inquiry,
      metrics
    });
  } catch (err) {
    return res.status(500).json({ ok: false, error: String(err?.message || err) });
  }
}
