---
name: check-blog-fit
description: Check which existing blog posts and listicle groups a recipe could be added to. Use when the user wants to find blog placement for a new or existing recipe.
argument-hint: [recipe-name or recipe-file-path]
allowed-tools: Read, Grep, Glob, Bash(cat *), Bash(ls *)
---

# Check Blog Fit Skill

You are analyzing a recipe to determine which existing blog posts and listicle groups it could be added to. A recipe can belong to MANY blog posts — your job is to find ALL matches, not just the best one.

## Step 1: Identify the Recipe

**If the user provided a file path** (e.g., `content/recipes/crispy-garlic-tofu.md`):
- Read the recipe file to extract its details

**If the user provided a recipe name:**
- Search `content/recipes/` for a matching `.md` file
- Also search `content/recipes/ALL_RECIPES_RESTRUCTURED.md` for the recipe by name
- If no file is found, ask the user for key details: diet type, category, cuisine, main ingredients, and cooking method

**Extract these attributes from the recipe:**
- Diet types (Vegetarian, Vegan, High-Protein, Plant-Based, Paleo, Gluten-Free, Grain-Free)
- Categories (Breakfast, Lunch, Dinner, Dessert, Snack, Appetizer, Pasta, Quick Meals, Bread, Side Dish, Soup)
- Cuisine (American, Italian, Asian, Chinese, Fusion, Latin American, Mediterranean)
- Total time (for Quick & Easy matching — under 20 min)
- Key ingredients (for thematic matching — pumpkin, tofu, beans, etc.)
- Cooking method (no-cook, baked, fried, etc.)
- Meal prep friendliness (stores well? reheats well?)
- Protein content (for High-Protein group matching)
- Calorie level (for Calorie Deficit matching)

## Step 2: Check Published Blog Posts

Read ALL blog post files in `content/blog-posts/`:

```bash
ls content/blog-posts/blog-post-*.md | grep -v video-links
```

For each blog post:
1. Read the file to understand its theme, target keyword, and which recipes it already includes
2. Determine if the new recipe fits the blog post's theme
3. If it fits, identify WHERE in the post it could be inserted:
   - As a new numbered entry in the listicle
   - Note the best position (e.g., "after #6" or "as the new #11")
   - Draft a brief placement note explaining WHY it fits

### Current Blog Posts Reference

These are the published blog posts (read the actual files for full details):

1. **Blog Post #1:** "10 Easy Vegan Recipes Even Beginners Can Make Tonight" — vegan, beginner-friendly, under 35 min, simple ingredients
2. **Blog Post #2:** "Vegan Gluten-Free Recipes That Actually Taste Amazing" — must be both vegan AND gluten-free
3. **Blog Post #3:** "High-Protein Vegetarian Pasta That's Actually Filling" — pasta recipes with high protein content

## Step 3: Check Listicle Groups

Read `content/recipes/RECIPE_LISTICLE_GROUPS.md` and check the recipe against ALL 20 groups:

| Group | Theme | Key Criteria |
|-------|-------|-------------|
| 1 | High-Protein | 20g+ protein or protein-focused ingredients |
| 2 | Quick & Easy (Under 20 Min) | Total time under 20 minutes |
| 3 | Breakfast & Brunch | Breakfast-appropriate |
| 4 | Healthy Desserts & Sweet Treats | Dessert/sweet with a healthy angle |
| 5 | Pasta Lovers | Pasta or pasta-adjacent |
| 6 | Meal Prep Champions | Stores well, reheats well, batch-friendly |
| 7 | Vegan & Plant-Based | Fully vegan or easily adapted |
| 8 | Calorie Deficit & Weight Loss | Low-calorie, high-volume |
| 9 | Gluten-Free | Naturally GF or easily adapted |
| 10 | No-Cook / No-Bake | No oven/stove needed |
| 11 | Leftover Transformations | Uses common leftovers |
| 12 | Homemade Staples (DIY Basics) | Replaces a store-bought item |
| 13 | Fall & Pumpkin Season | Pumpkin, warm spices, cozy vibes |
| 14 | Asian-Inspired | Asian cuisine or techniques |
| 15 | Latin-Inspired | Latin American flavors/ingredients |
| 16 | Mediterranean-Inspired | Mediterranean cuisine |
| 17 | Snacks & Appetizers | Snack or party food |
| 18 | Comfort Food | Cozy, nostalgic, warming |
| 19 | Impressive Dinner Party | Showstopper presentation |
| 20 | Pet-Friendly | Safe for dogs/pets |

For each matching group, note whether the recipe fits **naturally** or **with adaptation** (and what the adaptation would be).

## Step 4: Output the Results

Format your output as follows:

---

### Blog Fit Report: [Recipe Name]

**Recipe Tags:** [Diet] | [Category] | [Cuisine] | [Total Time]

#### Published Blog Posts

For each matching blog post:

**[Blog Post Title]**
- **Why it fits:** [1 sentence explaining the match]
- **Suggested placement:** [Where to add it — e.g., "Add as #11 at the end" or "Insert after #4, before the pasta section"]
- **Draft entry snippet:** [2-3 sentence preview of how the recipe would be described in this blog post, matching the blog post's existing voice]

If no published blog posts match, say: "No current blog posts are a strong fit. Consider writing a new post around one of the listicle groups below."

#### Listicle Groups (for future blog posts)

List ALL matching groups in a table:

| Group | Fit Type | Notes |
|-------|----------|-------|
| [Group name] | Natural / With Adaptation | [Brief note] |

#### Recommended Next Steps
- Prioritize which blog post(s) to update first
- Flag if this recipe could anchor a NEW blog post from an unwritten listicle group
- Note if the RECIPE_LISTICLE_GROUPS.md file should be updated to include this recipe

---

## Important Rules

- A recipe can (and often does) fit in 5-10+ groups — be thorough, don't stop at the first match
- Always distinguish "natural fit" vs "with adaptation" — and explain the adaptation
- Read the actual blog post files, don't guess from titles alone
- The draft entry snippet should match the voice of the specific blog post it's for
- Don't modify any files — this skill is read-only analysis
- If the recipe doesn't fit ANY blog posts or groups, say so honestly and suggest what kind of new blog post it could anchor
