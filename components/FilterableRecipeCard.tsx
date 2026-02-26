import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

// ============================================================
// BRAND COLORS & FONTS
// ============================================================

const COLORS = {
    purple: "#C795F0",
    green: "#7FE3B1",
    bgLight: "#F7F7FB",
    bgMedium: "#EEF0F5",
    text: "#2D2D2D",
    textLight: "#666666",
    white: "#ffffff",
    border: "#E0E0E0",
}

const FONTS = {
    heading: "'Playfair Display', Georgia, serif",
    body: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
}

// ============================================================
// FILTERABLE RECIPE CARD
// ============================================================
// Place this inside a Framer Collection List and bind CMS fields
// to the property controls. Works with RecipeFilter.tsx for
// filtering and sorting via custom DOM events.
// ============================================================

export function FilterableRecipeCard(props: any) {
    const [hovered, setHovered] = React.useState(false)
    const [visible, setVisible] = React.useState(true)
    const ref = React.useRef<HTMLAnchorElement>(null)

    // Listen for filter events from RecipeFilter
    React.useEffect(() => {
        const handleFilter = (e: Event) => {
            const { diet, category, cuisine, sort } = (e as CustomEvent)
                .detail as {
                diet: string | null
                category: string | null
                cuisine: string | null
                sort: "newest" | "oldest"
            }

            // Check if this card matches all active filters
            let show = true

            if (diet) {
                const myDiets = (props.diet || "")
                    .split(",")
                    .map((s: string) => s.trim().toLowerCase())
                show = show && myDiets.includes(diet.toLowerCase())
            }

            if (category) {
                const myCategories = (props.category || "")
                    .split(",")
                    .map((s: string) => s.trim().toLowerCase())
                show = show && myCategories.includes(category.toLowerCase())
            }

            if (cuisine) {
                const myCuisines = (props.cuisine || "")
                    .split(",")
                    .map((s: string) => s.trim().toLowerCase())
                show = show && myCuisines.includes(cuisine.toLowerCase())
            }

            setVisible(show)

            // Handle sorting via CSS order on the Framer wrapper element
            if (ref.current) {
                const wrapper = ref.current.parentElement
                if (wrapper) {
                    const date = new Date(
                        props.createdDate || "2026-01-01"
                    )
                    const daysSinceEpoch = Math.floor(
                        date.getTime() / 86400000
                    )
                    const order =
                        sort === "oldest"
                            ? daysSinceEpoch
                            : -daysSinceEpoch
                    wrapper.style.order = String(order)
                }
            }
        }

        // Check for initial filter state (if RecipeFilter mounted first)
        if ((window as any).__recipeFilters) {
            handleFilter(
                new CustomEvent("recipeFilterChange", {
                    detail: (window as any).__recipeFilters,
                })
            )
        }

        window.addEventListener("recipeFilterChange", handleFilter)
        return () =>
            window.removeEventListener("recipeFilterChange", handleFilter)
    }, [props.diet, props.category, props.cuisine, props.createdDate])

    // Show/hide Framer's wrapper elements when visibility changes
    // Framer wraps Collection List items in multiple nested divs.
    // We traverse up through single-child parents until we reach the
    // actual grid container (which has multiple children).
    React.useEffect(() => {
        if (!ref.current) return

        // Set data attributes for RecipeFilter to count visible cards
        ref.current.setAttribute("data-recipe-card", "true")
        ref.current.setAttribute("data-visible", String(visible))

        // Traverse up through Framer's wrapper divs
        let el: HTMLElement | null = ref.current.parentElement
        while (el) {
            const parent = el.parentElement
            // Stop when we reach the grid container (has multiple children)
            if (!parent || parent.children.length > 1) {
                // This is the outermost wrapper for this card
                el.style.display = visible ? "" : "none"
                break
            }
            el = parent
        }
    }, [visible])

    // Handle image source (string URL or Framer image object)
    const imageSrc = props.featuredImage
        ? typeof props.featuredImage === "string"
            ? props.featuredImage
            : props.featuredImage.src
        : null

    const linkHref = props.slug
        ? `${props.recipesBasePath.endsWith("/") ? props.recipesBasePath.slice(0, -1) : props.recipesBasePath}/${props.slug}`
        : undefined

    return (
        <a
            ref={ref}
            href={linkHref}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                ...props.style,
                fontFamily: FONTS.body,
                cursor: "pointer",
                borderRadius: "16px",
                overflow: "hidden",
                backgroundColor: COLORS.white,
                border: `1px solid ${hovered ? COLORS.purple : COLORS.border}`,
                boxShadow: hovered
                    ? `0 8px 25px rgba(199, 149, 240, 0.15)`
                    : `0 2px 8px rgba(0, 0, 0, 0.05)`,
                transition: "all 0.3s ease",
                display: "flex",
                flexDirection: "column" as const,
                height: "100%",
                textDecoration: "none",
                color: "inherit",
            }}
        >
            {/* Image */}
            <div
                style={{
                    width: "100%",
                    aspectRatio: "16 / 10",
                    overflow: "hidden",
                    backgroundColor: COLORS.bgMedium,
                    position: "relative" as const,
                }}
            >
                {imageSrc ? (
                    <img
                        src={imageSrc}
                        alt={props.title || "Recipe"}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover" as const,
                            display: "block",
                            transition: "transform 0.4s ease",
                            transform: hovered ? "scale(1.05)" : "scale(1)",
                        }}
                    />
                ) : (
                    <div
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: COLORS.textLight,
                            fontSize: "14px",
                        }}
                    >
                        No Image
                    </div>
                )}

                {/* Category pill overlay */}
                {props.category && (
                    <div
                        style={{
                            position: "absolute" as const,
                            top: "12px",
                            left: "12px",
                            backgroundColor: COLORS.white,
                            color: COLORS.purple,
                            fontSize: "11px",
                            fontWeight: 600,
                            padding: "4px 12px",
                            borderRadius: "999px",
                            fontFamily: FONTS.body,
                            letterSpacing: "0.3px",
                            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        {props.category.split(",")[0].trim()}
                    </div>
                )}
            </div>

            {/* Content */}
            <div
                style={{
                    padding: "1.25rem 1.5rem 1.5rem",
                    display: "flex",
                    flexDirection: "column" as const,
                    gap: "0.4rem",
                    flex: 1,
                }}
            >
                {/* Date */}
                {props.createdDate && (
                    <span
                        style={{
                            fontSize: "13px",
                            color: COLORS.textLight,
                            fontFamily: FONTS.body,
                            fontStyle: "italic",
                        }}
                    >
                        {props.createdDate}
                    </span>
                )}

                {/* Title */}
                <h3
                    style={{
                        fontFamily: FONTS.heading,
                        fontSize: "1.2rem",
                        fontWeight: 700,
                        color: hovered ? COLORS.purple : COLORS.text,
                        margin: 0,
                        lineHeight: 1.3,
                        transition: "color 0.3s ease",
                    }}
                >
                    {props.title || "Recipe Title"}
                </h3>

                {/* Spacer */}
                <div style={{ flex: 1 }} />

                {/* Footer */}
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginTop: "0.75rem",
                        paddingTop: "0.75rem",
                        borderTop: `1px solid ${COLORS.bgMedium}`,
                    }}
                >
                    {/* Tags */}
                    <div
                        style={{
                            display: "flex",
                            gap: "5px",
                            flexWrap: "wrap" as const,
                        }}
                    >
                        {props.diet &&
                            props.diet
                                .split(",")
                                .map((d: string) => d.trim())
                                .filter(Boolean)
                                .map((tag: string) => (
                                    <span
                                        key={tag}
                                        style={{
                                            fontSize: "11px",
                                            fontWeight: 600,
                                            color: COLORS.purple,
                                            backgroundColor: `${COLORS.purple}15`,
                                            padding: "3px 10px",
                                            borderRadius: "999px",
                                            fontFamily: FONTS.body,
                                        }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                    </div>

                    {/* Read more */}
                    <span
                        style={{
                            fontSize: "13px",
                            fontWeight: 600,
                            color: hovered ? COLORS.green : COLORS.purple,
                            transition: "color 0.3s ease",
                            fontFamily: FONTS.body,
                            whiteSpace: "nowrap" as const,
                        }}
                    >
                        Read More →
                    </span>
                </div>
            </div>
        </a>
    )
}

// ============================================================
// DEFAULT PROPS
// ============================================================

FilterableRecipeCard.defaultProps = {
    title: "Two-Ingredient Chocolate Protein Cosmic Muffins",
    slug: "two-ingredient-chocolate-protein-cosmic-muffins",
    createdDate: "February 9, 2026",
    category: "Dessert, Snack",
    diet: "Vegetarian, High-Protein",
    cuisine: "American",
    recipesBasePath: "/recipe",
}

// ============================================================
// PROPERTY CONTROLS
// ============================================================

addPropertyControls(FilterableRecipeCard, {
    featuredImage: {
        type: ControlType.Image,
        title: "Image",
    },
    title: {
        type: ControlType.String,
        title: "Title",
        defaultValue: FilterableRecipeCard.defaultProps.title,
    },
    slug: {
        type: ControlType.String,
        title: "Slug",
        defaultValue: FilterableRecipeCard.defaultProps.slug,
    },
    createdDate: {
        type: ControlType.String,
        title: "Date",
        defaultValue: FilterableRecipeCard.defaultProps.createdDate,
    },
    category: {
        type: ControlType.String,
        title: "Category",
        defaultValue: FilterableRecipeCard.defaultProps.category,
    },
    diet: {
        type: ControlType.String,
        title: "Diet",
        defaultValue: FilterableRecipeCard.defaultProps.diet,
    },
    cuisine: {
        type: ControlType.String,
        title: "Cuisine",
        defaultValue: FilterableRecipeCard.defaultProps.cuisine,
    },
    recipesBasePath: {
        type: ControlType.String,
        title: "Recipes Base Path",
        defaultValue: FilterableRecipeCard.defaultProps.recipesBasePath,
    },
})
