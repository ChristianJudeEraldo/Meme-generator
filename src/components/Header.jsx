
import trollFace from "../images/troll-face.png"

export default function Header() {
    function toggleTheme() {
        document.documentElement.classList.toggle("dark")
        const isDark = document.documentElement.classList.contains("dark")
        localStorage.setItem("theme", isDark ? "dark" : "light")
    }

    return (
        <header className="header">
            <div className="header--brand">
                <img src={trollFace} alt="Troll face logo" />
                <div className="header--text">
                    <span className="micro-label">GENERATOR</span>
                    <h1>Meme Generator</h1>
                </div>
            </div>
            <button
                className="theme-toggle"
                onClick={toggleTheme}
                aria-label="Toggle dark mode"
            >
                ☀/☾
            </button>
        </header>
    )
}
