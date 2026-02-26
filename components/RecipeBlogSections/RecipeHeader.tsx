import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

const COLORS = {
    purple: "#C795F0",
    green: "#7FE3B1",
    text: "#2D2D2D",
    textLight: "#666666",
}

const FONTS = {
    heading: "'Playfair Display', Georgia, serif",
    body: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
}

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
