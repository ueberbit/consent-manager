import { ConsentManager, ConsentProvider } from '../ConsentManager.js'

export class CCM19Provider extends ConsentProvider {
  setup() {
    this.ccmRoot = document.querySelector('.ccm-root')
    this.ccmRoot.addEventListener('click', (e) => {
      const button = e.target
      if (!button || !(button instanceof HTMLButtonElement))
        return
      if (button.dataset.fullConsent) {
        this.onAccept()
      }
      if (button.classList.contains('ccm--decline-cookies')) {
        this.onDecline()
      }
      this.onChange()
    })

    this.purpose = new Map([
      ['marketing', 'cdcbd7c'],
      ['statistics', 'a717ff5'],
      ['preferences', '15c61c3'],
      ['necessary', '41ba25c'],
      ['socials', '6cd2721'],
    ])
    this.onChange()
  }

  renew() { globalThis.CCM.openWidget() }
  show() { globalThis.CCM.openWidget() }
  hide() { globalThis.CCM.closeWidget() }

  onChange() {
    ConsentManager.consent.marketing = this.getRadioValue(this.purpose.get('marketing'))
    ConsentManager.consent.statistics = this.getRadioValue(this.purpose.get('statistics'))
    ConsentManager.consent.preferences = this.getRadioValue(this.purpose.get('preferences'))
    ConsentManager.consent.necessary = this.getRadioValue(this.purpose.get('necessary'))
    ConsentManager.consent.socials = this.getRadioValue(this.purpose.get('socials'))
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

  getRadioValue(id) {
    const input = this.ccmRoot.querySelector(`#ccm-purpose-${id}`)
    if (!input || !(input instanceof HTMLInputElement))
      return false
    return input.checked
  }
}
