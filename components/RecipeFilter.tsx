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
// FILTER STATE TYPE
// ============================================================

interface FilterState {
    diet: string | null
    category: string | null
    cuisine: string | null
    sort: "newest" | "oldest"
}

// ============================================================
// CHEVRON ICON
// ============================================================

function ChevronIcon({ open }: { open: boolean }) {
    return (
        <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            style={{
                transition: "transform 0.2s ease",
                transform: open ? "rotate(180deg)" : "rotate(0deg)",
            }}
        >
            <path
                d="M2.5 4.5L6 8L9.5 4.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    )
}

// ============================================================
// FILTER DROPDOWN
// ============================================================

function FilterDropdown({
    label,
    options,
    value,
    onChange,
    fullWidth,
}: {
    label: string
    options: string[]
    value: string | null
    onChange: (value: string | null) => void
    fullWidth?: boolean
}) {
    const [open, setOpen] = React.useState(false)
    const containerRef = React.useRef<HTMLDivElement>(null)

    // Close on outside click
    React.useEffect(() => {
        if (!open) return
        const handleClick = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setOpen(false)
            }
        }
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false)
        }
        document.addEventListener("mousedown", handleClick)
        document.addEventListener("keydown", handleEscape)
        return () => {
            document.removeEventListener("mousedown", handleClick)
            document.removeEventListener("keydown", handleEscape)
        }
    }, [open])

    const isActive = value !== null
    const displayText = value || label

    return (
        <div ref={containerRef} style={{ position: "relative" as const, width: fullWidth ? "100%" : "auto" }}>
            <button
                onClick={() => setOpen(!open)}
                style={{
                    fontFamily: FONTS.body,
                    fontSize: "14px",
                    fontWeight: 500,
                    padding: "10px 18px",
                    borderRadius: "999px",
                    border: `1.5px solid ${isActive ? COLORS.purple : COLORS.border}`,
                    backgroundColor: isActive
                        ? `${COLORS.purple}12`
                        : COLORS.white,
                    color: isActive ? COLORS.purple : COLORS.text,
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: fullWidth ? "center" : "flex-start",
                    gap: "8px",
                    whiteSpace: "nowrap" as const,
                    outline: "none",
                    width: fullWidth ? "100%" : "auto",
                }}
            >
                {displayText}
                <ChevronIcon open={open} />
            </button>

            {open && (
                <div
                    style={{
                        position: "absolute" as const,
                        top: "calc(100% + 6px)",
                        left: 0,
                        minWidth: "200px",
                        maxHeight: "280px",
                        overflowY: "auto" as const,
                        backgroundColor: COLORS.white,
                        borderRadius: "12px",
                        boxShadow: "0 8px 30px rgba(0, 0, 0, 0.12)",
                        border: `1px solid ${COLORS.border}`,
                        zIndex: 99999,
                        padding: "4px",
                    }}
                >
                    {/* "All" option */}
                    <DropdownOption
                        label={label}
                        isSelected={value === null}
                        onClick={() => {
                            onChange(null)
                            setOpen(false)
                        }}
                    />

                    {/* Divider */}
                    <div
                        style={{
                            height: "1px",
                            backgroundColor: COLORS.bgMedium,
                            margin: "4px 8px",
                        }}
                    />

                    {/* Options */}
                    {options.map((opt) => (
                        <DropdownOption
                            key={opt}
                            label={opt}
                            isSelected={value === opt}
                            onClick={() => {
                                onChange(opt)
                                setOpen(false)
                            }}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

// ============================================================
// DROPDOWN OPTION
// ============================================================

function DropdownOption({
    label,
    isSelected,
    onClick,
}: {
    label: string
    isSelected: boolean
    onClick: () => void
}) {
    const [hovered, setHovered] = React.useState(false)

    return (
        <div
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                padding: "8px 14px",
                fontSize: "14px",
                fontFamily: FONTS.body,
                fontWeight: isSelected ? 600 : 400,
                color: isSelected ? COLORS.purple : COLORS.text,
                backgroundColor: isSelected
                    ? `${COLORS.purple}10`
                    : hovered
                      ? COLORS.bgLight
                      : "transparent",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "all 0.15s ease",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
            }}
        >
            {label}
            {isSelected && (
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                        d="M3 7.5L5.5 10L11 4"
                        stroke={COLORS.purple}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )}
        </div>
    )
}

// ============================================================
// ACTIVE FILTER PILL
// ============================================================

function FilterPill({
    label,
    onRemove,
}: {
    label: string
    onRemove: () => void
}) {
    const [hovered, setHovered] = React.useState(false)

    return (
        <span
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={onRemove}
            style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                borderRadius: "999px",
                fontSize: "13px",
                fontWeight: 500,
                fontFamily: FONTS.body,
                backgroundColor: `${COLORS.purple}15`,
                color: COLORS.purple,
                cursor: "pointer",
                transition: "all 0.2s ease",
                border: `1px solid ${hovered ? COLORS.purple : "transparent"}`,
            }}
        >
            {label}
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path
                    d="M2 2L8 8M8 2L2 8"
                    stroke={COLORS.purple}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
            </svg>
        </span>
    )
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export function RecipeFilter(props: any) {
    const [diet, setDiet] = React.useState<string | null>(null)
    const [category, setCategory] = React.useState<string | null>(null)
    const [cuisine, setCuisine] = React.useState<string | null>(null)
    const [sort, setSort] = React.useState<"newest" | "oldest">("newest")
    const [visibleCount, setVisibleCount] = React.useState<number>(-1)
    const [isMobile, setIsMobile] = React.useState(false)

    // Detect mobile viewport
    React.useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 640)
        check()
        window.addEventListener("resize", check)
        return () => window.removeEventListener("resize", check)
    }, [])

    // Parse comma-separated option strings
    const dietOptions = props.dietOptions
        .split(",")
        .map((s: string) => s.trim())
        .filter(Boolean)
    const categoryOptions = props.categoryOptions
        .split(",")
        .map((s: string) => s.trim())
        .filter(Boolean)
    const cuisineOptions = props.cuisineOptions
        .split(",")
        .map((s: string) => s.trim())
        .filter(Boolean)

    // Read URL query params on mount
    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search)
        const urlDiet = params.get("diet")
        const urlCategory = params.get("category")
        const urlCuisine = params.get("cuisine")
        if (urlDiet) setDiet(urlDiet)
        if (urlCategory) setCategory(urlCategory)
        if (urlCuisine) setCuisine(urlCuisine)
    }, [])

    // Dispatch filter event when state changes
    React.useEffect(() => {
        const state: FilterState = { diet, category, cuisine, sort }
        ;(window as any).__recipeFilters = state
        window.dispatchEvent(
            new CustomEvent("recipeFilterChange", { detail: state })
        )

        // Count visible cards after cards have processed the event
        const timer = setTimeout(() => {
            const cards = document.querySelectorAll("[data-recipe-card]")
            if (cards.length === 0) {
                setVisibleCount(-1)
                return
            }
            const visible = Array.from(cards).filter(
                (c) => c.getAttribute("data-visible") === "true"
            )
            setVisibleCount(visible.length)
        }, 100)

        return () => clearTimeout(timer)
    }, [diet, category, cuisine, sort])

    const hasActiveFilters = diet !== null || category !== null || cuisine !== null

    const clearAll = () => {
        setDiet(null)
        setCategory(null)
        setCuisine(null)
    }

    // Sort dropdown display
    const sortLabel = sort === "newest" ? "Newest First" : "Oldest First"

    return (
        <div
            style={{
                ...props.style,
                fontFamily: FONTS.body,
                maxWidth: "1280px",
                margin: "0 auto",
                padding: "0 1rem",
            }}
        >
            {/* Filter bar */}
            {isMobile ? (
                /* ---- MOBILE: 2-column grid ---- */
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "8px",
                    }}
                >
                    <FilterDropdown
                        label="All Diets"
                        options={dietOptions}
                        value={diet}
                        onChange={setDiet}
                        fullWidth
                    />
                    <FilterDropdown
                        label="All Categories"
                        options={categoryOptions}
                        value={category}
                        onChange={setCategory}
                        fullWidth
                    />
                    <FilterDropdown
                        label="All Cuisines"
                        options={cuisineOptions}
                        value={cuisine}
                        onChange={setCuisine}
                        fullWidth
                    />
                    <FilterDropdown
                        label="Newest First"
                        options={["Newest First", "Oldest First"]}
                        value={sortLabel}
                        onChange={(val) => {
                            if (val === "Oldest First") setSort("oldest")
                            else setSort("newest")
                        }}
                        fullWidth
                    />
                </div>
            ) : (
                /* ---- DESKTOP: horizontal row ---- */
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        flexWrap: "wrap" as const,
                    }}
                >
                    {/* Filter icon + label */}
                    <span
                        style={{
                            fontSize: "14px",
                            fontWeight: 600,
                            color: COLORS.textLight,
                            fontFamily: FONTS.body,
                            marginRight: "4px",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                        }}
                    >
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                        >
                            <path
                                d="M2 4h12M4 8h8M6 12h4"
                                stroke={COLORS.textLight}
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                        </svg>
                        Filter
                    </span>

                    <FilterDropdown
                        label="All Diets"
                        options={dietOptions}
                        value={diet}
                        onChange={setDiet}
                    />
                    <FilterDropdown
                        label="All Categories"
                        options={categoryOptions}
                        value={category}
                        onChange={setCategory}
                    />
                    <FilterDropdown
                        label="All Cuisines"
                        options={cuisineOptions}
                        value={cuisine}
                        onChange={setCuisine}
                    />

                    {/* Spacer */}
                    <div style={{ flex: 1, minWidth: "20px" }} />

                    {/* Sort dropdown */}
                    <FilterDropdown
                        label="Newest First"
                        options={["Newest First", "Oldest First"]}
                        value={sortLabel}
                        onChange={(val) => {
                            if (val === "Oldest First") setSort("oldest")
                            else setSort("newest")
                        }}
                    />
                </div>
            )}

            {/* Active filters + results count row */}
            {(hasActiveFilters || visibleCount >= 0) && (
                <div
                    style={{
                        display: "flex",
                        alignItems: isMobile ? "flex-start" : "center",
                        justifyContent: "space-between",
                        flexDirection: isMobile ? "column" as const : "row" as const,
                        gap: "10px",
                        marginTop: "16px",
                        paddingTop: "16px",
                        borderTop: `1px solid ${COLORS.bgMedium}`,
                    }}
                >
                    {/* Active filter pills */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            flexWrap: "wrap" as const,
                        }}
                    >
                        {diet && (
                            <FilterPill
                                label={diet}
                                onRemove={() => setDiet(null)}
                            />
                        )}
                        {category && (
                            <FilterPill
                                label={category}
                                onRemove={() => setCategory(null)}
                            />
                        )}
                        {cuisine && (
                            <FilterPill
                                label={cuisine}
                                onRemove={() => setCuisine(null)}
                            />
                        )}
                        {hasActiveFilters && (
                            <button
                                onClick={clearAll}
                                style={{
                                    background: "none",
                                    border: "none",
                                    color: COLORS.textLight,
                                    fontSize: "13px",
                                    fontFamily: FONTS.body,
                                    fontWeight: 500,
                                    cursor: "pointer",
                                    padding: "4px 8px",
                                    textDecoration: "underline",
                                }}
                            >
                                Clear All
                            </button>
                        )}
                    </div>

                    {/* Results count */}
                    {props.showResultsCount && visibleCount >= 0 && (
                        <span
                            style={{
                                fontSize: "13px",
                                color: COLORS.textLight,
                                fontFamily: FONTS.body,
                            }}
                        >
                            {visibleCount === 0
                                ? "No recipes found"
                                : `Showing ${visibleCount} recipe${visibleCount !== 1 ? "s" : ""}`}
                        </span>
                    )}
                </div>
            )}

            {/* No results message */}
            {visibleCount === 0 && (
                <div
                    style={{
                        textAlign: "center" as const,
                        padding: "3rem 1rem",
                        marginTop: "1rem",
                    }}
                >
                    <p
                        style={{
                            fontFamily: FONTS.body,
                            fontSize: "16px",
                            color: COLORS.textLight,
                            margin: 0,
                        }}
                    >
                        No recipes match your current filters.
                    </p>
                    <button
                        onClick={clearAll}
                        style={{
                            marginTop: "12px",
                            fontFamily: FONTS.body,
                            fontSize: "14px",
                            fontWeight: 600,
                            color: COLORS.white,
                            backgroundColor: COLORS.purple,
                            border: "none",
                            borderRadius: "999px",
                            padding: "10px 24px",
                            cursor: "pointer",
                            transition: "background-color 0.3s ease",
                        }}
                        onMouseEnter={(e) =>
                            (e.currentTarget.style.backgroundColor =
                                COLORS.green)
                        }
                        onMouseLeave={(e) =>
                            (e.currentTarget.style.backgroundColor =
                                COLORS.purple)
                        }
                    >
                        Clear Filters
                    </button>
                </div>
            )}
        </div>
    )
}

