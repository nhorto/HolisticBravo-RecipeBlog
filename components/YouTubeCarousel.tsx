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
// YOUTUBE HELPERS
// ============================================================

function getYouTubeId(url: string): string | null {
    if (!url) return null
    const patterns = [
        /(?:youtube\.com\/watch\?v=)([^&\s]+)/,
        /(?:youtu\.be\/)([^?\s]+)/,
        /(?:youtube\.com\/embed\/)([^?\s]+)/,
        /(?:youtube\.com\/shorts\/)([^?\s]+)/,
    ]
    for (const pattern of patterns) {
        const match = url.match(pattern)
        if (match) return match[1]
    }
    return null
}

function getThumbnailUrl(videoId: string): string {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
}

function getEmbedUrl(videoId: string): string {
    return `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`
}

// ============================================================
// PLAY BUTTON SVG
// ============================================================

function PlayButton() {
    return (
        <div
            style={{
                position: "absolute" as const,
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.3s ease",
            }}
        >
            <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill={COLORS.white}
            >
                <path d="M8 5v14l11-7z" />
            </svg>
        </div>
    )
}

// ============================================================
// ARROW BUTTON
// ============================================================

function ArrowButton({
    direction,
    onClick,
    disabled,
}: {
    direction: "left" | "right"
    onClick: () => void
    disabled: boolean
}) {
    const [hovered, setHovered] = React.useState(false)

    return (
        <button
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            disabled={disabled}
            style={{
                width: "44px",
                height: "44px",
                borderRadius: "50%",
                border: `1.5px solid ${disabled ? COLORS.bgMedium : hovered ? COLORS.purple : COLORS.border}`,
                backgroundColor: disabled
                    ? COLORS.bgLight
                    : hovered
                      ? `${COLORS.purple}12`
                      : COLORS.white,
                cursor: disabled ? "default" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s ease",
                opacity: disabled ? 0.4 : 1,
                outline: "none",
                flexShrink: 0,
            }}
        >
            <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                style={{
                    transform:
                        direction === "left"
                            ? "rotate(180deg)"
                            : "none",
                }}
            >
                <path
                    d="M7 4l5 5-5 5"
                    stroke={
                        disabled
                            ? COLORS.textLight
                            : hovered
                              ? COLORS.purple
                              : COLORS.text
                    }
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </button>
    )
}

// ============================================================
// VIDEO CARD
// ============================================================

function VideoCard({
    url,
    title,
}: {
    url: string
    title: string
}) {
    const [playing, setPlaying] = React.useState(false)
    const [hovered, setHovered] = React.useState(false)
    const videoId = getYouTubeId(url)

    if (!videoId) {
        return (
            <div
                style={{
                    width: "100%",
                    aspectRatio: "16 / 9",
                    backgroundColor: COLORS.bgMedium,
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: COLORS.textLight,
                    fontSize: "14px",
                    fontFamily: FONTS.body,
                }}
            >
                Invalid YouTube URL
            </div>
        )
    }

    return (
        <div style={{ width: "100%" }}>
            {/* Video / Thumbnail */}
            <div
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => !playing && setPlaying(true)}
                style={{
                    width: "100%",
                    aspectRatio: "16 / 9",
                    borderRadius: "12px",
                    overflow: "hidden",
                    position: "relative" as const,
                    cursor: playing ? "default" : "pointer",
                    boxShadow: hovered && !playing
                        ? `0 6px 20px rgba(199, 149, 240, 0.2)`
                        : `0 2px 8px rgba(0, 0, 0, 0.08)`,
                    transition: "box-shadow 0.3s ease",
                }}
            >
                {playing ? (
                    <iframe
                        src={getEmbedUrl(videoId)}
                        style={{
                            width: "100%",
                            height: "100%",
                            border: "none",
                        }}
                        allow="autoplay; encrypted-media"
                        allowFullScreen
                    />
                ) : (
                    <>
                        <img
                            src={getThumbnailUrl(videoId)}
                            alt={title || "YouTube video"}
                            style={{
                                width: "100%",
                                height: "100%",
                                objectFit: "cover" as const,
                                display: "block",
                                transition: "transform 0.4s ease",
                                transform: hovered
                                    ? "scale(1.05)"
                                    : "scale(1)",
                            }}
                        />
                        <PlayButton />
                        {/* Hover overlay */}
                        <div
                            style={{
                                position: "absolute" as const,
                                inset: 0,
                                backgroundColor: hovered
                                    ? "rgba(0, 0, 0, 0.1)"
                                    : "transparent",
                                transition: "background-color 0.3s ease",
                                pointerEvents: "none",
                            }}
                        />
                    </>
                )}
            </div>

            {/* Title */}
            {title && (
                <p
                    style={{
                        fontFamily: FONTS.body,
                        fontSize: "15px",
                        fontWeight: 600,
                        color: COLORS.text,
                        margin: "0.75rem 0 0 0",
                        lineHeight: 1.4,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical" as any,
                        overflow: "hidden",
                    }}
                >
                    {title}
                </p>
            )}
        </div>
    )
}

