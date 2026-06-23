# RCM Poster Content Specification

Source: `RCM_poster_uptogate_2025.pptx` (single slide, extracted 2026-06-23)

---

## People

| Name | Role / Title | Affiliation / Email |
|------|-------------|---------------------|
| Alexander Kostadinov | Listed as author (last modifier not him; active commenter on poster) | GATE Institute — alexander.kostadinov@gate-ai.eu |
| Mariya Pantusheva | Listed as author; referenced for structural analysis results | GATE Institute — mariya.pantusheva@gate-ai.eu |
| Petar Hristov | Listed as author; PhD, BEng — Experienced Researcher (known context) | GATE Institute — petar.hristov@gate-ai.eu |
| Radostin Mitkov | Listed as author; last person to save the file (`lastModifiedBy`) | GATE Institute — radostin.mitkov@gate-ai.eu |
| Valentin Nikolov | Listed as author | GATE Institute — (email not in XML; likely valentin.nikolov@gate-ai.eu by pattern) |
| Zlatan Dimitrov | Listed as author | GATE Institute — (email not in XML; likely zlatan.dimitrov@gate-ai.eu by pattern) |

**Name block as it appears on the poster (verbatim):**
> Alexander Kostadinov, Mariya Pantusheva,
> Petar Hristov, Radostin Mitkov, Valentin Nikolov, Zlatan Dimitrov

**Affiliation line on poster:** GATE Institute

**Notes on roles:** The poster does not individually label roles/titles for each person beyond the group affiliation. The only individually confirmed title from known context is Petar Hristov: PhD, BEng, Experienced Researcher. Radostin Mitkov is confirmed as the most recent editor. Comment authors in XML: Alexander Kostadinov (AK), Mariya Pantusheva (MP), Petar Hristov (PH), Radostin Mitkov (RM).

---

## Research Content

### Poster title
**Setting the Standard in Reliable Digital Twins**

### Overview / Summary (main introductory text)
The products for an increasing number of fields of life are relying on virtual concept-to-creation representations. This digitisation seeks to increase the efficiency of the design and operation process, and to widen the phase space of possible solutions, to degrees inaccessible for traditional experimentation-based approaches.

To find its place in the creation value chain, models must be **reliable** — that is, their pronouncements must come with a measurable degree of trust.

The research of the Reliable Computational Modelling group focuses on the development of the methods and tools required to achieve this state of affairs.

### Definition: Reliable Model
> A **judiciously constructed model** of an engineered system, endowed with a **comprehensive uncertainty assessment**.

(Note: poster spells it "REALIABLE MODEL" — likely a typo to correct on the website.)

### The Importance of Reliable Models

#### Making the Picture Clear
There are several misconceptions in modelling and simulation that inhibit the broader discourse about reliability:

1. **Traditional calculations are reliable and precise** because they are expressed to several decimal places. Most people would say they don't have this misconception, but they behave as though they do.
2. **Model complexity** (measured by the number of parameters) is synonymous with reliability. The implications of the limits of knowledge about model structure and parameter values are seldom explored.
3. **Digital twins** (the coupling of mathematical models with data) solves the trust problem. Data offers the best state of knowledge, but is hardly perfect itself.

#### Misconceptions About Uncertainty
- Full and proper accounting of the uncertainty in simulations and models would blow up to a vacuous conclusion.
- Uncertainty is too expensive to quantify and should be managed as an afterthought with varying degrees of rigor.

#### A Counterpoint
Carefully accounting for and managing uncertainty (UQ & M) through the entire process of digitization can result in the development of more efficient, robust and cost-effective processes and products that avoid the waste of overdesign, and can enhance understanding of the problem.

The need for UQ & M grows as industries mature from prescriptive, standard-based engineering to performance-based approaches.

If it enters the development of the modelling tools, UQ & M can be done:
- Efficiently
- With minimal assumptions
- With respect for the available knowledge

### Modelling Pipeline (4 stages)
The modelling process consists of four main distinct stages:
1. Geometry creation and preprocessing
2. Computational mesh generation
3. Physics & solver settings
4. Results postprocessing & reporting

