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
| `@next/third-parties/google` `GoogleAnalytics` | Loads `gtag/js` and runs `gtag('config', id)` |
| `components/ui/GoogleAnalytics.tsx` | Mounted from `app/[lang]/layout.tsx` (every locale route) |
| Inline consent default script in the language layout | Consent Mode v2 defaults before the tag |
| `GaRoutePageViews` | Extra `page_view` on App Router client navigations (skips the first paint so `config` is not double-counted) |

## Consent Mode v2

The cookie banner (`CookieConsentBanner` + `ConsentContext`) is kept.

Previously the tag only mounted after "Accept All", so declined or undecided visits sent nothing.

Now:

1. Default consent is **denied** (`analytics_storage`, `ad_storage`, `ad_user_data`, `ad_personalization`).
2. The GA tag **always loads** when `NEXT_PUBLIC_GA_ID` is set, so cookieless pings can still go out.
3. On accept, consent is **updated to granted**. On decline, it stays denied and `_ga` cookies are cleared.

Storage key: `analytics-consent` in `localStorage`.

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
- Env template: `.env.example`, `docs/ENV_SETUP.md`
