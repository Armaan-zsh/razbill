"use client"

import { useEffect } from "react"

export function VimNavigation() {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Ignore if typing in input fields
            if (
                document.activeElement?.tagName === "INPUT" ||
                document.activeElement?.tagName === "TEXTAREA" ||
                (document.activeElement as HTMLElement)?.isContentEditable
            ) {
                return
            }

            switch (e.key) {
                case "j":
                    window.scrollBy({ top: 100, behavior: "smooth" })
                    break
                case "k":
                    window.scrollBy({ top: -100, behavior: "smooth" })
                    break
                case "g":
                    if (e.shiftKey) {
                        // Shift+G = bottom
                        window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" })
                    } else {
                        // g = top
                        window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                    break
                case "G":
                    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" })
                    break
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [])

    return null
}
