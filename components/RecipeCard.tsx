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
// RECIPE CARD COMPONENT
// ============================================================

export function RecipeCard(props: any) {
    const [hovered, setHovered] = React.useState(false)

    const handleClick = () => {
        if (props.slug) {
            const base = props.recipesBasePath.endsWith("/")
                ? props.recipesBasePath.slice(0, -1)
                : props.recipesBasePath
            window.location.href = `${base}/${props.slug}`
        }
    }

    // Determine image source (handles both string URLs and Framer image objects)
    const imageSrc = props.featuredImage
        ? typeof props.featuredImage === "string"
            ? props.featuredImage
            : props.featuredImage.src
        : null

    return (
        <div
            onClick={handleClick}
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
                    ? `0 8px 30px rgba(199, 149, 240, 0.15)`
                    : `0 2px 8px rgba(0, 0, 0, 0.06)`,
                transition: "all 0.3s ease",
                display: "flex",
                flexDirection: "column" as const,
                height: "100%",
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
                            fontSize: "12px",
                            fontWeight: 600,
                            padding: "5px 14px",
                            borderRadius: "999px",
                            fontFamily: FONTS.body,
                            letterSpacing: "0.3px",
                            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
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
                    gap: "0.5rem",
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
                        fontSize: "1.25rem",
                        fontWeight: 700,
                        color: COLORS.text,
                        margin: 0,
                        lineHeight: 1.3,
                        transition: "color 0.3s ease",
                        ...(hovered ? { color: COLORS.purple } : {}),
                    }}
                >
                    {props.title || "Recipe Title"}
                </h3>

                {/* Short Description */}
                {props.showDescription && props.shortDescription && (
                    <p
                        style={{
                            fontFamily: FONTS.body,
                            fontSize: "14px",
                            color: COLORS.textLight,
                            lineHeight: 1.6,
                            margin: "0.25rem 0 0 0",
                            display: "-webkit-box",
                            WebkitLineClamp: 3,
                            WebkitBoxOrient: "vertical" as any,
                            overflow: "hidden",
                        }}
                    >
                        {props.shortDescription}
                    </p>
                )}

                {/* Spacer to push footer down */}
                <div style={{ flex: 1 }} />

                {/* Footer: tags + read more */}
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
                    {/* Diet/time info */}
                    <div
                        style={{
                            display: "flex",
                            gap: "6px",
                            flexWrap: "wrap" as const,
                        }}
                    >
                        {props.totalTime && (
                            <span
                                style={{
                                    fontSize: "11px",
                                    fontWeight: 600,
                                    color: COLORS.textLight,
                                    backgroundColor: COLORS.bgMedium,
                                    padding: "3px 10px",
                                    borderRadius: "999px",
                                    fontFamily: FONTS.body,
                                }}
                            >
                                {props.totalTime}
                            </span>
                        )}
                        {props.diet && (
                            <span
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
                                {props.diet.split(",")[0].trim()}
                            </span>
                        )}
                    </div>

                    {/* Read more arrow */}
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
        </div>
    )
}

// ============================================================
// DEFAULT PROPS
// ============================================================

RecipeCard.defaultProps = {
    title: "Two-Ingredient Chocolate Protein Cosmic Muffins",
    slug: "two-ingredient-chocolate-protein-cosmic-muffins",
    createdDate: "February 9, 2026",
    shortDescription:
        "These incredibly simple high-protein muffins require just egg whites and protein powder, making them the perfect guilt-free treat.",
    category: "Dessert, Snack",
    diet: "Vegetarian, High-Protein",
    totalTime: "15 min",
    showDescription: true,
    recipesBasePath: "/recipes",
}

// ============================================================
// PROPERTY CONTROLS
// ============================================================

addPropertyControls(RecipeCard, {
    featuredImage: {
        type: ControlType.Image,
        title: "Image",
    },
    title: {
        type: ControlType.String,
        title: "Title",
        defaultValue: RecipeCard.defaultProps.title,
    },
    slug: {
        type: ControlType.String,
        title: "Slug",
        defaultValue: RecipeCard.defaultProps.slug,
    },
    createdDate: {
        type: ControlType.String,
        title: "Date",
        defaultValue: RecipeCard.defaultProps.createdDate,
    },
    shortDescription: {
        type: ControlType.String,
        title: "Short Description",
        displayTextArea: true,
        defaultValue: RecipeCard.defaultProps.shortDescription,
    },
    category: {
        type: ControlType.String,
        title: "Category",
        defaultValue: RecipeCard.defaultProps.category,
    },
    diet: {
        type: ControlType.String,
        title: "Diet",
        defaultValue: RecipeCard.defaultProps.diet,
    },
    totalTime: {
        type: ControlType.String,
        title: "Total Time",
        defaultValue: RecipeCard.defaultProps.totalTime,
    },
    showDescription: {
        type: ControlType.Boolean,
        title: "Show Description",
        defaultValue: true,
    },
    recipesBasePath: {
        type: ControlType.String,
        title: "Recipes Base Path",
        defaultValue: RecipeCard.defaultProps.recipesBasePath,
    },
})
