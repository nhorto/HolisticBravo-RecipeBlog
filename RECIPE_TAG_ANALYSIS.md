# Recipe CMS Tag Analysis
**Date:** 2026-02-12
**File Analyzed:** `/Users/nicholashorton/Documents/HolisticBravo-RecipeBlog/CMS Schema/Recipe_schema.csv`

## Executive Summary

**Total Recipes Found:** 38 (Note: User expected ~45)

### Key Issues:
- **34.2%** (13 recipes) have NO tags assigned at all
- **52.6%** (20 recipes) are missing Cuisines tags
- **21.1%** (8 recipes) have broken FAQ data with "[object Object]"
- Only **47.4%** (18 recipes) have complete tag assignments across all three fields

---

## Complete Recipe Inventory

| # | Recipe Name | Categories | Cuisines | Diet Types | Issues |
|---|------------|-----------|----------|-----------|--------|
| 1 | Cozy Chunky Oatmeal | ✓ | ✗ | ✓ | Missing Cuisines |
| 2 | High Protein Chocolate Chip Pumpkin Muffins | ✓ | ✗ | ✓ | Missing Cuisines, FAQ Broken |
| 3 | High-Protein Vegetarian Breakfast Bowl | ✓ | ✗ | ✓ | Missing Cuisines, FAQ Broken |
| 4 | Two-Ingredient Chocolate Protein Cosmic Muffins | ✓ | ✗ | ✓ | Missing Cuisines, FAQ Broken |
| 5 | High-Protein Chocolate Mug Pie | ✓ | ✗ | ✓ | Missing Cuisines, FAQ Broken |
| 6 | High-Protein Peanut Butter Chocolate Truffles | ✓ | ✗ | ✓ | Missing Cuisines, FAQ Broken |
| 7 | Sweet Potato Tapioca Balls | ✓ | ✓ | ✓ | FAQ Broken |
| 8 | Haunted Bean Salad | ✓ | ✓ | ✓ | FAQ Broken |
| 9 | Bang Bang Brussels Sprouts | ✓ | ✓ | ✓ | FAQ Broken |
| 10 | Chickpea Blondies with Aquafaba Whipped Topping | ✓ | ✓ | ✓ | None |
| 11 | Gluten-Free Pumpkin Cake Pops | ✓ | ✓ | ✓ | None |
| 12 | Guava and Cheese Empanadas | ✓ | ✓ | ✓ | None |
| 13 | No Bake High Protein Pumpkin Cheesecake Bites | ✓ | ✓ | ✓ | None |
| 14 | High Protein Bagels | ✓ | ✓ | ✓ | None |
| 15 | High Protein Cookie Dough | ✓ | ✓ | ✓ | None |
| 16 | High Protein Tofu Pasta | ✓ | ✓ | ✓ | None |
| 17 | High Protein Veggie Wraps | ✓ | ✓ | ✓ | None |
| 18 | Homemade Black Bean Patties with High Protein Buns | ✓ | ✓ | ✓ | None |
| 19 | Homemade Dog Treats | ✓ | ✗ | ✓ | Missing Cuisines |
| 20 | Homemade Vegetarian McGriddle | ✓ | ✓ | ✓ | None |
| 21 | Mushroom Ravioli with Ricotta Filling | ✓ | ✓ | ✓ | None |
| 22 | Tri-Color Ravioli with Spinach Pesto Filling | ✓ | ✓ | ✓ | None |
| 23 | 2 Ingredient Pumpkin Gnocchi | ✓ | ✓ | ✓ | None |
| 24 | Lettuce-Free Salad | ✓ | ✓ | ✓ | None |
| 25 | Spaghetti Squash with Bechamel Sauce | ✓ | ✓ | ✓ | None |
| 26 | High-Protein Greek Yogurt Bagel Sandwiches | ✗ | ✗ | ✗ | **ALL TAGS MISSING** |
| 27 | Three-Ingredient Shortbread | ✗ | ✗ | ✗ | **ALL TAGS MISSING** |
| 28 | No-Egg Pasta Pomodoro | ✗ | ✗ | ✗ | **ALL TAGS MISSING** |
| 29 | Overnight Chia Seed Tiramisu | ✗ | ✗ | ✗ | **ALL TAGS MISSING** |
| 30 | High-Protein Greek Yogurt Crescent Rolls | ✗ | ✗ | ✗ | **ALL TAGS MISSING** |
| 31 | Crispy Tofu Lettuce Wraps | ✗ | ✗ | ✗ | **ALL TAGS MISSING** |
| 32 | Rosemary Crackers & Fresh Hummus | ✗ | ✗ | ✗ | **ALL TAGS MISSING** |
| 33 | Chinese-Style Steamed Eggs | ✗ | ✗ | ✗ | **ALL TAGS MISSING** |
| 34 | Spinach Ravioli | ✗ | ✗ | ✗ | **ALL TAGS MISSING** |
| 35 | Crispy Rice Bowl with Sweet Potato Tempura | ✗ | ✗ | ✗ | **ALL TAGS MISSING** |
| 36 | Quick Vegetable Fried Rice | ✗ | ✗ | ✗ | **ALL TAGS MISSING** |
| 37 | Classic Shortbread Cookies | ✗ | ✗ | ✗ | **ALL TAGS MISSING** |
| 38 | Chinese Souffle Steamed Eggs | ✗ | ✗ | ✗ | **ALL TAGS MISSING** |

