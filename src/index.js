import { ConsentManager } from './ConsentManager.js'
import './Consent.ce.js'

async function detectConsentProvider() {
  if ('Cookiebot' in globalThis) {
    return new ConsentManager(
      await import('./providers/CookieBot.js')
        .then(({ CookiebotProvider }) => new CookiebotProvider()))
  }
  if ('et_showCookieOptIn' in globalThis) {
    return new ConsentManager(
      await import('./providers/ETracker.js')
        .then(({ EtrackerProvider }) => new EtrackerProvider())
    )
  }
  if ('CCM' in globalThis) {
    return new ConsentManager(
      await import('./providers/CCM19.js')
        .then(({ CCM19Provider }) => new CCM19Provider()))
  }
  throw new Error('No consent provider found')
}

let attempts = 0
const interval = setInterval(async () => {
  try {
    globalThis.ConsentManager = await detectConsentProvider()
    clearInterval(interval)
  }
  catch (e) {
    attempts++
    if (attempts > 20) {
      clearInterval(interval)
      console.error(e)
    }
  }
}, 50)
