# CHANGES.md — HelpDesk Ticket Management System

All notable changes made to this project are documented here.

---

## Commit 8 — Deployment Configuration
**Files added:**
- `nixpacks.toml` — Railway build config: installs PHP 8.2 + Node 20, runs `composer install`, `npm ci`, `npm run build`, then caches config/routes/views
- `Procfile` — start command: runs `migrate --force`, `db:seed --force`, then `php artisan serve`
- `.env.example` — safe environment variable template with no real secrets; `APP_ENV=production`, `APP_DEBUG=false`, MySQL placeholders

---

## Commit 7 — All Inertia Page Components
**Files added:**
- `resources/js/Pages/Tickets/Index.jsx` — paginated ticket list; desktop table + mobile stacked cards; confirm dialog before delete; empty state illustration
- `resources/js/Pages/Tickets/Create.jsx` — create form using `useForm` + `post()`; inline validation errors; disabled button while processing
- `resources/js/Pages/Tickets/Edit.jsx` — edit form pre-filled with ticket data using `useForm` + `patch()`
- `resources/js/Pages/Tickets/Show.jsx` — full ticket detail view with edit and delete actions
- `resources/js/Pages/Dashboard.jsx` — welcome dashboard with quick links to tickets
- `resources/js/Pages/Auth/` — Login, Register, ForgotPassword, ResetPassword, VerifyEmail (Breeze defaults)
- `resources/js/Pages/Profile/` — Edit profile, update password, delete account (Breeze defaults)

---

## Commit 6 — Reusable Ticket UI Components
**Files added:**
- `resources/js/Components/PriorityBadge.jsx` — color-coded badge: Low (gray), Medium (blue), High (orange), Urgent (red)
- `resources/js/Components/StatusBadge.jsx` — color-coded badge: Open (green), In Progress (yellow), Resolved (blue), Closed (gray)
- `resources/js/Components/TicketForm.jsx` — shared form component used by Create and Edit; all fields with inline errors; submit button disables while processing

---

## Commit 5 — AuthenticatedLayout + Base Components
**Files changed:**
- `resources/js/Layouts/AuthenticatedLayout.jsx` — added Tickets nav link, New Ticket button (desktop + mobile), logged-in user name display, flash message banner (auto-dismisses after 4s, manual close)

**Files added (Breeze defaults):**
- `resources/js/Layouts/GuestLayout.jsx`
- All base components: `ApplicationLogo`, `Checkbox`, `DangerButton`, `Dropdown`, `InputError`, `InputLabel`, `Modal`, `NavLink`, `PrimaryButton`, `ResponsiveNavLink`, `SecondaryButton`, `TextInput`

---

## Commit 4 — TicketController, Auth Controllers, Routes, Middleware
**Files added:**
- `app/Http/Controllers/TicketController.php` — full CRUD; thin controller pattern; `user_id` always set from `auth()->id()`; `Gate::authorize()` on show/edit/update/destroy; flash success messages on every action
- `app/Http/Controllers/Auth/` — all Breeze auth controllers (login, register, password reset, email verification)
- `app/Http/Controllers/ProfileController.php` — profile edit/update/delete
- `app/Http/Middleware/HandleInertiaRequests.php` — shares `flash.success` and `flash.error` globally to all Inertia pages
- `routes/web.php` — `Route::resource('tickets', TicketController::class)` inside `auth` middleware group; unauthenticated visitors redirect to `/login`
- `routes/auth.php` — all Breeze auth routes

---

## Commit 3 — TicketPolicy and Form Request Validation
**Files added:**
- `app/Policies/TicketPolicy.php` — `view()`, `update()`, `delete()` restricted to ticket owner; returns HTTP 403 if another user tries to access by changing the URL ID
- `app/Http/Requests/StoreTicketRequest.php` — validates title (required, 5–255 chars), description (required, min 10 chars), priority/status/category via `Rule::in()`
- `app/Http/Requests/UpdateTicketRequest.php` — same rules as StoreTicketRequest

---

## Commit 2 — Ticket Model, Migration, and Seeder
**Files added:**
- `database/migrations/2026_10_12_052758_create_tickets_table.php` — creates `tickets` table with: `id`, `user_id` (FK cascade delete), `title` (string 255), `description` (text), `priority` (enum), `status` (enum, default Open), `category` (enum), `timestamps`
- `app/Models/Ticket.php` — `$fillable` mass-assignment protection; `user()` BelongsTo relationship
- `app/Models/User.php` — default Laravel user model
- `database/seeders/DatabaseSeeder.php` — creates demo account (`demo@helpdesk.com` / `password`) with 3 sample tickets using `firstOrCreate`

---

