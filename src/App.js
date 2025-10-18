import React, { useState, useRef, useEffect } from "react";
import YouTubePlaylistPlayButton from "./YouTubePlaylistPlayButton.jsx";
import "./App.css";
import domtoimage from "dom-to-image";
import "./quotes.js";
import AllQuotes from "./quotes.js";
import Images from "./images.jsx";
import Spinners from "./Spinners.jsx";

// import {
//   FacebookIcon,
//   FacebookShareButton,
//   TelegramIcon,
//   TelegramShareButton,
//   TwitterIcon,
//   TwitterShareButton,
//   WhatsappIcon,
//   WhatsappShareButton,
// } from "react-share";
import Ronin from "./Ronin.jsx";


function App() {
  const [quotes, setQuotes] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchQuote = () => {
    let quoteRandomizer = Math.floor(Math.random() * AllQuotes.length);
    setQuotes(AllQuotes[quoteRandomizer]);
    setLoading(false);
  };

  useEffect(() => {
    // fetch on mount
    fetchQuote();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const shareURL = window.location.href;

  const colors = [
    "#16a085",
    "#0c6b2c",
    "#2c3e50",
    "#b57309",
    "#db2d1b",
    "#743d8a",
    "#c31551",
    "#342224",
    "#636240",
    "#41726b",
    "#52783e",
  ];

  let randomColor = Math.floor(Math.random() * colors.length);
  let myColor = colors[randomColor];

  document.body.style.backgroundColor = myColor;

  window.addEventListener("load", fetchQuote);

  const downloadRef = useRef();

  // Build a safe src for the avatar image.
  const getAviSrc = (avi) => {
    if (!avi) return "";
    if (typeof avi !== "string") return avi; // imported module URL
    if (avi.startsWith("http") || avi.startsWith("data:")) return avi;
    if (avi.indexOf("/public/") !== -1) {
      const rel = avi.slice(avi.indexOf("/public/") + "/public".length);
      return (process.env.PUBLIC_URL || "") + rel;
    }
    if (avi.startsWith("/")) return avi;
    return (process.env.PUBLIC_URL || "") + "/" + avi;
  };

  const downloadImage = () => {
    const targetElement = downloadRef.current;
    domtoimage.toJpeg(targetElement, { quality: 0.95 }).then((dataUrl) => {
      let link = document.createElement("a");
      link.download = "my-quote.jpeg";
      link.href = dataUrl;
      link.click();
    });
  };

  if (!loading) {
    return (
      <div className="main-container">
        {/* FIXME: */}

        <div className="container" onClick={fetchQuote}>
          <div className="App" ref={downloadRef}>
            <div>
              <div className="quote-body">
                <div className="quote-overlay-container">
                  <img className="avi" alt={quotes.author || "avatar"} src={getAviSrc(quotes.avi)}></img>
                  <div className="text-overlay">
                    <blockquote style={{ color: "white" }}>
                      <q>{quotes.text}</q>
                    </blockquote>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>

            {/* <div className="button-div">
              {" "}
              <button
                className="my-button"
                
                style={{ backgroundColor: myColor, cursor: "pointer" }}
              >
                {" "}
                Click Here{" "}
              </button>
              {/* <button className="my-button" onClick={downloadImage}>
                {" "}
                Download
              </button> 
            </div> */}

          </div>{" "}
          
        </div>
        <div className="container2"><YouTubePlaylistPlayButton
            /></div>
      </div>
    );
  } else {
    return (
      <div className="container spinner">
        <img src="spinner.gif" alt="spinner" />

        <Spinners className="spinner" size={30} />
      </div>
    );
  }
}

export default App;
