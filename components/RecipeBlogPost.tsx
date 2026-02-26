import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

// ============================================================
// LIGHTWEIGHT MARKDOWN PARSER
// ============================================================

function parseInlineMarkdown(text: string): React.ReactNode[] {
    const parts: React.ReactNode[] = []
    let remaining = text
    let key = 0

    while (remaining.length > 0) {
        const boldMatch = remaining.match(/\*\*(.+?)\*\*/)
        const italicMatch = remaining.match(/(?<!\*)\*(?!\*)(.+?)\*(?!\*)/)
        const linkMatch = remaining.match(/\[(.+?)\]\((.+?)\)/)

        const matches = [
            boldMatch ? { type: "bold", match: boldMatch, index: boldMatch.index! } : null,
            italicMatch ? { type: "italic", match: italicMatch, index: italicMatch.index! } : null,
            linkMatch ? { type: "link", match: linkMatch, index: linkMatch.index! } : null,
        ].filter(Boolean) as { type: string; match: RegExpMatchArray; index: number }[]

        if (matches.length === 0) {
            parts.push(remaining)
            break
        }

        matches.sort((a, b) => a.index - b.index)
        const first = matches[0]

        if (first.index > 0) {
            parts.push(remaining.slice(0, first.index))
        }

        if (first.type === "bold") {
            parts.push(<strong key={key++}>{first.match[1]}</strong>)
            remaining = remaining.slice(first.index + first.match[0].length)
        } else if (first.type === "italic") {
            parts.push(<em key={key++}>{first.match[1]}</em>)
            remaining = remaining.slice(first.index + first.match[0].length)
        } else if (first.type === "link") {
            parts.push(
                <a key={key++} href={first.match[2]} style={{ color: COLORS.purple, textDecoration: "underline" }}>
                    {first.match[1]}
                </a>
            )
            remaining = remaining.slice(first.index + first.match[0].length)
        }
    }

    return parts
}

function renderMarkdown(markdown: string): React.ReactNode {
    if (!markdown) return null

    const lines = markdown.split("\n")
    const elements: React.ReactNode[] = []
    let i = 0
    let key = 0

    while (i < lines.length) {
        const line = lines[i]
        const trimmed = line.trim()

        if (trimmed === "") {
            i++
            continue
        }

        if (/^\d+\.\s/.test(trimmed)) {
            const items: string[] = []
            while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
                items.push(lines[i].trim().replace(/^\d+\.\s/, ""))
                i++
            }
            elements.push(
                <ol key={key++} style={{ paddingLeft: "1.5rem", margin: "0.5rem 0", lineHeight: "1.8", fontFamily: FONTS.body }}>
                    {items.map((item, idx) => (
                        <li key={idx} style={{ marginBottom: "0.5rem" }}>
                            {parseInlineMarkdown(item)}
                        </li>
                    ))}
                </ol>
            )
            continue
        }

        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
            const items: string[] = []
            while (
                i < lines.length &&
                (lines[i].trim().startsWith("- ") || lines[i].trim().startsWith("* "))
            ) {
                items.push(lines[i].trim().replace(/^[-*]\s/, ""))
                i++
            }
            elements.push(
                <ul key={key++} style={{ paddingLeft: "1.5rem", margin: "0.5rem 0", lineHeight: "1.8", listStyleType: "disc", fontFamily: FONTS.body }}>
                    {items.map((item, idx) => (
                        <li key={idx} style={{ marginBottom: "0.4rem" }}>
                            {parseInlineMarkdown(item)}
                        </li>
                    ))}
                </ul>
            )
            continue
        }

        elements.push(
            <p key={key++} style={{ margin: "0 0 1rem 0", lineHeight: "1.8", fontFamily: FONTS.body }}>
                {parseInlineMarkdown(trimmed)}
            </p>
        )
        i++
    }

    return <>{elements}</>
}

// ============================================================
// YOUR BRAND COLORS & FONTS
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
// ANIMATED BUTTON (purple -> green on hover)
// ============================================================

function AnimatedButton({
    children,
    onClick,
}: {
    children: React.ReactNode
    onClick: () => void
}) {
    const [hovered, setHovered] = React.useState(false)

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                backgroundColor: hovered ? COLORS.green : COLORS.purple,
                color: COLORS.text,
                border: "none",
                padding: "14px 32px",
                fontSize: "15px",
                fontWeight: 600,
                fontFamily: FONTS.body,
                cursor: "pointer",
                borderRadius: "999px",
                transition: "background-color 0.3s ease",
                letterSpacing: "0.3px",
            }}
        >
            {children}
        </button>
    )
}

