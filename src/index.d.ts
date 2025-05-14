/// <reference types="@types/cookiebot-sdk" />

export type Consent = ['marketing', 'statistics', 'preferences', 'necessary']
export type ConsentOptions = Consent[number]
export type AllConsentOptions = Consent[number] | 'accepted' | 'declined'

type Expand<T> = { [K in keyof T]: T[K] } & {}

export type AllConsentOptionsMap = Expand<{
  [K in AllConsentOptions]?: boolean;
}>

declare global {
  interface Window {
    ConsentManager: ConsentManager
  }

  interface WindowEventHandlersEventMap {
    'ConsentManager:onLoad': CustomEvent
    'ConsentManager:onAccept': CustomEvent
    'ConsentManager:onDecline': CustomEvent
    'ConsentManager:accept': CustomEvent
    'ConsentManager:decline': CustomEvent
    'ConsentManager:change': CustomEvent<Record<AllConsentOptions, boolean>>
    'ConsentManager:change:accepted': CustomEvent<boolean>
    'ConsentManager:change:declined': CustomEvent<boolean>
    'ConsentManager:change:marketing': CustomEvent<boolean>
    'ConsentManager:change:statistics': CustomEvent<boolean>
    'ConsentManager:change:preferences': CustomEvent<boolean>
    'ConsentManager:change:necessary': CustomEvent<boolean>
    // [`ConsentManager:change:${AllConsentOptions}`]: CustomEvent<boolean> why not working?
  }
}
