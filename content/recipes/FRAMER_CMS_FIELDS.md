# Framer CMS Fields - Holistic Bravo Recipe Blog

**Last Updated:** February 10, 2026

This document defines the CMS collection fields needed in Framer to import and display the restructured recipes. The structure mirrors the shelikesfood.com blog format with a conversational blog section above and a structured recipe card below.

---

## Collection Name: `Recipes`

### Core Fields

| Field Name | Field Type | Required | Notes |
|---|---|---|---|
| **Name** | Text (single line) | Yes | Recipe title (e.g., "Two-Ingredient Chocolate Protein Cosmic Muffins"). This is the default Framer CMS "Name" field. |
| **Slug** | Slug | Yes | Auto-generated from Name. Used for URL path (e.g., `/recipes/two-ingredient-chocolate-protein-cosmic-muffins`) |
| **Created Date** | Date | Yes | Original publish date |
| **Updated Date** | Date | Yes | Last updated date |
| **Short Description** | Text (multi-line) | Yes | 1-2 sentence hook that appears below the title. Keep under 200 characters for SEO meta description. |
| **Featured Image** | Image | Yes | Main recipe photo. Recommended: 1200x800px minimum, 16:9 or 4:3 ratio. |

### Blog Content Fields (Above the Recipe Card)

| Field Name | Field Type | Required | Notes |
|---|---|---|---|
| **Introduction** | Rich Text | Yes | 2-3 conversational paragraphs about the recipe. Warm, food-blogger voice. |
| **Why You'll Love This** | Rich Text | Yes | Bulleted list of 3-5 reasons/benefits. Each bullet has a bold lead + explanation. |
| **Tips** | Rich Text | Yes | Bulleted list of cooking tips, substitutions, and variations. |
| **Ingredients Overview** | Rich Text | Yes | Conversational paragraph(s) explaining key ingredients, why they're used, and substitution options. NOT a list. |
| **Instructions Overview** | Rich Text | Yes | Numbered steps with detailed explanations and tips woven in. More conversational than the recipe card version. |
| **FAQ** | Rich Text | Yes | 3-5 questions in bold with answers below each. Common reader questions about the recipe. |

### Recipe Card Fields (Structured Data)

| Field Name | Field Type | Required | Notes |
|---|---|---|---|
| **Author** | Text (single line) | Yes | Default: "Holistic Bravo" |
| **Prep Time** | Text (single line) | Yes | e.g., "5 minutes", "45 minutes (including 30 min chill time)" |
| **Cook Time** | Text (single line) | Yes | e.g., "10 minutes", "0 minutes (overnight setting)" |
| **Total Time** | Text (single line) | Yes | e.g., "15 minutes", "10 minutes + overnight" |
| **Servings** | Text (single line) | Yes | e.g., "5 muffins", "2-3 servings", "24 cookies" |
| **Calories** | Text (single line) | Yes | e.g., "250 calories total (50 each)", "Approximately 400-450 per serving" |
| **Diet** | Text (single line) | Yes | e.g., "Vegetarian, High-Protein, Gluten-Free" |
| **Category** | Text (single line) | Yes | e.g., "Dessert, Snack", "Breakfast", "Dinner" |
| **Cuisine** | Text (single line) | Yes | e.g., "American", "Italian, Fusion", "Asian" |
| **Recipe Card Ingredients** | Rich Text | Yes | Clean bulleted list - measurements and items only, no explanations. |
| **Recipe Card Instructions** | Rich Text | Yes | Concise numbered steps - just the essential actions, no extra tips. |
| **Nutrition** | Rich Text | Yes | Per-serving breakdown: calories, protein, carbs, fat, fiber. |
| **Source URL** | Link | No | YouTube video URL for attribution. |

### Taxonomy/Filtering Fields

