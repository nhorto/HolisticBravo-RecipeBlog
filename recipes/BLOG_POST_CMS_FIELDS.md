# Framer CMS Fields - Blog Posts

**Last Updated:** February 21, 2026
**Related:** See `FRAMER_CMS_FIELDS.md` for the Recipe collection schema.

This document defines the CMS collection fields for the Blog Posts collection in Framer. Blog posts are listicle-style roundups that link to individual recipe pages (e.g., "10 Easy Vegan Recipes for Beginners").

---

## Collection Name: `Blog Posts`

### Core Fields

| Field Name | Field Type | Required | Notes |
|---|---|---|---|
| **Name** | Text (single line) | Yes | Blog post title (e.g., "10 Easy Vegan Recipes Even Beginners Can Make Tonight"). This is the default Framer CMS "Name" field. |
| **Slug** | Slug | Yes | Auto-generated from Name. Used for URL path (e.g., `/blog/easy-vegan-recipes-beginners`) |
| **Published Date** | Date | Yes | Publication date |
| **Featured Image** | Image | Yes | Hero image at the top of the post. Recommended: 1200x800px minimum, 16:9 ratio. |
| **Short Description** | Plain Text | Yes | 1-2 sentence summary. Shows on blog listing cards and doubles as the default meta description. Keep under 160 characters. |

### Content Fields

| Field Name | Field Type | Required | Notes |
|---|---|---|---|
| **Introduction** | Rich Text | Yes | 2-3 paragraphs. Personal hook - why this roundup exists, who it's for, what makes these recipes special. Sets the tone before the numbered list begins. |
| **Body** | Rich Text | Yes | The full listicle content. See "Body Field Format" below for structure. This is where all the numbered recipes, images, descriptions, and links live. |
| **Conclusion** | Rich Text | No | Wrap-up paragraph. Recap the highlights, encourage readers to try a recipe, invite comments. Can include a CTA (e.g., "Follow @holisticbravo for more recipes"). |

### SEO Fields

| Field Name | Field Type | Required | Notes |
|---|---|---|---|
| **SEO_Title** | Plain Text | Yes | Custom meta title. Under 60 characters. Bind in Collection Page Settings → SEO → Title. Example: "10 Easy Vegan Recipes for Beginners \| Holistic Bravo" |
| **SEO_Description** | Plain Text | Yes | Custom meta description. 150-160 characters. Bind in Collection Page Settings → SEO → Description. If left empty, fall back to Short Description. |
| **Target Keyword** | Plain Text | No | Internal use only - not displayed on site. Tracks the primary keyword this post targets (e.g., "10 easy vegan recipes"). Helpful for remembering the SEO intent when editing later. |

### Taxonomy Fields

| Field Name | Field Type | Required | Notes |
|---|---|---|---|
| **Blog Category** | Plain Text | No | Post type: "Roundup", "Guide", "Tips". Useful if you add more blog post types later and want to filter/categorize them on a blog listing page. |

---

## Total Field Count: 12

- Core fields: 5
- Content fields: 3
- SEO fields: 3
- Taxonomy fields: 1

---

## Body Field Format

The Body field is a Rich Text field where you write the full listicle. Here's the structure to follow for each recipe entry:

```
## 1. Crispy Tofu Lettuce Wraps

[Insert recipe image]

These lettuce wraps are my go-to for a quick dinner that feels fancy
but takes under 20 minutes. The secret is getting the tofu REALLY
crispy - press it well and use high heat.

**Why you'll love it:**
- Ready in 15 minutes
- High protein (22g per serving)
- Naturally gluten-free

👉 **[Get the full recipe →](/recipe/crispy-tofu-lettuce-wraps)**

---

## 2. Simple Two-Ingredient Pasta

[Insert recipe image]

...
```

### Key formatting rules for the Body:

1. **Use H2 headings** (`##`) for each numbered recipe - this creates anchor links and helps SEO
2. **Insert images inline** using Rich Text's image upload - use the best frame from that recipe's image folder
3. **Write 1-2 paragraphs** per recipe - personal, conversational, highlight what makes it special
4. **Bullet points work great** for quick highlights (prep time, protein, dietary info)
5. **End each recipe section with a link** to the full recipe page
6. **Use a horizontal rule** (`---`) between recipe sections for visual separation
7. **Keep recipe descriptions to 80-150 words** - enough to sell it, not so much that readers skip

