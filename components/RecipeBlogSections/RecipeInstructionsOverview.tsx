import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

const COLORS = {
    purple: "#C795F0",
    text: "#2D2D2D",
}

const FONTS = {
    heading: "'Playfair Display', Georgia, serif",
    body: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
}

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
        if (matches.length === 0) { parts.push(remaining); break }
        matches.sort((a, b) => a.index - b.index)
        const first = matches[0]
        if (first.index > 0) parts.push(remaining.slice(0, first.index))
        if (first.type === "bold") {
            parts.push(<strong key={key++}>{first.match[1]}</strong>)
            remaining = remaining.slice(first.index + first.match[0].length)
        } else if (first.type === "italic") {
            parts.push(<em key={key++}>{first.match[1]}</em>)
            remaining = remaining.slice(first.index + first.match[0].length)
        } else if (first.type === "link") {
            parts.push(<a key={key++} href={first.match[2]} style={{ color: COLORS.purple, textDecoration: "underline" }}>{first.match[1]}</a>)
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
        const trimmed = lines[i].trim()
        if (trimmed === "") { i++; continue }
        if (/^\d+\.\s/.test(trimmed)) {
            const items: string[] = []
            while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) { items.push(lines[i].trim().replace(/^\d+\.\s/, "")); i++ }
            elements.push(<ol key={key++} style={{ paddingLeft: "1.5rem", margin: "0.5rem 0", lineHeight: "1.8", fontFamily: FONTS.body }}>{items.map((item, idx) => <li key={idx} style={{ marginBottom: "0.5rem" }}>{parseInlineMarkdown(item)}</li>)}</ol>)
            continue
        }
        if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
            const items: string[] = []
            while (i < lines.length && (lines[i].trim().startsWith("- ") || lines[i].trim().startsWith("* "))) { items.push(lines[i].trim().replace(/^[-*]\s/, "")); i++ }
            elements.push(<ul key={key++} style={{ paddingLeft: "1.5rem", margin: "0.5rem 0", lineHeight: "1.8", listStyleType: "disc", fontFamily: FONTS.body }}>{items.map((item, idx) => <li key={idx} style={{ marginBottom: "0.4rem" }}>{parseInlineMarkdown(item)}</li>)}</ul>)
            continue
        }
        elements.push(<p key={key++} style={{ margin: "0 0 1rem 0", lineHeight: "1.8", fontFamily: FONTS.body }}>{parseInlineMarkdown(trimmed)}</p>)
        i++
    }
    return <>{elements}</>
}

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
                Instructions
            </h2>
            {renderMarkdown(props.instructionsOverview)}
            {props.instructionsImage && (
                <img
                    src={typeof props.instructionsImage === "string" ? props.instructionsImage : props.instructionsImage.src}
                    alt=""
                    style={{ width: "100%", maxWidth: "700px", height: "auto", borderRadius: "12px", marginTop: "1.5rem", display: "block", marginLeft: "auto", marginRight: "auto" }}
                />
            )}
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
