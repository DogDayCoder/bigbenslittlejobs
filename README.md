# Big Ben’s Little Jobs

A mobile-first, accessible, static Vite website. No runtime framework, webfonts, external images or server dependencies. The hero uses a local WebP illustration of Ben.

## Local development

Requires Node.js 22.12+ (or a newer supported release).

```sh
npm install
npm run dev
```

Development runs at http://localhost:5173 with a strict port. To build and preview production:

```sh
npm run build
npm run preview
```

Production files are generated in `dist`; production preview uses http://localhost:4173.

## Contact setup before launch

The contact number is 07408 647870. WhatsApp links use `447408647870` and call links use `+447408647870`. The business owner should confirm the public liability insurance and tidy-finish claims before publishing.

The service area deliberately lists only Seaton Ross and neighbouring East Yorkshire villages because individual neighbouring villages have not been specified.

## Live availability setup

The hero beacon uses `https://api.npoint.io/21557c835524c55ff3e9`, configured as `STATUS_ENDPOINT` in `src/main.js`. Update that bin with JSON in this format:

```json
{
  "status": "available",
  "message": "Available for small jobs this week"
}
```

Supported statuses are `available` (green pulse), `busy` (amber pulse), and `booked` (static slate dot). The badge fetches on DOMContentLoaded with a three-second timeout and a timestamp query parameter and displays the endpoint's message as plain text. While loading, without JavaScript, or if the request or payload fails, it shows “Taking on jobs this week” with the default available green pulse already rendered in the HTML. Pulse animations respect reduced-motion preferences.

## Netlify deployment

The included `netlify.toml` sets `npm run build` and `dist`. Enable Netlify form detection for the site. Deploy the production build; Netlify detects the static `contact` form including its hidden `form-name`, honeypot and required fields. Configure submission notifications in Netlify. A successful native POST redirects to `/thanks.html`.

Local Vite previews cannot collect submissions. Local submissions show an explicit message instead of claiming an enquiry was sent. Production form submission is handled by Netlify without custom server code. On other static hosts, configure a form service before launch.

All contact links work without JavaScript; the form uses native validation, and the site includes visible labels, focus indicators, reduced-motion support and a skip link.
