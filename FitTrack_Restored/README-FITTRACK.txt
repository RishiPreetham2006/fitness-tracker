FITTRACK AUTHENTICATION REPAIR (2026-11-25)

This build fixes the registration/login flow: registering creates the account,
automatically establishes a demo session, and redirects to user.html. Login also
stores the account name and redirects according to role. The dashboard greeting
uses the stored account name. Logout clears the session and returns to the public
home page.

IMPORTANT: This is a localStorage-based demonstration only. It is not secure
authentication and must not be used with real passwords or deployed as-is.

Run from this extracted folder using:
  python -m http.server 8000
Then open http://localhost:8000/index.html

# FitTrack — repaired project

## Run the project
1. Extract the ZIP.
2. Open the `fintness tracter` folder in Visual Studio Code.
3. Install/enable the **Live Server** extension if needed.
4. Right-click `fitness.html` and choose **Open with Live Server**.
5. Use the navigation links to move between the existing pages.

Do not open individual HTML files by double-clicking if you want consistent browser storage. Use the same Live Server address and browser for all pages.

## Demo sign-in
The current login page is a **front-end demonstration only**. It accepts a non-empty email/password and the selected role, then stores a demo session in browser localStorage. It is not secure authentication and is not connected to MySQL. Do not use real passwords.

## Data storage
Fitness metrics and weekly snapshots are stored in the browser's localStorage. Data is local to the browser/profile and is not shared between devices or users. The weekly report stores up to the latest seven daily snapshots.

## Important project limitation
The ZIP you supplied contains HTML, CSS and JavaScript only. It does not contain a server-side backend, database schema, or database connection. A browser page must not connect directly to MySQL using database credentials. To add real database persistence and secure login, the project needs a backend (for example PHP + MySQL using XAMPP, or Node.js + MySQL) and API endpoints. This repaired version intentionally keeps your current Live Server workflow working rather than silently introducing a server requirement.

## Main repairs in this pass
- Fixed page links to match the filenames that actually exist.
- Standardized the weekly report filename to `weekly-progress.html`.
- Corrected the Steps page stylesheet/script paths.
- Removed the duplicate BMI ID and malformed nested link/section from the dashboard BMI button.
- Added daily snapshots for the weekly report and dated workout history entries.
- Made logout clear the demo session.
- Clarified that login, registration, password recovery and admin data are demo-only.

## Before submission
- Test each page from `fitness.html`.
- Test steps, water, calories, sleep, BMI, workout timer, weekly report and logout.
- Use the same browser profile while testing because localStorage is browser-specific.

## Public pages added
- `index.html`: public landing page with overview, feature cards, workouts, plan preview and FAQ.
- `plans.html`: Free and Premium demo plan comparison.
- `register.html`: browser-local demo registration form with email duplicate check and password confirmation.

## Demo credentials
- Admin: `admin@fittrack.demo` / `Admin123!`
- User: register through `register.html` to create a demo user, then log in.

The admin demo credentials are hard-coded in the front-end and can be inspected. This is not secure access control.

## Added demo flows in this repair
- Public `index.html` is the landing page.
- `plans.html` gives a simple plan comparison.
- `register.html` creates local demo accounts.
- `profile.html` stores profile fields per email in a dedicated localStorage key.
- `workout-details.html` is a query-driven session timer that logs a completed workout.
- Login now accepts registered demo accounts; the admin demo uses `admin@fittrack.demo` / `Admin123!`.

**Known limitations:** most legacy tracker metrics still use shared browser-localStorage keys rather than account-specific keys. The role check and admin credentials are front-end only and can be bypassed. No real payments, backend, secure sessions, or cloud sync exist.

## Run commands (VS Code terminal)
From the project folder, run a local server with Python: `python -m http.server 8000`, then visit `http://localhost:8000/index.html`. Alternatively, use VS Code Live Server.

NAVIGATION AND AUTHENTICATION REPAIR (November 2026)
- Public landing page index.html is the only page with the main Login action.
- Tracking pages share a persistent tab bar from fittrack-nav.js (Dashboard, Steps, Water, Calories, Sleep, BMI, Reports, Workouts, Profile).
- Registration signs the new demo account in and routes to user.html.
- Login routes registered accounts to user.html. Admin login is a fixed demo account: admin@fittrack.demo / Admin123!
- Compatibility note: the original login demo did not persist or validate user passwords; it accepted any non-empty credentials after choosing User. The updated login preserves that legacy behavior for unregistered non-admin emails (demo-only) to avoid blocking old users. Admin access is never granted by this fallback.
- This is client-side demo authentication only, not secure production authentication.


UPDATE 2026-11-25 (navigation/workout polish)
- Removed Home/Public Home from authenticated shared tabs; dashboard is the landing tab.
- Public index redirects authenticated User/Admin sessions to their respective dashboards.
- User dashboard source no longer contains the Home tab.
- Workout library expanded to 14 cards; new workout IDs have matching workout-detail guidance.
- Preserved original green/mint theme; added subtle transitions and reduced-motion support.


ROLE-SPECIFIC DEMO SIGN-IN
User: use a registered user account or legacy demo user credentials in User Login mode.
Admin: switch to Admin Login mode. Email: admin@fittrack.demo Password: Admin123!
Admin sign-in is separate and strict; user fallback cannot grant admin role.

This is a browser-only demonstration; localStorage-based auth is not production secure.

ADMIN ACCESS LOG + ADMIN REGISTRATION UPDATE
- Admin dashboard has a Today Access Activity table populated from successful login events stored in browser localStorage.
- Admin Login supports the fixed demo admin and additional admins registered locally.
- Register New Admin (shown in Admin Login mode) requires the registration password: suryabhai.
- Fixed demo admin login remains: admin@fittrack.demo / Admin123!
- These browser-local demo features are not secure server authentication; logs/admin accounts are only available in the same browser storage.
