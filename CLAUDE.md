# Holistic Bravo Recipe Blog

## What This Project Is

A recipe blog website for the **@holisticbravo** YouTube channel, built on **Framer** (website builder + CMS). The site transforms 96 YouTube cooking videos into a structured recipe blog with 45 recipes, custom components, filtering, and a full CMS-ready database.

**Owner:** Crystal (Holistic Bravo) - vegetarian/plant-based cooking content creator
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
├── CLAUDE.md                  ← You are here
├── PROJECT_STATUS.md          ← Current state of all tasks and progress
├── PROJECT_SUMMARY.md         ← Full project history (12 phases)
├── components/                ← Framer React/TypeScript code components
│   ├── RecipeBlogPost.tsx     ← Recipe detail page (monolithic, backup)
│   ├── FilterableRecipeCard.tsx ← Recipe cards with filter support (ACTIVE)
│   ├── RecipeFilter.tsx       ← Filter bar (Diet, Category, Cuisine, Sort)
│   ├── RecipeCategoryCards.tsx ← Homepage category browser (4 cards)
│   ├── YouTubeCarousel.tsx    ← YouTube video carousel
│   ├── RecipeCard.tsx         ← Legacy card (replaced by FilterableRecipeCard)
│   ├── RecipeOverrides.tsx    ← Legacy overrides
│   └── RecipeBlogSections/    ← Split version of RecipeBlogPost (13 files)
├── recipes/
│   ├── ALL_RECIPES.csv        ← 45 recipes, 25 columns, CMS import-ready
│   ├── ALL_RECIPES_RESTRUCTURED.md ← Blog-format recipes (reference)
│   ├── FRAMER_CMS_FIELDS.md   ← CMS field definitions
│   └── RECIPE_LISTICLE_GROUPS.md ← Thematic groupings for blog posts
├── recipe-images/             ← ~945 extracted video frames (21 per recipe)
│   ├── extract_frames.py
│   └── [45 slug-named folders]
├── CMS Schema/                ← Tag collections, schema CSVs, tagging guides
│   ├── Recipe_schema_UPDATED.csv
│   ├── Recipe_Tag_Assignment_Guide.md
│   └── [tag collection CSVs]
└── transcripts/               ← 98 YouTube video transcripts (source material)
```

## Critical Framer Constraints

1. **Code components CANNOT import from other local files.** Each `.tsx` file must be fully self-contained. Inline all utilities, colors, fonts, sub-components. Only `import from "react"` and `import from "framer"` work.
2. **CMS blog content fields must be Plain Text**, not Rich Text. Rich Text fields break String property bindings.
3. **No hardcoded defaults** in CMS-bound components - defaults override CMS bindings in Framer.
4. **Navigation must use `<a>` tags** (not `window.location.href`) for Framer preview mode compatibility.
5. **Hiding Collection List items** requires traversing Framer's nested wrapper divs upward to collapse the outermost single-child parent.

## Key Technical Details

- **Filter system:** RecipeFilter and FilterableRecipeCard communicate via custom DOM events (`recipeFilterChange`) and `window.__recipeFilters`
- **Recipe detail path:** `/recipe` (singular) - same path for list and detail pages
- **Category links:** `/recipe?category=Value` with URL query params
- **Markdown in plain text:** Components include a built-in lightweight markdown parser (bold, italic, links, lists)
- **Image slots:** RecipeBlogPost supports 7 images (featured + 6 section images) via `ControlType.Image`

## CMS Collections

| Collection | Items | Status |
|-----------|-------|--------|
| Recipes | 45 | CSV ready, needs import + image selection |
| Diet Types | 7 | Vegetarian, Vegan, High-Protein, Plant-Based, Paleo, Gluten-Free, Grain-Free |
| Categories | 11 | Breakfast, Lunch, Dinner, Dessert, Snack, Appetizer, Pasta, Quick Meals, etc. |
| Cuisines | 7 | American, Italian, Asian, Chinese, Fusion, Latin American, Mediterranean |

## Current Status

See `PROJECT_STATUS.md` for detailed task tracking and launch plan.

**What's Done:** All 45 recipes written, all core Framer components built (recipe detail, cards, filters, categories, carousel), ~945 images extracted, CMS schema defined.

**What's Left:** UI polish, missing pages (about, blog, legal), image curation, recipe QA/proofreading, blog post writing, SEO research, CMS tagging cleanup, and final Framer assembly.
