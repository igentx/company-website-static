# GA4 analytics (IGENTX)

## Measurement ID

The GA4 measurement ID is **not hardcoded**. It comes from:

```env
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

Set this in Vercel (Production / Preview) and locally in `.env.local`. The site reads `process.env.NEXT_PUBLIC_GA_ID` via `lib/analytics.ts` (`GA_MEASUREMENT_ID`).

If the variable is empty, the GA tag and custom events are no-ops.

## How it loads

| Piece | Role |
|-------|------|
| Inline script in `app/[lang]/layout.tsx` | Consent Mode v2 defaults + apply stored Reject before config |
| `components/ui/GoogleAnalytics.tsx` | Loads `gtag/js`, runs `gtag('config', id, { anonymize_ip: true })` |
| `GaRoutePageViews` | Extra `page_view` on App Router client navigations (skips first paint) |

Mounted from the language root layout on every locale route.

## Consent Mode v2 (opt-out)

Aligned with clayox.com. The cookie banner is a small bottom-left pill, not a blocking gate.

1. Default: `analytics_storage: 'granted'`; `ad_storage`, `ad_user_data`, and `ad_personalization: 'denied'`; `wait_for_update: 500`.
2. If `localStorage['igentx-cookie-consent'] === 'rejected'`, update `analytics_storage` to `denied` **before** `gtag('config')`.
3. Accept or Reject updates **only** `analytics_storage`. Ads stay denied.
4. Reject also clears `_ga` / `_gid` / `_gat` cookies.
5. Auto-dismiss (5s, first scroll, or internal link click) is **not** a consent choice. `igentx-cookie-banner-seen` stores a timestamp with a 30-day TTL.
6. Footer **Cookie settings** dispatches `igentx:open-cookie-settings` to reopen the banner.

Storage keys:

- `igentx-cookie-consent`: `accepted` or `rejected`
- `igentx-cookie-banner-seen`: timestamp string

## Custom events

Helper: `lib/analytics.ts` (`trackEvent` and named wrappers).

| Event name | When |
|------------|------|
| `generate_lead` | Successful contact / Book a Free Consultation form POST (`Form.tsx`, `GenericForm.tsx`) |
| `whatsapp_click` | Click on `wa.me` / `api.whatsapp.com` links |
| `phone_click` | Click on `tel:` links |
| `email_click` | Click on `mailto:` links |

Clicks are captured by `components/ui/AnalyticsClickTracker.tsx` (document delegation).

Mark **`generate_lead`** as a key event in the GA4 Admin UI (Admin → Events → mark as key event).

## Related

- Cookie banner: `components/ui/CookieConsentBanner.tsx`
- Consent state: `contexts/ConsentContext.tsx`
- Privacy cookies section: `/privacy#cookies`
- Env template: `.env.example`, `docs/ENV_SETUP.md`
