import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

// ============================================================
// BRAND COLORS & FONTS (inlined - Framer constraint)
// ============================================================

const COLORS = {
    purple: "#C795F0",
    purpleDark: "#A66DD4",
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
// ANIMATED BUTTON (purple → green on hover)
// ============================================================

function AnimatedButton({
    children,
    href,
    onClick,
}: {
    children: React.ReactNode
    href?: string
    onClick?: () => void
}) {
    const [hovered, setHovered] = React.useState(false)
    const style: React.CSSProperties = {
        display: "inline-block",
        backgroundColor: hovered ? COLORS.green : COLORS.purple,
        color: COLORS.text,
        border: "none",
        padding: "12px 28px",
        fontSize: "14px",
        fontWeight: 600,
        fontFamily: FONTS.body,
        cursor: "pointer",
        borderRadius: "999px",
        transition: "background-color 0.3s ease",
        letterSpacing: "0.3px",
        textDecoration: "none",
        textAlign: "center" as const,
    }

    if (href) {
        return (
            <a
                href={href}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={style}
            >
                {children}
            </a>
        )
    }

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={style}
        >
            {children}
        </button>
    )
}

// ============================================================
// LIGHTWEIGHT MARKDOWN PARSER (enhanced for blog posts)
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
            boldMatch
                ? { type: "bold", match: boldMatch, index: boldMatch.index! }
                : null,
            italicMatch
                ? {
                      type: "italic",
                      match: italicMatch,
                      index: italicMatch.index!,
                  }
                : null,
            linkMatch
                ? { type: "link", match: linkMatch, index: linkMatch.index! }
                : null,
        ].filter(Boolean) as {
            type: string
            match: RegExpMatchArray
            index: number
        }[]

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
                <a
                    key={key++}
                    href={first.match[2]}
                    style={{
                        color: COLORS.purple,
                        textDecoration: "underline",
                        fontWeight: 500,
                    }}
                >
                    {first.match[1]}
                </a>
            )
            remaining = remaining.slice(first.index + first.match[0].length)
        }
    }

    return parts
}