---

## Detailed Issue Breakdown

### 1. COMPLETELY UNTAGGED RECIPES (13 recipes - Priority 1)

These recipes have NO tag assignments whatsoever:

1. **High-Protein Greek Yogurt Bagel Sandwiches**
   - Category text: "Breakfast"
   - Cuisine text: "American"
   - Diet text: "Vegetarian, High-Protein"
   - **Suggested tags:** Categories: breakfast | Cuisines: american | Diet Types: vegetarian,high-protein

2. **Three-Ingredient Shortbread**
   - Category text: "Dessert"
   - Cuisine text: "American"
   - Diet text: "Vegetarian"
   - **Suggested tags:** Categories: dessert | Cuisines: american | Diet Types: vegetarian

3. **No-Egg Pasta Pomodoro**
   - Category text: "Dinner"
   - Cuisine text: "Italian"
   - Diet text: "Vegan, Plant-Based, Vegetarian"
   - **Suggested tags:** Categories: dinner | Cuisines: italian | Diet Types: vegan,plant-based,vegetarian

4. **Overnight Chia Seed Tiramisu**
   - Category text: "Breakfast"
   - Cuisine text: "Italian, American"
   - Diet text: "Vegetarian, High-Protein"
   - **Suggested tags:** Categories: breakfast | Cuisines: italian,american | Diet Types: vegetarian,high-protein

5. **High-Protein Greek Yogurt Crescent Rolls**
   - Category text: "Breakfast, Side Dish"
   - Cuisine text: "American"
   - Diet text: "Vegetarian"
   - **Suggested tags:** Categories: breakfast,side-dish | Cuisines: american | Diet Types: vegetarian,high-protein

6. **Crispy Tofu Lettuce Wraps**
   - Category text: "Lunch, Dinner"
   - Cuisine text: "Asian, Fusion"
   - Diet text: "Vegan, Plant-Based"
   - **Suggested tags:** Categories: lunch,dinner | Cuisines: asian,fusion | Diet Types: vegan,plant-based

7. **Rosemary Crackers & Fresh Hummus**
   - Category text: "Snack, Appetizer"
   - Cuisine text: "Mediterranean"
   - Diet text: "Vegetarian, Plant-Based"
   - **Suggested tags:** Categories: snack,appetizer | Cuisines: mediterranean | Diet Types: vegetarian,plant-based

8. **Chinese-Style Steamed Eggs**
   - Category text: "Breakfast"
   - Cuisine text: "Chinese, Asian"
   - Diet text: "Vegetarian"
   - **Suggested tags:** Categories: breakfast | Cuisines: chinese,asian | Diet Types: vegetarian

9. **Spinach Ravioli**
   - Category text: "Dinner, Lunch"
   - Cuisine text: "Italian, Fusion"
   - Diet text: "Vegetarian"
   - **Suggested tags:** Categories: dinner,lunch | Cuisines: italian,fusion | Diet Types: vegetarian

10. **Crispy Rice Bowl with Sweet Potato Tempura**
    - Category text: "Dinner, Lunch"
    - Cuisine text: "Fusion, Latin American"
    - Diet text: "Vegetarian"
    - **Suggested tags:** Categories: dinner,lunch | Cuisines: fusion,latin-american | Diet Types: vegetarian

11. **Quick Vegetable Fried Rice**
    - Category text: "Dinner, Lunch"
    - Cuisine text: "Chinese, Asian"
    - Diet text: "Vegetarian"
    - **Suggested tags:** Categories: dinner,lunch | Cuisines: chinese,asian | Diet Types: vegetarian

12. **Classic Shortbread Cookies**
    - Category text: "Dessert, Snack"
    - Cuisine text: "American"
    - Diet text: "Vegetarian"
    - **Suggested tags:** Categories: dessert,snack | Cuisines: american | Diet Types: vegetarian

13. **Chinese Souffle Steamed Eggs**
    - Category text: "Breakfast"
    - Cuisine text: "Chinese, Asian"
    - Diet text: "Vegetarian"
    - **Suggested tags:** Categories: breakfast | Cuisines: chinese,asian | Diet Types: vegetarian

---

### 2. MISSING CUISINES TAGS (20 recipes)

These have Category and Diet Types tags but no Cuisines tags, despite having Cuisine text:

1. Cozy Chunky Oatmeal - Cuisine text: "American"
2. High Protein Chocolate Chip Pumpkin Muffins - Cuisine text: "American"
3. High-Protein Vegetarian Breakfast Bowl - Cuisine text: "American"
4. Two-Ingredient Chocolate Protein Cosmic Muffins - Cuisine text: "American"
5. High-Protein Chocolate Mug Pie - Cuisine text: "American"
6. High-Protein Peanut Butter Chocolate Truffles - Cuisine text: "American"
7. Homemade Dog Treats - Cuisine text: "American"

