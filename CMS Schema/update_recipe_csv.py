#!/usr/bin/env python3
"""
Updates Recipe_schema.csv with:
1. Clean Category, Cuisine, Diet plain text fields
2. New Features plain text column
3. Fixed FAQ for recipes 1-9 (broken [object Object] or generic content)
4. Fixed Nutrition for recipes 2-9 (broken [object Object])
"""

import csv
import os

INPUT_FILE = os.path.join(os.path.dirname(__file__), "Recipe_schema.csv")
OUTPUT_FILE = os.path.join(os.path.dirname(__file__), "Recipe_schema_UPDATED.csv")

# ============================================================
# PLAIN TEXT FIELD UPDATES (Category, Cuisine, Diet, Features)
# These are the display values on the recipe card
# ============================================================

updates = {
    "cozy-chunky-oatmeal": {
        "Category": "Breakfast",
        "Cuisine": "American",
        "Diet": "Vegan, Plant-Based",
        "Features": "Quick & Easy, Under 30 Minutes, Budget-Friendly",
    },
    "high-protein-chocolate-chip-pumpkin-muffins": {
        "Category": "Breakfast, Snack",
        "Cuisine": "American",
        "Diet": "Vegetarian, High-Protein",
        "Features": "Meal-Prep Friendly, Budget-Friendly",
    },
    "high-protein-vegetarian-breakfast-bowl": {
        "Category": "Breakfast",
        "Cuisine": "American",
        "Diet": "Vegetarian, High-Protein",
        "Features": "Post-workout, Meal-Prep Friendly",
    },
    "two-ingredient-chocolate-protein-cosmic-muffins": {
        "Category": "Snack, Dessert",
        "Cuisine": "American",
        "Diet": "Vegetarian, High-Protein, Gluten-Free",
        "Features": "Quick & Easy, Under 30 Minutes, Budget-Friendly",
    },
    "high-protein-chocolate-mug-pie": {
        "Category": "Snack, Dessert",
        "Cuisine": "American",
        "Diet": "Vegetarian, High-Protein, Gluten-Free",
        "Features": "Quick & Easy, Under 30 Minutes",
    },
    "high-protein-peanut-butter-chocolate-truffles": {
        "Category": "Snack, Dessert",
        "Cuisine": "American",
        "Diet": "Vegetarian, High-Protein, Gluten-Free",
        "Features": "Quick & Easy, No Bake, Budget-Friendly",
    },
    "sweet-potato-tapioca-balls": {
        "Category": "Snack, Side Dish",
        "Cuisine": "Asian, Fusion",
        "Diet": "Vegan, Gluten-Free",
        "Features": "Budget-Friendly",
    },
    "haunted-bean-salad": {
        "Category": "Lunch, Salad",
        "Cuisine": "American, Mediterranean",
        "Diet": "Vegan, Plant-Based, High-Protein",
        "Features": "Quick & Easy, Under 30 Minutes, No Bake, Budget-Friendly",
    },
    "bang-bang-brussels-sprouts": {
        "Category": "Side Dish, Appetizer",
        "Cuisine": "Asian, Fusion",
        "Diet": "Vegan, Plant-Based",
        "Features": "Quick & Easy, Under 30 Minutes",
    },
    "chickpea-blondies-with-aquafaba-whipped-topping": {
        "Category": "Dessert",
        "Cuisine": "American",
        "Diet": "Vegan, Plant-Based, Gluten-Free",
        "Features": "Budget-Friendly",
    },
    "gluten-free-pumpkin-cake-pops": {
        "Category": "Dessert, Snack",
        "Cuisine": "American",
        "Diet": "Vegetarian, Gluten-Free, Grain-Free",
        "Features": "No Bake, Quick & Easy, Meal-Prep Friendly",
    },
    "guava-and-cheese-empanadas": {
        "Category": "Snack, Appetizer",
        "Cuisine": "Latin American",
        "Diet": "Vegetarian",
        "Features": "",
    },
    "no-bake-high-protein-pumpkin-cheesecake-bites": {
        "Category": "Dessert, Snack",
        "Cuisine": "American",
        "Diet": "Vegetarian, High-Protein",
        "Features": "No Bake, Quick & Easy, Meal-Prep Friendly",
    },
    "high-protein-bagels": {
        "Category": "Breakfast, Snack",
        "Cuisine": "American",
        "Diet": "Vegetarian, High-Protein",
        "Features": "Quick & Easy, Meal-Prep Friendly",
    },
    "high-protein-cookie-dough": {
        "Category": "Dessert, Snack",
        "Cuisine": "American",
        "Diet": "Vegan, Plant-Based, High-Protein",
        "Features": "No Bake, Quick & Easy, Budget-Friendly",
    },
    "high-protein-tofu-pasta": {
        "Category": "Lunch, Dinner",
        "Cuisine": "Italian, Fusion",
        "Diet": "Vegan, Plant-Based, High-Protein",
        "Features": "Quick & Easy, Under 30 Minutes, Budget-Friendly",
    },
    "high-protein-veggie-wraps": {
        "Category": "Lunch, Dinner",
        "Cuisine": "Mediterranean, Fusion",
        "Diet": "Vegetarian, High-Protein",
        "Features": "Quick & Easy, Under 30 Minutes, Meal-Prep Friendly",
    },
    "homemade-black-bean-patties-with-high-protein-buns": {
        "Category": "Lunch, Dinner",
        "Cuisine": "American",
        "Diet": "Vegetarian, Plant-Based, High-Protein",
        "Features": "Meal-Prep Friendly",
    },
    "homemade-dog-treats": {
        "Category": "Snack",
        "Cuisine": "American",
        "Diet": "Vegetarian",
        "Features": "Quick & Easy, Budget-Friendly, Meal-Prep Friendly",
    },
    "homemade-vegetarian-mcgriddle": {
        "Category": "Breakfast",
        "Cuisine": "American",
        "Diet": "Vegetarian, High-Protein",
        "Features": "Quick & Easy, Under 30 Minutes",
    },
    "mushroom-ravioli-with-ricotta-filling": {
        "Category": "Dinner",
        "Cuisine": "Italian",
        "Diet": "Vegetarian",
        "Features": "",
    },
    "tri-color-ravioli-with-spinach-pesto-filling": {
        "Category": "Dinner",
        "Cuisine": "Italian, Fusion",
        "Diet": "Vegetarian",
        "Features": "",
    },
    "2-ingredient-pumpkin-gnocchi": {
        "Category": "Dinner, Lunch",
        "Cuisine": "Italian",
        "Diet": "Vegan, Plant-Based",
        "Features": "Quick & Easy, Budget-Friendly",
    },
    "lettuce-free-salad": {
        "Category": "Lunch, Salad",
        "Cuisine": "Mediterranean, Fusion",
        "Diet": "Vegan, Plant-Based, Raw Vegan",
        "Features": "Quick & Easy, No Bake, Under 30 Minutes, Budget-Friendly",
    },
    "spaghetti-squash-with-bechamel-sauce": {
        "Category": "Dinner",
        "Cuisine": "Italian, American",
        "Diet": "Vegetarian, Keto, Gluten-Free",
        "Features": "",
    },
    "high-protein-greek-yogurt-bagel-sandwiches": {
        "Category": "Breakfast",
        "Cuisine": "American",
        "Diet": "Vegetarian, High-Protein",
        "Features": "Quick & Easy, Meal-Prep Friendly",
    },
    "three-ingredient-shortbread": {
        "Category": "Dessert",
        "Cuisine": "American",
        "Diet": "Vegetarian",
        "Features": "Budget-Friendly",
    },
    "no-egg-pasta-pomodoro": {
        "Category": "Dinner",
        "Cuisine": "Italian",
        "Diet": "Vegan, Plant-Based",
        "Features": "Budget-Friendly",
    },
    "overnight-chia-seed-tiramisu": {
        "Category": "Breakfast, Dessert",
        "Cuisine": "Italian, American",
        "Diet": "Vegetarian, High-Protein",
        "Features": "No Bake, Meal-Prep Friendly",
    },
    "high-protein-greek-yogurt-crescent-rolls": {
        "Category": "Breakfast, Snack",
        "Cuisine": "American",
        "Diet": "Vegetarian, High-Protein",
        "Features": "Meal-Prep Friendly",
    },
    "crispy-tofu-lettuce-wraps": {
        "Category": "Lunch, Dinner",
        "Cuisine": "Asian, Fusion",
        "Diet": "Vegan, Plant-Based, High-Protein",
        "Features": "Quick & Easy, Under 30 Minutes, Budget-Friendly",
    },
    "rosemary-crackers-fresh-hummus": {
        "Category": "Snack, Appetizer",
        "Cuisine": "Mediterranean",
        "Diet": "Vegan, Plant-Based",
        "Features": "Budget-Friendly",
    },
    "chinese-style-steamed-eggs": {
        "Category": "Breakfast, Side Dish",
        "Cuisine": "Chinese, Asian",
        "Diet": "Vegetarian, Gluten-Free",
        "Features": "Quick & Easy, Under 30 Minutes, Budget-Friendly",
    },
    "spinach-ravioli": {
        "Category": "Dinner, Lunch",
        "Cuisine": "Italian",
        "Diet": "Vegetarian",
        "Features": "",
    },
    "crispy-rice-bowl-with-sweet-potato-tempura": {
        "Category": "Dinner, Lunch",
        "Cuisine": "Fusion, Latin American",
        "Diet": "Vegetarian",
        "Features": "",
    },
    "quick-vegetable-fried-rice": {
        "Category": "Dinner, Lunch",
        "Cuisine": "Chinese, Asian",
        "Diet": "Vegetarian",
        "Features": "Quick & Easy, Under 30 Minutes, Budget-Friendly",
    },
    "classic-shortbread-cookies": {
        "Category": "Dessert, Snack",
        "Cuisine": "American",
        "Diet": "Vegetarian",
        "Features": "Budget-Friendly",
    },
    "chinese-souffle-steamed-eggs": {
        "Category": "Breakfast, Side Dish",
        "Cuisine": "Chinese, Asian",
        "Diet": "Vegetarian, Gluten-Free",
        "Features": "Quick & Easy, Under 30 Minutes, Budget-Friendly",
    },
}

