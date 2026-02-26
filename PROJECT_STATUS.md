# Holistic Bravo - Project Status & Launch Plan

**Target Launch Date:** March 16, 2026
**Last Updated:** February 16, 2026

---

## Current State Summary

### What's Complete
- 45 recipes fully written in first-person voice (Holistic Bravo's perspective)
- CMS-ready CSV with 25 fields per recipe
- ~945 video frame images extracted (21 per recipe, 45 folders)
- 7 Framer code components built and functional
- Filter/sort system working (RecipeFilter + FilterableRecipeCard)
- Recipe detail page component (RecipeBlogPost + split sections)
- Homepage category browser (RecipeCategoryCards)
- YouTube video carousel (YouTubeCarousel)
- CMS schema defined with tagging guides
- Listicle groupings planned for blog posts

### What's Incomplete
- CMS tagging: 34% of recipes (13) have NO tags, 52% missing Cuisine tags
- 8 recipes have broken FAQ data ("[object Object]")
- 7 recipes in main CSV but not in CMS Schema (45 vs 38 discrepancy)
- No featured images selected or assigned
- No footer, about page, blog page, or legal pages
- No blog posts written
- Recipe QA/proofreading not started
- SEO keyword research not done
- No meta descriptions written for any pages
- No Recipe JSON-LD structured data (critical for Google rich results)
- No analytics setup (GA4, Search Console, UTM tracking)

---

## Launch Plan - 4 Weeks to March 16

### WEEK 1: Feb 16 - Feb 22 — FOUNDATION & RESEARCH

**Goal:** Get all research and planning done so the remaining weeks are pure execution.

#### Nicholas (Dev/Technical)

| Task | Est. Time | Notes |
|------|-----------|-------|
| Create image audit list for Crystal | 2 hrs | Script to check which recipes lack good featured images and have few usable frames. Deliver list to Crystal. |
| SEO keyword research | 4-6 hrs | Research keywords for blog posts. Determine groupings (high protein, quick meals, etc.). Identify which keywords to target and avoid cannibalization. |
| Set up GA4 + Search Console | 1-2 hrs | Create GA4 property, add Measurement ID to Framer Site Settings. Verify Search Console with HTML meta tag in Framer custom code. Submit sitemap.xml. Do this early so data starts collecting ASAP. |
| Create UTM naming convention doc | 1 hr | Define consistent UTM parameters for Instagram, YouTube, etc. so all future links are trackable. |
| Categorize recipes for blog posts | 2 hrs | Using keyword research, map recipes to blog post groupings. Prioritize which recipes need QA first. |
| Fix recipe detail page - rich text conversion | 3-4 hrs | Change components to accept rich text for easier editing in Framer CMS. |
| Fix card component image issue | 2-3 hrs | Address tall/portrait phone images not fitting card components. Options: CSS object-fit cropping, aspect ratio containers, or image guidelines for Crystal. |
| Resize images on detail pages | 1-2 hrs | Recipe and blog detail page images are too large - constrain dimensions. |

#### Crystal (Content)

| Task | Est. Time | Notes |
|------|-----------|-------|
| Start sourcing missing recipe images | Ongoing | Nicholas provides the list of recipes needing images. Find or photograph replacements. |
| Begin recipe QA - priority recipes first | 30-60 min/recipe | Start with recipes identified for blog posts. Check FAQ, nutrition, writing quality. |

---

### WEEK 2: Feb 23 - Mar 1 — UI & CONTENT BUILD

**Goal:** Finish all UI components and get blog post drafts started.

#### Nicholas (Dev/Technical)

| Task | Est. Time | Notes |
|------|-----------|-------|
| Finish footer component | 2-3 hrs | Build self-contained Framer component with nav links, social links, copyright. |
| Finish mobile menu dropdown | 2-3 hrs | Update/fix the mobile navigation menu. |
| Build about me page layout + component | 3-4 hrs | Page layout and info section on homepage. |
| Add home page hero image | 1-2 hrs | Add featured image/hero to homepage. |
| Build blog detail page | 3-4 hrs | New page for blog posts (not recipes). Shouldn't be huge - basic CMS detail page. |
| Build "Popular Recipes" / featured section on homepage | 2-3 hrs | Component linking to popular/featured recipes. Could link to dedicated category pages. |
| Fix CMS tagging issues | 2-3 hrs | Tag the 13 untagged recipes, fix 8 broken FAQs, add missing Cuisine tags. |
| Add related/more recipes section to recipe detail | 2-3 hrs | Section at bottom of recipe pages showing related recipes. |

#### Crystal (Content)

| Task | Est. Time | Notes |
|------|-----------|-------|
| Continue recipe QA/proofreading | Ongoing | Target: finish at least 20 recipes this week. |
| Continue sourcing images | Ongoing | Priority on recipes that will be in the first blog posts. |

---

### WEEK 3: Mar 2 - Mar 8 — CONTENT & PAGES

**Goal:** All blog posts drafted, all recipes QA'd, dedicated pages decision made.

#### Nicholas (Dev/Technical)

| Task | Est. Time | Notes |
|------|-----------|-------|
| Dedicated category pages (breakfast, lunch, dinner) | 4-6 hrs | IF SEO research shows this is valuable. May just be filtered views with unique URLs and meta descriptions. Decision should come from Week 1 research. |
| Generate privacy policy + legal pages | 2-3 hrs | Research requirements, generate pages, add to site. Terms of service, privacy policy, cookie notice, disclaimers. |
| Write blog post #1 | 3-4 hrs | Listicle-style post linking to site recipes. Based on keyword research. |
| Write blog post #2 | 3-4 hrs | Second listicle post, different keyword target. |
| Write blog post #3 | 3-4 hrs | Third listicle post, different keyword target. |
| Upload all images to Framer CMS | 3-4 hrs | Select best frames from extracted images, upload, assign to recipes. |

#### Crystal (Content)

| Task | Est. Time | Notes |
|------|-----------|-------|
| Finish recipe QA/proofreading | Ongoing | Target: all 45 recipes reviewed by end of week. |
| Review and approve blog post drafts | 1-2 hrs | Read through blog posts, provide feedback. |
| Finalize about me page copy | 1-2 hrs | Write or approve about page content. |
| Deliver all sourced images | End of week | All missing/replacement images delivered. |

---

### WEEK 4: Mar 9 - Mar 15 — POLISH & LAUNCH

**Goal:** Everything assembled in Framer, tested, and ready to go live March 16.

#### Nicholas (Dev/Technical)

| Task | Est. Time | Notes |
|------|-----------|-------|
| Final Framer assembly | 4-6 hrs | Connect all components to CMS, verify all pages work, test all filters/navigation. |
| Write meta descriptions for all pages | 3-4 hrs | Unique meta title (<60 chars) and description (<160 chars) for: homepage, about, recipe list, each recipe (use CMS dynamic fields), blog list, each blog post, legal pages. For CMS pages, add `SEO_Title` and `SEO_Description` fields and bind them in Collection Page Settings. |
| Add Recipe JSON-LD to recipe detail page | 3-4 hrs | Add structured data via Collection Page Settings → Custom Code → Start of `<head>`. Use CMS dynamic variables with `| json` filter. Must include: name, image, author, prepTime, cookTime, totalTime, recipeYield, recipeIngredient, recipeInstructions, nutrition. Add ISO 8601 duration fields to CMS (PT15M format) if not already present. Test with Google Rich Results Test after publishing. |
| Responsive testing | 2-3 hrs | Test mobile, tablet, desktop across browsers. |
| Performance check | 1-2 hrs | Image optimization, loading speed, Core Web Vitals. |
| Final QA pass | 2-3 hrs | Click through every page, every recipe, every filter. Fix bugs. |
| Validate JSON-LD + analytics | 1-2 hrs | Run Google Rich Results Test on 3-5 recipes. Verify GA4 real-time report shows data. Confirm Search Console is verified and sitemap submitted. Test one UTM link from Instagram/YouTube. |
| Domain/DNS setup | 1 hr | Point domain to Framer, SSL, etc. |

#### Crystal (Content)

| Task | Est. Time | Notes |
|------|-----------|-------|
| Final content review | 2-3 hrs | Review entire site before launch. |
| Social media launch prep | As needed | Prepare announcement posts. |

---

## Task Master List (All Tasks)

### UI / Components
- [ ] Fix card component image issue (portrait phone images)
- [ ] Resize images on blog/recipe detail pages
- [ ] Convert recipe detail page to accept rich text
- [ ] Finish footer component
- [ ] Update mobile menu dropdown
- [ ] Build about me page layout + homepage info section
- [ ] Add hero image to homepage
- [ ] Build blog detail page
- [ ] Build "Popular Recipes" featured section on homepage
- [ ] Add related/more recipes to recipe detail page
- [ ] Dedicated category pages (pending SEO research)

### Content
- [ ] Write 3 blog posts (listicle style, linking to recipes)
- [ ] QA/proofread all 45 recipes (est. 30-60 min each)
- [ ] Write about me page copy
- [ ] Generate privacy policy, terms of service, legal pages

### Images
- [ ] Create image audit list (which recipes need images)
- [ ] Crystal sources missing/replacement images
- [ ] Select best frames from extracted images for each recipe
- [ ] Upload and assign all images in Framer CMS

### CMS / Data
- [ ] Tag 13 completely untagged recipes
- [ ] Fix 8 broken FAQ fields ("[object Object]")
- [ ] Add missing Cuisine tags (20 recipes)
- [ ] Reconcile 45 vs 38 recipe discrepancy between CSV and CMS Schema
- [ ] Import final CSV to Framer CMS

### Research
- [ ] SEO keyword research for blog posts
- [ ] Categorize recipes into keyword-targeted groups
- [ ] Determine if dedicated category pages are worth building
- [ ] Research privacy policy / legal requirements

### SEO & Analytics
- [ ] Set up GA4 property + add Measurement ID to Framer (do Week 1 - start collecting data early)
- [ ] Set up Google Search Console + submit sitemap.xml (do Week 1)
- [ ] Create UTM naming convention doc (consistent params for Instagram, YouTube, etc.)
- [ ] Write meta descriptions for all static pages (home, about, recipe list, blog list, legal)
- [ ] Add SEO_Title and SEO_Description CMS fields for recipe + blog collections
- [ ] Bind CMS SEO fields in Collection Page Settings for dynamic meta tags
- [ ] Add Recipe JSON-LD structured data to recipe collection page template (Custom Code → head)
- [ ] Add ISO 8601 duration fields to CMS if needed (PT15M, PT1H30M format)
- [ ] Validate JSON-LD with Google Rich Results Test (test 3-5 recipes after publishing)
- [ ] Test UTM tracking end-to-end (create link → click → verify in GA4)

### Launch Prep
- [ ] Final Framer assembly (all pages + CMS connections)
- [ ] Responsive testing (mobile, tablet, desktop)
- [ ] OG images for social sharing (default + per-page)
- [ ] Performance optimization
- [ ] Domain/DNS configuration
- [ ] Final QA pass

---

## Things You Might Be Forgetting

Based on reviewing the project, here are items not in your original list:

1. **CMS tagging is a mess** - 13 recipes have zero tags, 20 missing Cuisine tags, 8 have broken FAQs. This needs fixing before launch or filters won't work correctly.
2. **45 vs 38 recipe discrepancy** - Main CSV has 45 recipes but CMS Schema only has 38. 7 recipes may not make it into the CMS without reconciliation.
3. **Image selection from frames** - You have ~945 raw frames but none are assigned as featured images or section images yet. Someone needs to go through and pick the best ones.
4. ~~**SEO basics**~~ ✅ Added to plan - Meta descriptions, OG images, sitemap, JSON-LD.
5. ~~**Analytics**~~ ✅ Added to plan - GA4, Search Console, UTM tracking.
6. **Favicon and social branding** - Site icon, OG image defaults, Twitter card setup.
7. **404 page** - What happens when someone hits a bad URL.
8. **Newsletter/email signup** - Common for food blogs. May want to add before launch or plan for post-launch.
9. **RSS feed** - Helps with SEO and syndication for food blogs.
10. ~~**Structured data / Schema.org**~~ ✅ Added to plan - Recipe JSON-LD via Framer Custom Code in Collection Page Settings.
11. **Cookie consent banner** - Required in many jurisdictions, especially if using analytics.

---

## Open Questions

1. **Dedicated category pages** - Need SEO research to decide. Could just be filtered views with unique URLs.
2. **Blog post keywords** - Need research to determine what to target and avoid posts competing with each other.
3. **Newsletter** - Want this for launch or post-launch?
4. ~~**Recipe schema markup**~~ ✅ Yes, added to plan. Critical for food blog SEO - enables recipe cards in search results.
5. **Crystal's availability** - How many hours/week can she dedicate to recipe QA and image sourcing?

---

## Reference: SEO & Analytics Implementation Details

### Meta Descriptions in Framer

**Static pages** (home, about, legal):
- Page Settings → SEO section → fill in Title and Description

**CMS collection pages** (recipes, blog posts):
1. Add `SEO_Title` (Plain Text) and `SEO_Description` (Plain Text) fields to the CMS collection
2. Go to Collection Page Settings → SEO section
3. Set Title to `{{SEO_Title}}` and Description to `{{SEO_Description}}`
4. Each recipe/blog post gets unique meta tags automatically

**Guidelines:** Title < 60 chars, Description 150-160 chars. Be specific - include recipe name, key ingredients, or cooking time.

---

### Recipe JSON-LD Structured Data

**Where:** Collection Page Settings → Custom Code → Start of `<head>` tag

**CMS fields needed** (add if missing):
- `PrepTime_ISO` (Plain Text) - e.g., "PT15M" for 15 minutes
- `CookTime_ISO` (Plain Text) - e.g., "PT30M" for 30 minutes
- `TotalTime_ISO` (Plain Text) - e.g., "PT45M" for 45 minutes

**ISO 8601 duration format:** `PT` prefix + hours (`H`) and/or minutes (`M`). Examples: `PT5M`, `PT1H`, `PT1H30M`

**Template to paste in Custom Code:**

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org/",
  "@type": "Recipe",
  "name": {{Name | json}},
  "image": {{Featured_Image | json}},
  "author": {
    "@type": "Person",
    "name": "Holistic Bravo"
  },
  "datePublished": {{Created_Date | json}},
  "description": {{Short_Description | json}},
  "prepTime": {{PrepTime_ISO | json}},
  "cookTime": {{CookTime_ISO | json}},
  "totalTime": {{TotalTime_ISO | json}},
  "recipeYield": {{Servings | json}},
  "recipeCategory": {{Category | json}},
  "recipeCuisine": {{Cuisine | json}},
  "nutrition": {
    "@type": "NutritionInformation",
    "calories": "{{Calories}} calories"
  },
  "recipeIngredient": {{Recipe_Card_Ingredients | json}},
  "recipeInstructions": {{Recipe_Card_Instructions | json}}
}
</script>
```

**CRITICAL:** Always use the `| json` filter on text fields. Without it, quotes and line breaks in content will break the JSON silently.

**Field names above are placeholders** - replace with your actual CMS field names. Check Framer's variable picker in Custom Code to see available fields.

**Testing:** After publishing, test 3-5 recipe pages at https://search.google.com/test/rich-results

**Note:** JSON-LD does NOT work in Framer preview mode. You must publish to test it.

---

### Google Analytics (GA4) Setup

1. Go to https://analytics.google.com → Create property → Create web data stream
2. Copy Measurement ID (format: `G-XXXXXXXXX`)
3. In Framer: Site Settings → General → Google Analytics → paste ID
4. Publish site
5. Verify: GA4 → Reports → Real-time → visit your site → you should see yourself

**Framer also has built-in analytics** (Analytics tab in sidebar) - privacy-first, no cookie banner needed, shows page views, sources, devices, geography. Good for quick checks but less detailed than GA4.

---

### Google Search Console Setup

1. Go to https://search.google.com/search-console → Add property (URL prefix)
2. Choose HTML tag verification → copy the `<meta>` tag
3. In Framer: Site Settings → General → Custom Code → End of `<head>` → paste meta tag
4. Publish → go back to Search Console → click Verify
5. Go to Sitemaps → enter `sitemap.xml` → Submit (Framer auto-generates this)

---

### UTM Tracking for Social Media

**Naming convention (use lowercase, be consistent):**

| Parameter | Instagram | YouTube | Email |
|-----------|-----------|---------|-------|
| utm_source | `instagram` | `youtube` | `newsletter` |
| utm_medium | `social` | `social` | `email` |
| utm_campaign | `[descriptive name]` | `[descriptive name]` | `[descriptive name]` |
| utm_content | `bio_link` / `story` / `feed_post` | `description` / `pinned_comment` | `header_cta` / `recipe_link` |

**Example links:**

Instagram bio:
```
https://holisticbravo.com?utm_source=instagram&utm_medium=social&utm_content=bio_link
```

YouTube video description linking to a specific recipe:
```
https://holisticbravo.com/recipe/high-protein-bagels?utm_source=youtube&utm_medium=social&utm_campaign=bagel_video&utm_content=description
```

**Build UTM links at:** https://ga-dev-tools.google/ga4/campaign-url-builder/

**View in GA4:** Reports → Acquisition → Traffic acquisition → see Source/Medium breakdown. Filter by `social` medium to see all social traffic together.

**Don't use UTMs on internal site links** - only on links you share externally (Instagram, YouTube, email, etc.).
