# Holistic Bravo Recipe Blog

## What This Project Is

A recipe blog website for the **@holisticbravo** YouTube channel, built on **Framer** (website builder + CMS). The site transforms 96 YouTube cooking videos into a structured recipe blog with 45 recipes, custom code components, filtering, and a full CMS-ready database.

**Owner:** Crystal (Holistic Bravo) — vegetarian/plant-based cooking content creator
**Developer:** Nicholas Horton
**Platform:** Framer (React-based website builder with built-in CMS)
**Target Launch:** March 16, 2026

## Brand

- **Primary Purple:** `#C795F0`
- **Primary Green:** `#7FE3B1`
- **Secondary Light:** `#F7F7FB`
- **Secondary Medium:** `#EEF0F5`
- **Heading Font:** Playfair Display
- **Body Font:** DM Sans
- **Button Style:** Pill-shaped (999px radius), purple default, green on hover, 0.3s transition

## Project Structure

```
HolisticBravo-RecipeBlog/
├── CLAUDE.md                        ← You are here
├── .gitignore
│
├── content/                         ← All site content
│   ├── recipes/                     ← Recipe data and CMS content
│   │   ├── ALL_RECIPES.csv          ← 45 recipes, 25 columns, CMS import-ready
│   │   ├── ALL_RECIPES.md           ← All recipes in markdown format
│   │   ├── ALL_RECIPES_RESTRUCTURED.md ← Blog-format recipes (reference)
│   │   ├── FRAMER_CMS_FIELDS.md     ← Recipe CMS field definitions
│   │   ├── BLOG_POST_CMS_FIELDS.md  ← Blog post CMS field definitions
│   │   └── RECIPE_LISTICLE_GROUPS.md ← Thematic groupings for listicle posts
│   ├── blog-posts/                  ← Written blog/listicle posts + video links
│   │   ├── blog-post-1-easy-vegan-recipes.md
│   │   ├── blog-post-1-video-links.md
│   │   ├── blog-post-2-vegan-gluten-free.md
│   │   ├── blog-post-2-video-links.md
│   │   ├── blog-post-3-high-protein-vegetarian-pasta.md
│   │   └── blog-post-3-video-links.md
│   ├── pages/                       ← Legal and policy pages
│   │   ├── privacy-policy.md
│   │   ├── terms-of-service.md
│   │   ├── cookie-policy.md
│   │   ├── affiliate-disclosure.md
│   │   └── nutrition-disclaimer.md
│   └── transcripts/                 ← 98 YouTube video transcripts (source material)
│
├── components/                      ← Framer React/TypeScript code components
│   ├── FilterableRecipeCard.tsx     ← Recipe cards with filter support (ACTIVE)
│   ├── RecipeFilter.tsx             ← Filter bar (Diet, Category, Cuisine, Sort)
│   ├── RecipeCategoryCards.tsx      ← Homepage category browser (4 cards)
│   ├── YouTubeCarousel.tsx          ← YouTube video carousel
│   ├── BlogPostDetail.tsx           ← Blog post detail page component
│   ├── RecipeBlogPost.tsx           ← Recipe detail page (monolithic, backup)
│   ├── RecipeCard.tsx               ← Legacy card (replaced by FilterableRecipeCard)
│   ├── RecipeOverrides.tsx          ← Legacy overrides
│   └── RecipeBlogSections/          ← Split version of RecipeBlogPost (13 files)
│
├── cms/                             ← CMS tag collections, schemas, and tools
│   ├── Recipe_schema_UPDATED.csv    ← Full recipe schema (latest)
│   ├── Recipe_schema.csv            ← Original recipe schema
│   ├── Recipe_Tag_Assignment_Guide.md
│   ├── CMS_Collection_Changes.md
│   ├── Categories.csv               ← 11 category tags
│   ├── Cuisines.csv                 ← 7 cuisine tags
│   ├── Diet Types.csv               ← 7 diet type tags
│   ├── Features.csv                 ← Feature tags
│   ├── Source_URLs.csv              ← YouTube source URLs
│   ├── generate_word_doc.py         ← Script to generate CMS update doc
│   └── update_recipe_csv.py         ← Script to update recipe CSV data
│
├── seo/                             ← Keyword research and SERP analysis
│   ├── KEYWORD_RESEARCH.md
│   ├── KEYWORD_RESEARCH_V2.md
│   ├── SERP_ANALYSIS.md
│   └── [4 Google keyword CSVs]
│
├── assets/                          ← Images and media
│   ├── logos.png                    ← Brand logos
│   ├── images-to-fix/               ← 9 recipe images needing re-extraction
│   └── recipe-images/               ← ~945 video frames (gitignored, 181MB)
│
├── docs/                            ← Project documentation
│   ├── PROJECT_STATUS.md            ← Current task tracking and progress
│   ├── PROJECT_SUMMARY.md           ← Full project history (12 phases)
│   ├── FILE_INVENTORY.md            ← Detailed file-by-file inventory
│   ├── RECIPE_TAG_ANALYSIS.md       ← Tag coverage analysis
│   └── RECIPE_TAG_ANALYSIS.csv      ← Tag analysis data
│
├── dashboard/                       ← Project management dashboard
│   ├── index.html
│   ├── data.json
│   └── server.ts
│
└── tools/                           ← Utility tools
    └── cms-formatter.html           ← CMS content formatting tool
```

## Critical Framer Constraints

1. **Code components CANNOT import from other local files.** Each `.tsx` file must be fully self-contained. Inline all utilities, colors, fonts, sub-components. Only `import from "react"` and `import from "framer"` work.
2. **CMS blog content fields must be Plain Text**, not Rich Text. Rich Text fields break String property bindings.
3. **No hardcoded defaults** in CMS-bound components — defaults override CMS bindings in Framer.
4. **Navigation must use `<a>` tags** (not `window.location.href`) for Framer preview mode compatibility.
5. **Hiding Collection List items** requires traversing Framer's nested wrapper divs upward to collapse the outermost single-child parent.

## Key Technical Details

- **Filter system:** RecipeFilter and FilterableRecipeCard communicate via custom DOM events (`recipeFilterChange`) and `window.__recipeFilters`
- **Recipe detail path:** `/recipe` (singular) — same path for list and detail pages
- **Category links:** `/recipe?category=Value` with URL query params
- **Markdown in plain text:** Components include a built-in lightweight markdown parser (bold, italic, links, lists)
- **Image slots:** RecipeBlogPost supports 7 images (featured + 6 section images) via `ControlType.Image`
- **assets/recipe-images/ is gitignored** — 945 frames, ~181MB, stored locally only

## CMS Collections

| Collection | Items | Status |
|-----------|-------|--------|
| Recipes | 45 | CSV ready, needs import + image selection |
| Diet Types | 7 | Vegetarian, Vegan, High-Protein, Plant-Based, Paleo, Gluten-Free, Grain-Free |
| Categories | 11 | Breakfast, Lunch, Dinner, Dessert, Snack, Appetizer, Pasta, Quick Meals, etc. |
| Cuisines | 7 | American, Italian, Asian, Chinese, Fusion, Latin American, Mediterranean |

## Current Status

See `docs/PROJECT_STATUS.md` for detailed task tracking and launch plan.

**What's Done:** All 45 recipes written, all core Framer components built (recipe detail, cards, filters, categories, carousel, blog post detail), ~945 images extracted, CMS schema defined, legal pages written, 3 blog posts drafted, SEO keyword research completed, project dashboard built.

**What's Left:** UI polish, about page, image curation, recipe QA/proofreading, remaining blog posts, CMS tagging cleanup, and final Framer assembly.
