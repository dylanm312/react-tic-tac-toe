import React, { Fragment, useState } from "react";

function Square({ value, onSquareClick }) {
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}

function Board({ xIsNext, squares, onPlay }) {
  const winner = calculateWinner(squares);
  let status;
  if(winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  function handleClick([i, j]) {
    if(squares[i][j] || calculateWinner(squares)) return; // don't let user overwrite already filled squares, and stop game upon win condition.

    const nextSquares = squares.slice();
    nextSquares[i][j] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  return (
    <Fragment>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0][0]} onSquareClick={() => handleClick([0, 0])} />
        <Square value={squares[0][1]} onSquareClick={() => handleClick([0, 1])} />
        <Square value={squares[0][2]} onSquareClick={() => handleClick([0, 2])} />
      </div>
      <div className="board-row">
        <Square value={squares[1][0]} onSquareClick={() => handleClick([1, 0])} />
        <Square value={squares[1][1]} onSquareClick={() => handleClick([1, 1])} />
        <Square value={squares[1][2]} onSquareClick={() => handleClick([1, 2])} />
      </div>
      <div className="board-row">
        <Square value={squares[2][0]} onSquareClick={() => handleClick([2, 0])} />
        <Square value={squares[2][1]} onSquareClick={() => handleClick([2, 1])} />
        <Square value={squares[2][2]} onSquareClick={() => handleClick([2, 2])} />
      </div>
    </Fragment>
  );
}

export default function Game() {
  const [history, setHistory] = useState([Array(3).fill(null).map(() => new Array(3).fill(null))]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  var log = require('loglevel');
  log.setLevel(log.levels.DEBUG);

  function handlePlay(nextSquares) {
    let nextHistory = JSON.parse(JSON.stringify(history)); // deep copy
    nextHistory = [...nextHistory.slice(0, currentMove + 1), nextSquares]; // get the piece we want
    setHistory(nextHistory); // append new state to history
    setCurrentMove(nextHistory.length - 1);
    log.debug("Handled play, nextHistory is: " + nextHistory);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
    log.debug("Jumped to move: " + nextMove);
  }

  const moves = history.map((squares, moveIndex) => {
    let description;
    if(moveIndex > 0) {
      description = "Go to move #" + moveIndex;
    } else {
      description = "Go to game start";
    }

    return (
      <li key={moveIndex}>
        <button onClick={() => {jumpTo(moveIndex)}}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [[ai, aj], [bi, bj], [ci, cj]] = lines[i];
    if (squares[ai][aj] && squares[ai][aj] === squares[bi][bj] && squares[ai][aj] === squares[ci][cj]) {
      return squares[ai][aj];
    }
  }

  // Check all squares to see if they're filled in. If so, it's a tie, If not, no winner yet,
  let count = 0;
  for(const r in squares) {
    for(const c in squares[r]) {
      if(squares[r][c] === null) {
        return null;
      }
    }
  }
  return "Tie";
}