// ============================================================
// MAIN COMPONENT
// ============================================================

export function YouTubeCarousel(props: any) {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const [visibleCount, setVisibleCount] = React.useState(3)

    // Responsive: detect viewport width
    React.useEffect(() => {
        const check = () => {
            const w = window.innerWidth
            if (w < 640) setVisibleCount(1)
            else if (w < 960) setVisibleCount(2)
            else setVisibleCount(3)
        }
        check()
        window.addEventListener("resize", check)
        return () => window.removeEventListener("resize", check)
    }, [])

    const videos: { url: string; title: string }[] = props.videos || []
    const totalSlides = Math.max(0, videos.length - visibleCount)

    // Clamp index when resizing
    React.useEffect(() => {
        if (currentIndex > totalSlides) {
            setCurrentIndex(Math.max(0, totalSlides))
        }
    }, [visibleCount, totalSlides])

    const goLeft = () => setCurrentIndex((i) => Math.max(0, i - 1))
    const goRight = () =>
        setCurrentIndex((i) => Math.min(totalSlides, i + 1))

    if (videos.length === 0) {
        return (
            <div
                style={{
                    ...props.style,
                    fontFamily: FONTS.body,
                    textAlign: "center" as const,
                    padding: "3rem 1rem",
                    color: COLORS.textLight,
                }}
            >
                Add YouTube videos in the component properties panel.
            </div>
        )
    }

    // Calculate slide width percentage
    const gap = 20 // px gap between cards
    const slideWidthPercent = 100 / visibleCount

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
            {/* Heading */}
            {props.heading && (
                <h2
                    style={{
                        fontFamily: FONTS.heading,
                        fontSize: "2.4rem",
                        fontWeight: 700,
                        color: COLORS.text,
                        textAlign: "center" as const,
                        marginBottom: "2.5rem",
                        marginTop: 0,
                    }}
                >
                    {props.heading}
                </h2>
            )}

            {/* Carousel container */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "16px",
                }}
            >
                {/* Left arrow */}
                <ArrowButton
                    direction="left"
                    onClick={goLeft}
                    disabled={currentIndex === 0}
                />

                {/* Slides viewport */}
                <div
                    style={{
                        flex: 1,
                        overflow: "hidden",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            gap: `${gap}px`,
                            transition: "transform 0.4s ease",
                            transform: `translateX(calc(-${currentIndex} * (${slideWidthPercent}% + ${gap - gap / visibleCount}px)))`,
                        }}
                    >
                        {videos.map(
                            (
                                video: { url: string; title: string },
                                idx: number
                            ) => (
                                <div
                                    key={idx}
                                    style={{
                                        flex: `0 0 calc(${slideWidthPercent}% - ${(gap * (visibleCount - 1)) / visibleCount}px)`,
                                    }}
                                >
                                    <VideoCard
                                        url={video.url}
                                        title={video.title}
                                    />
                                </div>
                            )
                        )}
                    </div>
                </div>

                {/* Right arrow */}
                <ArrowButton
                    direction="right"
                    onClick={goRight}
                    disabled={currentIndex >= totalSlides}
                />
            </div>

            {/* Dot indicators */}
            {totalSlides > 0 && (
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "8px",
                        marginTop: "1.5rem",
                    }}
                >
                    {Array.from({ length: totalSlides + 1 }).map(
                        (_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentIndex(idx)}
                                style={{
                                    width: currentIndex === idx ? "24px" : "8px",
                                    height: "8px",
                                    borderRadius: "999px",
                                    border: "none",
                                    backgroundColor:
                                        currentIndex === idx
                                            ? COLORS.purple
                                            : COLORS.bgMedium,
                                    cursor: "pointer",
                                    padding: 0,
                                    transition: "all 0.3s ease",
                                    outline: "none",
                                }}
                            />
                        )
                    )}
                </div>
            )}
        </div>
    )
}

// ============================================================
// DEFAULT PROPS
// ============================================================

YouTubeCarousel.defaultProps = {
    heading: "Watch on YouTube",
    videos: [
        {
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            title: "Sample Video 1",
        },
        {
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            title: "Sample Video 2",
        },
        {
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            title: "Sample Video 3",
        },
        {
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            title: "Sample Video 4",
        },
        {
            url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
            title: "Sample Video 5",
        },
    ],
}

// ============================================================
// PROPERTY CONTROLS
// ============================================================

addPropertyControls(YouTubeCarousel, {
    heading: {
        type: ControlType.String,
        title: "Heading",
        defaultValue: YouTubeCarousel.defaultProps.heading,
    },
    videos: {
        type: ControlType.Array,
        title: "Videos",
        defaultValue: YouTubeCarousel.defaultProps.videos,
        control: {
            type: ControlType.Object,
            controls: {
                url: {
                    type: ControlType.String,
                    title: "YouTube URL",
                },
                title: {
                    type: ControlType.String,
                    title: "Title",
                },
            },
        },
    },
})
