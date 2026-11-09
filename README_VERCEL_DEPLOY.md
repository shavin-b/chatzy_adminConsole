# Chatzy Admin — Vercel deployment notes

This is a sanitized source copy prepared from the uploaded admin_web completed.zip.
The existing UI and Firebase/command logic were not rewritten. Minimal changes replace
old OrderFlow branding, reject unknown admin roles, and strictly require the
Chatzy Firebase project ID (chatzy-d8ba4). Device/subscription queries remain unchanged.

DO NOT upload the original ZIP to GitHub: it contains .env.local, .git history,
node_modules and build artifacts. This source copy excludes them.

## Vercel project settings
- Framework Preset: Vite
- Root Directory: repository root (./)
- Install Command: npm ci
- Build Command: npm run build
- Output Directory: dist
- Node.js: 22.x when selectable

## Environment variables (enter genuine values in Vercel Dashboard)
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=chatzy-d8ba4
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

Get every value from Firebase Project Settings -> Your apps -> Chatzy Admin Web -> Config.
Do not guess the storage bucket; confirm it exactly. VITE_* values are bundled into the browser:
NEVER enter Firebase Admin private keys, service-account JSON, or backend tokens.

VITE_COMMAND_API_BASE_URL: Do not set this to the OLD OrderFlow Worker endpoint.
Leave it unset until an authorized Chatzy backend command endpoint is ready and tested.
Remote LOCK/UNLOCK will fail safely with a configuration error meanwhile.
Do not point a Chatzy dashboard to an OrderFlow Worker: that could send commands
to the wrong project. This upload does NOT include the newer enrollment panel
from the separately updated full project.

Optional support configuration:
VITE_SUPPORT_EMAIL=
VITE_SUPPORT_PHONE=
VITE_PRIVACY_POLICY_URL=
VITE_WEBSITE_URL=

## Recommended GitHub → Vercel steps
1. Unzip this archive. Create a **private** GitHub repository.
2. Upload the **contents of the chatzy-admin-vercel folder**, not the zip file itself.
3. On Vercel, select Add New → Project → import your GitHub repository.
4. Select Vite, root directory ./, npm ci, npm run build, output dist.
5. Under Environment Variables, enter all six genuine Firebase Web app values from
   Firebase console. Use project ID chatzy-d8ba4. Leave command endpoint empty.
6. Set the same variables for the environment being deployed (Preview or Production).
7. Deploy. If adding/editing environment variables later, redeploy to rebuild Vite.
8. Test Admin sign-in and authorized Firestore reads in a **private preview**.

## Production-readiness warnings
- Firebase Admin login requires Authentication Email/Password and admins/{Auth UID} profile.
- Firestore admin authorization is enforced by real deployed rules/backend, not the React route guard.
- Reconfirm storageBucket verbatim from Firebase Web Config; do not guess it.
- If Firebase Auth needs a website authorized domain for your sign-in flow, add the exact Vercel host under Firebase Authentication → Settings → Authorized domains.
- Firestore must have reviewed secure rules; default production rules may deny all client reads.
- New Chatzy Firestore is a separate project. Only data actually registered/migrated there can appear.
- Never publish staged strict enrollment rules until the authenticated Android clients and
  required Functions are operational. Never reopen broad unauthenticated access as a workaround.
- Vercel hosts this React frontend only; it DOES NOT deploy Firebase Functions or Cloudflare Worker.
- No hosted sign-in, Firestore reads, or remote commands were tested during packaging.
- Test a private preview, then review authentication and authorization before sharing publicly.
