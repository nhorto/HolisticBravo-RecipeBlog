# Holistic Bravo Recipe Blog - Project Summary

**Project:** Recipe blog for @holisticbravo YouTube channel
**Platform:** Framer (website builder + CMS)
**Date Started:** February 9, 2026
**Last Updated:** February 12, 2026

---

## What We Built

This project transforms 96 YouTube videos from the Holistic Bravo channel into a fully-structured recipe blog website using Framer. From raw YouTube transcripts to a complete CMS-ready recipe database with custom Framer components.

---

## Project Phases

### Phase 1: Transcript Extraction
- Downloaded transcripts and descriptions for all 96 YouTube videos
- Each video has its own folder in `transcripts/` containing `transcript.md` and `description.md`

### Phase 2: Recipe Extraction
- Identified 45 recipes across the 96 videos (not all videos contain recipes)
- Extracted each recipe into a structured `recipe.md` file within its video folder
- Fields: Title, Ingredients, Instructions, Prep Time, Cook Time, Servings, Calories, etc.

### Phase 3: Recipe Consolidation
- Combined all 45 recipes into `recipes/ALL_RECIPES.md` (4,642 lines)
- Created `recipes/RECIPE_LISTICLE_GROUPS.md` for thematic groupings

### Phase 4: Metadata Completion
- Updated all 45 recipes with: Diet types, Categories, Cuisine classifications
- Filled every blank field across all recipes - zero "Not Available" fields remain

### Phase 5: Blog Format Restructuring
- Restructured all 45 recipes to match shelikesfood.com blog format
- Each recipe now has dual structure:
  - **Blog content:** Introduction, Why You'll Love This, Tips, Ingredients Overview, Instructions Overview, FAQ
  - **Recipe Card:** Concise ingredients list, step-by-step instructions, nutrition info
- Output: `recipes/ALL_RECIPES_RESTRUCTURED.md` (6,414 lines)

### Phase 6: CMS Field Documentation
- Defined 25 CMS fields for Framer (see `recipes/FRAMER_CMS_FIELDS.md`)
- Fields organized by group: Core, Blog Content, Recipe Card, Taxonomy

### Phase 7: Framer Code Components
Built 4 custom Framer code components:

1. **RecipeBlogPost.tsx** - Full recipe detail page renderer
   - Renders all blog sections + recipe card
   - Built-in markdown parser for plain text CMS fields
   - Optional image slots for each section (7 total)
   - Jump to Recipe + Print Recipe buttons
   - No hardcoded defaults (CMS data flows through cleanly)

2. **RecipeCard.tsx** - Recipe listing card (legacy, replaced by FilterableRecipeCard)

3. **RecipeCategoryCards.tsx** - Homepage category browser
   - 4 configurable cards (Breakfast, Quick Meals, High Protein, Pasta)
   - SVG icons, hover effects (purple border, green text transition)
   - Uses `<a>` tags for Framer-compatible navigation
   - Click navigates to `/recipe?category=Value` with filter query parameter
   - Each card's filter type configurable: Category, Diet, or Cuisine

4. **RecipeOverrides.tsx** - Code overrides (legacy, may not be needed)
   - JumpToRecipe and PrintRecipe overrides for designed buttons

