export class ConsentProvider {
  setup() { }
  show() { }
  hide() { }
  renew() { }
  withdraw() { }
  onChange() { }
  onAccept() { }
  onDecline() { }
}

export class ConsentManager {
  static flushScheduled = false

  /** @param {ConsentProvider} provider */
  constructor(provider) {
    this.provider = provider

    this.setup()
    // this.attachStyles()
  }

  static categories = /** @type {const} */ (['marketing', 'statistics', 'preferences', 'necessary'])

  static consent = new Proxy({
    marketing: false,
    statistics: false,
    preferences: false,
    necessary: true,
    accepted: false,
    declined: false,
  }, {
    set(target, prop, value) {
      if (target[prop] === value)
        return true
      target[prop] = value
      ConsentManager.changeEvents(target, prop, value)
      ConsentManager.magicClasses(prop, value)
      ConsentManager.magicAttributes(prop, value)
      return true
    },
  })

  static queueConsentChange(key, value, detail) {
    if (!ConsentManager.flushScheduled) {
      ConsentManager.flushScheduled = true

      queueMicrotask(() => {
        ConsentManager.flushScheduled = false
        globalThis.dispatchEvent(new CustomEvent(`ConsentManager:change`, { detail }))
      })
    }
  }

  static changeEvents(target, prop, value) {
    globalThis.dispatchEvent(new CustomEvent(`ConsentManager:change:${prop.toString()}`, { detail: value }))
    ConsentManager.queueConsentChange(prop, value, target)
  }

  static magicClasses(type, status) {
    /** @type {NodeListOf<HTMLElement>} el */ (document.querySelectorAll(`.consent-optin-${type}, .consent-optin`)).forEach((el) => {
      status ? el.style.display = '' : el.style.display = 'none'
    });
    /** @type {NodeListOf<HTMLElement>} el */ (document.querySelectorAll(`.consent-optout-${type}, .consent-optout`)).forEach((el) => {
      status ? el.style.display = 'none' : el.style.display = ''
    })
  }

  static magicAttributes(type, status) {
    /** @type {NodeListOf<HTMLElement>} el */ (document.querySelectorAll(`[data-consent="${type}"`)).forEach((el) => {
      if (el instanceof HTMLIFrameElement) {
        if (status && el.hasAttribute('data-consent-src')) {
          el.setAttribute('src', el.getAttribute('data-consent-src') || '')
          el.style.display = ''
        }
        else {
          el.setAttribute('data-consent-src', el.getAttribute('src') || '')
          el.removeAttribute('src')
          el.style.display = 'none'
        }
      }
      if (el instanceof HTMLScriptElement) {
        if (status && el.hasAttribute('data-consent-src')) {
          el.setAttribute('type', 'text/javascript')
        }
        else {
          el.setAttribute('type', 'text/plain')
        }
      }
    })
  }

  // attachStyles() {
  //   const sheet = new CSSStyleSheet()
  //   sheet.replaceSync(`:where([class*=consent-optin]) { display: none; }`)
  //   document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet]
  // }

  setup() {
    document.querySelectorAll('[class*=consent-optin]').forEach((el) => {
      if (el instanceof HTMLElement) {
        el.style.display = 'none'
      }
    })
    document.addEventListener('click', (e) => {
      const target = e.composedPath().at(0)
      if (target instanceof HTMLElement && target.hasAttribute('data-consent-show')) {
        this.show()
      }
    }, { passive: true })
    this.provider.setup()
  }

  getConsent() {
    return { ...ConsentManager.consent }
  }

  show() { this.provider.show() }
  hide() { this.provider.hide() }
  renew() { this.provider.renew() }
  withdraw() { this.provider.withdraw() }
  onChange() { this.provider.onChange() }
  onAccept() { this.provider.onAccept() }
  onDecline() { this.provider.onDecline() }
}