function renderMarkdown(
    markdown: string,
    images?: Record<number, string | { src: string } | undefined>
): React.ReactNode {
    if (!markdown) return null

    const lines = markdown.split("\n")
    const elements: React.ReactNode[] = []
    let i = 0
    let key = 0

    while (i < lines.length) {
        const line = lines[i]
        const trimmed = line.trim()

        // Empty line
        if (trimmed === "") {
            i++
            continue
        }

        // Horizontal rule
        if (trimmed === "---" || trimmed === "***" || trimmed === "___") {
            elements.push(
                <hr
                    key={key++}
                    style={{
                        border: "none",
                        borderTop: `1px solid ${COLORS.border}`,
                        margin: "2rem 0",
                    }}
                />
            )
            i++
            continue
        }

        // Image placeholder: [IMAGE:1], [IMAGE:2], etc.
        const imageMatch = trimmed.match(/^\[IMAGE:(\d+)\]$/)
        if (imageMatch && images) {
            const imgNum = parseInt(imageMatch[1])
            const imgSrc = images[imgNum]
            if (imgSrc) {
                const src =
                    typeof imgSrc === "string" ? imgSrc : imgSrc.src
                elements.push(
                    <img
                        key={key++}
                        src={src}
                        alt=""
                        style={{
                            width: "100%",
                            height: "auto",
                            borderRadius: "12px",
                            display: "block",
                            margin: "1rem 0 1.5rem 0",
                        }}
                    />
                )
            }
            i++
            continue
        }

        // H2 heading (## )
        if (trimmed.startsWith("## ")) {
            const headingText = trimmed.slice(3)
            elements.push(
                <h2
                    key={key++}
                    style={{
                        fontFamily: FONTS.heading,
                        fontSize: "1.5rem",
                        fontWeight: 700,
                        color: COLORS.text,
                        marginTop: "2rem",
                        marginBottom: "0.75rem",
                        lineHeight: 1.3,
                    }}
                >
                    {parseInlineMarkdown(headingText)}
                </h2>
            )
            i++
            continue
        }

        // H3 heading (### )
        if (trimmed.startsWith("### ")) {
            const headingText = trimmed.slice(4)
            elements.push(
                <h3
                    key={key++}
                    style={{
                        fontFamily: FONTS.heading,
                        fontSize: "1.2rem",
                        fontWeight: 600,
                        color: COLORS.text,
                        marginTop: "1.5rem",
                        marginBottom: "0.5rem",
                        lineHeight: 1.3,
                    }}
                >
                    {parseInlineMarkdown(headingText)}
                </h3>
            )
            i++
            continue
        }

        // Ordered list
        if (/^\d+\.\s/.test(trimmed)) {
            const items: string[] = []
            while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
                items.push(lines[i].trim().replace(/^\d+\.\s/, ""))
                i++
            }
            elements.push(
                <ol
                    key={key++}
                    style={{
                        paddingLeft: "1.5rem",
                        margin: "0.5rem 0",
                        lineHeight: "1.8",
                        fontFamily: FONTS.body,
                    }}
                >
                    {items.map((item, idx) => (
                        <li key={idx} style={{ marginBottom: "0.5rem" }}>
                            {parseInlineMarkdown(item)}
                        </li>
                    ))}
                </ol>
            )
            continue
        }

        // Unordered list
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
            const items: string[] = []
            while (
                i < lines.length &&
                (lines[i].trim().startsWith("- ") ||
                    lines[i].trim().startsWith("* "))
            ) {
                items.push(lines[i].trim().replace(/^[-*]\s/, ""))
                i++
            }
            elements.push(
                <ul
                    key={key++}
                    style={{
                        paddingLeft: "1.5rem",
                        margin: "0.5rem 0",
                        lineHeight: "1.8",
                        listStyleType: "disc",
                        fontFamily: FONTS.body,
                    }}
                >
                    {items.map((item, idx) => (
                        <li key={idx} style={{ marginBottom: "0.4rem" }}>
                            {parseInlineMarkdown(item)}
                        </li>
                    ))}
                </ul>
            )
            continue
        }

        // Regular paragraph
        elements.push(
            <p
                key={key++}
                style={{
                    margin: "0 0 1rem 0",
                    lineHeight: "1.8",
                    fontFamily: FONTS.body,
                }}
            >
                {parseInlineMarkdown(trimmed)}
            </p>
        )
        i++
    }

    return <>{elements}</>
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export function BlogPostDetail(props: any) {
    // Build image map for [IMAGE:N] placeholders in body
    const imageMap: Record<number, string | { src: string } | undefined> = {}
    for (let n = 1; n <= 10; n++) {
        const key = `recipeImage${n}` as string
        if (props[key]) {
            imageMap[n] = props[key]
        }
    }

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
            <header style={{ marginBottom: "1.5rem", paddingTop: "2rem" }}>
                {/* Category badge */}
                {props.blogCategory && (
                    <div style={{ marginBottom: "0.75rem" }}>
                        <span
                            style={{
                                display: "inline-block",
                                padding: "4px 14px",
                                backgroundColor: COLORS.bgMedium,
                                color: COLORS.purpleDark,
                                fontSize: "12px",
                                fontWeight: 600,
                                borderRadius: "999px",
                                fontFamily: FONTS.body,
                                letterSpacing: "0.5px",
                                textTransform: "uppercase" as const,
                            }}
                        >
                            {props.blogCategory}
                        </span>
                    </div>
                )}

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
                    {props.title || "Blog Post Title"}
                </h1>

                {/* Date + author line */}
                <div
                    style={{
                        fontSize: "13px",
                        color: COLORS.textLight,
                        marginBottom: "1rem",
                        fontFamily: FONTS.body,
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        flexWrap: "wrap" as const,
                    }}
                >
                    {props.publishedDate && (
                        <span>{props.publishedDate}</span>
                    )}
                    {props.publishedDate && (
                        <span style={{ color: COLORS.border }}>|</span>
                    )}
                    <span>By Holistic Bravo</span>
                </div>

                {/* Short description */}
                {props.shortDescription && (
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
                )}
            </header>

            {/* ============ FEATURED IMAGE ============ */}
            {props.featuredImage && (
                <div style={{ marginBottom: "2.5rem" }}>
                    <img
                        src={
                            typeof props.featuredImage === "string"
                                ? props.featuredImage
                                : props.featuredImage.src
                        }
                        alt={props.title || ""}
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
                </section>
            )}

            {/* ============ BODY (listicle content) ============ */}
            {props.body && (
                <section style={{ marginBottom: "2.5rem" }}>
                    <div style={{ fontSize: "16px", color: COLORS.text }}>
                        {renderMarkdown(props.body, imageMap)}
                    </div>
                </section>
            )}

            {/* ============ CONCLUSION ============ */}
            {props.conclusion && (
                <section
                    style={{
                        marginBottom: "2.5rem",
                        paddingTop: "1.5rem",
                        borderTop: `1px solid ${COLORS.border}`,
                    }}
                >
                    <div style={{ fontSize: "16px", color: COLORS.text }}>
                        {renderMarkdown(props.conclusion)}
                    </div>
                </section>
            )}

            {/* ============ SOCIAL CTA ============ */}
            <div
                style={{
                    backgroundColor: COLORS.bgLight,
                    borderRadius: "16px",
                    padding: "2rem",
                    textAlign: "center" as const,
                    marginBottom: "3rem",
                }}
            >
                <h3
                    style={{
                        fontFamily: FONTS.heading,
                        fontSize: "1.3rem",
                        fontWeight: 700,
                        color: COLORS.text,
                        marginTop: 0,
                        marginBottom: "0.5rem",
                    }}
                >
                    Enjoy these recipes?
                </h3>
                <p
                    style={{
                        fontSize: "15px",
                        color: COLORS.textLight,
                        margin: "0 0 1.25rem 0",
                        fontFamily: FONTS.body,
                    }}
                >
                    Follow along for more plant-based recipes, cooking videos,
                    and kitchen inspiration.
                </p>
                <div
                    style={{
                        display: "flex",
                        gap: "12px",
                        justifyContent: "center",
                        flexWrap: "wrap" as const,
                    }}
                >
                    <AnimatedButton href="https://instagram.com/holisticbravo">
                        Follow on Instagram
                    </AnimatedButton>
                    <AnimatedButton href="https://youtube.com/@holisticbravo">
                        Watch on YouTube
                    </AnimatedButton>
                </div>
            </div>
        </div>
    )
}

