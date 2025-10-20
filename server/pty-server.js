import express from 'express'
import expressWs from 'express-ws'
import cors from 'cors'
import path from 'node:path'
import pty from 'node-pty'

const app = express()
expressWs(app)

const PORT = process.env.PORT || 8080
const SHELL_BIN = process.env.SHELL_BIN || path.resolve(process.cwd(), 'bin', 'simpleshell')
const IDLE_TIMEOUT_MS = parseInt(process.env.IDLE_TIMEOUT_MS || '300000', 10) // 5 min

app.use(cors({ origin: process.env.CORS_ORIGIN || true }))
app.get('/healthz', (_req, res) => res.json({ ok: true }))

app.ws('/api/pty', (ws, _req) => {
  let term
  try {
    term = pty.spawn(SHELL_BIN, [], {
      name: 'xterm-color',
      cols: 120,
      rows: 32,
      cwd: process.env.HOME || process.cwd(),
      env: process.env,
    })
  } catch (e) {
    ws.send(JSON.stringify({ type: 'error', message: 'Failed to start shell' }))
    ws.close()
    return
  }

  let lastActivity = Date.now()
  const idleTimer = setInterval(() => {
    if (Date.now() - lastActivity > IDLE_TIMEOUT_MS) {
      try { term.kill() } catch {}
      try { ws.close() } catch {}
    }
  }, 30000)

  term.onData((data) => {
    lastActivity = Date.now()
    ws.send(JSON.stringify({ type: 'data', data }))
  })

  ws.on('message', (msg) => {
    lastActivity = Date.now()
    try {
      const parsed = JSON.parse(msg)
      if (parsed.type === 'input') {
        term.write(parsed.data)
      } else if (parsed.type === 'resize') {
        const { cols, rows } = parsed
        if (cols && rows) term.resize(cols, rows)
      }
    } catch {
      // treat as raw
      term.write(String(msg))
    }
  })

  const cleanup = () => {
    clearInterval(idleTimer)
    try { term.kill() } catch {}
  }
  ws.on('close', cleanup)
  ws.on('error', cleanup)
})

app.listen(PORT, () => {
  console.log(`[pty-server] listening on ${PORT}, bin=${SHELL_BIN}`)
})