Plus the 13 recipes listed above with ALL tags missing.

---

### 3. BROKEN FAQ DATA (8 recipes)

These recipes show "[object Object]" in the FAQ field, indicating corrupted JSON data:

1. High Protein Chocolate Chip Pumpkin Muffins
2. High-Protein Vegetarian Breakfast Bowl
3. Two-Ingredient Chocolate Protein Cosmic Muffins
4. High-Protein Chocolate Mug Pie
5. High-Protein Peanut Butter Chocolate Truffles
6. Sweet Potato Tapioca Balls
7. Haunted Bean Salad
8. Bang Bang Brussels Sprouts

---

### 4. TAG INCONSISTENCIES

#### A. Vegan Recipes Missing 'vegan' Tag

- **High Protein Cookie Dough** - Diet text says "Vegan" but no 'vegan' in Diet Types tags
- **No-Egg Pasta Pomodoro** - Diet text says "Vegan" but missing ALL tags
- **Crispy Tofu Lettuce Wraps** - Diet text says "Vegan" but missing ALL tags

#### B. Plant-Based Recipes Missing 'plant-based' Tag

- **High Protein Chocolate Chip Pumpkin Muffins** - Diet text says "Plant-Based"
- **High Protein Cookie Dough** - Diet text says "Plant-Based"
- **No-Egg Pasta Pomodoro** - Diet text says "Plant-Based" but missing ALL tags
- **Crispy Tofu Lettuce Wraps** - Diet text says "Plant-Based" but missing ALL tags
- **Rosemary Crackers & Fresh Hummus** - Diet text says "Plant-Based" but missing ALL tags

#### C. High-Protein Tag Mismatches

**Has "High-Protein" in text but NOT in tags:**
- Lettuce-Free Salad
- High-Protein Greek Yogurt Bagel Sandwiches (missing ALL tags)
- Overnight Chia Seed Tiramisu (missing ALL tags)

**Has "high-protein" tag but NOT mentioned in text fields:**
- High Protein Tofu Pasta
- High Protein Veggie Wraps
- Homemade Black Bean Patties with High Protein Buns
- Homemade Vegetarian McGriddle
- Mushroom Ravioli with Ricotta Filling
- Tri-Color Ravioli with Spinach Pesto Filling

---

### 5. FIELD DUPLICATION CONFUSION

The CMS has duplicate fields that serve different purposes:

| Plain Text Field | Tag Reference Field | Purpose |
|-----------------|--------------------|---------|
| **Category** | **Categories** | Display text vs. filter tags |
| **Cuisine** | **Cuisines** | Display text vs. filter tags |
| **Diet** | **Diet Types** | Display text vs. filter tags |

**Issue:** 20 recipes have the plain text fields populated but corresponding tag fields empty. This suggests:
- Tags were not created when recipes were added
- Or the relationship between recipes and tag taxonomies was not established
- The plain text fields are being used but the tagging system is incomplete

---

## Recommendations

### Priority 1: Tag the 13 Completely Untagged Recipes
These recipes are invisible to any tag-based filtering or search. Add Categories, Cuisines, and Diet Types tags based on their existing text fields.

### Priority 2: Fix 8 Broken FAQ Fields
The "[object Object]" indicates JSON parsing errors. These FAQs need to be properly formatted or re-entered.

### Priority 3: Add Missing Cuisines Tags
20 recipes have Cuisine text but no Cuisines tags. Add the appropriate cuisine tags (american, italian, asian, etc.).

### Priority 4: Standardize Tag Consistency
Ensure Diet text and Diet Types tags align - if a recipe says "Vegan" it should have the vegan tag, if it says "High-Protein" it should have the high-protein tag.

### Priority 5: Clarify Field Usage
Document whether both plain text fields AND tag fields should be populated, or if one supersedes the other. Current data suggests tags should mirror the text fields for filtering purposes.

---

## Tag Taxonomy Reference

Based on existing tagged recipes, here are the tag slugs being used:

### Categories Tags
- breakfast
- lunch
- dinner
- snack
- dessert
- side-dish
- appetizer
- salad
- pre-workout
- post-workout
- quick-easy
- no-bake

### Cuisines Tags
- american
- italian
- asian
- chinese
- fusion
- mediterranean
- latin-american
- mexican

### Diet Types Tags
- vegetarian
- vegan
- plant-based
- whole-food
- high-protein
- keto
- raw-vegan

---

## Statistics Summary

- **Total Recipes:** 38
- **Fully Tagged (all 3 types):** 18 (47.4%)
- **No Tags At All:** 13 (34.2%)
- **Missing Categories:** 13 (34.2%)
- **Missing Cuisines:** 20 (52.6%)
- **Missing Diet Types:** 13 (34.2%)
- **Broken FAQ Data:** 8 (21.1%)
