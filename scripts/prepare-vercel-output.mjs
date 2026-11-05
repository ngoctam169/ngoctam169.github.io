import fs from 'node:fs';
import path from 'node:path';

const outDir = path.join(process.cwd(), '.vercel', 'output');
fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(path.join(outDir, 'static'), { recursive: true });
fs.cpSync(path.join(process.cwd(), 'dist'), path.join(outDir, 'static'), { recursive: true });

const coreDbCode = fs.readFileSync(path.join(process.cwd(), 'server', 'core-db.js'), 'utf8');

const funcs = ['overview', 'endorsements', 'ai-audit', 'contact', 'telemetry'];
for (const fn of funcs) {
  const fnDir = path.join(outDir, 'functions', 'api', `${fn}.func`);
  fs.mkdirSync(fnDir, { recursive: true });
  fs.writeFileSync(path.join(fnDir, 'package.json'), JSON.stringify({ type: 'module' }));
  fs.writeFileSync(path.join(fnDir, 'core-db.js'), coreDbCode);
  let apiCode = fs.readFileSync(path.join(process.cwd(), 'api', `${fn}.js`), 'utf8');
  apiCode = apiCode.replace('../server/core-db.js', './core-db.js');
  fs.writeFileSync(path.join(fnDir, 'index.js'), apiCode);
  fs.writeFileSync(
    path.join(fnDir, '.vc-config.json'),
    JSON.stringify(
      {
        runtime: 'nodejs22.x',
        handler: 'index.js',
        launcherType: 'Nodejs',
        shouldAddHelpers: true
      },
      null,
      2
    )
  );
}

const config = {
  version: 3,
  routes: [
    { handle: 'filesystem' },
    { src: '^/(?!api/)(.*)', dest: '/index.html' }
  ]
};
fs.writeFileSync(path.join(outDir, 'config.json'), JSON.stringify(config, null, 2));
console.log('[Vercel Build Output v3] Generated static + 5 Node.js 22 Serverless Functions.');
