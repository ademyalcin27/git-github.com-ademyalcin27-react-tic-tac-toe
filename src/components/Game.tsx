import React, { useState } from 'react';
import Board from './Board';

const Game: React.FC = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i: number) => {
    const historyCopy = history.slice(0, stepNumber + 1);
    const current = historyCopy[historyCopy.length - 1];
    const squares = [...current];
    if (calculateWinner(squares) || squares[i]) return;

    squares[i] = xIsNext ? 'X' : 'O';
    setHistory([...historyCopy, squares]);
    setStepNumber(historyCopy.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step: number) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const current = history[stepNumber];
  const winner = calculateWinner(current);

  return (
    <div className="game">
      <div className="flex w-full">
        <Board squares={current} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div className="text-white">
          {winner
            ? 'Winner: ' + winner
            : 'Next player: ' + (xIsNext ? 'X' : 'O')}
        </div>
        <ol className="text-white">
          {history.map((step, move) => {
            const desc = move ? 'Go to move #' + move : 'Go to game start';
            return (
              <li key={move}>
                <button onClick={() => jumpTo(move)}>{desc}</button>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

const calculateWinner = (squares: string[]) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

export default Game;
