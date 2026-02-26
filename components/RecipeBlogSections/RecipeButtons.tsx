import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

const COLORS = {
    purple: "#C795F0",
    green: "#7FE3B1",
    text: "#2D2D2D",
}

const FONTS = {
    body: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
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
                minWidth: "180px",
                textAlign: "center" as const,
            }}
        >
            {children}
        </button>
    )
}

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
                justifyContent: "center",
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
