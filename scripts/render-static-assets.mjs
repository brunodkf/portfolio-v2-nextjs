
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const assets = path.join(root, 'scripts', 'assets');
const publicDir = path.join(root, 'public');

const defaultChrome = {
  win32: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  darwin: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  linux: '/usr/bin/google-chrome',
}[process.platform];
const chrome = process.env.CHROME_PATH || defaultChrome;

if (!chrome || !existsSync(chrome)) {
  console.error(`Chrome not found (${chrome}). Set CHROME_PATH to a Chrome/Chromium executable.`);
  process.exit(1);
}

const run = (args) =>
  execFileSync(chrome, ['--headless=new', '--disable-gpu', '--hide-scrollbars', '--virtual-time-budget=8000', ...args], {
    stdio: 'ignore',
  });

const resumes = [
  ['resume.pt.html', 'docs/bruno-furtado-curriculo-pt.pdf'],
  ['resume.en.html', 'docs/bruno-furtado-resume-en.pdf'],
];
for (const [source, target] of resumes) {
  const out = path.join(publicDir, target);
  mkdirSync(path.dirname(out), { recursive: true });
  run(['--no-pdf-header-footer', `--print-to-pdf=${out}`, pathToFileURL(path.join(assets, source)).href]);
  console.log(`✓ ${target}`);
}

for (const lang of ['en', 'pt']) {
  const target = `og/og-${lang}.png`;
  const out = path.join(publicDir, target);
  mkdirSync(path.dirname(out), { recursive: true });
  run(['--window-size=1200,630', `--screenshot=${out}`, `${pathToFileURL(path.join(assets, 'og.html')).href}?lang=${lang}`]);
  console.log(`✓ ${target}`);
}
