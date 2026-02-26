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
// SHARED SUB-COMPONENTS
// ============================================================

function resolveImageSrc(image: any): string {
    return typeof image === "string" ? image : image.src
}

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

function SectionImage({ image }: { image: any }) {
    if (!image) return null
    return (
        <img
            src={resolveImageSrc(image)}
            alt=""
            style={{
                width: "100%",
                maxWidth: "700px",
                height: "auto",
                borderRadius: "12px",
                marginTop: "1.5rem",
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
            }}
        />
    )
}

// ============================================================
// SHARE BUTTON SUB-COMPONENTS & ICONS
// ============================================================

function ShareButton({
    icon,
    label,
    onClick,
}: {
    icon: React.ReactNode
    label: string
    onClick: () => void
}) {
    const [hovered, setHovered] = React.useState(false)

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            title={label}
            style={{
                display: "flex",
                flexDirection: "column" as const,
                alignItems: "center",
                gap: "6px",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 0,
            }}
        >
            <div
                style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    backgroundColor: hovered ? COLORS.purple : COLORS.bgMedium,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background-color 0.3s ease",
                }}
            >
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    {React.Children.map(icon, (child) => {
                        if (React.isValidElement(child)) {
                            const currentFill = (child.props as any).fill
                            const currentStroke = (child.props as any).stroke
                            return React.cloneElement(child as React.ReactElement<any>, {
                                ...(currentFill && currentFill !== "none"
                                    ? { fill: hovered ? COLORS.white : COLORS.text }
                                    : {}),
                                ...(currentStroke && currentStroke !== "none"
                                    ? { stroke: hovered ? COLORS.white : COLORS.text }
                                    : {}),
                            })
                        }
                        return child
                    })}
                </svg>
            </div>
            <span
                style={{
                    fontSize: "11px",
                    color: hovered ? COLORS.purple : COLORS.textLight,
                    fontFamily: FONTS.body,
                    fontWeight: 500,
                    transition: "color 0.3s ease",
                    whiteSpace: "nowrap" as const,
                }}
            >
                {label}
            </span>
        </button>
    )
}

const CopyIcon = (
    <>
        <path
            d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
            stroke={COLORS.text}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
        />
        <path
            d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
            stroke={COLORS.text}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
        />
    </>
)

const CheckIcon = (
    <path
        d="M20 6L9 17l-5-5"
        stroke={COLORS.text}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
    />
)

const PinterestIcon = (
    <path
        d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.425 1.808-2.425.853 0 1.264.64 1.264 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.806 1.48 1.806 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.176-4.068-2.845 0-4.515 2.134-4.515 4.34 0 .859.331 1.781.745 2.282a.3.3 0 0 1 .069.288l-.278 1.133c-.044.183-.145.222-.335.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.965-.527-2.291-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z"
        fill={COLORS.text}
    />
)

const FacebookIcon = (
    <path
        d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2z"
        fill={COLORS.text}
    />
)

const XIcon = (
    <path
        d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
        fill={COLORS.text}
    />
)

const WhatsAppIcon = (
    <>
        <path
            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"
            fill={COLORS.text}
        />
        <path
            d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 0 1-4.076-1.112l-.292-.174-3.024.793.808-2.95-.19-.302A7.96 7.96 0 0 1 4 12a8 8 0 1 1 16 0 8 8 0 0 1-8 8z"
            fill={COLORS.text}
        />
    </>
)

const EmailIcon = (
    <>
        <rect
            x="2"
            y="4"
            width="20"
            height="16"
            rx="2"
            stroke={COLORS.text}
            strokeWidth="2"
            fill="none"
        />
        <path
            d="M22 7l-10 7L2 7"
            stroke={COLORS.text}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
        />
    </>
)

// ============================================================
// 1. RECIPE HEADER
// ============================================================

export function RecipeHeader(props: any) {
    return (
        <header
            style={{
                ...props.style,
                fontFamily: FONTS.body,
                color: COLORS.text,
            }}
        >
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
    )
}

addPropertyControls(RecipeHeader, {
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
})

// ============================================================
// 2. RECIPE BUTTONS
// ============================================================

