import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer-core';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, '../docs/Final docs/img');
const BASE = process.env.CG_URL || 'http://127.0.0.1:5173';
const CHROME =
  process.env.CHROME_PATH ||
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

fs.mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function shot(page, name) {
  const file = path.join(OUT, name);
  await page.screenshot({ path: file, type: 'png' });
  console.log('saved', name, fs.statSync(file).size, 'bytes');
}

async function clickContains(page, text) {
  const clicked = await page.evaluate((needle) => {
    const nodes = [...document.querySelectorAll('button, a, [role="button"]')];
    const el = nodes.find((n) => (n.textContent || '').replace(/\s+/g, ' ').includes(needle));
    if (!el) return false;
    el.click();
    return true;
  }, text);
  if (!clicked) throw new Error(`Missing click target: ${text}`);
}

async function main() {
  if (!fs.existsSync(CHROME)) throw new Error(`Chrome not found at ${CHROME}`);

  const browser = await puppeteer.launch({
    executablePath: CHROME,
    headless: 'new',
    defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
    args: ['--no-sandbox', '--disable-dev-shm-usage', '--window-size=1440,900']
  });

  const page = await browser.newPage();
  page.setDefaultTimeout(45000);

  // 1 Landing
  await page.goto(BASE, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await sleep(2000);
  await shot(page, '01-landing-hero.png');

  // 2 Dashboard
  await clickContains(page, 'Open Defense Dashboard');
  await sleep(1800);
  await shot(page, '02-cadet-dashboard.png');

  // 3 Curriculum catalog
  await clickContains(page, 'Curriculum Tracks');
  await sleep(1600);
  await shot(page, '03-course-catalog.png');

  // 4 Linux terminal lab
  const sandboxClicked = await page.evaluate(() => {
    const buttons = [...document.querySelectorAll('button')];
    const featured = buttons.find((b) => /ENTER SANDBOX LAB|Enter Sandbox/i.test(b.textContent || ''));
    if (!featured) return false;
    featured.click();
    return true;
  });
  if (!sandboxClicked) throw new Error('Sandbox launch button not found');
  await sleep(2500);
  await shot(page, '04-linux-terminal-lab.png');

  // Back to catalog for web playground
  await page.evaluate(() => {
    const b = [...document.querySelectorAll('button')].find((el) => (el.textContent || '').includes('Dashboard'));
    if (b) b.click();
  });
  await sleep(1200);
  await clickContains(page, 'Curriculum Tracks');
  await sleep(1400);

  // Launch second pathway (Web)
  await page.evaluate(() => {
    const buttons = [...document.querySelectorAll('button')].filter((b) =>
      /Enter Sandbox|View Enclave|ENTER SANDBOX/i.test(b.textContent || '')
    );
    (buttons[1] || buttons[0])?.click();
  });
  await sleep(2500);

  await page.evaluate(() => {
    const tab = [...document.querySelectorAll('button')].find((b) =>
      (b.textContent || '').includes('Defense Playground')
    );
    tab?.click();
  });
  await sleep(700);

  await page.evaluate(() => {
    const run = [...document.querySelectorAll('button')].find((b) =>
      /Run against mock table|Publish to sandbox|Verify token|Request file|Audit soft/i.test(b.textContent || '')
    );
    run?.click();
  });
  await sleep(1000);
  await shot(page, '05-sqli-defense-playground.png');

  // 6 GuardianAI
  await page.evaluate(() => {
    const ai = [...document.querySelectorAll('button')].find((b) =>
      /GuardianAI|Guardian AI|Tutor/i.test(b.textContent || '')
    );
    ai?.click();
  });
  await sleep(900);

  const input = await page.$('input[placeholder*="GuardianAI"], input[placeholder*="commands"], input[placeholder*="safety"]');
  if (input) {
    await input.click({ clickCount: 3 });
    await input.type('Why are parameterized queries safer than string concatenation?');
    await page.keyboard.press('Enter');
    await sleep(5500);
  }
  await shot(page, '06-guardianai-mentor.png');

  await browser.close();
  console.log('done ->', OUT);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
