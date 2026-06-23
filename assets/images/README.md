# assets/images — Placeholder SVG Manifest

All files in this directory are hand-crafted SVG placeholders using the GATE design system brand colours. Replace each placeholder with the production asset described below. Source images for the team, applications, and hero are located inside `RCM_poster_uptogate_2025.pptx` (under `ppt/media/`); note that several are WDP/HD-Photo format and **must be converted to JPEG or WebP** before web use (e.g. via ImageMagick `convert`, libvips, or Squoosh).

---

## Logo & Favicon

| File | Represents | Recommended production asset | Recommended dimensions / format |
|------|-----------|------------------------------|----------------------------------|
| `logo-rcm.svg` | Horizontal RCM wordmark with GATE tag | Official SVG or EPS from the GATE brand kit | SVG (vector), target render height 36 px |
| `favicon.svg` | 32×32 monogram/icon for browser tab | Same mark as logo, square crop, SVG | SVG 32×32; also generate `favicon.ico` (16/32/48) and `apple-touch-icon.png` (180×180) |

---

## Hero

| File | Represents | Recommended production asset | Recommended dimensions / format |
|------|-----------|------------------------------|----------------------------------|
| `hero.svg` | Abstract hero visual — computational/simulation aesthetic | High-res atmospheric render or photograph of simulation output, or a professionally designed brand illustration | 1280×960 WebP (2× for HiDPI) or keep as polished SVG; compress aggressively |

---

## Research Icons

| File | Represents | Recommended production asset | Recommended dimensions / format |
|------|-----------|------------------------------|----------------------------------|
| `research/multiphysics.svg` | Multiphysics research area — fluid/wave + structure | Custom icon in the GATE line-icon style | SVG 64×64 (scales to 32–128 px) |
| `research/uncertainty-quantification.svg` | Uncertainty quantification — distribution + error bars | Custom icon | SVG 64×64 |
| `research/scientific-ml.svg` | Scientific machine learning — neural network | Custom icon | SVG 64×64 |
| `research/reliable-language-models.svg` | Reliable language models — code + verification | Custom icon | SVG 64×64 |

---

## Application Images (16:9 cards)

| File | Represents | Recommended production asset | Recommended dimensions / format |
|------|-----------|------------------------------|----------------------------------|
| `applications/urban-environmental.svg` | Urban environmental modelling | Photo or render of urban CFD/wind-environment simulation; source from PPTX `ppt/media/` | 1280×720 JPEG/WebP, quality 80 |
| `applications/industrial.svg` | Industrial modelling | Photo or render of industrial structural/mechanical simulation | 1280×720 JPEG/WebP, quality 80 |
| `applications/certification-by-simulation.svg` | Certification by simulation | Aircraft or engineering test render with certification overlay | 1280×720 JPEG/WebP, quality 80 |

---

## Team Avatars

| File | Initials | Represents | Recommended production asset | Recommended dimensions / format |
|------|----------|-----------|------------------------------|----------------------------------|
| `team/alexander-kostadinov.svg` | AK | Alexander Kostadinov | Headshot photo; source from PPTX `ppt/media/` (convert WDP→JPG) | 480×480 JPEG, cropped to face, quality 85 |
| `team/mariya-pantusheva.svg` | MP | Mariya Pantusheva | Headshot photo | 480×480 JPEG, quality 85 |
| `team/petar-hristov.svg` | PH | Petar Hristov | Headshot photo | 480×480 JPEG, quality 85 |
| `team/radostin-mitkov.svg` | RM | Radostin Mitkov | Headshot photo | 480×480 JPEG, quality 85 |
| `team/valentin-nikolov.svg` | VN | Valentin Nikolov | Headshot photo | 480×480 JPEG, quality 85 |
| `team/zlatan-dimitrov.svg` | ZD | Zlatan Dimitrov | Headshot photo | 480×480 JPEG, quality 85 |

---

## Funding Logos

| File | Represents | Recommended production asset | Recommended dimensions / format |
|------|-----------|------------------------------|----------------------------------|
| `funding/eu.svg` | "Co-funded by the European Union" / NextGenerationEU | Official EU emblem SVG from the European Commission press kit (https://commission.europa.eu/resources-and-tools/images-and-audiovisual-resources_en) — use the approved "Co-funded by the EU" lockup | SVG (official), render at 2× for HiDPI; min display height 35 px per EU guidelines |
| `funding/pniidit.svg` | National Research, Innovation & Digitalisation Programme (PNIIDIT) | Official PNIIDIT or BG RRP logo from the programme's press materials | SVG or PNG 320×96, transparent background |

---

## Notes on PPTX source images

- Location inside the archive: `RCM_poster_uptogate_2025.pptx` → unzip → `ppt/media/`
- Several images are stored as `.wdp` (Windows Media Photo / HD Photo / JPEG XR). To convert:
  ```bash
  # Using ImageMagick
  magick image1.wdp image1.jpg

  # Using libvips
  vips copy image1.wdp image1.jpg

  # Batch convert all WDP to JPEG
  for f in ppt/media/*.wdp; do magick "$f" "${f%.wdp}.jpg"; done
  ```
- After conversion, optimise for web:
  ```bash
  # WebP (recommended for modern browsers)
  cwebp -q 82 image.jpg -o image.webp

  # Or use Squoosh CLI
  squoosh-cli --webp '{"quality":82}' image.jpg
  ```
- Headshots: crop to 1:1, center on face, export at 480×480 minimum (960×960 for HiDPI).
- Application images: crop to 16:9, export at 1280×720 minimum (2560×1440 for HiDPI).
