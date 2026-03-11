---
name: new-recipe
description: Create a new Holistic Bravo recipe from a YouTube URL or partial details. Use when the user wants to write, create, or draft a new recipe.
argument-hint: [youtube-url or recipe-name]
allowed-tools: Read, Grep, Glob, Write, Bash(yt-dlp *), Bash(cat *), Bash(ls *), Bash(mkdir *)
---

# New Recipe Skill

You are creating a new recipe for the Holistic Bravo recipe blog. Your job is to produce a complete, publish-ready recipe `.md` file that matches the exact voice, tone, and structure of the existing 45 recipes.

## Step 1: Determine the Input Mode

**If the user provided a YouTube URL:**
1. First, search `content/transcripts/` for an existing transcript matching the video title or URL
2. If not found, fetch the transcript using `yt-dlp`:
   ```bash
   yt-dlp --write-auto-sub --sub-lang en --skip-download --convert-subs srt -o "content/transcripts/%(title)s/transcript" "<URL>"
   ```
   If `yt-dlp` is not installed, tell the user to run `brew install yt-dlp` and stop.
3. Also fetch the video title and description:
   ```bash
   yt-dlp --print title --print description --skip-download "<URL>"
   ```
4. Save transcript content to `content/transcripts/<video-title>/transcript.md` (create the directory)
5. Read the transcript and extract all recipe details (ingredients, steps, tips, etc.)

**If the user provided partial details (recipe name, ingredients, etc.):**
1. Work with whatever they gave you
2. Ask clarifying questions ONLY if critical info is missing (e.g., no ingredients at all)
3. Fill in gaps using your knowledge of cooking, keeping it consistent with Holistic Bravo's style (vegetarian/plant-based, high-protein focus, whole foods)

## Step 2: Read Reference Materials

Before writing, read these files for context:
- `.claude/skills/new-recipe/tone-guide.md` — Voice and tone rules
- `.claude/skills/new-recipe/example-recipe.md` — Complete example to match

Also scan the existing recipe list to find related recipes:
```bash
grep "^# " content/recipes/ALL_RECIPES_RESTRUCTURED.md
```

## Step 3: Write the Recipe

Generate the recipe in **CMS-ready format**. This format uses labeled field separators so each section can be directly copy-pasted into the corresponding Framer CMS field. The component renders its own section headings, so **do NOT include any markdown headings** (`#`, `##`, `###`) in the content.

Only use these formatting elements inside field content:
- `**bold text**` for emphasis
- `- ` prefix for bulleted lists
- `1. ` prefix for numbered lists
- Blank lines between paragraphs

Every field below is required unless marked optional.

