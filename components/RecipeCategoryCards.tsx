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
// SVG ICONS (inline, matching the soft green style)
// ============================================================

function LeafIcon() {
    return (
        <svg width="56" height="56" viewBox="0 0 40 40" fill="none">
            <path
                d="M20 6C12 6 6 12 6 20c0 5 2.5 9 6 12"
                stroke={COLORS.green}
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
            />
            <path
                d="M12 32C15 28 20 20 34 8c0 0-2 14-10 20-4 3-8 4-12 4z"
                fill={`${COLORS.green}30`}
                stroke={COLORS.green}
                strokeWidth="2"
                strokeLinejoin="round"
            />
            <path
                d="M20 22c4-4 8-8 14-14"
                stroke={COLORS.green}
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.6"
            />
        </svg>
    )
}

function BoltIcon() {
    return (
        <svg width="56" height="56" viewBox="0 0 40 40" fill="none">
            <path
                d="M22 6L10 22h8l-2 12 14-18h-9l3-10z"
                fill={`${COLORS.green}30`}
                stroke={COLORS.green}
                strokeWidth="2.5"
                strokeLinejoin="round"
                strokeLinecap="round"
            />
        </svg>
    )
}

function FlexIcon() {
    return (
        <svg width="56" height="56" viewBox="0 0 40 40" fill="none">
            <circle
                cx="20"
                cy="22"
                r="10"
                fill={`${COLORS.green}30`}
                stroke={COLORS.green}
                strokeWidth="2.5"
            />
            <path
                d="M15 20c2-3 4-4 5-4s3 1 5 4"
                stroke={COLORS.green}
                strokeWidth="2"
                strokeLinecap="round"
            />
            <path
                d="M16 10c-2-3-1-5 0-6M24 10c2-3 1-5 0-6"
                stroke={COLORS.green}
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    )
}

function PotIcon() {
    return (
        <svg width="56" height="56" viewBox="0 0 40 40" fill="none">
            <rect
                x="8"
                y="14"
                width="24"
                height="16"
                rx="3"
                fill={`${COLORS.green}30`}
                stroke={COLORS.green}
                strokeWidth="2.5"
            />
            <path
                d="M6 18h28"
                stroke={COLORS.green}
                strokeWidth="2.5"
                strokeLinecap="round"
            />
            <path
                d="M16 14v-4h8v4"
                stroke={COLORS.green}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
            />
            <line
                x1="14"
                y1="22"
                x2="14"
                y2="26"
                stroke={COLORS.green}
                strokeWidth="2"
                strokeLinecap="round"
            />
            <line
                x1="20"
                y1="22"
                x2="20"
                y2="26"
                stroke={COLORS.green}
                strokeWidth="2"
                strokeLinecap="round"
            />
            <line
                x1="26"
                y1="22"
                x2="26"
                y2="26"
                stroke={COLORS.green}
                strokeWidth="2"
                strokeLinecap="round"
            />
        </svg>
    )
}

const ICONS: Record<string, () => JSX.Element> = {
    leaf: LeafIcon,
    bolt: BoltIcon,
    flex: FlexIcon,
    pot: PotIcon,
}

// ============================================================
// CATEGORY CARD
// ============================================================