| Field Name | Field Type | Required | Notes |
|---|---|---|---|
| **Diet Tags** | Multi-reference OR Option list | No | For filtering: Vegetarian, Vegan, Plant-Based, High-Protein, Gluten-Free, Paleo |
| **Category Tags** | Multi-reference OR Option list | No | For filtering: Breakfast, Lunch, Dinner, Dessert, Snack, Side Dish, Appetizer, Beverage |
| **Cuisine Tags** | Multi-reference OR Option list | No | For filtering: American, Italian, Asian, Mediterranean, Latin American, Fusion, Chinese |
| **Related Recipes** | Multi-reference (to Recipes) | No | 2-3 related recipes for cross-linking |

---

## Alternative: Separate Collections for Tags

If you want filterable tags with their own pages, create separate collections:

### Collection: `Diet Types`
| Field Name | Field Type |
|---|---|
| Name | Text |
| Slug | Slug |
| Description | Text (multi-line) |

**Entries:** Vegetarian, Vegan, Plant-Based, High-Protein, Gluten-Free, Paleo

### Collection: `Categories`
| Field Name | Field Type |
|---|---|
| Name | Text |
| Slug | Slug |
| Description | Text (multi-line) |

**Entries:** Breakfast, Lunch, Dinner, Dessert, Snack, Side Dish, Appetizer, Beverage

### Collection: `Cuisines`
| Field Name | Field Type |
|---|---|
| Name | Text |
| Slug | Slug |
| Description | Text (multi-line) |

**Entries:** American, Italian, Asian, Mediterranean, Latin American, Fusion, Chinese

Then in the `Recipes` collection, use **Multi-reference** fields to link to these collections instead of plain text.

---

## Field Mapping: Markdown to CMS

When importing from the restructured markdown file, here's how each section maps:

| Markdown Section | CMS Field |
|---|---|
| `# [Title]` | Name |
| `**Created:**` | Created Date |
| `**Updated:**` | Updated Date |
| Text after Updated, before Introduction | Short Description |
| `## Introduction` | Introduction |
| `## Why You'll Love This Recipe` | Why You'll Love This |
| `## Tips` | Tips |
| `## Ingredients` (paragraph) | Ingredients Overview |
| `## Instructions` (numbered, detailed) | Instructions Overview |
| `## FAQ` | FAQ |
| `## Related Recipes` | Related Recipes (manual linking) |
| Recipe Card `**Author:**` | Author |
| Recipe Card `**Prep Time:**` | Prep Time |
| Recipe Card `**Cook Time:**` | Cook Time |
| Recipe Card `**Total Time:**` | Total Time |
| Recipe Card `**Servings:**` | Servings |
| Recipe Card `**Calories:**` | Calories |
| Recipe Card `**Diet:**` | Diet |
| Recipe Card `**Category:**` | Category |
| Recipe Card `**Cuisine:**` | Cuisine |
| Recipe Card `**Source:**` | Source URL |
| Recipe Card `### Ingredients` | Recipe Card Ingredients |
| Recipe Card `### Instructions` | Recipe Card Instructions |
| Recipe Card `### Nutrition` | Nutrition |

---

## Framer CMS Setup Steps

1. **Create the `Recipes` collection** in Framer CMS
2. **Add each field** from the tables above (Core, Blog Content, Recipe Card, Taxonomy)
3. **For Rich Text fields:** Framer supports bold, italic, links, lists, and headings within Rich Text
4. **For Multi-reference fields:** Create the separate tag collections first (Diet Types, Categories, Cuisines), then set up the multi-reference relationships
5. **Import:** Manually add each recipe or use Framer's CSV import for the structured fields, then paste Rich Text content
6. **Template:** Design a recipe page template in Framer that pulls from these fields and lays them out in the shelikesfood.com order

---

## Total Field Count Summary

- **Core fields:** 6
- **Blog content fields:** 6
- **Recipe card fields:** 13
- **Taxonomy/filtering fields:** 4
- **Total:** 29 fields per recipe
