import { useEffect, useState } from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import useWindowSize from "react-use/lib/useWindowSize";
import Confetti from "react-confetti";

import "./style.css";
function App() {
  const [dice, setDice] = useState(allNewDice());
  const [won, setWon] = useState(false);
  const { width, height } = useWindowSize();
  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const allEqual = dice.every((die) => die.value === dice[0].value);
    if (allEqual && allHeld) {
      setWon(true);
      console.log("you won!!!");
    }
  }, [dice]);

  function generateRandomNumber(min, max) {
    return Math.floor(Math.random() * max + min);
  }
  function allNewDice() {
    const newArr = [];
    for (let index = 0; index < 10; index++) {
      newArr.push({
        id: nanoid(),
        value: generateRandomNumber(1, 6),
        isHeld: false,
      });
    }
    return newArr;
  }

  function rollDice() {
    if (won) {
      setDice(allNewDice());
      setWon(false);
      return;
    }
    setDice((prev) =>
      prev.map((die) =>
        die.isHeld
          ? die
          : { id: nanoid(), isHeld: false, value: generateRandomNumber(1, 6) }
      )
    );
  }

  function holdDice(id) {
    setDice((prev) =>
      prev.map((die) => (die.id === id ? { ...die, isHeld: !die.isHeld } : die))
    );
  }

  return (
    <main className="flexbox">
      {won && <Confetti width={width} height={height} />}
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="grid">
        {dice.map((die) => {
          return (
            <Die
              value={die.value}
              isHeld={die.isHeld}
              key={die.id}
              holdDice={() => holdDice(die.id)}
            />
          );
        })}
      </div>
      <button className="roll--dice" onClick={rollDice}>
        {won ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
