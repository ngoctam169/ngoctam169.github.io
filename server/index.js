import express from 'express';
import cors from 'cors';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  initDatabase,
  getEndorsements,
  addEndorsement,
  getMetrics,
  incrementMetric,
  saveContactInquiry,
  runAiPortfolioAudit
} from './core-db.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get('/api/overview', async (_req, res) => {
  try {
    const metrics = await incrementMetric('portfolioViews', 1);
    const endorsements = await getEndorsements();
    res.json({
      ok: true,
      candidate: 'Nguyễn Ngọc Tâm (Ngọc Tâm)',
      role: 'Senior Full-Stack Developer & Real-Time Distributed Systems Architect',
      metrics,
      endorsements
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err?.message || err) });
  }
});

app.get('/api/endorsements', async (_req, res) => {
  try {
    const endorsements = await getEndorsements();
    res.json({ ok: true, endorsements });
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err?.message || err) });
  }
});

app.post('/api/endorsements', async (req, res) => {
  try {
    const created = await addEndorsement(req.body || {});
    const endorsements = await getEndorsements();
    res.status(201).json({ ok: true, created, endorsements });
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err?.message || err) });
  }
});

app.post('/api/ai-audit', async (req, res) => {
  try {
    const report = await runAiPortfolioAudit(req.body?.jobDescription || '');
    const metrics = await getMetrics();
    res.json({ ok: true, report, metrics });
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err?.message || err) });
  }
});

app.post('/api/contact', async (req, res) => {
  try {
    const inquiry = await saveContactInquiry(req.body || {});
    const metrics = await getMetrics();
    res.status(201).json({
      ok: true,
      message:
        'Yêu cầu phỏng vấn / liên hệ với Nguyễn Ngọc Tâm đã được ghi nhận vào Database thành công!',
      inquiry,
      metrics
    });
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err?.message || err) });
  }
});

app.post('/api/telemetry', async (req, res) => {
  try {
    const key = String(req.body?.metric || 'architectureInspections');
    const allowed = new Set([
      'portfolioViews',
      'aiAuditRuns',
      'architectureInspections',
      'cvDownloads',
      'recruiterShortlists'
    ]);
    const safeKey = allowed.has(key) ? key : 'architectureInspections';
    const metrics = await incrementMetric(safeKey, 1);
    res.json({ ok: true, metrics });
  } catch (err) {
    res.status(500).json({ ok: false, error: String(err?.message || err) });
  }
});

const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));
app.get('*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

initDatabase().then((info) => {
  app.listen(PORT, () => {
    console.log(`[Nguyễn Ngọc Tâm Portfolio API] Listening on http://localhost:${PORT}`);
    console.log(`[Database Engine] ${info.engine}`);
  });
});
