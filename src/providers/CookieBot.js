/* global Cookiebot */
import { ConsentManager, ConsentProvider } from '../ConsentManager.js'

export class CookiebotProvider extends ConsentProvider {
  setup() {
    window.addEventListener('CookiebotOnLoad', this.onChange.bind(this))
    window.addEventListener('CookiebotOnAccept', this.onAccept.bind(this))
    window.addEventListener('CookiebotOnDecline', this.onDecline.bind(this))
    this.onChange()
  }

  renew() { Cookiebot.renew() }
  show() { Cookiebot.show() }
  hide() { Cookiebot.hide() }

  onChange() {
    ConsentManager.consent.marketing = Cookiebot.consent.marketing
    ConsentManager.consent.statistics = Cookiebot.consent.statistics
    ConsentManager.consent.preferences = Cookiebot.consent.preferences
    ConsentManager.consent.necessary = Cookiebot.consent.necessary
  }

  onAccept() {
    ConsentManager.consent.accepted = true
    ConsentManager.consent.declined = false
    globalThis.dispatchEvent(new CustomEvent('ConsentManager:onAccept'))
  }

  onDecline() {
    ConsentManager.consent.accepted = false
    ConsentManager.consent.declined = true
    globalThis.dispatchEvent(new CustomEvent('ConsentManager:onDecline'))
  }
}
