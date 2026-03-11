# Recipe CMS Import - Status & Next Steps

**Last Updated:** February 27, 2026

---

## Full Conversation Summary

This work spanned two long Claude Code sessions. Here's the full story:

### Session 1: Skill Creation & Recipe Generation

1. **Built the `/new-recipe` skill** — Nicholas provided a detailed plan. Created three files: `SKILL.md` (main instructions), `tone-guide.md` (voice guidelines), and `example-recipe.md` (Cosmic Muffins reference). The skill generates recipes from YouTube URLs (using `yt-dlp` for transcripts) or from partial details the user provides.

2. **Built the `/check-blog-fit` skill** — A read-only analysis skill that checks which of the 3 published blog posts and 20 listicle groups (from `RECIPE_LISTICLE_GROUPS.md`) a recipe could be added to. Returns match strength and placement suggestions.

3. **Generated 5 chia pudding recipes** from notes in a file called `new recipes.txt`. Used the `/new-recipe` skill to produce each one. All saved as `.md` files in `content/recipes/`.

4. **Created Blog Post #4** — A listicle combining all 5 chia pudding recipes, matching the format of existing blog posts 1-3. Also ran `/check-blog-fit` on all 5 recipes.

### Session 1: The Format Problem (Multiple Failed Attempts)

5. **First attempt: Markdown headings** — Recipes had `## Introduction`, `## Why You'll Love This`, etc. But the Framer component renders its own section headings via `<SectionHeading>`, so these duplicated. Switched to a labeled field format with `========` separators and `FIELD: fieldName` labels.

6. **Second attempt: Newlines collapsed** — Nicholas pasted a "Why You'll Love" field into Framer CMS and all the `- ` bullet items collapsed into a single bullet. The newlines between items were being stripped on paste.

7. **WRONG FIX: Modified component files** — Claude changed `renderMarkdown()` in ALL 11 component files to add preprocessing that splits collapsed lines. Nicholas was furious: *"NO!!!!! i dont want you to change those file. wtf."* All component changes were reverted with `git checkout -- components/`.

8. **Third attempt: Built `recipe-to-cms.html` tool** — A browser tool to load recipe `.md` files and copy fields with `navigator.clipboard.writeText()`. Nicholas said it still doesn't work — newlines still stripped.

9. **Fourth attempt: Studied working format** — Nicholas showed the working format from the Chinese-Style Steamed Eggs recipe: `- **Bold Lead** - Description text`. Discovered the recipes also needed first person voice ("I", "my") instead of third person ("Holistic Bravo shared...").

### Session 2: Format Fixes & CSV Solution

10. **Fixed content format across all 5 recipes:**
    - Introduction: third person → first person
    - Why You'll Love: plain bullets → `- **Bold Lead** - Description` format
    - Tips: added first person voice throughout
    - Related Recipes: comma-separated → dash-prefix list
    - All other fields: ensured first person voice

11. **Updated skill files** — Updated `SKILL.md`, `tone-guide.md`, and `example-recipe.md` to reflect all the correct formats so future recipes will be generated correctly.

12. **Discovered the CSV solution** — Examined `ALL_RECIPES.csv` and found that the working recipes store actual `\n` newline characters. CSV import into Framer preserves newlines, while copy-paste strips them. Generated `content/recipes/NEW_CHIA_RECIPES.csv` with all 5 recipes.

13. **CSV import worked!** — Nicholas imported the CSV into Framer CMS. All content, bold formatting, bullets, and newlines rendered correctly. Only one issue remained.

14. **Remaining issue: Instructions numbered list** — The `instructionsOverview` field has blank lines between numbered steps (`1. ...\n\n2. ...`). The `renderMarkdown()` parser treats each blank line as a list boundary, so every step renders as "1." instead of sequential numbering.

15. **Nicholas stopped here** — Too frustrated to continue. Asked for this status document.

### Key Mistakes to Avoid Next Time
- **NEVER modify component files** without explicit permission — fix the CONTENT format instead
- **Always use CSV import** for getting multi-line content into Framer CMS — copy-paste strips newlines
- **No blank lines between list items** in any field — the parser treats them as separate lists
- **Always use first person voice** — never "Holistic Bravo shared..."

---

## What We Did

### 1. Created the `/new-recipe` Skill
- Built a reusable Claude skill at `.claude/skills/new-recipe/` that generates recipes from YouTube URLs or partial details
- Includes `SKILL.md` (instructions), `tone-guide.md` (voice rules), and `example-recipe.md` (reference template)

### 2. Created the `/check-blog-fit` Skill
- Built at `.claude/skills/check-blog-fit/` to analyze which existing blog posts a new recipe could be added to
- Checks against 3 published blog posts and 20 listicle groups