For each of these stages, GATE has developed reliable and reproducible modelling pipelines that integrate best practices for verification, validation, and uncertainty assessment, as well as machine learning–assisted optimization and automation. These workflows ensure consistent model quality, transparency, and traceability across all simulation projects.

---

### Research Topics

#### 1. Multiphysics Modelling
Research covers a wide range of applied **multiphysics** (fluids, structures, parametric) and **multifidelity** modelling. Currently focused on everything on both sides of the solver.

**Figure 2 reference:** Computational solid mechanics simulation predicting stress distribution for a structural component, and CFD simulation predicting flow and pressure distribution around a large passenger aircraft. (Sources: DLR; Ansys)

**Figure 3 reference:** Pressure coefficient around a 2D airfoil, predicted by the panel code XFOIL. (Source: GATE-RCM)

**Figure 4 reference:** A typical multiphysics simulation pipeline — the GATE-RCM group work currently covers all but the fourth box.

#### 2. Uncertainty Quantification
Research spans the entire verification, validation and uncertainty quantification (VV&UQ) pipeline, including:
- Uncertainty identification
- Characterization (natural variability + lack of knowledge)
- Propagation
- Sensitivity analysis
- Reliability analysis
- Calibration
- Data-based uncertainty quantification

These steps lead to the ultimate goal of constructing reliable models and, eventually, digital twins.

**Figure 5 reference:** The uncertainty quantification pipeline adopted by the GATE-RCM group.

**Figure 6 reference:** Uncertainty characterisation accounting for both natural variability and lack of knowledge.

**Figure 7 reference:** Components of the UQ pipeline — Verification (tests correctness of code implementation); Calibration (identifies parameters for better agreement between data and predictions); Reliability analysis (rare events and their probability).

#### 3. Scientific Machine Learning
The capabilities offered by combining physical knowledge with flexible machine learning models open the way for:
- Closure modelling
- Surrogate modelling
- Deep learning
- Interpretable machine learning

The RCM group works to maintain the reliability of this new class of methods to ensure their wide applicability to industry.

**FVMN (Finite Volume Method Network):** Architecture with tier-derivative input/output system based on a multilayer perceptron. Used to accelerate CFD simulation. Relative error in x-velocity between FVMN predictions and CFD results — largest errors occur in the wake behind buildings (where wind speeds are lowest, so absolute differences remain small).

Hybrid ML-CFD workflow: accelerates CFD simulation using scientific machine learning while maintaining accuracy.

#### 4. Reliable Language Models
Language models are showing increasing potential, becoming important assistants in our lives. However, language models are based on deep neural networks ("black boxes") and have no reasonable way to quantify the uncertainty in their responses.

GATE-RCM addresses this using **conformal prediction** to give statistical guarantees on the model's responses, while preserving its flexibility. Goal: create a framework that can be easily deployed in pretrained models, without additional training and change of the architecture, able to measure uncertainty both intuitively and mathematically.

---

## Applications

### Reliable Urban Environmental Modelling
Urban environments are complex systems where wind, heat, and pollutants interact in ways that shape local conditions, affecting comfort, health, and safety. Computational modelling offers a clear pathway towards improving quality of life in urban areas by enabling rapid testing of solutions to improve air quality.

**ERIES-ValUr project:** GATE's RCM and Future Cities teams applied for wind tunnel time under this project and successfully conducted a two-week experimental campaign at the wind tunnel owned and operated by **TU Eindhoven** (The Netherlands).

- CFD simulation of wind flow through the ERIES-ValUr region (velocity magnitude contours)
- Computational model and mesh generated for CFD analysis
- Wind velocity distribution at pedestrian height, Sofia: Macedonia Square (A) and Court of Justice / Съдебна палата (B)
- Simulation of wind flow and pollution dispersion around idealized building blocks with alternating heights

### Reliable Industrial Modelling
- Structural and seismic design of industrial facilities
- Structural analysis for the automotive industry
- (Ansys imagery referenced)

### Certification by Simulation (CbS) — unCertify project
Every aircraft must undergo a certification process consisting of flight testing and evidence presentation for safety and performance. Certification is both lengthy and expensive — a major roadblock to a more democratic aerospace market.