export function RecipeButtons(props: any) {
    const scrollToRecipe = () => {
        const el = document.querySelector("#recipe-card")
        if (el) el.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <div
            style={{
                ...props.style,
                display: "flex",
                gap: "12px",
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
    )
}

addPropertyControls(RecipeButtons, {})

// ============================================================
// 3. RECIPE INTRODUCTION
// ============================================================

export function RecipeIntroduction(props: any) {
    if (!props.introduction) return <div style={props.style} />

    return (
        <section
            style={{
                ...props.style,
                fontFamily: FONTS.body,
                color: COLORS.text,
                fontSize: "16px",
                lineHeight: "1.8",
            }}
        >
            {renderMarkdown(props.introduction)}
            <SectionImage image={props.introductionImage} />
        </section>
    )
}

addPropertyControls(RecipeIntroduction, {
    introduction: {
        type: ControlType.String,
        title: "Introduction",
        displayTextArea: true,
    },
    introductionImage: {
        type: ControlType.Image,
        title: "Introduction Image",
    },
})

// ============================================================
// 4. WHY YOU'LL LOVE THIS RECIPE
// ============================================================

export function RecipeWhyYoullLove(props: any) {
    if (!props.whyYoullLove) return <div style={props.style} />

    return (
        <section
            style={{
                ...props.style,
                fontFamily: FONTS.body,
                color: COLORS.text,
                fontSize: "16px",
                lineHeight: "1.8",
            }}
        >
            <SectionHeading>Why You'll Love This Recipe</SectionHeading>
            {renderMarkdown(props.whyYoullLove)}
            <SectionImage image={props.whyYoullLoveImage} />
        </section>
    )
}

addPropertyControls(RecipeWhyYoullLove, {
    whyYoullLove: {
        type: ControlType.String,
        title: "Why You'll Love This",
        displayTextArea: true,
    },
    whyYoullLoveImage: {
        type: ControlType.Image,
        title: "Why You'll Love Image",
    },
})

// ============================================================
// 5. TIPS
// ============================================================

export function RecipeTips(props: any) {
    if (!props.tips) return <div style={props.style} />

    return (
        <section
            style={{
                ...props.style,
                fontFamily: FONTS.body,
                color: COLORS.text,
                fontSize: "16px",
                lineHeight: "1.8",
            }}
        >
            <SectionHeading>Tips</SectionHeading>
            {renderMarkdown(props.tips)}
            <SectionImage image={props.tipsImage} />
        </section>
    )
}

addPropertyControls(RecipeTips, {
    tips: {
        type: ControlType.String,
        title: "Tips",
        displayTextArea: true,
    },
    tipsImage: {
        type: ControlType.Image,
        title: "Tips Image",
    },
})

// ============================================================
// 6. INGREDIENTS OVERVIEW
// ============================================================

export function RecipeIngredientsOverview(props: any) {
    if (!props.ingredientsOverview) return <div style={props.style} />

    return (
        <section
            style={{
                ...props.style,
                fontFamily: FONTS.body,
                color: COLORS.text,
                fontSize: "16px",
                lineHeight: "1.8",
            }}
        >
            <SectionHeading>Ingredients</SectionHeading>
            {renderMarkdown(props.ingredientsOverview)}
            <SectionImage image={props.ingredientsImage} />
        </section>
    )
}

addPropertyControls(RecipeIngredientsOverview, {
    ingredientsOverview: {
        type: ControlType.String,
        title: "Ingredients Overview",
        displayTextArea: true,
    },
    ingredientsImage: {
        type: ControlType.Image,
        title: "Ingredients Image",
    },
})

// ============================================================
// 7. INSTRUCTIONS OVERVIEW
// ============================================================

export function RecipeInstructionsOverview(props: any) {
    if (!props.instructionsOverview) return <div style={props.style} />

    return (
        <section
            style={{
                ...props.style,
                fontFamily: FONTS.body,
                color: COLORS.text,
                fontSize: "16px",
                lineHeight: "1.8",
            }}
        >
            <SectionHeading>Instructions</SectionHeading>
            {renderMarkdown(props.instructionsOverview)}
            <SectionImage image={props.instructionsImage} />
        </section>
    )
}

addPropertyControls(RecipeInstructionsOverview, {
    instructionsOverview: {
        type: ControlType.String,
        title: "Instructions Overview",
        displayTextArea: true,
    },
    instructionsImage: {
        type: ControlType.Image,
        title: "Instructions Image",
    },
})

// ============================================================
// 8. FAQ
// ============================================================

export function RecipeFAQ(props: any) {
    if (!props.faq) return <div style={props.style} />

    return (
        <section
            style={{
                ...props.style,
                fontFamily: FONTS.body,
                color: COLORS.text,
                fontSize: "16px",
                lineHeight: "1.8",
            }}
        >
            <SectionHeading>Frequently Asked Questions</SectionHeading>
            {renderMarkdown(props.faq)}
            <SectionImage image={props.faqImage} />
        </section>
    )
}

addPropertyControls(RecipeFAQ, {
    faq: {
        type: ControlType.String,
        title: "FAQ",
        displayTextArea: true,
    },
    faqImage: {
        type: ControlType.Image,
        title: "FAQ Image",
    },
})

// ============================================================
// 9. RELATED RECIPES
// ============================================================

export function RecipeRelated(props: any) {
    const relatedList = props.relatedRecipes
        ? props.relatedRecipes.split(",").map((s: string) => s.trim())
        : []

    if (relatedList.length === 0) return <div style={props.style} />

    return (
        <section
            style={{
                ...props.style,
                fontFamily: FONTS.body,
                color: COLORS.text,
            }}
        >
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
    )
}

addPropertyControls(RecipeRelated, {
    relatedRecipes: {
        type: ControlType.String,
        title: "Related Recipes",
        displayTextArea: true,
    },
})

// ============================================================
// 10. RECIPE DETAIL CARD
// ============================================================

export function RecipeDetailCard(props: any) {
    const dietTags = props.diet ? props.diet.split(",").map((s: string) => s.trim()) : []
    const categoryTags = props.category ? props.category.split(",").map((s: string) => s.trim()) : []
    const cuisineTags = props.cuisine ? props.cuisine.split(",").map((s: string) => s.trim()) : []

    return (
        <div
            id="recipe-card"
            style={{
                ...props.style,
                border: `3px solid ${COLORS.purple}`,
                borderRadius: "16px",
                overflow: "hidden",
                fontFamily: FONTS.body,
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

            {/* Print Button */}
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

            {/* Ingredients */}
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

            {/* Instructions */}
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
    )
}

addPropertyControls(RecipeDetailCard, {
    title: {
        type: ControlType.String,
        title: "Recipe Title",
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
})

// ============================================================
// 11. SHARE BUTTONS
// ============================================================

export function RecipeShareButtons(props: any) {
    const [copied, setCopied] = React.useState(false)

    const pageUrl =
        props.url ||
        (typeof window !== "undefined" ? window.location.href : "")
    const shareText = props.title || ""
    const encodedUrl = encodeURIComponent(pageUrl)
    const encodedText = encodeURIComponent(shareText)

    const pinterestImageUrl = props.pinterestImage
        ? encodeURIComponent(resolveImageSrc(props.pinterestImage))
        : ""

    const copyLink = () => {
        if (typeof navigator !== "undefined" && navigator.clipboard) {
            navigator.clipboard.writeText(pageUrl)
        }
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const openShare = (url: string) => {
        window.open(url, "_blank", "noopener,noreferrer,width=600,height=500")
    }

    return (
        <div
            style={{
                ...props.style,
                display: "flex",
                gap: "20px",
                flexWrap: "wrap" as const,
                justifyContent: "center",
                fontFamily: FONTS.body,
            }}
        >
            <ShareButton
                icon={copied ? CheckIcon : CopyIcon}
                label={copied ? "Copied!" : "Copy Link"}
                onClick={copyLink}
            />
            <ShareButton
                icon={PinterestIcon}
                label="Pinterest"
                onClick={() =>
                    openShare(
                        `https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedText}${pinterestImageUrl ? `&media=${pinterestImageUrl}` : ""}`
                    )
                }
            />
            <ShareButton
                icon={FacebookIcon}
                label="Facebook"
                onClick={() =>
                    openShare(
                        `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`
                    )
                }
            />
            <ShareButton
                icon={XIcon}
                label="X"
                onClick={() =>
                    openShare(
                        `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`
                    )
                }
            />
            <ShareButton
                icon={WhatsAppIcon}
                label="WhatsApp"
                onClick={() =>
                    openShare(
                        `https://wa.me/?text=${encodedText}%20${encodedUrl}`
                    )
                }
            />
            <ShareButton
                icon={EmailIcon}
                label="Email"
                onClick={() => {
                    window.location.href = `mailto:?subject=${encodedText}&body=Check%20out%20this%20recipe%3A%20${encodedUrl}`
                }}
            />
        </div>
    )
}

addPropertyControls(RecipeShareButtons, {
    title: {
        type: ControlType.String,
        title: "Share Text",
        description: "Recipe title used in share messages",
    },
    url: {
        type: ControlType.String,
        title: "Share URL",
        description: "Defaults to current page URL if empty",
    },
    pinterestImage: {
        type: ControlType.Image,
        title: "Pinterest Image",
        description: "Image shown when pinned on Pinterest",
    },
})