function CategoryCard({
    icon,
    title,
    description,
    recipesPageUrl,
    filterParam,
    filterValue,
}: {
    icon: string
    title: string
    description: string
    recipesPageUrl: string
    filterParam: string
    filterValue: string
}) {
    const [hovered, setHovered] = React.useState(false)

    const IconComponent = ICONS[icon] || LeafIcon

    const separator = recipesPageUrl.includes("?") ? "&" : "?"
    const href = `${recipesPageUrl}${separator}${filterParam}=${encodeURIComponent(filterValue)}`

    return (
        <a
            href={href}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                flex: "0 1 280px",
                maxWidth: "300px",
                padding: "2.5rem 2rem",
                borderRadius: "16px",
                border: `1px solid ${hovered ? COLORS.purple : COLORS.border}`,
                backgroundColor: hovered ? COLORS.bgLight : COLORS.white,
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "flex",
                flexDirection: "column" as const,
                alignItems: "center",
                textAlign: "center" as const,
                gap: "1rem",
                boxShadow: hovered
                    ? `0 4px 20px ${COLORS.purple}20`
                    : "none",
                textDecoration: "none",
                color: "inherit",
            }}
        >
            <div style={{ marginBottom: "0.5rem" }}>
                <IconComponent />
            </div>

            <h3
                style={{
                    fontFamily: FONTS.heading,
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: COLORS.text,
                    margin: 0,
                }}
            >
                {title}
            </h3>

            <p
                style={{
                    fontFamily: FONTS.body,
                    fontSize: "16px",
                    color: COLORS.textLight,
                    lineHeight: 1.7,
                    margin: 0,
                    flex: 1,
                }}
            >
                {description}
            </p>

            <span
                style={{
                    fontFamily: FONTS.body,
                    fontSize: "16px",
                    fontWeight: 600,
                    color: hovered ? COLORS.green : COLORS.purple,
                    transition: "color 0.3s ease",
                    marginTop: "0.75rem",
                }}
            >
                See Recipes →
            </span>
        </a>
    )
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export function RecipeCategoryCards(props: any) {
    const cards = [
        {
            icon: props.card1Icon,
            title: props.card1Title,
            description: props.card1Description,
            filterParam: props.card1FilterParam,
            filterValue: props.card1FilterValue,
        },
        {
            icon: props.card2Icon,
            title: props.card2Title,
            description: props.card2Description,
            filterParam: props.card2FilterParam,
            filterValue: props.card2FilterValue,
        },
        {
            icon: props.card3Icon,
            title: props.card3Title,
            description: props.card3Description,
            filterParam: props.card3FilterParam,
            filterValue: props.card3FilterValue,
        },
        {
            icon: props.card4Icon,
            title: props.card4Title,
            description: props.card4Description,
            filterParam: props.card4FilterParam,
            filterValue: props.card4FilterValue,
        },
    ]

    // Filter out cards with no title (allows hiding cards)
    const visibleCards = cards.filter((c) => c.title)

    return (
        <div
            style={{
                ...props.style,
                fontFamily: FONTS.body,
                maxWidth: "1280px",
                margin: "0 auto",
                padding: "4rem 2rem",
            }}
        >
            <h2
                style={{
                    fontFamily: FONTS.heading,
                    fontSize: "2.8rem",
                    fontWeight: 700,
                    color: COLORS.text,
                    textAlign: "center" as const,
                    marginBottom: "3rem",
                    marginTop: 0,
                }}
            >
                {props.heading}
            </h2>

            <div
                style={{
                    display: "flex",
                    gap: "1.25rem",
                    flexWrap: "wrap" as const,
                    justifyContent: "center",
                }}
            >
                {visibleCards.map((card, idx) => (
                    <CategoryCard
                        key={idx}
                        icon={card.icon}
                        title={card.title}
                        description={card.description}
                        recipesPageUrl={props.recipesPageUrl}
                        filterParam={card.filterParam}
                        filterValue={card.filterValue}
                    />
                ))}
            </div>
        </div>
    )
}

// ============================================================
// DEFAULT PROPS
// ============================================================

RecipeCategoryCards.defaultProps = {
    heading: "Browse Our Most Popular Recipe Categories",
    recipesPageUrl: "/recipe",

    card1Icon: "leaf",
    card1Title: "Breakfast",
    card1Description:
        "Start your morning right with high-protein, filling breakfasts that keep you energized for hours.",
    card1FilterParam: "category",
    card1FilterValue: "Breakfast",

    card2Icon: "bolt",
    card2Title: "Quick Meals",
    card2Description:
        "Short on time? These recipes come together in 30 minutes or less without sacrificing flavor.",
    card2FilterParam: "category",
    card2FilterValue: "Quick Meals",

    card3Icon: "flex",
    card3Title: "High Protein",
    card3Description:
        "Fuel your body with plant-powered protein. Every recipe packs serious protein to support your goals.",
    card3FilterParam: "diet",
    card3FilterValue: "High-Protein",

    card4Icon: "pot",
    card4Title: "Pasta",
    card4Description:
        "Handmade pasta, cozy noodles, and creative twists on Italian classics — all made from scratch.",
    card4FilterParam: "category",
    card4FilterValue: "Pasta",
}

// ============================================================
// PROPERTY CONTROLS
// ============================================================