**Certification by Simulation (CbS):** A process that aims to relieve the burden of flight test-based procedures to speed up certification while maintaining an equivalent level of safety.

**unCertify:** Developing a UQ framework for simulation-enabled aircraft design for certification — a shift of mindset on how airworthiness is reliably demonstrated and the missing piece to enable widespread adoption of CbS.

Initial validation: **AIAA CbS Community of Interest Challenge Problem** — recertifying the NASA CRM geometry after installation of a radom.

---

## Contact / Other Text

### Group Ecosystem / Membership
- **GATE-RCM is a member of the EASN** (European Aeronautics Science Network — abbreviation not spelled out on poster)

### Digital Twin Laboratory (DTL)
The Digital Twin Lab supports three main models:
1. Industrial knowledge transfer partnerships
2. Research-based business services
3. Joint participation in research excellence programs

Seeking co-innovation partnerships from:
- Academia (TRL 1++)
- Industry (TRL 3++)
- Validation adopters (TRL 6++)

**Tagline:** "ACADEMIC - INDUSTRIAL CO-INNOVATION IS AT THE HEART OF WHAT WE DO!"

### TRL Scale (as referenced on poster)
- Basic principles to Initial technology validation → **Research**
- System demonstration to Mission deployment → **Industry**
- **Digital Twin Lab** (positioned between research and industry)

### Section Headings on Poster
- SUMMARY
- THE IMPORTANCE OF RELIABLE MODELS
- RELIABLE MODELLING APPLICATIONS
- THE DIGITAL TWIN LABORATORY
- RELIABLE MODELLING RESEARCH
- RELIABLE MODELLING GROUP ECOSYSTEM
- MAKING THE PICTURE CLEAR
- MISCONCEPTIONS ABOUT UNCERTAINTY
- A COUNTERPOINT

### Email Addresses (from XML metadata)
| Person | Email |
|--------|-------|
| Alexander Kostadinov | alexander.kostadinov@gate-ai.eu |
| Mariya Pantusheva | mariya.pantusheva@gate-ai.eu |
| Petar Hristov | petar.hristov@gate-ai.eu |
| Radostin Mitkov | radostin.mitkov@gate-ai.eu |

Valentin Nikolov and Zlatan Dimitrov emails not found in XML (likely follow same pattern: `@gate-ai.eu`).

No phone numbers or postal addresses found in slide text.

### External Sources / Credits cited on poster
- Source: DLR (German Aerospace Center) — aircraft CFD image
- Source: Ansys — structural simulation image
- Source: GATE-RCM — XFOIL airfoil pressure coefficient figure
- TU Eindhoven — wind tunnel for ERIES-ValUr
- PosterPresentations.com — poster template origin

---

## Images Inventory

Total media files: **58** (50 PNG/JPEG/SVG images + 7 WDP HD photos + 1 MP4 video)

