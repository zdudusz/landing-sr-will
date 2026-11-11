// Pre-render: serves dist/, lets headless Edge/Chrome render the React page at ?prerender
// (no entrance animation, no moments) and writes the resulting HTML back into dist/index.html.
// The page still boots React on load; the static HTML is what search engines and the skill's copy-lint read.
import { createServer } from 'node:http'
import { readFile, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { extname, join, normalize } from 'node:path'
import { execFile } from 'node:child_process'

const root = join(process.cwd(), 'dist')
const types = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.jpg': 'image/jpeg', '.json': 'application/json' }
const browsers = [
  process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
].filter(Boolean)
const browser = browsers.find(p => existsSync(p))
if (!browser) { console.error('prerender: no Chrome or Edge found (set CHROME_PATH)'); process.exit(1) }

const shell = await readFile(join(root, 'index.html'), 'utf8')
const server = createServer(async (req, res) => {
  const path = decodeURIComponent(new URL(req.url, 'http://x').pathname)
  const file = normalize(join(root, path === '/' ? 'index.html' : path))
  if (!file.startsWith(root)) { res.writeHead(403).end(); return }
  try {
    const body = path === '/' ? shell : await readFile(file)
    res.writeHead(200, { 'content-type': types[extname(file)] || 'application/octet-stream' }).end(body)
  } catch { res.writeHead(404).end() }
})
await new Promise(r => server.listen(0, '127.0.0.1', r))
const url = `http://127.0.0.1:${server.address().port}/?prerender`

const dom = await new Promise((resolve, reject) => {
  execFile(browser, ['--headless=new', '--disable-gpu', '--no-first-run', '--virtual-time-budget=4000', '--window-size=1440,900', '--dump-dom', url],
    { maxBuffer: 20 * 1024 * 1024 }, (err, out) => (err && !out ? reject(err) : resolve(out)))
})
server.close()

const rootHtml = dom.match(/<div id="root">([\s\S]*?)<\/div>\s*<script[^>]*src="[^"]*index-[^"]*\.js"/)
const inner = dom.match(/<div id="root">([\s\S]*)<\/div>\s*<\/body>/)
const content = (rootHtml || inner)?.[1]
if (!content || content.length < 1000) { console.error('prerender: the page did not render'); process.exit(1) }
const out = shell.replace('<div id="root"></div>', `<div id="root">${content}</div>`)
await writeFile(join(root, 'index.html'), out)
console.log(`prerender: ${Math.round(content.length / 1024)} KB of HTML written to dist/index.html`)