addPropertyControls(RecipeCategoryCards, {
    heading: {
        type: ControlType.String,
        title: "Heading",
        defaultValue: RecipeCategoryCards.defaultProps.heading,
    },
    recipesPageUrl: {
        type: ControlType.String,
        title: "Recipes Page URL",
        defaultValue: RecipeCategoryCards.defaultProps.recipesPageUrl,
    },

    // --- Card 1 ---
    card1Icon: {
        type: ControlType.Enum,
        title: "Card 1 Icon",
        options: ["leaf", "bolt", "flex", "pot"],
        optionTitles: ["Leaf", "Lightning", "Protein", "Pot"],
        defaultValue: "leaf",
    },
    card1Title: {
        type: ControlType.String,
        title: "Card 1 Title",
        defaultValue: RecipeCategoryCards.defaultProps.card1Title,
    },
    card1Description: {
        type: ControlType.String,
        title: "Card 1 Description",
        displayTextArea: true,
        defaultValue: RecipeCategoryCards.defaultProps.card1Description,
    },
    card1FilterParam: {
        type: ControlType.Enum,
        title: "Card 1 Filter Type",
        options: ["category", "diet", "cuisine"],
        optionTitles: ["Category", "Diet", "Cuisine"],
        defaultValue: "category",
    },
    card1FilterValue: {
        type: ControlType.String,
        title: "Card 1 Filter Value",
        defaultValue: RecipeCategoryCards.defaultProps.card1FilterValue,
    },

    // --- Card 2 ---
    card2Icon: {
        type: ControlType.Enum,
        title: "Card 2 Icon",
        options: ["leaf", "bolt", "flex", "pot"],
        optionTitles: ["Leaf", "Lightning", "Protein", "Pot"],
        defaultValue: "bolt",
    },
    card2Title: {
        type: ControlType.String,
        title: "Card 2 Title",
        defaultValue: RecipeCategoryCards.defaultProps.card2Title,
    },
    card2Description: {
        type: ControlType.String,
        title: "Card 2 Description",
        displayTextArea: true,
        defaultValue: RecipeCategoryCards.defaultProps.card2Description,
    },
    card2FilterParam: {
        type: ControlType.Enum,
        title: "Card 2 Filter Type",
        options: ["category", "diet", "cuisine"],
        optionTitles: ["Category", "Diet", "Cuisine"],
        defaultValue: "category",
    },
    card2FilterValue: {
        type: ControlType.String,
        title: "Card 2 Filter Value",
        defaultValue: RecipeCategoryCards.defaultProps.card2FilterValue,
    },

    // --- Card 3 ---
    card3Icon: {
        type: ControlType.Enum,
        title: "Card 3 Icon",
        options: ["leaf", "bolt", "flex", "pot"],
        optionTitles: ["Leaf", "Lightning", "Protein", "Pot"],
        defaultValue: "flex",
    },
    card3Title: {
        type: ControlType.String,
        title: "Card 3 Title",
        defaultValue: RecipeCategoryCards.defaultProps.card3Title,
    },
    card3Description: {
        type: ControlType.String,
        title: "Card 3 Description",
        displayTextArea: true,
        defaultValue: RecipeCategoryCards.defaultProps.card3Description,
    },
    card3FilterParam: {
        type: ControlType.Enum,
        title: "Card 3 Filter Type",
        options: ["category", "diet", "cuisine"],
        optionTitles: ["Category", "Diet", "Cuisine"],
        defaultValue: "diet",
    },
    card3FilterValue: {
        type: ControlType.String,
        title: "Card 3 Filter Value",
        defaultValue: RecipeCategoryCards.defaultProps.card3FilterValue,
    },

    // --- Card 4 ---
    card4Icon: {
        type: ControlType.Enum,
        title: "Card 4 Icon",
        options: ["leaf", "bolt", "flex", "pot"],
        optionTitles: ["Leaf", "Lightning", "Protein", "Pot"],
        defaultValue: "pot",
    },
    card4Title: {
        type: ControlType.String,
        title: "Card 4 Title",
        defaultValue: RecipeCategoryCards.defaultProps.card4Title,
    },
    card4Description: {
        type: ControlType.String,
        title: "Card 4 Description",
        displayTextArea: true,
        defaultValue: RecipeCategoryCards.defaultProps.card4Description,
    },
    card4FilterParam: {
        type: ControlType.Enum,
        title: "Card 4 Filter Type",
        options: ["category", "diet", "cuisine"],
        optionTitles: ["Category", "Diet", "Cuisine"],
        defaultValue: "category",
    },
    card4FilterValue: {
        type: ControlType.String,
        title: "Card 4 Filter Value",
        defaultValue: RecipeCategoryCards.defaultProps.card4FilterValue,
    },
})
