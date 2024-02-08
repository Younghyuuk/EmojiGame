import React, { useState, useEffect } from 'react';
import './Game.css'; // Make sure to create a corresponding CSS file for styling

const emojis = ["😀", "😁", "😂", "🤣", "😃", "😄", "😅", "😆", "😉", "😊"];
const doubleEmojis = [...emojis, ...emojis]; // Duplicate emojis for matching pairs

function Game() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  // Shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...doubleEmojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji) => ({ id: Math.random(), emoji, matched: false }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
  };

  // Handle a card selection
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  // Compare two selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      if (choiceOne.emoji === choiceTwo.emoji) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.emoji === choiceOne.emoji) {
              return {...card, matched: true};
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiceOne, choiceTwo]);

  // Reset choices and increase turn
  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  };

  // Start a new game automatically
  useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <div className="game">
      <h2>Emoji Matching Game</h2>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map(card => (
          <div className={`card ${card.matched ? 'matched' : ''}`}
               key={card.id}
               onClick={() => !disabled && !card.matched && handleChoice(card)}>
            {choiceOne === card || choiceTwo === card || card.matched ? card.emoji : "?"}
          </div>
        ))}
      </div>
      <p>Turns: {turns}</p>
    </div>
  );
}

export default Game;