# ============================================================
# FIXED FAQ CONTENT (for broken/generic recipes)
# ============================================================

faq_fixes = {
    "cozy-chunky-oatmeal": """**What's the difference between rolled oats and instant oats?**
Rolled oats are whole grain oats that have been steamed and flattened, creating flat flakes that cook in about 5 minutes while maintaining a hearty texture. Instant oats are more processed - they're cut smaller, steamed longer, and turn to mush very quickly. For chunky oatmeal like this recipe, rolled oats are essential.

**Can I make this with milk instead of water?**
Absolutely! Using milk or non-dairy milk instead of water creates an even creamier, richer oatmeal. It adds extra protein and calories too. I use water for simplicity most of the time, but milk definitely takes it up a notch.

**How do I adjust the consistency?**
The 1:1 ratio of liquid to oats creates the chunky, thick consistency I love. For runnier oatmeal, increase the liquid to 1.5:1 or even 2:1. You can always add more liquid while cooking if it's thicker than you'd like.""",

    "high-protein-chocolate-chip-pumpkin-muffins": """**Can I use regular flour instead of oat flour?**
Yes! You can use all-purpose flour for the entire recipe (220g total). Oat flour adds whole grain nutrition and a subtle nutty flavor, but all-purpose works fine. You can also make your own oat flour by blending rolled oats in a blender until fine.

**Can I substitute the egg whites?**
Yes. You can use one additional whole egg instead of the 50g egg whites. The egg whites add extra protein without changing the flavor, but a whole egg works just as well and is more convenient.

**Why do you bake at such a high temperature?**
Baking at 425 degrees creates a quick rise that produces those beautiful bakery-style domed tops. The high heat sets the outside quickly while the inside stays moist. This is a professional bakery trick that works perfectly for muffins.""",

    "high-protein-vegetarian-breakfast-bowl": """**Can I make the protein bagels ahead of time?**
Absolutely! The bagels freeze beautifully for up to 3 months. Make a big batch on Sunday, freeze them, and just reheat in the air fryer or toaster throughout the week. This is exactly how I meal prep them.

**Can I skip the air fryer?**
Yes! You can bake the bagels in a regular oven at 350 degrees for about 25 minutes. The air fryer is just faster and more convenient, but the results are similar in a regular oven.

**How do I get 87g of protein from this meal?**
The protein comes from multiple sources: Greek yogurt in the bagel dough, protein powder, three whole eggs, egg whites, and feta cheese. Combined with the bread flour protein, it all adds up to approximately 87g.""",

    "two-ingredient-chocolate-protein-cosmic-muffins": """**Why are my muffins flat or dense?**
The most common reason is under-whipping the egg whites. They need to reach stiff peaks before you fold in the protein powder. Also, be very gentle when folding - aggressive mixing deflates the air bubbles that give these their fluffy texture.

**Can I use whey protein instead of plant-based?**
Absolutely! Any protein powder works. Whey, casein, or plant-based all create delicious results. Just make sure it mixes well and doesn't clump. I've tested this with at least a dozen different brands and flavors.

**How should I store these?**
Store in an airtight container in the refrigerator for up to 5 days. They actually taste great cold straight from the fridge. You can also freeze them for up to a month.""",

    "high-protein-chocolate-mug-pie": """**Can I make this without a microwave?**
Yes! You can bake it in a small oven-safe ramekin at 350 degrees for about 15-20 minutes until set. The microwave method is just much faster - usually about 60-90 seconds.

**What protein powder works best for this?**
Chocolate protein powder gives the richest flavor, but vanilla or peanut butter flavored protein powder also work great. The key is using a protein powder you enjoy the taste of since it's a major ingredient.

**Is this actually healthy?**
Compared to traditional chocolate pie, this version is significantly higher in protein and lower in sugar. The main ingredients are protein powder, egg, and cocoa powder - all nutritious ingredients that make this a guilt-free treat.""",

    "high-protein-peanut-butter-chocolate-truffles": """**Can I use a different nut butter?**
Absolutely! Almond butter, cashew butter, or sunflower seed butter all work great as substitutes. Each will give a slightly different flavor profile but they're all delicious.

**How long do these keep?**
Store in an airtight container in the refrigerator for up to 2 weeks, or freeze for up to 3 months. I always keep a batch in my freezer for when I need a quick protein-packed snack.

**Can I skip the chocolate coating?**
Yes, but the chocolate coating is what makes these feel like a real treat. If you want to simplify, you can just roll the peanut butter balls in cocoa powder or crushed nuts instead.""",

    "sweet-potato-tapioca-balls": """**What kind of tapioca starch should I use?**
Use regular tapioca starch (also called tapioca flour). Don't use tapioca pearls - they're a different product. Tapioca starch is what gives these balls their wonderfully chewy, bouncy texture.

**Can I use a different type of sweet potato?**
Japanese sweet potatoes or regular orange sweet potatoes both work. Purple sweet potatoes also work and create a beautiful color. The key is that the sweet potato is well-cooked and mashed until completely smooth.

**Why are my balls not chewy?**
The chewy texture comes from the tapioca starch. Make sure you're using enough starch and that you're kneading the dough well. The dough should be smooth and slightly tacky but not sticky.""",

    "haunted-bean-salad": """**What makes this salad "haunted"?**
The name comes from the Halloween-themed presentation! The dark beans and colorful vegetables create a festive fall look, but this salad is delicious any time of year.

**Can I use canned beans instead of dried?**
Absolutely! Canned beans work perfectly and save a lot of time. Just drain and rinse them well before using. I use canned beans most of the time for convenience.

**How long does this salad keep?**
This salad actually tastes better the next day after the flavors have had time to meld. Store in an airtight container in the refrigerator for up to 5 days. It's perfect for meal prep.""",

    "bang-bang-brussels-sprouts": """**How do I get the Brussels sprouts really crispy?**
The key is making sure the Brussels sprouts are completely dry before cooking, and don't overcrowd the pan. Cook them in a single layer with enough space between each sprout. High heat is essential for that crispy exterior.

**Can I make the bang bang sauce ahead of time?**
Yes! The sauce keeps well in the refrigerator for up to a week. Store it in an airtight container and give it a good stir before using. Having it ready makes this recipe even faster.

**Can I use frozen Brussels sprouts?**
Fresh Brussels sprouts give the best results because they crisp up better. Frozen sprouts contain more moisture which can make them soggy. If using frozen, thaw and pat them very dry first.""",
}