### Phase 8: Recipe Rewriting
- Rewrote all 45 recipes in first person (from Holistic Bravo's perspective)
- Voice: Chill and knowledgeable, confident but not bubbly
- Expanded Introduction, Ingredients Overview, and Instructions Overview by 1-2 paragraphs each
- Enhanced Recipe Card ingredients (prep notes, sizes) and instructions (tips per step)

### Phase 9: CSV Export for CMS Import
- Exported all 45 rewritten recipes to `recipes/ALL_RECIPES.csv` (419.8 KB)
- 25 columns matching CMS field names for direct Framer import
- Multi-line fields properly CSV-escaped

### Phase 10: Recipe Filtering & Sorting System
Built a two-component filtering system that communicates via custom DOM events:

1. **RecipeFilter.tsx** - Filter bar component
   - Dropdowns for Diet, Category, Cuisine, and Sort (Newest/Oldest)
   - Custom-styled dropdown menus with brand colors
   - Active filter pills with click-to-remove and "Clear All"
   - Results count display and "No recipes found" message
   - Reads URL query params on mount (works with RecipeCategoryCards links)
   - Responsive: 2x2 grid on mobile, horizontal row on desktop

2. **FilterableRecipeCard.tsx** - Filterable recipe card for Collection Lists
   - Listens for filter events and hides/shows based on CMS data match
   - Multi-value matching (e.g., "Vegetarian, High-Protein" matches "Vegetarian" filter)
   - Sorting via CSS `order` on Framer wrapper elements
   - Traverses Framer's nested wrapper divs to fully collapse hidden cards
   - Uses `<a>` tags for navigation (compatible with Framer's internal router/preview mode)
   - Enhanced design: hover effects, category pill overlay, diet tag pills, "Read More" link

- Updated **RecipeCategoryCards.tsx** to use `<a>` tags (fixes Framer preview navigation)
- Fixed category card layout: 4th card no longer stretches full-width when wrapping

### Phase 11: YouTube Video Carousel
- **YouTubeCarousel.tsx** - Embedded YouTube video carousel component
  - 3 videos visible on desktop, 2 on tablet, 1 on mobile
  - Click thumbnail to play video embedded on the page (iframe)
  - Arrow navigation with smooth sliding animation
  - Dot indicators with active state (purple, stretched width)
  - Hover effects on thumbnails (zoom + purple shadow)
  - Videos configurable via `ControlType.Array` property (YouTube URL + title per entry)
  - Supports all YouTube URL formats (watch, youtu.be, shorts, embeds)

### Phase 12: Recipe Image Extraction (In Progress)
- Automated frame extraction from all 45 recipe YouTube videos
- Uses `yt-dlp` + `ffmpeg` to download videos and extract high-quality JPEG frames
- 20 frames per video at evenly spaced intervals (5% to 95% of duration)
- Output: `recipe-images/{slug}/` folders with timestamped filenames
- Script: `recipe-images/extract_frames.py` (re-runnable, skips completed videos)
- Total: ~900 images across 45 recipes for manual selection

---

## Brand Specifications

| Element | Value |
|---------|-------|
| Primary Purple | #C795F0 |
| Primary Green | #7FE3B1 |
| Secondary Light | #F7F7FB |
| Secondary Medium | #EEF0F5 |
| Body Font | DM Sans |
| Heading Font | Playfair Display |
| Button Style | Pill-shaped (999px radius), purple default, green on hover, 0.3s transition |

---

## CMS Collections Needed in Framer

### Recipes (main collection - 45 items)
Import via `recipes/ALL_RECIPES.csv`

### Diet Types (7 items)
Gluten-Free, Grain-Free, High-Protein, Paleo, Plant-Based, Vegan, Vegetarian

### Categories (11 items)
Appetizer, Beverage, Breakfast, Dessert, Dinner, Lunch, Pasta, Quick Meals, Salad, Side Dish, Snack

### Cuisines (7 items)
American, Asian, Chinese, Fusion, Italian, Latin American, Mediterranean

---

## Folder Structure

```
HolisticBravo-RecipeBlog/
├── PROJECT_SUMMARY.md          ← This file
├── FILE_INVENTORY.md           ← Describes every file and folder
├── components/
│   ├── RecipeBlogPost.tsx      ← Recipe detail page component
│   ├── RecipeCard.tsx          ← Recipe listing card (legacy)
│   ├── RecipeCategoryCards.tsx ← Homepage category browser
│   ├── RecipeFilter.tsx        ← Filter bar (Diet, Category, Cuisine, Sort)
│   ├── FilterableRecipeCard.tsx ← Filterable recipe card for Collection Lists
│   ├── YouTubeCarousel.tsx     ← Embedded YouTube video carousel
│   └── RecipeOverrides.tsx     ← Code overrides (legacy)
├── recipes/
│   ├── ALL_RECIPES.csv         ← 45 recipes, CMS-ready (IMPORT THIS)
│   ├── ALL_RECIPES.md          ← Original combined recipes
│   ├── ALL_RECIPES_RESTRUCTURED.md ← Blog-format restructured recipes
│   ├── FRAMER_CMS_FIELDS.md   ← CMS field definitions
│   └── RECIPE_LISTICLE_GROUPS.md ← Thematic recipe groupings
├── recipe-images/              ← Extracted video frames for blog images
│   ├── extract_frames.py       ← Frame extraction script
│   └── [45 slug folders]       ← 20 frames each, timestamped filenames
└── transcripts/
    └── [98 video folders]      ← Each with transcript.md + description.md
        └── [45 have recipe.md] ← Individual recipe files
```

---

## Key Technical Notes

- **CMS field types:** Blog content fields (Introduction, Tips, etc.) must be **Plain Text** in Framer CMS, not Rich Text. Rich Text fields show "Is Set / Isn't Set" when binding to String property controls.
- **No defaultProps:** The RecipeBlogPost component has no hardcoded default values. This is intentional - it ensures CMS data flows through properly on detail pages. If defaults are present, Framer treats them as "set values" that override CMS bindings.
- **Markdown in plain text:** The components include a built-in lightweight markdown parser that handles bold, italic, links, bullet lists, and numbered lists from plain text CMS fields.
- **Image handling:** `ControlType.Image` returns a URL string or undefined - images are conditionally rendered (show when set, hidden when empty).
- **Filter communication:** RecipeFilter and FilterableRecipeCard communicate via custom DOM events (`recipeFilterChange`). Filter state is also stored on `window.__recipeFilters` for late-mounting cards. URL query params are read on mount for cross-page filtering from RecipeCategoryCards.
- **Framer navigation:** Code components must use `<a>` tags (not `window.location.href`) for navigation to work in Framer's preview mode. Framer's internal router intercepts `<a>` clicks.
- **Hiding Collection List items:** Framer wraps each Collection List item in multiple nested divs. To fully collapse a hidden card, traverse up through single-child parents until reaching the grid container (parent with multiple children), then set `display: none` on that wrapper.
- **Recipe detail page path:** `/recipe` (singular). Recipe list page is also `/recipe`. Category cards link to `/recipe?category=Value`.
