
import { useState, useEffect, useRef } from "react"
import { toPng } from "html-to-image"

export default function Main() {
    const [meme, setMeme] = useState({
        topText: "One does not simply",
        bottomText: "Walk into Mordor",
        imageUrl: "http://i.imgflip.com/1bij.jpg"
    })

    const [allMemes, setAllMemes] = useState([])
    const memeRef = useRef(null)

    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            .then(data => setAllMemes(data.data.memes))
    }, [])

    function handleChange(event) {
        const {value, name} = event.currentTarget
        setMeme(prevMeme => ({
            ...prevMeme, 
            [name]: value
        }))
    }

    function getMemeImage() {
        const randomNumber = Math.floor(Math.random() * allMemes.length)
        const newMemeUrl = allMemes[randomNumber].url
        setMeme(prevMeme => ({
            ...prevMeme,
            imageUrl: newMemeUrl
        }))
    }

    function saveMeme() {
        if (!memeRef.current) return
        toPng(memeRef.current, { cacheBust: true })
            .then((dataUrl) => {
                const link = document.createElement("a")
                link.download = "meme.png"
                link.href = dataUrl
                link.click()
            })
            .catch((err) => {
                console.error("Failed to save meme:", err)
            })
    }

    return (
        <main>
            <div className="form">
                <div className="form--field">
                    <label className="form--label" htmlFor="topText">Top Text</label>
                    <input
                        id="topText"
                        type="text"
                        placeholder="One does not simply"
                        name="topText"
                        value={meme.topText}
                        onChange={handleChange}
                    />
                </div>

                <div className="form--field">
                    <label className="form--label" htmlFor="bottomText">Bottom Text</label>
                    <input
                        id="bottomText"
                        type="text"
                        placeholder="Walk into Mordor"
                        name="bottomText"
                        value={meme.bottomText}
                        onChange={handleChange}
                    />
                </div>
                <button className="btn-primary" onClick={getMemeImage}>get new image →</button>
            </div>
            <span className="micro-label section-label">PREVIEW</span>
            <div className="meme-card">
                <div className="meme" ref={memeRef}>
                    <img src={meme.imageUrl} alt="Meme" />
                    <span className="top">{meme.topText}</span>
                    <span className="bottom">{meme.bottomText}</span>
                </div>
            </div>
            <button className="save-btn" onClick={saveMeme}>
                save as png ↓
            </button>
        </main>
    )
}
