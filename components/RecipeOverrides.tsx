import type { ComponentType } from "react"
import { Override } from "framer"

// Apply this override to your "Jump to Recipe" button.
// It will smooth-scroll down to the recipe card when clicked.
export function JumpToRecipe(): Override {
    return {
        onClick: () => {
            const recipeCard = document.getElementById("recipe-card")
            if (recipeCard) {
                recipeCard.scrollIntoView({ behavior: "smooth" })
            }
        },
    }
}

// Apply this override to your "Print Recipe" button.
// It will open the browser's print dialog when clicked.
export function PrintRecipe(): Override {
    return {
        onClick: () => {
            window.print()
        },
    }
}