### 3. Generated 5 New Chia Pudding Recipes
All saved in `content/recipes/` as individual `.md` files:
- `tiramisu-chia-pudding.md`
- `blueberry-cheesecake-chia-pudding.md`
- `chocolate-protein-chia-pudding.md`
- `pineapple-upside-down-cake-chia-pudding.md`
- `pb-coconut-dream-chia-pudding.md`

### 4. Created Blog Post #4
- `content/blog-posts/blog-post-4-chia-pudding-recipes.md` — listicle combining all 5 chia recipes

### 5. Fixed Content Format (Multiple Rounds)
- **Round 1:** Changed from markdown headings (`## Introduction`) to labeled field format (`FIELD: introduction`) since the component renders its own headings
- **Round 2:** Switched voice from third person ("Holistic Bravo shared...") to first person ("I created...", "my go-to...")
- **Round 3:** Changed "Why You'll Love" bullets from plain `- text` to `- **Bold Lead** - Description` format
- **Round 4:** Changed Related Recipes from comma-separated to dash-prefix list (`- Recipe Name`)

### 6. Solved the Newline Problem
- **Problem:** Copy-pasting content into Framer CMS strips newlines, causing all bullet items to collapse into one line
- **Solution:** Generated `content/recipes/NEW_CHIA_RECIPES.csv` with all 5 recipes in the same column format as `ALL_RECIPES.csv`. CSV import into Framer preserves newlines.
- **Result:** CSV import worked. Newlines are preserved. Content renders correctly.

### 7. Built a Browser Tool (Optional)
- `tools/recipe-to-cms.html` — loads a recipe `.md` file and lets you copy each field. Created as a workaround before we discovered CSV import was the answer. May not be needed.

---

## Where We Are Now

**The CSV import works.** All content, formatting, bold text, bullets, and newlines display correctly in Framer CMS **except for one issue:**

### Remaining Issue: Instructions Numbered List

The `instructionsOverview` field in all 5 recipes has **blank lines between numbered steps**:

```
1. First step paragraph...

2. Second step paragraph...

3. Third step paragraph...
```

The component's `renderMarkdown()` parser treats blank lines as list boundaries, so each step becomes its own `<ol>` starting at 1. Every step displays as "1." instead of "1, 2, 3, 4..."

**The fix:** Remove the blank lines between numbered steps so they form one continuous list:

```
1. First step paragraph...
2. Second step paragraph...
3. Third step paragraph...
```

This needs to be done in the `instructionsOverview` field of all 5 recipe `.md` files, then the CSV needs to be regenerated.

---

## What Needs to Happen Next

### Immediate (to finish CMS import)
1. **Remove blank lines between numbered steps** in the `instructionsOverview` field of all 5 `.md` files
2. **Regenerate `NEW_CHIA_RECIPES.csv`** from the updated `.md` files
3. **Re-import the CSV** into Framer CMS (or just update the 5 existing items)
4. **Verify** everything renders correctly

### After That
- Update the `/new-recipe` skill instructions to note: **no blank lines between numbered steps** in `instructionsOverview`
- QA/proofread all 5 recipes for content accuracy
- Select and assign images for each recipe in Framer
- Finalize Blog Post #4 in Framer CMS

---

## Key Files

| File | Purpose |
|------|---------|
| `content/recipes/NEW_CHIA_RECIPES.csv` | CSV for Framer CMS import (5 recipes) |
| `content/recipes/*.md` (5 files) | Source recipe files in labeled field format |
| `.claude/skills/new-recipe/SKILL.md` | Recipe generation skill instructions |
| `.claude/skills/new-recipe/tone-guide.md` | Voice & tone rules |
| `.claude/skills/new-recipe/example-recipe.md` | Reference recipe example |
| `.claude/skills/check-blog-fit/SKILL.md` | Blog fit analysis skill |
| `content/blog-posts/blog-post-4-chia-pudding-recipes.md` | Chia pudding listicle blog post |
| `tools/recipe-to-cms.html` | Browser tool for copying fields (optional) |

---

## Key Lessons Learned

1. **Framer CMS strips newlines on paste.** Always use CSV import for multi-line content.
2. **All recipe content must be first person** ("I", "my", "me") — never third person ("Holistic Bravo shared...")
3. **"Why You'll Love" format:** `- **Bold Lead** - Description text`
4. **No blank lines between list items** — the `renderMarkdown()` parser treats blank lines as list boundaries, causing numbered lists to restart at 1 and bullet lists to become separate lists.
5. **Component renders section headings** — never include `#`/`##` headings in field content.
6. **Recipe Card sections are concise** (short bullets/steps), while body sections (Introduction, Ingredients Overview, Instructions Overview) are detailed narrative paragraphs.
