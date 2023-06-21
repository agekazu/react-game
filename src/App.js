import React from 'react';
import { useState } from 'react'

function Square( {value, onSquareClick} ) {
  return (
      <button
        className="square"
        onClick={onSquareClick}
      >
        {value}
      </button>
  )
}

//ゲームの盤面
export function Board() {
  // 盤面上の◯、✗の状況
  const [squares, setSquares] = useState(Array(9).fill(null))
  // 手番管理
  const [xIsNext, setIsNext] = useState(true)

  function handleClick(index) {
    // クリックした箇所に値がある場合処理を実施しない
    if (squares[index] || getWinnerName(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if(xIsNext) {
      nextSquares[index] = "✗"
    } else {
      nextSquares[index] = "◯"
    }
    setSquares(nextSquares)
    setIsNext(!xIsNext)
  }

  // 画面表示ステータス
  const winnerName = getWinnerName(squares);
  let status;
  console.log(winnerName);
  if (winnerName) {
    status = "Winner: " + winnerName;
  } else {
    status = "NextPlayer: " + (xIsNext ? "✗" : "◯");
  }
  
  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
        <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
        <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
        <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
        <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
        <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
        <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
      </div>
    </div>
  )
}

//ゲーム管理
export default function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <ol>{/*TODO*/}</ol>
      </div>
    </div>
  )
}

// ヘルパー関数 勝者名を返す
function getWinnerName(square) {
  const winLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winLines.length; i++) {
    const [a, b, c] = winLines[i];
    if (square[a] && square[a] === square[b] && square[a] === square[c]) {
      return square[a];
    }
  }
  return null
}