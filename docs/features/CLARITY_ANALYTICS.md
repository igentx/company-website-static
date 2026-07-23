# Microsoft Clarity Integration

This project includes an optional Microsoft Clarity analytics integration using the official `@microsoft/clarity` npm package that respects user consent.

## Enable Clarity
Add the environment variable to your `.env` or deployment environment:

```
NEXT_PUBLIC_CLARITY_ID=your_clarity_project_id
```

The ID for igentx.com is currently set in the root `.env` file.

## How It Works
- The component `components/ui/MicrosoftClarity.tsx` uses the official `@microsoft/clarity` package for proper initialization.
- It waits for the user to accept analytics via the cookie consent banner (`ConsentContext`).
- Clarity is initialized client-side using `clarity.init()` after consent is granted.
- If consent is declined, any Clarity cookies (`_clck`, `_clsk`) are cleared along with Google Analytics cookies.

## Adding For Other Clients
1. Set `NEXT_PUBLIC_CLARITY_ID` in that client's environment.
2. Deploy. No code changes required unless you customize behavior.
3. Verify loading: After accepting cookies, check the Network tab for requests to `https://clarity.ms` and the presence of the global `clarity` function.

## Disable Clarity
Remove or unset `NEXT_PUBLIC_CLARITY_ID`. The script won't load.

## Related Env Helpers
`isClarityEnabled()` in `lib/env.ts` can be used for conditional logic if needed.

## Privacy & Consent
The script only executes after explicit acceptance. Declining consent prevents injection and clears existing cookies.

## Advanced Features
The official package supports additional features:
- Custom tags: `clarity.set("key", "value")`
- User identification: `clarity.identify("userId", { sessionId: "sessionId" })`
- Event tracking: `clarity.event("event_name")`

These can be added to the component as needed.

## Troubleshooting
- Ensure the ID is correct and no extra spaces.
- Confirm consent status: localStorage key `analytics-consent` should contain `{ status: "accepted" }`.
- **CSP Configuration**: Ensure `middleware.ts` includes Microsoft Clarity domains in the Content-Security-Policy:
  - `script-src`: Must include `https://www.clarity.ms`
  - `connect-src`: Must include `https://www.clarity.ms https://*.clarity.ms`
- Check browser console for any initialization errors or CSP violations.
- Verify `@microsoft/clarity` package is installed: `npm list @microsoft/clarity`
- Check Network tab for blocked requests - look for "(blocked:csp)" messages.
