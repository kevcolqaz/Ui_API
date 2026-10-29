# Playwright UI and API tests (TypeScript)

UI hooks are registered from `tests/hooks/ui-hooks.ts`. This project uses
Playwright Test with its built-in fixtures (`page`, `browser`,
`context`, and `request`) plus custom fixtures. The Flipkart UI test runs in
parallel on Chromium and Firefox. The ReqRes API suite uses a separate project
and data-driven API client. Test inputs and expected values are stored in JSON
under `tests/test-data`.

## Requirements

- Node.js 18 or newer
- Dependencies installed with `npm.cmd install`
- Chromium and Firefox installed with `npx.cmd playwright install chromium firefox`

## Run

```powershell
npm.cmd test
```

Run only the browser tests with `npm.cmd run test:browsers`, only the API tests
with `npm.cmd run test:api`, run TypeScript validation with
`npm.cmd run typecheck`, open Playwright UI mode with `npm.cmd run test:ui`, or
open the HTML report with `npm.cmd run report`.

The Flipkart test uses `test.step` to report its search and price validation.
It uses the live storefront, so results can be affected by availability, site
changes, sign-in or CAPTCHA prompts, and network conditions.

The ReqRes API tests cover GET user, paginated GET users, a chained POST → PUT →
PATCH → DELETE flow, and negative GET requests for missing or malformed user
IDs. Every request is shown as a named `test.step`. The public ReqRes demo is
rate-limited; tests do not need an API key for the `/api/users` endpoint.

Update `tests/test-data/phones.json` or `tests/test-data/api-users.json` to change
their respective test inputs.
