import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [adviceNumber, setAdviceNumber] = useState(0);
  const [advice, setAdvice] = useState("");
  const [NoAdvice, setNoAdvice] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 485);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 485);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  async function setAdviceFunction() {
    await getAdvice();
    setNoAdvice(false);
  }

  async function getAdvice() {
    let id;
    let advice;

    await fetch("https://api.adviceslip.com/advice")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        id = data.slip.id;
        advice = data.slip.advice;
      });

    setAdviceNumber(id);
    setAdvice(advice);
  }

  if (NoAdvice) {
    return (
      <div className="App">
        <p className="advice">
          This web app provides helpful advice with just a click. Simply press
          the button below, and you'll receive a piece of advice.
        </p>
        {isMobile ? (
          <svg width="295" height="16" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd">
              <path fill="#4F5D74" d="M0 8h122v1H0zM173 8h122v1H173z" />
              <g transform="translate(138)" fill="#CEE3E9">
                <rect width="6" height="16" rx="3" />
                <rect x="14" width="6" height="16" rx="3" />
              </g>
            </g>
          </svg>
        ) : (
          <svg width="444" height="16" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd">
              <path fill="#4F5D74" d="M0 8h196v1H0zM248 8h196v1H248z" />
              <g transform="translate(212)" fill="#CEE3E9">
                <rect width="6" height="16" rx="3" />
                <rect x="14" width="6" height="16" rx="3" />
              </g>
            </g>
          </svg>
        )}
        <button class="button" onClick={setAdviceFunction}>
          Get some new advice
        </button>
      </div>
    );
  } else {
    return (
      <div className="App">
        <p id="adviceNumber">Adivce #{adviceNumber}</p>
        <p className="advice">"{advice}"</p>
        {isMobile ? (
          <svg width="295" height="16" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd">
              <path fill="#4F5D74" d="M0 8h122v1H0zM173 8h122v1H173z" />
              <g transform="translate(138)" fill="#CEE3E9">
                <rect width="6" height="16" rx="3" />
                <rect x="14" width="6" height="16" rx="3" />
              </g>
            </g>
          </svg>
        ) : (
          <svg width="444" height="16" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fill-rule="evenodd">
              <path fill="#4F5D74" d="M0 8h196v1H0zM248 8h196v1H248z" />
              <g transform="translate(212)" fill="#CEE3E9">
                <rect width="6" height="16" rx="3" />
                <rect x="14" width="6" height="16" rx="3" />
              </g>
            </g>
          </svg>
        )}
        <button class="button" onClick={getAdvice}>
          Get some new advice
        </button>
      </div>
    );
  }
}

export default App;
