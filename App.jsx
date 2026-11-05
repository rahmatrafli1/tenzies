import { useState } from "react";
import Die from "./components/Die";

export default function App() {
  function generateAllNewDice() {
    return new Array(10).fill(0).map(() => Math.ceil(Math.random() * 6));
  }

  const [dice, setDice] = useState(() => generateAllNewDice());

  const diceElements = dice.map((num, index) => (
    <Die key={index} value={num} />
  ));

  return (
    <main>
      <div className="dice-container">{diceElements}</div>
    </main>
  );
}
