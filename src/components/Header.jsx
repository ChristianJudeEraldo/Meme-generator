
import trollFace from "../images/troll-face.png"

export default function Header({ themePreference, resolvedTheme, onToggleTheme }) {
    const themeLabel = themePreference === "system" ? `system · ${resolvedTheme}` : themePreference

    return (
        <header className="header">
            <div className="header--brand">
                <img src={trollFace} alt="Troll face logo" />
                <div className="header--text">
                    <span className="micro-label">GENERATOR</span>
                    <h1>meme generator</h1>
                </div>
            </div>
            <button
                className="theme-toggle"
                onClick={onToggleTheme}
                aria-label={`Theme preference is ${themeLabel}`}
                title="Cycle theme preference"
                type="button"
            >
                <span className="theme-toggle__label">theme</span>
                <span className="theme-toggle__value">{themeLabel}</span>
            </button>
        </header>
    )
}
