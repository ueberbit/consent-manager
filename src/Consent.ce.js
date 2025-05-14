export class CEConsent extends HTMLElement {
  #consent = this.getAttribute('consent')

  connectedCallback() {
    this.optinTemplate = /** @type {HTMLTemplateElement|undefined} */ (Array.from(this.children)
      .filter(child => Object.values(child.getAttributeNames())
        .find(attr => attr.startsWith('#optin')))
      .at(0))
    if (!this.optinTemplate) {
      throw new Error('No optin template')
    }

    this.defaultTemplate = /** @type {HTMLElement|undefined} */ (Array.from(this.children).find(child => child !== this.optinTemplate))
    if (!this.defaultTemplate) {
      throw new Error('No default template')
    }

    if (this.#consent) {
      this.optin()
    }
    this.addEventListener('click', this.optin)
  }

  /**
   * Optin only this component.
   */
  optin() {
    this.defaultTemplate.style.display = 'none'
    this.appendChild(this.optinTemplate.content.cloneNode(true))
  }
}

window.customElements.define('ce-consent', CEConsent)