# ============================================================
# FIXED NUTRITION CONTENT (for broken recipes 2-9)
# ============================================================

nutrition_fixes = {
    "high-protein-chocolate-chip-pumpkin-muffins": """Per muffin (1 of 6):
- Calories: 140-160
- Protein: 8-10g
- Carbohydrates: 22-26g
- Fat: 3-5g
- Fiber: 2-3g
- Sugar: 6-8g""",

    "high-protein-vegetarian-breakfast-bowl": """Per serving (complete breakfast):
- Calories: 750-850
- Protein: 85-90g
- Carbohydrates: 60-70g
- Fat: 28-35g
- Fiber: 4-6g
- Sugar: 8-12g""",

    "two-ingredient-chocolate-protein-cosmic-muffins": """Per muffin (1 of 5):
- Calories: 50
- Protein: 8-10g
- Carbohydrates: 1-2g
- Fat: 0-1g
- Fiber: 0g
- Sugar: 1g""",

    "high-protein-chocolate-mug-pie": """Per serving (1 mug pie):
- Calories: 250-300
- Protein: 25-30g
- Carbohydrates: 15-20g
- Fat: 8-12g
- Fiber: 2-3g
- Sugar: 5-8g""",

    "high-protein-peanut-butter-chocolate-truffles": """Per truffle (approximately 12-15 per batch):
- Calories: 60-80
- Protein: 4-6g
- Carbohydrates: 5-8g
- Fat: 3-5g
- Fiber: 1g
- Sugar: 3-5g""",

    "sweet-potato-tapioca-balls": """Per ball (approximately 20-25 per batch):
- Calories: 20
- Protein: 0-1g
- Carbohydrates: 4-5g
- Fat: 0g
- Fiber: 0-1g
- Sugar: 1-2g""",

    "haunted-bean-salad": """Per serving (1 of 4):
- Calories: 180-220
- Protein: 10-14g
- Carbohydrates: 25-30g
- Fat: 5-8g
- Fiber: 8-10g
- Sugar: 3-5g""",

    "bang-bang-brussels-sprouts": """Per serving (1 of 4):
- Calories: 150-200
- Protein: 5-7g
- Carbohydrates: 15-20g
- Fat: 8-12g
- Fiber: 4-6g
- Sugar: 5-8g""",
}