// ============================================================
// PROPERTY CONTROLS (for Framer CMS binding)
// ============================================================

addPropertyControls(BlogPostDetail, {
    // Core fields
    title: {
        type: ControlType.String,
        title: "Title",
    },
    publishedDate: {
        type: ControlType.String,
        title: "Published Date",
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
    blogCategory: {
        type: ControlType.String,
        title: "Blog Category",
    },

    // Content fields
    introduction: {
        type: ControlType.String,
        title: "Introduction",
        displayTextArea: true,
    },
    body: {
        type: ControlType.String,
        title: "Body",
        displayTextArea: true,
    },
    conclusion: {
        type: ControlType.String,
        title: "Conclusion",
        displayTextArea: true,
    },

    // Recipe images (up to 10, for [IMAGE:1] through [IMAGE:10] in body)
    recipeImage1: {
        type: ControlType.Image,
        title: "Recipe Image 1",
    },
    recipeImage2: {
        type: ControlType.Image,
        title: "Recipe Image 2",
    },
    recipeImage3: {
        type: ControlType.Image,
        title: "Recipe Image 3",
    },
    recipeImage4: {
        type: ControlType.Image,
        title: "Recipe Image 4",
    },
    recipeImage5: {
        type: ControlType.Image,
        title: "Recipe Image 5",
    },
    recipeImage6: {
        type: ControlType.Image,
        title: "Recipe Image 6",
    },
    recipeImage7: {
        type: ControlType.Image,
        title: "Recipe Image 7",
    },
    recipeImage8: {
        type: ControlType.Image,
        title: "Recipe Image 8",
    },
    recipeImage9: {
        type: ControlType.Image,
        title: "Recipe Image 9",
    },
    recipeImage10: {
        type: ControlType.Image,
        title: "Recipe Image 10",
    },
})
