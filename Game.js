import React, { useState, useEffect } from 'react';
import './style.css'; 

const emojis = ["😀", "😁", "😂", "🤣", "😈", "😄", "😅", "😆", "😉", "😊"];
const doubleEmojis = [...emojis, ...emojis]; // Duplicate emojis for matching pairs

function Game() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [score, setScore] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [showInstructions, setShowInstructions] = useState(true);

  // Shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...doubleEmojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji) => ({ id: Math.random(), emoji, matched: false }));

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0);
    setScore(0);
    // setShowInstructions(false);
  };

  // Handle a card selection
  const handleChoice = (card) => {
    // Check if the clicked card is the same as the first choice
    if (card === choiceTwo) {
      return;
    }
    // Set the second choice if it's empty, otherwise set the first choice
    choiceTwo ? setChoiceOne(card) : setChoiceTwo(card);
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
        setScore(prevScore => prevScore + 1);
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
        <div className="instructions">
          <h3>Instructions</h3>
          <p>Click on two cards to reveal emojis. If the emojis match, they will stay face up. Try to match all pairs with the fewest turns possible!</p>
        </div>
    
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
      <p>Score: {score}</p> {/* Display the current score */}
    </div>
  );
}

export default Game;