def main():
    # Read original CSV
    with open(INPUT_FILE, "r", encoding="utf-8") as f:
        reader = csv.DictReader(f)
        fieldnames = list(reader.fieldnames)
        rows = list(reader)

    print(f"Read {len(rows)} recipes from {INPUT_FILE}")
    print(f"Original columns: {len(fieldnames)}")

    # Add Features column if not present
    if "Features" not in fieldnames:
        fieldnames.append("Features")
        print("Added 'Features' column")

    # Find column indices for the fields we need to update
    updated_count = 0
    faq_fixed_count = 0
    nutrition_fixed_count = 0

    for row in rows:
        slug = row.get("Slug", "")

        # Update plain text fields
        if slug in updates:
            row["Category"] = updates[slug]["Category"]
            row["Cuisine"] = updates[slug]["Cuisine"]
            row["Diet"] = updates[slug]["Diet"]
            row["Features"] = updates[slug]["Features"]
            updated_count += 1
        else:
            # Ensure Features column exists even for unmatched rows
            if "Features" not in row:
                row["Features"] = ""

        # Fix broken FAQ
        if slug in faq_fixes:
            old_faq = row.get("FAQ", "")
            if "[object Object]" in old_faq or slug == "cozy-chunky-oatmeal":
                row["FAQ"] = faq_fixes[slug]
                faq_fixed_count += 1

        # Fix broken Nutrition
        if slug in nutrition_fixes:
            old_nutrition = row.get("Nutrition", "")
            if "[object Object]" in old_nutrition:
                row["Nutrition"] = nutrition_fixes[slug]
                nutrition_fixed_count += 1

    # Write updated CSV
    with open(OUTPUT_FILE, "w", encoding="utf-8", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames, quoting=csv.QUOTE_ALL)
        writer.writeheader()
        writer.writerows(rows)

    print(f"\nResults:")
    print(f"  - Plain text fields updated: {updated_count} recipes")
    print(f"  - FAQs fixed: {faq_fixed_count} recipes")
    print(f"  - Nutrition fixed: {nutrition_fixed_count} recipes")
    print(f"  - Output written to: {OUTPUT_FILE}")
    print(f"  - Total columns: {len(fieldnames)}")


if __name__ == "__main__":
    main()