## Commit 1 — Laravel 12 + Breeze Scaffold
**Stack:** Laravel 12.69.3 + Inertia.js + React + Tailwind CSS (satisfies "Laravel 11 or later" requirement)

**Files added:**
- Full Laravel 12 project scaffold via `composer create-project laravel/laravel`
- Laravel Breeze installed with `--react` (Inertia stack)
- `composer.json` / `composer.lock` — all PHP dependencies locked
- `package.json` / `package-lock.json` — all JS dependencies locked
- `vite.config.js` — Vite build config with React + Inertia plugin
- `resources/css/app.css` — Tailwind CSS entry point
- `resources/views/app.blade.php` — Inertia root HTML shell
- `public/` — web entry point (`index.php`, `.htaccess`)
- `config/` — all Laravel config files
- `storage/` — log and cache storage structure
- `.gitignore` — excludes `.env`, `vendor/`, `node_modules/`, `public/build/`
- `.gitattributes` — line ending normalization

---

## Security Notes
- `.env` is gitignored — never committed
- `.env.example` has no real secrets — only placeholder values
- `APP_KEY` is set via Railway environment variable, not in code
- `user_id` is always sourced from `auth()->id()`, never from form input
- CSRF protection enabled (Inertia handles this automatically)
- Passwords hashed via Laravel's default bcrypt hasher
- `APP_DEBUG=false` and `APP_ENV=production` set in Railway environment variables

---

## Railway Deployment Guide (MySQL only)

### Prerequisites
- GitHub repo pushed (done)
- Railway account at [railway.app](https://railway.app)

### Step 1 — Create Project from GitHub
1. Log in to Railway → click **New Project**
2. Choose **Deploy from GitHub repo**
3. Select `Jan-Emerson/LaboratoryExamAppDev1`
4. Railway detects `nixpacks.toml` and starts building automatically

### Step 2 — Add MySQL Database
1. Inside your project, click **+ New** → **Database** → **MySQL**
2. Railway provisions a MySQL instance immediately
3. Click the MySQL service → go to the **Variables** tab
4. You will see auto-generated values for:
   - `MYSQLHOST`
   - `MYSQLPORT`
   - `MYSQLDATABASE`
   - `MYSQLUSER`
   - `MYSQLPASSWORD`

### Step 3 — Set Environment Variables on the Laravel Service
Click your **Laravel app service** → **Variables** tab → add these one by one:

```
APP_NAME=HelpDesk
APP_ENV=production
APP_KEY=           ← get this by running: php artisan key:generate --show
APP_DEBUG=false
APP_URL=           ← fill in after Railway gives you the public URL

DB_CONNECTION=mysql
DB_HOST=           ← paste MYSQLHOST from MySQL service
DB_PORT=           ← paste MYSQLPORT (usually 3306)
DB_DATABASE=       ← paste MYSQLDATABASE
DB_USERNAME=       ← paste MYSQLUSER
DB_PASSWORD=       ← paste MYSQLPASSWORD

SESSION_DRIVER=file
CACHE_STORE=file
QUEUE_CONNECTION=sync
LOG_CHANNEL=stderr
LOG_LEVEL=error
```

> **Shortcut:** Railway lets you reference MySQL variables directly.
> Instead of copy-pasting, you can use: `${{MySQL.MYSQLHOST}}` etc.

### Step 4 — Get Your APP_KEY
Run this on your local machine and paste the output into Railway:
```bash
php artisan key:generate --show
```

### Step 5 — Trigger Deploy
- Railway auto-deploys on every `git push` to `main`
- Or click **Deploy** manually in the Railway dashboard
- Watch **Build Logs** — the build installs dependencies and compiles assets
- Watch **Deploy Logs** — migrations and seeding run automatically on start

### Step 6 — Update APP_URL
After Railway assigns your public domain (e.g. `https://laboratoryexamappdev1-production.up.railway.app`):
1. Go back to your app's **Variables** tab
2. Set `APP_URL` to that exact HTTPS URL
3. Railway redeploys automatically

### Step 7 — Verify
- [ ] Visit your Railway HTTPS URL — HelpDesk welcome page loads
- [ ] Log in with `demo@helpdesk.com` / `password`
- [ ] Create, view, edit, delete a ticket
- [ ] Try visiting `/tickets/999` (someone else's ticket) — should get 403
- [ ] Check browser console — no mixed-content errors

### About jsconfig.json
No errors. The file maps `@/*` to `resources/js/*` for IDE path aliases
and `ziggy-js` to the Ziggy vendor package. Any red underline in the IDE
for `ziggy-js` disappears after running `composer install` since it resolves
the vendor path. Nothing needs to be changed.
