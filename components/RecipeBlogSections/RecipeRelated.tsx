import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

const COLORS = {
    purple: "#C795F0",
    text: "#2D2D2D",
    textLight: "#666666",
}

const FONTS = {
    heading: "'Playfair Display', Georgia, serif",
    body: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
}

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
                You Might Also Like
            </h2>
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