// ============================================================
// DEFAULT PROPS
// ============================================================

RecipeFilter.defaultProps = {
    dietOptions:
        "Vegetarian, Vegan, Plant-Based, High-Protein, Gluten-Free, Paleo, Grain-Free, Raw Vegan, Whole Food, Keto",
    categoryOptions:
        "Breakfast, Lunch, Dinner, Dessert, Snack, Side Dish, Appetizer, Beverage, Salad, Quick & Easy, No Bake, Post-workout, Pre-workout",
    cuisineOptions:
        "American, Italian, Asian, Mediterranean, Latin American, Fusion, Chinese, Mexican",
    showResultsCount: true,
}

// ============================================================
// PROPERTY CONTROLS
// ============================================================

addPropertyControls(RecipeFilter, {
    dietOptions: {
        type: ControlType.String,
        title: "Diet Options",
        displayTextArea: true,
        defaultValue: RecipeFilter.defaultProps.dietOptions,
    },
    categoryOptions: {
        type: ControlType.String,
        title: "Category Options",
        displayTextArea: true,
        defaultValue: RecipeFilter.defaultProps.categoryOptions,
    },
    cuisineOptions: {
        type: ControlType.String,
        title: "Cuisine Options",
        displayTextArea: true,
        defaultValue: RecipeFilter.defaultProps.cuisineOptions,
    },
    showResultsCount: {
        type: ControlType.Boolean,
        title: "Show Results Count",
        defaultValue: true,
    },
})
