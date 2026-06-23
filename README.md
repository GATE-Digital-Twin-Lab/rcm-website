# GATE — Reliable Computational Modelling (RCM) — website

Static website for the GATE RCM research group. Plain HTML/CSS/JS — no build step, no framework.

---

## Local preview

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000> in your browser.

---

## Deployment

The site is hosted on **GitHub Pages** and deploys automatically on every push to `main` via GitHub Actions (`.github/workflows/deploy.yml`).

> **Required one-time setup:**
> **Repo → Settings → Pages → Build and deployment → Source: "GitHub Actions"**

The workflow stages only web files into a `_site/` folder (excluding `.pptx`, `.github/`, `docs/`, `README.md`) and publishes that artifact to Pages.

---

## Custom domain (optional)

To serve the site at a custom domain such as `rcm.gate-ai.eu`:

1. Create a file named `CNAME` at the repo root containing exactly the domain, e.g.:

   ```text
   rcm.gate-ai.eu
   ```

2. Add a DNS `CNAME` record at your registrar pointing `rcm.gate-ai.eu` → `gate-digital-twin-lab.github.io`.
3. Commit and push the `CNAME` file — GitHub Pages picks it up automatically.

> Do **not** commit an empty `CNAME` file; it must contain the domain.

---

## Project structure

```text
rcm-website/
├── index.html                        # Site entry point
├── assets/
│   ├── css/                          # Stylesheets
│   ├── js/                           # Scripts
│   └── images/                       # Images and graphics
├── docs/                             # Supporting documents (not published)
├── RCM_poster_uptogate_2025.pptx     # Source poster — tracked in git, NOT published
└── .github/
    └── workflows/
        └── deploy.yml                # GitHub Actions deployment workflow
```

`RCM_poster_uptogate_2025.pptx` is the source poster file. It is version-controlled in git but is explicitly excluded from the deployed site artifact.