### Approximate word counts per post:

| Section | Words |
|---|---|
| Introduction | 150-250 |
| Per recipe entry | 80-150 |
| Conclusion | 75-125 |
| **Total (10-recipe post)** | **~1,200-1,800** |
| **Total (6-recipe post)** | **~900-1,200** |
| **Total (5-recipe "hero" post)** | **~1,000-1,500** |

Target 1,200-1,500 words. That's the sweet spot for SEO listicles - long enough to rank, short enough that people actually read it.

---

## Framer Setup Steps

1. **Create the `Blog Posts` collection** in Framer CMS
2. **Add each field** from the tables above (Core, Content, SEO, Taxonomy)
3. **Create a Blog Post detail page template:**
   - Add the page to your site (e.g., `/blog/:slug`)
   - Bind each section to the CMS fields
   - Layout: Featured Image (full width) → Name (H1) → Short Description → Introduction → Body → Conclusion
4. **Create a Blog listing page** (e.g., `/blog`):
   - Add a Collection List bound to Blog Posts
   - Each card shows: Featured Image, Name, Short Description, Published Date
   - Link each card to the detail page
5. **Bind SEO fields:**
   - Collection Page Settings → SEO → Title: `{{SEO_Title}}`
   - Collection Page Settings → SEO → Description: `{{SEO_Description}}`
6. **Internal linking from recipes back to blog posts:**
   - Not automated in this schema - but consider adding a "Featured In" text field to Recipes later, or linking manually in the recipe's Related content

---

## Blog Post Plan (from SEO Research V2)

These are the 3 pre-launch blog posts, with target keywords and assigned recipes:

### Post #1: "10 Easy Vegan Recipes Even Beginners Can Make Tonight"

- **Target Keyword:** 10 easy vegan recipes (KD: 0, Vol: 900)
- **URL:** `/blog/easy-vegan-recipes-beginners`
- **Recipes:**
  1. Simple Two-Ingredient Pasta
  2. No-Egg Pasta Pomodoro
  3. Cozy Chunky Oatmeal
  4. Crispy Tofu Lettuce Wraps
  5. Bang Bang Brussels Sprouts
  6. Haunted Bean Salad
  7. High Protein Cookie Dough
  8. Chickpea Blondies with Aquafaba Whipped Topping
  9. Sweet Potato Tapioca Balls
  10. Plant-Based Milk Four Ways

### Post #2: "Vegan Gluten-Free Recipes That Actually Taste Amazing"

- **Target Keyword:** vegan gluten free recipes (KD: 1, Vol: 1,400)
- **URL:** `/blog/vegan-gluten-free-recipes`
- **Recipes:**
  1. Sweet Potato Tapioca Balls
  2. Chickpea Blondies with Aquafaba Whipped Topping
  3. Bang Bang Brussels Sprouts
  4. Crispy Tofu Lettuce Wraps
  5. Haunted Bean Salad
  6. High Protein Cookie Dough

### Post #3: "High-Protein Vegetarian Pasta That's Actually Filling"

- **Target Keyword:** high protein pasta recipe vegetarian (KD: 1, Vol: 150, TP: 2,400)
- **URL:** `/blog/high-protein-vegetarian-pasta`
- **Format:** Hero recipe (High Protein Tofu Pasta gets deep coverage) + 4 supporting recipes
- **Recipes:**
  1. High Protein Tofu Pasta ← hero
  2. Mushroom Ravioli with Ricotta Filling
  3. Tri-Color Ravioli with Spinach-Cashew Pesto Filling
  4. Spinach Ravioli
  5. Lazy Girl Pumpkin Gnocchi

---

## Notes

- **Rich Text vs Plain Text:** The Introduction, Body, and Conclusion fields use Rich Text so you can format text (bold, italic, links, lists) and embed images inline. The SEO fields use Plain Text because Framer's SEO bindings expect plain strings.
- **No multi-reference field needed:** Since we're writing recipe descriptions directly in the Body field and linking to recipe pages manually, there's no need for a Recipes multi-reference. This keeps the schema simple and gives you full control over content and ordering.
- **Image strategy:** For each recipe mentioned in the Body, use the best frame from that recipe's `recipe-images/` folder. The Featured Image for the blog post itself should be either the most visually appealing recipe from the list, or a collage/grid of several recipes.
