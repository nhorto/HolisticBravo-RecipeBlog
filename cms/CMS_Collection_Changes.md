# CMS Collection Changes

This document outlines all changes needed to the existing CMS collections before you tag recipes.
**Do these FIRST, then use the Tag Assignment Guide to tag each recipe.**

---

## 1. Categories Collection (Meal Type / Occasion)

### REMOVE these items (moving to Features collection):
- `quick-easy` / "Quick & Easy"
- `no-bake` / "No Bake"
- `pre-workout` / "Pre-workout"
- `post-workout` / "Post-workout"
- `Quick & Easy 2` / "Quick and Easy" ← **DELETE** (this is a duplicate that shouldn't exist)

### KEEP these items (no changes):
- `breakfast` / "Breakfast"
- `lunch` / "Lunch"
- `dinner` / "Dinner"
- `snack` / "Snack"
- `dessert` / "Dessert"
- `side-dish` / "Side Dish"
- `appetizer` / "Appetizer"
- `salad` / "Salad"
- `beverage` / "Beverage"

### ADD these items:
(None needed - the current meal types are comprehensive)

**Important:** After removing quick-easy, no-bake, pre-workout, and post-workout from Categories, you'll re-add those tags under the new **Features** collection instead. The Tag Assignment Guide tells you exactly which recipes get which Features tags.

---

## 2. Diet Types Collection

### KEEP all existing items:
- `vegetarian` / "Vegetarian"
- `vegan` / "Vegan"
- `plant-based` / "Plant-Based"
- `gluten-free` / "Gluten-Free"
- `keto` / "Keto"
- `paleo` / "Paleo"
- `high-protein` / "High-Protein"
- `whole-food` / "Whole Food"
- `grain-free` / "Grain-Free"
- `raw-vegan` / "Raw Vegan"

### ADD these new items:
- `dairy-free` / "Dairy-Free"
- `low-calorie` / "Low-Calorie"
- `high-fiber` / "High-Fiber"

---

## 3. Cuisines Collection

### No changes needed. Keep all existing items:
- `american` / "American"
- `italian` / "Italian"
- `asian` / "Asian"
- `chinese` / "Chinese"
- `mediterranean` / "Mediterranean"
- `latin-american` / "Latin American"
- `mexican` / "Mexican"
- `fusion` / "Fusion"

---

## 4. Features Collection (NEW - Bulk Import)

Import the `Features.csv` file to create this new collection:
- `quick-easy` / "Quick & Easy"
- `no-bake` / "No Bake"
- `meal-prep-friendly` / "Meal-Prep Friendly"
- `pre-workout` / "Pre-workout"
- `post-workout` / "Post-workout"
- `one-bowl` / "One-Bowl"
- `budget-friendly` / "Budget-Friendly"
- `under-30-minutes` / "Under 30 Minutes"

---

## Order of Operations

1. **Create the Features collection** by importing `Features.csv`
2. **Update the Categories collection** - remove the 5 items listed above
3. **Update the Diet Types collection** - add the 3 new items
4. **Import the updated `Recipe_schema.csv`** to update plain text fields
5. **Use the Tag Assignment Guide** to manually tag each recipe across all 4 collections