// ============================================================
// SUB-COMPONENTS
// ============================================================

function SectionHeading({ children }: { children: React.ReactNode }) {
    return (
        <h2
            style={{
                fontFamily: FONTS.heading,
                fontSize: "1.6rem",
                fontWeight: 700,
                color: COLORS.text,
                marginBottom: "1rem",
                marginTop: "0",
            }}
        >
            {children}
        </h2>
    )
}

function TimeBlock({ label, value }: { label: string; value: string }) {
    return (
        <div style={{ textAlign: "center" as const, flex: 1, padding: "0.5rem" }}>
            <div
                style={{
                    fontSize: "11px",
                    fontWeight: 700,
                    textTransform: "uppercase" as const,
                    letterSpacing: "1px",
                    color: COLORS.textLight,
                    marginBottom: "4px",
                    fontFamily: FONTS.body,
                }}
            >
                {label}
            </div>
            <div
                style={{
                    fontSize: "15px",
                    fontWeight: 600,
                    color: COLORS.text,
                    fontFamily: FONTS.body,
                }}
            >
                {value}
            </div>
        </div>
    )
}

function TagPill({ label }: { label: string }) {
    return (
        <span
            style={{
                display: "inline-block",
                padding: "5px 14px",
                backgroundColor: COLORS.bgMedium,
                color: COLORS.purple,
                fontSize: "12px",
                fontWeight: 600,
                borderRadius: "999px",
                fontFamily: FONTS.body,
                letterSpacing: "0.3px",
            }}
        >
            {label}
        </span>
    )
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export function RecipeBlogPost(props: any) {
    const recipeCardRef = React.useRef<HTMLDivElement>(null)

    const scrollToRecipe = () => {
        recipeCardRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    const dietTags = props.diet ? props.diet.split(",").map((s: string) => s.trim()) : []
    const categoryTags = props.category ? props.category.split(",").map((s: string) => s.trim()) : []
    const cuisineTags = props.cuisine ? props.cuisine.split(",").map((s: string) => s.trim()) : []
    const relatedList = props.relatedRecipes
        ? props.relatedRecipes.split(",").map((s: string) => s.trim())
        : []

    return (
        <div
            style={{
                ...props.style,
                fontFamily: FONTS.body,
                color: COLORS.text,
                backgroundColor: COLORS.white,
                maxWidth: "780px",
                margin: "0 auto",
                padding: "0 1.5rem",
                lineHeight: "1.8",
                fontSize: "16px",
            }}
        >
            {/* ============ HEADER ============ */}
            <header style={{ marginBottom: "2rem", paddingTop: "2rem" }}>
                <h1
                    style={{
                        fontFamily: FONTS.heading,
                        fontSize: "2.4rem",
                        fontWeight: 700,
                        color: COLORS.text,
                        lineHeight: 1.2,
                        marginBottom: "0.75rem",
                        marginTop: 0,
                    }}
                >
                    {props.title || "Recipe Title (bind to CMS)"}
                </h1>

                <div
                    style={{
                        fontSize: "13px",
                        color: COLORS.textLight,
                        marginBottom: "1rem",
                        fontStyle: "italic",
                        fontFamily: FONTS.body,
                    }}
                >
                    {props.createdDate && (
                        <span>Published: {props.createdDate}</span>
                    )}
                    {props.createdDate && props.updatedDate && <span> | </span>}
                    {props.updatedDate && (
                        <span>Updated: {props.updatedDate}</span>
                    )}
                </div>

                <p
                    style={{
                        fontSize: "1.1rem",
                        color: COLORS.textLight,
                        lineHeight: 1.6,
                        margin: 0,
                        fontFamily: FONTS.body,
                    }}
                >
                    {props.shortDescription}
                </p>
            </header>

            {/* ============ BUTTONS ============ */}
            <div
                style={{
                    display: "flex",
                    gap: "12px",
                    marginBottom: "2rem",
                    flexWrap: "wrap" as const,
                }}
            >
                <AnimatedButton onClick={scrollToRecipe}>
                    Jump to Recipe
                </AnimatedButton>
                <AnimatedButton onClick={() => window.print()}>
                    Print Recipe
                </AnimatedButton>
            </div>

            {/* ============ FEATURED IMAGE ============ */}
            {props.featuredImage && (
                <div style={{ marginBottom: "2.5rem" }}>
                    <img
                        src={typeof props.featuredImage === "string" ? props.featuredImage : props.featuredImage.src}
                        alt={props.title}
                        style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "12px",
                            display: "block",
                        }}
                    />
                </div>
            )}

            {/* ============ INTRODUCTION ============ */}
            {props.introduction && (
                <section style={{ marginBottom: "2.5rem" }}>
                    <div style={{ fontSize: "16px", color: COLORS.text }}>
                        {renderMarkdown(props.introduction)}
                    </div>
                    {props.introductionImage && (
                        <img
                            src={typeof props.introductionImage === "string" ? props.introductionImage : props.introductionImage.src}
                            alt=""
                            style={{ width: "100%", height: "auto", borderRadius: "12px", marginTop: "1.5rem", display: "block" }}
                        />
                    )}
                </section>
            )}

            {/* ============ WHY YOU'LL LOVE THIS ============ */}
            {props.whyYoullLove && (
                <section style={{ marginBottom: "2.5rem" }}>
                    <SectionHeading>Why You'll Love This Recipe</SectionHeading>
                    <div style={{ fontSize: "16px", color: COLORS.text }}>
                        {renderMarkdown(props.whyYoullLove)}
                    </div>
                    {props.whyYoullLoveImage && (
                        <img
                            src={typeof props.whyYoullLoveImage === "string" ? props.whyYoullLoveImage : props.whyYoullLoveImage.src}
                            alt=""
                            style={{ width: "100%", height: "auto", borderRadius: "12px", marginTop: "1.5rem", display: "block" }}
                        />
                    )}
                </section>
            )}

            {/* ============ TIPS ============ */}
            {props.tips && (
                <section style={{ marginBottom: "2.5rem" }}>
                    <SectionHeading>Tips</SectionHeading>
                    <div style={{ fontSize: "16px", color: COLORS.text }}>
                        {renderMarkdown(props.tips)}
                    </div>
                    {props.tipsImage && (
                        <img
                            src={typeof props.tipsImage === "string" ? props.tipsImage : props.tipsImage.src}
                            alt=""
                            style={{ width: "100%", height: "auto", borderRadius: "12px", marginTop: "1.5rem", display: "block" }}
                        />
                    )}
                </section>
            )}

            {/* ============ INGREDIENTS OVERVIEW ============ */}
            {props.ingredientsOverview && (
                <section style={{ marginBottom: "2.5rem" }}>
                    <SectionHeading>Ingredients</SectionHeading>
                    <div style={{ fontSize: "16px", color: COLORS.text }}>
                        {renderMarkdown(props.ingredientsOverview)}
                    </div>
                    {props.ingredientsImage && (
                        <img
                            src={typeof props.ingredientsImage === "string" ? props.ingredientsImage : props.ingredientsImage.src}
                            alt=""
                            style={{ width: "100%", height: "auto", borderRadius: "12px", marginTop: "1.5rem", display: "block" }}
                        />
                    )}
                </section>
            )}

            {/* ============ INSTRUCTIONS OVERVIEW ============ */}
            {props.instructionsOverview && (
                <section style={{ marginBottom: "2.5rem" }}>
                    <SectionHeading>Instructions</SectionHeading>
                    <div style={{ fontSize: "16px", color: COLORS.text }}>
                        {renderMarkdown(props.instructionsOverview)}
                    </div>
                    {props.instructionsImage && (
                        <img
                            src={typeof props.instructionsImage === "string" ? props.instructionsImage : props.instructionsImage.src}
                            alt=""
                            style={{ width: "100%", height: "auto", borderRadius: "12px", marginTop: "1.5rem", display: "block" }}
                        />
                    )}
                </section>
            )}

            {/* ============ FAQ ============ */}
            {props.faq && (
                <section style={{ marginBottom: "2.5rem" }}>
                    <SectionHeading>Frequently Asked Questions</SectionHeading>
                    <div style={{ fontSize: "16px", color: COLORS.text }}>
                        {renderMarkdown(props.faq)}
                    </div>
                    {props.faqImage && (
                        <img
                            src={typeof props.faqImage === "string" ? props.faqImage : props.faqImage.src}
                            alt=""
                            style={{ width: "100%", height: "auto", borderRadius: "12px", marginTop: "1.5rem", display: "block" }}
                        />
                    )}
                </section>
            )}

            {/* ============ RELATED RECIPES ============ */}
            {relatedList.length > 0 && (
                <section style={{ marginBottom: "3rem" }}>
                    <SectionHeading>You Might Also Like</SectionHeading>
                    <div style={{ display: "flex", flexDirection: "column" as const, gap: "0.5rem" }}>
                        {relatedList.map((recipe: string, idx: number) => (
                            <span
                                key={idx}
                                style={{
                                    color: COLORS.purple,
                                    fontSize: "16px",
                                    cursor: "pointer",
                                    textDecoration: "underline",
                                    fontFamily: FONTS.body,
                                }}
                            >
                                {recipe}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {/* ============ RECIPE CARD ============ */}
            <div
                ref={recipeCardRef}
                id="recipe-card"
                style={{
                    border: `3px solid ${COLORS.purple}`,
                    borderRadius: "16px",
                    overflow: "hidden",
                    marginBottom: "3rem",
                }}
            >
                {/* Card Header */}
                <div
                    style={{
                        background: `linear-gradient(135deg, ${COLORS.purple}, #a87de0)`,
                        color: COLORS.white,
                        padding: "2rem 2rem 1.5rem",
                        textAlign: "center" as const,
                    }}
                >
                    <h2
                        style={{
                            fontFamily: FONTS.heading,
                            fontSize: "1.8rem",
                            fontWeight: 700,
                            margin: "0 0 0.5rem 0",
                            color: COLORS.white,
                        }}
                    >
                        {props.title}
                    </h2>
                    <p
                        style={{
                            fontSize: "14px",
                            margin: 0,
                            opacity: 0.9,
                            fontFamily: FONTS.body,
                        }}
                    >
                        By {props.author || "Holistic Bravo"}
                    </p>
                </div>

                {/* Time / Servings Bar */}
                <div
                    style={{
                        display: "flex",
                        borderBottom: `1px solid ${COLORS.border}`,
                        padding: "1rem 0",
                        backgroundColor: COLORS.white,
                        flexWrap: "wrap" as const,
                    }}
                >
                    <TimeBlock label="Prep Time" value={props.prepTime} />
                    <TimeBlock label="Cook Time" value={props.cookTime} />
                    <TimeBlock label="Total Time" value={props.totalTime} />
                    <TimeBlock label="Servings" value={props.servings} />
                    <TimeBlock label="Calories" value={props.calories} />
                </div>

                {/* Tags */}
                <div
                    style={{
                        display: "flex",
                        gap: "8px",
                        flexWrap: "wrap" as const,
                        padding: "1rem 1.5rem",
                        borderBottom: `1px solid ${COLORS.border}`,
                        backgroundColor: COLORS.white,
                    }}
                >
                    {dietTags.map((tag: string, idx: number) => (
                        <TagPill key={`diet-${idx}`} label={tag} />
                    ))}
                    {categoryTags.map((tag: string, idx: number) => (
                        <TagPill key={`cat-${idx}`} label={tag} />
                    ))}
                    {cuisineTags.map((tag: string, idx: number) => (
                        <TagPill key={`cui-${idx}`} label={tag} />
                    ))}
                </div>

                {/* Print Button in Card */}
                <div
                    style={{
                        padding: "1rem 1.5rem",
                        display: "flex",
                        justifyContent: "center",
                        backgroundColor: COLORS.white,
                        borderBottom: `1px solid ${COLORS.border}`,
                    }}
                >
                    <AnimatedButton onClick={() => window.print()}>
                        Print Recipe
                    </AnimatedButton>
                </div>

                {/* Card Ingredients */}
                <div
                    style={{
                        padding: "1.5rem 2rem",
                        backgroundColor: COLORS.bgLight,
                    }}
                >
                    <h3
                        style={{
                            fontFamily: FONTS.heading,
                            fontSize: "1.3rem",
                            fontWeight: 700,
                            color: COLORS.text,
                            marginTop: 0,
                            marginBottom: "1rem",
                        }}
                    >
                        Ingredients
                    </h3>
                    <div style={{ fontSize: "15px", lineHeight: "2", fontFamily: FONTS.body }}>
                        {renderMarkdown(props.recipeCardIngredients)}
                    </div>
                </div>

                {/* Card Instructions */}
                <div
                    style={{
                        padding: "1.5rem 2rem",
                        backgroundColor: COLORS.white,
                    }}
                >
                    <h3
                        style={{
                            fontFamily: FONTS.heading,
                            fontSize: "1.3rem",
                            fontWeight: 700,
                            color: COLORS.text,
                            marginTop: 0,
                            marginBottom: "1rem",
                        }}
                    >
                        Instructions
                    </h3>
                    <div style={{ fontSize: "15px", lineHeight: "2", fontFamily: FONTS.body }}>
                        {renderMarkdown(props.recipeCardInstructions)}
                    </div>
                </div>

                {/* Nutrition */}
                <div
                    style={{
                        padding: "1.5rem 2rem",
                        backgroundColor: COLORS.bgLight,
                        borderTop: `1px solid ${COLORS.border}`,
                    }}
                >
                    <h3
                        style={{
                            fontFamily: FONTS.heading,
                            fontSize: "1.3rem",
                            fontWeight: 700,
                            color: COLORS.text,
                            marginTop: 0,
                            marginBottom: "1rem",
                        }}
                    >
                        Nutrition
                    </h3>
                    <div style={{ fontSize: "14px", lineHeight: "1.8", color: COLORS.textLight, fontFamily: FONTS.body }}>
                        {renderMarkdown(props.nutrition)}
                    </div>
                </div>

                {/* Source */}
                {props.sourceUrl && (
                    <div
                        style={{
                            padding: "1rem 2rem",
                            backgroundColor: COLORS.white,
                            borderTop: `1px solid ${COLORS.border}`,
                            textAlign: "center" as const,
                        }}
                    >
                        <a
                            href={props.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                color: COLORS.purple,
                                fontSize: "13px",
                                textDecoration: "none",
                                fontWeight: 600,
                                fontFamily: FONTS.body,
                            }}
                        >
                            Watch the original video
                        </a>
                    </div>
                )}
            </div>
        </div>
    )
}

// ============================================================
// NO DEFAULT PROPS - CMS data flows through cleanly
// ============================================================

// ============================================================
// PROPERTY CONTROLS (for Framer CMS binding)
// ============================================================

addPropertyControls(RecipeBlogPost, {
    title: {
        type: ControlType.String,
        title: "Recipe Title",
    },
    createdDate: {
        type: ControlType.String,
        title: "Created Date",
    },
    updatedDate: {
        type: ControlType.String,
        title: "Updated Date",
    },
    shortDescription: {
        type: ControlType.String,
        title: "Short Description",
        displayTextArea: true,
    },
    featuredImage: {
        type: ControlType.Image,
        title: "Featured Image",
    },
    introductionImage: {
        type: ControlType.Image,
        title: "Introduction Image",
    },
    whyYoullLoveImage: {
        type: ControlType.Image,
        title: "Why You'll Love Image",
    },
    tipsImage: {
        type: ControlType.Image,
        title: "Tips Image",
    },
    ingredientsImage: {
        type: ControlType.Image,
        title: "Ingredients Image",
    },
    instructionsImage: {
        type: ControlType.Image,
        title: "Instructions Image",
    },
    faqImage: {
        type: ControlType.Image,
        title: "FAQ Image",
    },
    introduction: {
        type: ControlType.String,
        title: "Introduction",
        displayTextArea: true,
    },
    whyYoullLove: {
        type: ControlType.String,
        title: "Why You'll Love This",
        displayTextArea: true,
    },
    tips: {
        type: ControlType.String,
        title: "Tips",
        displayTextArea: true,
    },
    ingredientsOverview: {
        type: ControlType.String,
        title: "Ingredients Overview",
        displayTextArea: true,
    },
    instructionsOverview: {
        type: ControlType.String,
        title: "Instructions Overview",
        displayTextArea: true,
    },
    faq: {
        type: ControlType.String,
        title: "FAQ",
        displayTextArea: true,
    },
    author: {
        type: ControlType.String,
        title: "Author",
    },
    prepTime: {
        type: ControlType.String,
        title: "Prep Time",
    },
    cookTime: {
        type: ControlType.String,
        title: "Cook Time",
    },
    totalTime: {
        type: ControlType.String,
        title: "Total Time",
    },
    servings: {
        type: ControlType.String,
        title: "Servings",
    },
    calories: {
        type: ControlType.String,
        title: "Calories",
    },
    diet: {
        type: ControlType.String,
        title: "Diet",
    },
    category: {
        type: ControlType.String,
        title: "Category",
    },
    cuisine: {
        type: ControlType.String,
        title: "Cuisine",
    },
    recipeCardIngredients: {
        type: ControlType.String,
        title: "Card Ingredients",
        displayTextArea: true,
    },
    recipeCardInstructions: {
        type: ControlType.String,
        title: "Card Instructions",
        displayTextArea: true,
    },
    nutrition: {
        type: ControlType.String,
        title: "Nutrition",
        displayTextArea: true,
    },
    sourceUrl: {
        type: ControlType.String,
        title: "Source URL",
    },
    relatedRecipes: {
        type: ControlType.String,
        title: "Related Recipes",
        displayTextArea: true,
    },
})
