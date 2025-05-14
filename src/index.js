import { ConsentManager } from './ConsentManager'
import { CookiebotProvider } from './providers/CookieBot'
import { EtrackerProvider } from './providers/ETracker'
import './Consent.ce'

function detectConsentProvider() {
  if ('Cookiebot' in globalThis) {
    return new ConsentManager(new CookiebotProvider())
  }
  if ('et_showCookieOptIn' in globalThis) {
    return new ConsentManager(new EtrackerProvider())
  }
  throw new Error('No consent provider found')
}

globalThis.ConsentManager = detectConsentProvider()