| Filename | Type | Size (bytes) |
|----------|------|-------------|
| hdphoto1.wdp | WDP (HD Photo/JPEG XR) | 189,473 |
| hdphoto2.wdp | WDP | 154,048 |
| hdphoto3.wdp | WDP | 87,321 |
| hdphoto4.wdp | WDP | 42,096 |
| hdphoto5.wdp | WDP | 237,043 |
| hdphoto6.wdp | WDP | 74,421 |
| hdphoto7.wdp | WDP | 250,990 |
| image1.jpeg | JPEG | 1,029 |
| image2.png | PNG | 33,536 |
| image3.png | PNG | 49,489 |
| image4.png | PNG | 71,156 |
| image5.png | PNG | 538,608 |
| image6.png | PNG | 1,169,379 |
| image7.png | PNG | 27,785 |
| image8.png | PNG | 20,016 |
| image9.png | PNG | 228,056 |
| image10.png | PNG | 729,539 |
| image11.png | PNG | 62,302 |
| image12.png | PNG | 98,259 |
| image13.png | PNG | 90,542 |
| image14.png | PNG | 84,609 |
| image15.jpeg | JPEG | 95,535 |
| image16.png | PNG | 708,032 |
| image17.png | PNG | 469,171 |
| image18.png | PNG | 363,824 |
| image19.png | PNG | 161,830 |
| image20.png | PNG | 504,213 |
| image21.png | PNG | 1,752,463 |
| image22.png | PNG | 544,372 |
| image23.png | PNG | 159,721 |
| image24.png | PNG | 124,885 |
| image25.png | PNG | 2,199 |
| image26.png | PNG | 55,350 |
| image27.png | PNG | 247,761 |
| image28.png | PNG | 481,192 |
| image29.png | PNG | 2,087,889 |
| image30.png | PNG | 857,875 |
| image31.jpeg | JPEG | 11,184 |
| image32.png | PNG | 1,083,203 |
| image33.png | PNG | 393,234 |
| image34.jpeg | JPEG | 13,729 |
| image35.png | PNG | 673,709 |
| image36.png | PNG | 139,379 |
| image37.png | PNG | 14,602 |
| image38.png | PNG | 63,619 |
| image39.jpeg | JPEG | 156,739 |
| image40.jpeg | JPEG | 14,525 |
| image41.png | PNG | 63,821 |
| image42.png | PNG | 288,934 |
| image43.png | PNG | 41,538 |
| image44.png | PNG | 46,865 |
| image45.png | PNG | 44,451 |
| image46.png | PNG | 183,758 |
| image47.png | PNG | 72,271 |
| image48.png | PNG | 172,288 |
| image49.svg | SVG | 290,209 |
| image50.png | PNG | 37,279 |
| media1.mp4 | MP4 (video) | 3,138,676 |

**Counts by type:**
- PNG: 42
- JPEG/JPG: 6
- WDP (HD Photo): 7
- SVG: 1
- MP4 (video): 1
- **Total: 57 items** (not counting 2×hdphoto variants — all 58 entries in media/)

All 57 media files listed in the slide's relationship file are actively embedded. The video (media1.mp4, ~3 MB) is embedded and linked to the slide.

---

## Notes / Ambiguities

1. **Typo on poster:** "REALIABLE MODEL" (heading) — should be "RELIABLE MODEL". Do not replicate this on the website.

2. **"Figure 9" appears twice** with different content: one labels the AIAA CbS challenge figure; another labels the FVMN architecture figure. This is an internal numbering inconsistency in the poster that needs resolving for the website.

3. **Figure 3 caption** says "XFOI" — almost certainly should be "XFOIL" (panel code). Correct on website.

4. **"radom"** in the CbS text — likely should be "radome" (aerodynamic fairing over a radar antenna). Correct on website.

5. **Valentin Nikolov and Zlatan Dimitrov** appear only in the name block on the poster; their individual emails and roles are not in the poster XML. Their GATE email pattern likely follows the same `firstname.lastname@gate-ai.eu` convention.

6. **No individual roles/titles** are given for team members on the poster beyond the group affiliation "GATE Institute." The only externally confirmed title is Petar Hristov (PhD, BEng, Experienced Researcher).

7. **EASN abbreviation** is not spelled out on the poster ("European Aeronautics Science Network" — verify before publishing).

8. **Bulgarian text** appears in one caption (wind velocity distribution over Sofia). The English translation is provided inline on the poster: "Wind velocity distribution at pedestrian height. Top view. A - Macedonia Square; B - Court of Justice."

9. **Draft/internal comments visible in poster:** Several text boxes contain internal editorial notes (e.g., "What I think we are missing/should change:", "More pics from Ansys if needed"). These are NOT public-facing content and must be excluded from the website.

10. **WDP files** (7 HD Photo/JPEG XR format files) are not universally supported by browsers. If these are background/decorative images they will need conversion to JPEG or WebP for web use.

11. **media1.mp4 (3.1 MB video)** is embedded in the poster — likely a CFD simulation animation. Should be preserved and featured on the website.

12. **Image-to-figure mapping** is not fully recoverable from XML alone (the slide uses `r:embed` relationship IDs for image placement). Visual inspection of the exported poster would be needed to precisely label which image file corresponds to which Figure number caption.

13. **Poster template** is from PosterPresentations.com (template "1_36x48-Template-V2b") — the website design should not replicate the poster layout but should extract the content.
