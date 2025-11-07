#!/usr/bin/env node

import { chromium } from 'playwright'
import { spawn } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const projectRoot = join(__dirname, '..')

const THEMES = ['dark', 'white', 'blue', 'matrix']
const DEV_SERVER_PORT = 5173
const DEV_SERVER_URL = `http://localhost:${DEV_SERVER_PORT}`

/**
 * Start the Vite dev server
 * @returns {Promise<ChildProcess>}
 */
function startDevServer() {
  return new Promise((resolve, reject) => {
    console.log('🚀 Starting Vite dev server...')

    const devServer = spawn('npm', ['run', 'dev'], {
      cwd: projectRoot,
      stdio: 'pipe',
      shell: true
    })

    let serverReady = false

    devServer.stdout.on('data', (data) => {
      const output = data.toString()
      console.log('   ', output.trim())

      if (output.includes('Local:') && !serverReady) {
        serverReady = true
        console.log('✅ Dev server ready!\n')
        setTimeout(() => resolve(devServer), 2000) // Wait 2s for server to fully stabilize
      }
    })

    devServer.stderr.on('data', (data) => {
      console.error('❌', data.toString())
    })

    devServer.on('error', (error) => {
      reject(error)
    })

    // Timeout after 30 seconds
    setTimeout(() => {
      if (!serverReady) {
        reject(new Error('Dev server failed to start within 30 seconds'))
      }
    }, 30000)
  })
}

/**
 * Take screenshots of the UI in different themes
 */
async function takeScreenshots() {
  let browser
  let devServer

  try {
    // Start dev server
    devServer = await startDevServer()

    // Launch browser
    console.log('🌐 Launching browser...\n')
    browser = await chromium.launch()
    const context = await browser.newContext({
      viewport: { width: 1920, height: 1080 }
    })
    const page = await context.newPage()

    // Navigate to demo
    console.log(`📂 Opening demo at ${DEV_SERVER_URL}\n`)
    await page.goto(DEV_SERVER_URL, { waitUntil: 'networkidle' })

    // Wait for page to be fully loaded
    await page.waitForTimeout(2000)

    // Take screenshots for each theme
    for (const theme of THEMES) {
      console.log(`📸 Capturing ${theme} theme...`)

      // Click the theme button to switch themes
      await page.evaluate((themeName) => {
        document.documentElement.setAttribute('data-theme', themeName)
      }, theme)

      // Wait for theme transition
      await page.waitForTimeout(500)

      // Take full page screenshot
      const screenshotPath = join(projectRoot, 'screenshots', `theme-${theme}.png`)
      await page.screenshot({
        path: screenshotPath,
        fullPage: true
      })
      console.log(`   ✅ Saved: screenshots/theme-${theme}.png`)
    }

    // Take component-specific screenshots (dark theme)
    console.log('\n📸 Capturing component showcases...')
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-theme', 'dark')
    })
    await page.waitForTimeout(500)

    // Buttons showcase
    const buttonsSection = page.locator('h2:has-text("Buttons")').locator('..')
    if (await buttonsSection.count() > 0) {
      await buttonsSection.screenshot({
        path: join(projectRoot, 'screenshots', 'components-buttons.png')
      })
      console.log('   ✅ Saved: screenshots/components-buttons.png')
    }

    // Cards showcase
    const cardsSection = page.locator('h2:has-text("Cards")').locator('..')
    if (await cardsSection.count() > 0) {
      await cardsSection.screenshot({
        path: join(projectRoot, 'screenshots', 'components-cards.png')
      })
      console.log('   ✅ Saved: screenshots/components-cards.png')
    }

    // Form inputs showcase
    const inputsSection = page.locator('h2:has-text("Form Inputs")').locator('..')
    if (await inputsSection.count() > 0) {
      await inputsSection.screenshot({
        path: join(projectRoot, 'screenshots', 'components-inputs.png')
      })
      console.log('   ✅ Saved: screenshots/components-inputs.png')
    }

    // Hero screenshot (header + theme switcher + first section)
    await page.evaluate(() => {
      window.scrollTo(0, 0)
    })
    await page.waitForTimeout(500)

    const heroViewport = {
      x: 0,
      y: 0,
      width: 1920,
      height: 900
    }
    await page.screenshot({
      path: join(projectRoot, 'screenshots', 'hero.png'),
      clip: heroViewport
    })
    console.log('   ✅ Saved: screenshots/hero.png')

    console.log('\n✨ All screenshots captured successfully!\n')

  } catch (error) {
    console.error('❌ Error taking screenshots:', error)
    process.exit(1)
  } finally {
    // Cleanup
    if (browser) {
      await browser.close()
    }
    if (devServer) {
      console.log('🛑 Stopping dev server...')
      devServer.kill()
    }
  }
}

// Run
takeScreenshots()
