# Consent Tool

This tool is a thin wrapper arund consent tools. It offers a unified api to interact with different consent tools. It provides events, magic attributes/classes and placeholders to make it easy to use. This also works for providers which do not natively expose these api's.

## Installation

```bash
pnpm i @ueberbit/consent-tool
```

## Usage

### auto detection
```javascript
import '@ueberbit/consent-manager'

window.addEventListener('ConsentManager:onLoad', ({ detail }) => {
  console.log('ConsentManger:onLoad', detail)
})
```

### manual
```javascript
import { ConsentManager } from '@ueberbit/consent-manager'
import { CookiebotProvider } from '@ueberbit/consent-manager/providers/CookieBot'

globalThis.ConsentManager = new ConsentManager(new CookiebotProvider())

window.addEventListener('ConsentManager:onLoad', ({ detail }) => {
  console.log('ConsentManger:onLoad', detail)
})
```

## Providers

### Cookiebot
```javascript
import { CookiebotProvider } from '@ueberbit/consent-manager/providers/CookieBot'
```

### Etracker
```javascript
import { EtrackerProvider } from '@ueberbit/consent-manager/providers/Etracker'
```
