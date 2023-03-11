import React, { Fragment, useState } from "react";

function Square({ value, onSquareClick }) {
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}

export default function Board() {
  const [xIsNext, setXIsNext] = useState(true);
  const [squares, setSquares] = useState(Array(3).fill(null).map(() => new Array(3).fill(null)));

  function handleClick(i, j) {
    if(squares[i][j] || calculateWinner(squares)) return; // don't let user overwrite already filled squares

    const nextSquares = squares.slice();
    nextSquares[i][j] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  return (
    <Fragment>
      <div className="board-row">
        <Square value={squares[0][0]} onSquareClick={() => handleClick(0, 0)} />
        <Square value={squares[0][1]} onSquareClick={() => handleClick(0, 1)} />
        <Square value={squares[0][2]} onSquareClick={() => handleClick(0, 2)} />
      </div>
      <div className="board-row">
        <Square value={squares[1][0]} onSquareClick={() => handleClick(1, 0)} />
        <Square value={squares[1][1]} onSquareClick={() => handleClick(1, 1)} />
        <Square value={squares[1][2]} onSquareClick={() => handleClick(1, 2)} />
      </div>
      <div className="board-row">
        <Square value={squares[2][0]} onSquareClick={() => handleClick(2, 0)} />
        <Square value={squares[2][1]} onSquareClick={() => handleClick(2, 1)} />
        <Square value={squares[2][2]} onSquareClick={() => handleClick(2, 2)} />
      </div>
    </Fragment>
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
  return null;
}