# File Inventory - Holistic Bravo Recipe Blog

Everything in this folder and what it does.

---

## Root Files

| File | What It Is |
|------|-----------|
| `PROJECT_SUMMARY.md` | Full project history covering all 9 phases of work, brand specs, CMS setup notes, and technical decisions |
| `FILE_INVENTORY.md` | This file - describes every file and folder in the project |

---

## components/

Framer code components (.tsx files). Paste these into Framer's code editor to use them.

| File | What It Is |
|------|-----------|
| `RecipeBlogPost.tsx` | **Recipe detail page component.** Renders the full recipe blog post including Introduction, Why You'll Love This, Tips, Ingredients, Instructions, FAQ, and the Recipe Card. Has a built-in markdown parser for rendering formatted text from plain text CMS fields. Includes 7 optional image slots (featured + one per section), Jump to Recipe and Print Recipe buttons with purple-to-green hover animation. No hardcoded default values so CMS data binds correctly. |
| `RecipeCard.tsx` | **Recipe listing card component.** Used on the Recipes grid/list page. Shows featured image (with hover zoom), category pill overlay, date, title, toggleable short description, diet tag, total time, and "Read More" link. Click navigates to `/recipes/[slug]`. Place inside a Framer Collection List and bind properties to CMS fields. |
| `RecipeCategoryCards.tsx` | **Homepage category browser component.** Displays 4 category cards (Breakfast, Quick Meals, High Protein, Pasta) with SVG icons. Clicking "See Recipes" navigates to the recipes page with a filter query parameter (e.g., `/recipes?category=Breakfast`). Each card's icon, title, description, and filter type (Category/Diet/Cuisine) are configurable in the properties panel. |
| `RecipeOverrides.tsx` | **Legacy code overrides.** Contains JumpToRecipe (smooth scroll) and PrintRecipe (window.print) overrides. Created before buttons were moved into RecipeBlogPost.tsx. May no longer be needed but kept for reference. |

---

## recipes/

Recipe content, CMS documentation, and the import-ready CSV.

| File | What It Is |
|------|-----------|
| `ALL_RECIPES.csv` | **THE MAIN FILE FOR CMS IMPORT.** Contains all 45 recipes with 25 columns matching Framer CMS fields. All text is in first person (Holistic Bravo's voice), expanded with additional content. Import this directly into Framer's CMS. 419.8 KB. |
| `ALL_RECIPES.md` | Original combined recipes file (Phase 3). All 45 recipes in their initial extracted format. 4,642 lines. Preserved as reference - the CSV is the current/final version. |
| `ALL_RECIPES_RESTRUCTURED.md` | Restructured recipes in shelikesfood.com blog format (Phase 5). Each recipe has dual structure: blog content sections + recipe card. 6,414 lines. This was the source for the CSV but the CSV has been rewritten with first-person voice and expanded content. |
| `FRAMER_CMS_FIELDS.md` | CMS field definitions for Framer. Lists all 25 fields needed in the Recipes CMS collection, organized by group (Core, Blog Content, Recipe Card, Taxonomy). Important note: blog content fields must be Plain Text, not Rich Text. |
| `RECIPE_LISTICLE_GROUPS.md` | Thematic recipe groupings for potential listicle content (e.g., "5 High-Protein Breakfasts", "Best Pasta Recipes"). Created during Phase 3 for content planning. |

---

## transcripts/

Contains 98 folders, one per YouTube video from the @holisticbravo channel. Each folder is named after the video title.

### What's inside each folder:
- `transcript.md` - Full video transcript
- `description.md` - YouTube video description
- `recipe.md` - Extracted recipe (only present in 45 of the 98 folders - not all videos contain recipes)

### Videos WITH recipes (45 folders):
These folders contain `transcript.md`, `description.md`, AND `recipe.md`:

1. 2 ingredients Chocolate Protein Cosmic Muffins
2. 87g of vegetarian protein for breakfast
3. Chocolate Chip Pumpkin Muffins
4. Chocolate Mud Pie, but make it High Protein
5. chocolate truffles anyone
6. Cloudy with a chance of oats
7. Crispy Sweet & Spicy Brussel Sprouts
8. Delicious gluten free sweet treat (Pumpkin Cake Pops)
9. Didn't know beans could be haunted (Bean Salad)
10. Fiber and protein in a dessert (Chickpea Blondies)
11. Guava and Cheese Empanadas
12. Halloween High Protein Sweet Treat
13. High Protein Bagels
14. High Protein Bagels (4 simple ingredients)
15. High Protein Cookie Dough
16. High Protein cresent rolls
17. High Protein Dessert (Peanut Butter Chocolate)
18. High Protein Tofu Pasta
19. High Protein Veggie Wraps
20. homemade black bean patties w high protein buns
21. homemade dog treats
22. homemade McDonald's egg & cheese mcgriddle
23. homemade mushroom ravioli pasta
24. Homemade Tri color Ravioli
25. Hot Chocolatey oatmeal with SPICY eggs
26. lazy girl pumpkin gnocchi
27. Let's make some Pasta together (Two-Ingredient Pasta)
28. Lettuce Free Salad
29. low calorie spaghetti with Béchamel sauce
30. Move aside milk and cookies (Shortbread)
31. My secret weapon for staying in a calorie deficit (Cabbage)
32. no-egg homemade Pasta Pomodoro
33. On today's episode of what free will looks like (Plant-Based Milk)
34. Overnight Chia Seed Tiramisu
35. Pillsbury Crescent rolls, but make them high protein
36. Plantbased Crisssppyy tofu lettuce wraps
37. Rosemary Crackers & Fresh Hummus
38. soft and decadent steamed eggs
39. Spinach & egg pasta
40. transforming boring leftovers (Leftover Pasta with Pesto)
41. We don't waste food (Vegetable Fried Rice)
42. what should we do with leftover rice (Crispy Rice Bowl)
43. who else is addicted (Classic Shortbread)
44. Who else loves green eggs and ham (Pan-Cooked Eggs)
45. yummy silky smooth Chinese style steamed eggs

### Videos WITHOUT recipes (53 folders):
These folders contain only `transcript.md` and `description.md`. They cover vlogs, motivation, fitness, coffee content, holiday content, and other non-recipe videos.
