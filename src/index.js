import { ConsentManager } from './ConsentManager.js'
import { CookiebotProvider } from './providers/CookieBot.js'
import { EtrackerProvider } from './providers/ETracker.js'
import './Consent.ce.js'

function detectConsentProvider() {
  if ('Cookiebot' in globalThis) {
    return new ConsentManager(new CookiebotProvider())
  }
  if ('et_showCookieOptIn' in globalThis) {
    return new ConsentManager(new EtrackerProvider())
  }
  throw new Error('No consent provider found')
}

let attempts = 0
const interval = setInterval(() => {
  try {
    globalThis.ConsentManager = detectConsentProvider()
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