```
========================================
FIELD: title
========================================
[Recipe Name - single line, no formatting]

========================================
FIELD: slug
========================================
[url-friendly-slug — lowercase, hyphens, no special characters]

========================================
FIELD: createdDate
========================================
[today's date, e.g., February 27, 2026]

========================================
FIELD: updatedDate
========================================
[today's date]

========================================
FIELD: shortDescription
========================================
[1-2 sentences. Punchy, highlights the key selling point. Plain text, no formatting.]

========================================
FIELD: introduction
========================================
[2-3 paragraphs separated by blank lines. FIRST PERSON voice throughout ("When I created...", "I love this because...", "my go-to"). Conversational, warm. Explain what makes this recipe special, who it's for, when to eat it. NO heading — the component renders "Introduction" automatically.]

========================================
FIELD: whyYoullLove
========================================
[Bulleted list, 5-8 items. MUST use the format: `- **Bold Lead** - Description text`. Each item has a bold title followed by a dash and first-person description. Example:
- **Zero cooking required** - Just mix, refrigerate, and enjoy the next morning
- **Only 5 ingredients** - Simple enough that I always have everything on hand
- **Packed with fiber** - 24.4g per serving keeps me full and supports digestion
Focus on benefits: easy, fast, high-protein, low-calorie, meal-prep friendly, etc. NO heading.]

========================================
FIELD: tips
========================================
[Bulleted list using - prefix, 5-8 practical cooking tips. ALWAYS use first person ("I always...", "I find that...", "I make this three times a week"). Specific and actionable. NO heading.]

========================================
FIELD: ingredientsOverview
========================================
[2-3 conversational paragraphs in FIRST PERSON explaining the ingredients, why they work, substitutions. This is NOT a list — it's narrative text ("I use...", "my go-to is...", "I find that..."). Mention specific measurements within the paragraphs. Separate paragraphs with blank lines. NO heading.]

========================================
FIELD: instructionsOverview
========================================
[Numbered steps using 1. prefix with detailed explanations in FIRST PERSON woven in ("I start by...", "I find that...", "I let it sit..."). Each step is a full paragraph, not just "mix ingredients." Include sensory cues ("until golden brown", "should be thick and glossy"). Separate steps with blank lines. NO heading.]

========================================
FIELD: faq
========================================
[3-5 items. **Bold question?** followed by answer paragraph in FIRST PERSON ("I usually...", "I recommend...", "I find that..."). Separate each Q&A pair with a blank line. Address common substitutions, storage, reheating, and common mistakes. NO heading.]

========================================
FIELD: relatedRecipes
========================================
[Bulleted list using - prefix, 2-3 items. Use exact names from ALL_RECIPES_RESTRUCTURED.md. Example:
- Overnight Chia Seed Tiramisu
- Cozy Chunky Oatmeal
- High Protein Edible Cookie Dough]

========================================
FIELD: author
========================================
Holistic Bravo

========================================
FIELD: prepTime
========================================
[e.g., 5 minutes]

========================================
FIELD: cookTime
========================================
[e.g., 10 minutes — use "0 minutes" for no-cook recipes]

========================================
FIELD: totalTime
========================================
[e.g., 15 minutes — or "5 minutes + overnight" for overnight recipes]

========================================
FIELD: servings
========================================
[e.g., 1, or "5 muffins", or "2-3 servings"]

========================================
FIELD: calories
========================================
[e.g., 224, or "50 per muffin (250 total)"]

========================================
FIELD: diet
========================================
[Comma-separated from: Vegetarian, Vegan, High-Protein, Plant-Based, Paleo, Gluten-Free, Grain-Free]

========================================
FIELD: category
========================================
[Comma-separated from: Breakfast, Lunch, Dinner, Dessert, Snack, Appetizer, Pasta, Quick Meals, Bread, Side Dish, Soup]

========================================
FIELD: cuisine
========================================
[From: American, Italian, Asian, Chinese, Fusion, Latin American, Mediterranean]

========================================
FIELD: recipeCardIngredients
========================================
[Clean bulleted list using - prefix. Measurements + ingredient only. No explanations.]

========================================
FIELD: recipeCardInstructions
========================================
[Concise numbered steps using 1. prefix. Essential actions only. 1 sentence each.]

========================================
FIELD: nutrition
========================================
Per serving:
- Calories: X
- Protein: Xg
- Carbohydrates: Xg
- Fat: Xg
- Fiber: Xg
[Include additional nutrition data if provided: Saturated Fat, Sodium, Sugars, etc.]

========================================
FIELD: sourceUrl
========================================
[YouTube URL if provided, otherwise leave blank]
```

## Step 4: Save the File

1. Generate a URL-friendly slug from the recipe name (lowercase, hyphens, no special chars)
2. Save to `content/recipes/[slug].md`
3. Confirm the file was saved and show the path

## Important Rules

- NEVER add the recipe to `ALL_RECIPES.csv` or `ALL_RECIPES_RESTRUCTURED.md` — those are maintained separately
- The Ingredients section (body) must be narrative paragraphs, NOT a bulleted list
- The Recipe Card Ingredients section MUST be a clean bulleted list
- Nutrition values should be reasonable estimates if not known exactly — don't fabricate precise numbers, use "Approximately" when estimating
- All recipes should lean vegetarian/plant-based unless the user specifies otherwise
- If a YouTube transcript is sparse or unclear, fill in reasonable details and note what was inferred
- Match the warmth and personality of the example recipe exactly
