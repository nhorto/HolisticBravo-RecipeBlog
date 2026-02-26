import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

const COLORS = {
    purple: "#C795F0",
    text: "#2D2D2D",
    textLight: "#666666",
    bgMedium: "#EEF0F5",
    white: "#ffffff",
}

const FONTS = {
    body: "'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif",
}

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
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" stroke={COLORS.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" stroke={COLORS.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
)

const CheckIcon = (
    <path d="M20 6L9 17l-5-5" stroke={COLORS.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
)

const PinterestIcon = (
    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.425 1.808-2.425.853 0 1.264.64 1.264 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.806 1.48 1.806 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.176-4.068-2.845 0-4.515 2.134-4.515 4.34 0 .859.331 1.781.745 2.282a.3.3 0 0 1 .069.288l-.278 1.133c-.044.183-.145.222-.335.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.965-.527-2.291-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z" fill={COLORS.text} />
)

const FacebookIcon = (
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3V2z" fill={COLORS.text} />
)

const XIcon = (
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" fill={COLORS.text} />
)

const WhatsAppIcon = (
    <>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" fill={COLORS.text} />
        <path d="M12 2C6.477 2 2 6.477 2 12c0 1.89.525 3.66 1.438 5.168L2 22l4.832-1.438A9.955 9.955 0 0 0 12 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18a8 8 0 0 1-4.076-1.112l-.292-.174-3.024.793.808-2.95-.19-.302A7.96 7.96 0 0 1 4 12a8 8 0 1 1 16 0 8 8 0 0 1-8 8z" fill={COLORS.text} />
    </>
)

const EmailIcon = (
    <>
        <rect x="2" y="4" width="20" height="16" rx="2" stroke={COLORS.text} strokeWidth="2" fill="none" />
        <path d="M22 7l-10 7L2 7" stroke={COLORS.text} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </>
)

export function RecipeShareButtons(props: any) {
    const [copied, setCopied] = React.useState(false)

    const pageUrl =
        props.url ||
        (typeof window !== "undefined" ? window.location.href : "")
    const shareText = props.title || ""
    const encodedUrl = encodeURIComponent(pageUrl)
    const encodedText = encodeURIComponent(shareText)

    const pinterestImageUrl = props.pinterestImage
        ? encodeURIComponent(
              typeof props.pinterestImage === "string"
                  ? props.pinterestImage
                  : props.pinterestImage.src
          )
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
