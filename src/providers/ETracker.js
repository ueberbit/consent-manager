import { ConsentManager, ConsentProvider } from '../ConsentManager'

export class EtrackerProvider extends ConsentProvider {
  setup() {
    super.setup()
    ConsentManager.consent.declined = globalThis.et_getCookieValue('et_allow_cookies') === '0'
    ConsentManager.consent.accepted = globalThis.et_getCookieValue('et_allow_cookies') === '1'

    this.onChange()

    const et_setCookieValueOriginal = globalThis.et_setCookieValue
    globalThis.et_setCookieValue = (...args) => {
      et_setCookieValueOriginal(...args)
      if (args[0] === 'et_oi_categories') {
        this.onChange()
      }
      if (args[0] === 'et_allow_cookies' && args[1]) {
        +args[1] ? this.onAccept() : this.onDecline()
      }
    }
  }

  renew() { globalThis.et_showCookieOptIn() }
  show() { globalThis.et_showCookieOptIn() }
  hide() {
    const button = document.querySelector('#et-consent-overlay [data-editor="buttonDeny"]')
    button instanceof HTMLButtonElement && button.click()
  }

  withdraw() { globalThis.et_withdrawCookieConsent() }

  onChange() {
    const newCategories = globalThis.et_getCookieValue('et_oi_categories').replace('performance', 'preferences')
    ConsentManager.categories.forEach((category) => {
      ConsentManager.consent[category] = newCategories.includes(category)
    })
  }
}
