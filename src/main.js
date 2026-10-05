const STATUS_ENDPOINT = 'https://api.npoint.io/21557c835524c55ff3e9';

async function loadAvailability() {
  const availabilityBadge = document.querySelector('[data-availability]');
  if (!availabilityBadge) return;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 3000);

  try {
    const url = new URL(STATUS_ENDPOINT);
    url.searchParams.set('t', Date.now().toString());
    const response = await fetch(url, { cache: 'no-store', signal: controller.signal });
    if (!response.ok) return;

    const payload = await response.json();
    if (
      controller.signal.aborted ||
      !payload ||
      !['available', 'busy', 'booked'].includes(payload.status) ||
      typeof payload.message !== 'string' ||
      !payload.message.trim()
    ) return;

    availabilityBadge.querySelector('[data-availability-message]').textContent = payload.message.trim();
    availabilityBadge.dataset.status = payload.status;
  } catch {
    // Network errors, timeouts and invalid JSON leave the available fallback intact.
  } finally {
    clearTimeout(timeout);
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', loadAvailability, { once: true });
} else {
  loadAvailability();
}

document.querySelectorAll('[data-year]').forEach((element) => {
  element.textContent = new Date().getFullYear();
});

// Netlify handles the native POST in production. Local previews cannot collect enquiries.
const form = document.querySelector('form[name="contact"]');
if (form && ['localhost', '127.0.0.1', '::1'].includes(window.location.hostname)) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const status = document.querySelector('#form-status');
    status.hidden = false;
    status.textContent = 'This local preview cannot send enquiries. The form will collect messages when hosted on Netlify. You can use the WhatsApp link instead.';
  });
}
