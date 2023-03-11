import React, { Fragment, useState } from "react";

function Square({ value, onSquareClick }) {
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}

export default function Board() {
  const [squares, setSquares] = useState(Array(3).fill(null).map(() => new Array(3).fill(null)));

  function handleClick(i, j) {
    const nextSquares = squares.slice();
    nextSquares[i][j] = "X";
    setSquares(nextSquares);
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