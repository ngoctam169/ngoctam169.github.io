import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import {
  getEndorsements,
  addEndorsement,
  getMetrics,
  incrementMetric,
  saveContactInquiry,
  runAiPortfolioAudit
} from './server/core-db.js';

function readJsonBody(req: any): Promise<any> {
  return new Promise((resolve) => {
    let raw = '';
    req.on('data', (chunk: any) => {
      raw += chunk;
    });
    req.on('end', () => {
      try {
        resolve(raw ? JSON.parse(raw) : {});
      } catch {
        resolve({});
      }
    });
  });
}

function attachApiMiddleware(middlewares: any) {
  middlewares.use(async (req: any, res: any, next: any) => {
    if (!req.url || !req.url.startsWith('/api/')) {
      return next();
    }
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    const urlPath = req.url.split('?')[0];

    try {
      if (urlPath === '/api/overview' && req.method === 'GET') {
        const metrics = await incrementMetric('portfolioViews', 1);
        const endorsements = await getEndorsements();
        res.statusCode = 200;
        res.end(
          JSON.stringify({
            ok: true,
            candidate: 'Nguyễn Ngọc Tâm (Ngọc Tâm)',
            role: 'Senior Full-Stack Developer & Real-Time Distributed Systems Architect',
            metrics,
            endorsements
          })
        );
        return;
      }

      if (urlPath === '/api/endorsements') {
        if (req.method === 'POST') {
          const body = await readJsonBody(req);
          const created = await addEndorsement(body);
          const endorsements = await getEndorsements();
          res.statusCode = 201;
          res.end(JSON.stringify({ ok: true, created, endorsements }));
          return;
        }
        const endorsements = await getEndorsements();
        res.statusCode = 200;
        res.end(JSON.stringify({ ok: true, endorsements }));
        return;
      }

      if (urlPath === '/api/ai-audit') {
        const body = req.method === 'POST' ? await readJsonBody(req) : {};
        const report = await runAiPortfolioAudit(body.jobDescription || '');
        const metrics = await getMetrics();
        res.statusCode = 200;
        res.end(JSON.stringify({ ok: true, report, metrics }));
        return;
      }

      if (urlPath === '/api/contact' && req.method === 'POST') {
        const body = await readJsonBody(req);
        const inquiry = await saveContactInquiry(body);
        const metrics = await getMetrics();
        res.statusCode = 201;
        res.end(
          JSON.stringify({
            ok: true,
            message:
              'Yêu cầu phỏng vấn / liên hệ với Nguyễn Ngọc Tâm đã được ghi nhận vào Database thành công!',
            inquiry,
            metrics
          })
        );
        return;
      }

      if (urlPath === '/api/telemetry' && req.method === 'POST') {
        const body = await readJsonBody(req);
        const metrics = await incrementMetric(body.metric || 'architectureInspections', 1);
        res.statusCode = 200;
        res.end(JSON.stringify({ ok: true, metrics }));
        return;
      }
    } catch (err: any) {
      res.statusCode = 500;
      res.end(JSON.stringify({ ok: false, error: String(err?.message || err) }));
      return;
    }

    return next();
  });
}

export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'nguyen-ngoc-tam-api-plugin',
      configureServer(server) {
        attachApiMiddleware(server.middlewares);
      },
      configurePreviewServer(server) {
        attachApiMiddleware(server.middlewares);
      }
    }
  ]
});
