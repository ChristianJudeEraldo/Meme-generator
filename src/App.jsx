
import { useEffect, useState } from "react"
import Header from "./components/Header"
import Main from "./components/Main"

const THEME_STORAGE_KEY = "theme"

function getStoredThemePreference() {
    try {
        const storedTheme = localStorage.getItem(THEME_STORAGE_KEY)
        if (storedTheme === "light" || storedTheme === "dark" || storedTheme === "system") {
            return storedTheme
        }
    } catch {
        // Ignore storage failures and fall back to system.
    }

    return "system"
}

function getSystemThemePreference() {
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

export default function App() {
    const [themePreference, setThemePreference] = useState(getStoredThemePreference)
    const [systemTheme, setSystemTheme] = useState(getSystemThemePreference)
    const resolvedTheme = themePreference === "system" ? systemTheme : themePreference

    useEffect(() => {
        const root = document.documentElement
        root.dataset.themePreference = themePreference
        root.dataset.theme = resolvedTheme
        root.style.colorScheme = resolvedTheme

        try {
            localStorage.setItem(THEME_STORAGE_KEY, themePreference)
        } catch {
            // Ignore storage failures.
        }
    }, [themePreference, resolvedTheme])

    useEffect(() => {
        if (themePreference !== "system") {
            return undefined
        }

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
        const handleThemeChange = event => {
            setSystemTheme(event.matches ? "dark" : "light")
        }

        mediaQuery.addEventListener("change", handleThemeChange)

        return () => {
            mediaQuery.removeEventListener("change", handleThemeChange)
        }
    }, [themePreference])

    function cycleThemePreference() {
        setThemePreference(currentTheme => {
            if (currentTheme === "system") return "light"
            if (currentTheme === "light") return "dark"
            return "system"
        })
    }

    return (
        <>
            <Header
                themePreference={themePreference}
                resolvedTheme={resolvedTheme}
                onToggleTheme={cycleThemePreference}
            />
            <Main />
        </>
    )
}