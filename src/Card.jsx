import React, { useState, useEffect } from "react";
import mobileDivider from "./assets/pattern-divider-mobile.svg";
import desktopDivider from "./assets/pattern-divider-desktop.svg";
import iconDice from "./assets/icon-dice.svg";

const Card = ({ quote, isLoading, setIsLoading }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="card">
      <header className="section__header">
        <h1 className="sr-only">Advice Generator</h1>
        <p className="header__p">
          Advice #<span>{quote.slip.id}</span>
        </p>
      </header>
      <blockquote className="quote__container">
        <span className="quote">{quote.slip.advice}</span>
      </blockquote>
      <img className="divider" src={width <= 414 ? mobileDivider : desktopDivider} alt="Divider" />
      <div onClick={() => setIsLoading(!isLoading)} className="dice">
        <img className="iconDice" src={iconDice} alt="Icon Dice" />
      </div>
    </div>
  );
};

export default Card;
