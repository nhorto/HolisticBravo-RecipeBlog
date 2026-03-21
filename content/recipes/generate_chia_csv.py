#!/usr/bin/env python3
"""
Generate NEW_CHIA_RECIPES.csv from 5 chia pudding .md files.
Each .md file uses ======== separators and FIELD: fieldName labels.
"""

import csv
import os
import re

RECIPES_DIR = "/Users/nicholashorton/Documents/HolisticBravo-RecipeBlog/content/recipes"

MD_FILES = [
    "tiramisu-chia-pudding.md",
    "blueberry-cheesecake-chia-pudding.md",
    "chocolate-protein-chia-pudding.md",
    "pineapple-upside-down-cake-chia-pudding.md",
    "pb-coconut-dream-chia-pudding.md",
]

CSV_HEADER = [
    "Name",
    "Slug",
    "Created Date",
    "Updated Date",
    "Short Description",
    "Introduction",
    "Why You'll Love This",
    "Tips",
    "Ingredients Overview",
    "Instructions Overview",
    "FAQ",
    "Related Recipes",
    "Author",
    "Prep Time",
    "Cook Time",
    "Total Time",
    "Servings",
    "Calories",
    "Diet",
    "Category",
    "Cuisine",
    "Recipe Card Ingredients",
    "Recipe Card Instructions",
    "Nutrition",
    "Source URL",
]

# Map from md field name -> CSV column name
FIELD_MAP = {
    "title": "Name",
    "slug": "Slug",
    "createdDate": "Created Date",
    "updatedDate": "Updated Date",
    "shortDescription": "Short Description",
    "introduction": "Introduction",
    "whyYoullLove": "Why You'll Love This",
    "tips": "Tips",
    "ingredientsOverview": "Ingredients Overview",
    "instructionsOverview": "Instructions Overview",
    "faq": "FAQ",
    "relatedRecipes": "Related Recipes",
    "author": "Author",
    "prepTime": "Prep Time",
    "cookTime": "Cook Time",
    "totalTime": "Total Time",
    "servings": "Servings",
    "calories": "Calories",
    "diet": "Diet",
    "category": "Category",
    "cuisine": "Cuisine",
    "recipeCardIngredients": "Recipe Card Ingredients",
    "recipeCardInstructions": "Recipe Card Instructions",
    "nutrition": "Nutrition",
    "sourceUrl": "Source URL",
}

SEPARATOR_PATTERN = re.compile(r"^={4,}\s*$")
FIELD_LABEL_PATTERN = re.compile(r"^FIELD:\s*(\S+)\s*$")


def parse_md_file(filepath):
    """Parse a .md recipe file into a dict of {field_name: value}."""
    with open(filepath, "r", encoding="utf-8") as f:
        lines = f.readlines()

    fields = {}
    i = 0
    n = len(lines)

    while i < n:
        line = lines[i].rstrip("\n")

        # Look for a separator line
        if SEPARATOR_PATTERN.match(line):
            # Next non-empty line should be a FIELD label or another separator
            i += 1
            if i >= n:
                break

            label_line = lines[i].rstrip("\n")
            m = FIELD_LABEL_PATTERN.match(label_line)
            if not m:
                # Not a field label, skip
                continue

            field_name = m.group(1)
            i += 1

            # Expect another separator line
            if i < n and SEPARATOR_PATTERN.match(lines[i].rstrip("\n")):
                i += 1

            # Now collect content lines until the next separator or EOF
            content_lines = []
            while i < n:
                current = lines[i].rstrip("\n")
                if SEPARATOR_PATTERN.match(current):
                    # Don't advance i - the outer loop will handle this separator
                    break
                content_lines.append(lines[i].rstrip("\n"))
                i += 1

            # Strip leading/trailing blank lines from content
            # but preserve internal newlines
            raw_content = "\n".join(content_lines)
            value = raw_content.strip()
            fields[field_name] = value
        else:
            i += 1

    return fields


def build_csv_row(fields):
    """Convert parsed fields dict to an ordered list matching CSV_HEADER."""
    row = []
    for col in CSV_HEADER:
        # Find the md field name that maps to this CSV column
        md_key = None
        for k, v in FIELD_MAP.items():
            if v == col:
                md_key = k
                break
        value = fields.get(md_key, "") if md_key else ""
        row.append(value)
    return row


def main():
    output_path = os.path.join(RECIPES_DIR, "NEW_CHIA_RECIPES.csv")
    rows = []

    for filename in MD_FILES:
        filepath = os.path.join(RECIPES_DIR, filename)
        print(f"Parsing: {filename}")
        fields = parse_md_file(filepath)
        print(f"  Fields found: {list(fields.keys())}")
        row = build_csv_row(fields)
        rows.append(row)

    with open(output_path, "w", newline="", encoding="utf-8") as csvfile:
        writer = csv.writer(
            csvfile,
            quoting=csv.QUOTE_ALL,
            lineterminator="\n",
        )
        writer.writerow(CSV_HEADER)
        for row in rows:
            writer.writerow(row)

    print(f"\nWrote {len(rows)} rows to: {output_path}")

    # Verify
    print("\n--- Verification ---")
    with open(output_path, "r", encoding="utf-8") as f:
        reader = csv.reader(f)
        header = next(reader)
        print(f"Header columns ({len(header)}): {header}")
        data_rows = list(reader)
        print(f"Data rows: {len(data_rows)}")
        for i, row in enumerate(data_rows):
            print(f"  Row {i+1}: Name='{row[0]}', Slug='{row[1]}'")


if __name__ == "__main__":
    main()
