export class ConsentProvider {
    setup(): void;
    show(): void;
    hide(): void;
    renew(): void;
    withdraw(): void;
    onChange(): void;
    onAccept(): void;
    onDecline(): void;
}
export class ConsentManager {
    static flushScheduled: boolean;
    static categories: readonly ["marketing", "statistics", "preferences", "necessary"];
    static consent: {
        marketing: boolean;
        statistics: boolean;
        preferences: boolean;
        necessary: boolean;
        accepted: boolean;
        declined: boolean;
    };
    static queueConsentChange(key: any, value: any, detail: any): void;
    static changeEvents(target: any, prop: any, value: any): void;
    static magicClasses(type: any, status: any): void;
    static magicAttributes(type: any, status: any): void;
    /** @param {ConsentProvider} provider */
    constructor(provider: ConsentProvider);
    provider: ConsentProvider;
    attachStyles(): void;
    setup(): void;
    getConsent(): {
        marketing: boolean;
        statistics: boolean;
        preferences: boolean;
        necessary: boolean;
        accepted: boolean;
        declined: boolean;
    };
    show(): void;
    hide(): void;
    renew(): void;
    withdraw(): void;
    onChange(): void;
    onAccept(): void;
    onDecline(): void;
}
