#!/usr/bin/env node

import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

try {
  const nvmrcPath = join(__dirname, '..', '.nvmrc')
  const requiredVersion = readFileSync(nvmrcPath, 'utf-8').trim().replace(/^v/, '')
  const currentVersion = process.version.replace(/^v/, '')

  if (currentVersion !== requiredVersion) {
    console.error(
      '\x1b[31m%s\x1b[0m',
      `
╔════════════════════════════════════════════════════════╗
║              ❌ INCORRECT NODE.JS VERSION              ║
╚════════════════════════════════════════════════════════╝

  Current version:  ${currentVersion}
  Required version: ${requiredVersion} (from .nvmrc)

  Please switch to the correct Node.js version:

    nvm use ${requiredVersion}

╚════════════════════════════════════════════════════════╝
`,
    )
    process.exit(1)
  }

  console.log(`✅ Node.js version ${currentVersion} matches required version\n`)
} catch (error) {
  console.error('Error checking Node.js version:', error.message)
  process.exit(1)
}
