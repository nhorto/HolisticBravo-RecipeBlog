import * as React from "react"

// ============================================================
// BRAND COLORS & FONTS
// ============================================================

export const COLORS = {
    purple: "#C795F0",
    green: "#7FE3B1",
    bgLight: "#F7F7FB",
    bgMedium: "#EEF0F5",
    text: "#2D2D2D",
    textLight: "#666666",
    white: "#ffffff",
    border: "#E0E0E0",
}

export const FONTS = {
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

export function renderMarkdown(markdown: string): React.ReactNode {
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

export function AnimatedButton({
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

export function SectionHeading({ children }: { children: React.ReactNode }) {
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

export function TimeBlock({ label, value }: { label: string; value: string }) {
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

export function TagPill({ label }: { label: string }) {
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

export function resolveImageSrc(image: any): string {
    return typeof image === "string" ? image : image.src
}
