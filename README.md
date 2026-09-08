# 8 Limbs FC

Companion app for 8 Limbs FC — run, train, and eat, with one plan tying it
all together. Built as an installable web app (PWA): no App Store needed,
just open the site in Safari on iPhone and add it to the home screen.

## Features

- **Onboarding** — measurements + goal + activity level compute a daily
  calorie and macro target (Mifflin-St Jeor formula).
- **Run / Walk tracking** — live elapsed time and distance. Uses real GPS
  (`navigator.geolocation`) when permission is granted, and falls back to a
  simulated pace otherwise (e.g. desktop testing, permission denied).
- **Workout tracking** — a daily exercise checklist, weekly session count,
  and history.
- **Nutrition tracking** — macro rings, quick-add presets, a custom meal
  form, and a recipe/ingredients flow including a "scan your fridge" screen.
  The fridge scan's ingredient detection is a **placeholder** (simulated
  delay + seeded ingredients) — wiring it to a real vision/AI model is a
  follow-up.
- **Account** — profile, goals/macros summary, notifications toggle.

All state is kept on-device in `localStorage` — there is no backend yet.

## Installing on your iPhone

1. Open the deployed URL in **Safari** on your iPhone (GitHub Pages URL —
   see below).
2. Tap the **Share** icon, then **Add to Home Screen**.
3. Launch it from the home screen icon — it runs full-screen, like a native
   app, and works offline after the first load.

## Development

```bash
npm install
npm run dev
```

## Android app

The web app is wrapped as a native Android app with
[Capacitor](https://capacitorjs.com/) (see `android/`, `capacitor.config.ts`).
The run/walk tracker uses the same `navigator.geolocation` API as the web
build — Capacitor's WebView bridge handles the Android runtime permission
prompt automatically (`ACCESS_FINE_LOCATION` / `ACCESS_COARSE_LOCATION`,
declared in `android/app/src/main/AndroidManifest.xml`), so no extra native
plugin is needed for GPS tracking.

**Get a build without any local setup:** push to a `claude/**` branch (or
run the "Build Android APK" workflow manually from the Actions tab). It
builds `app-debug.apk` and attaches it to the workflow run as a downloadable
artifact.

**Build locally** (requires Android Studio / the Android SDK):

```bash
npm run android        # builds the web app with a relative base path and
                        # runs `cap sync android`
cd android
./gradlew assembleDebug  # -> android/app/build/outputs/apk/debug/app-debug.apk
```

Open the `android/` folder in Android Studio instead of using Gradle
directly if you want to run on a device/emulator or build a signed release
APK/AAB for the Play Store.

## Deployment

Pushing to this repo's default branch (or any `claude/**` branch) builds and
deploys to GitHub Pages via `.github/workflows/deploy.yml`. One-time setup:
in the repo's **Settings → Pages**, set **Source** to **GitHub Actions**.
After that every push publishes to `https://<owner>.github.io/<repo>/`.

## Design

Built from a Claude Design handoff (`8 Limbs FC` prototype) — brand colors
`#0a0a0a` / `#F9B21A`, Oswald headings, Inter body.
