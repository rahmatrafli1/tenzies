import { useState } from "react";
import Die from "./components/Die";

export default function App() {
  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
    }));
  }

  const [dice, setDice] = useState(() => generateAllNewDice());

  function rollDice() {
    setDice(generateAllNewDice());
  }

  const diceElements = dice.map((dieObj, index) => (
    <Die key={index} value={dieObj.value} />
  ));

  return (
    <main>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollDice}>
        Roll
      </button>
    </main>
  );
}
