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
function Board({xIsNext, squares, onPlay}) {

  function handleClick(index) {
    // クリックした箇所に値がある場合処理を実施しない
    if (squares[index] || getWinnerName(squares)) {
      return;
    }
    const nextSquares = squares.slice();
    if(xIsNext) {
      nextSquares[index] = "✗";
    } else {
      nextSquares[index] = "◯";
    }
    onPlay(nextSquares);
  }

  // 画面表示ステータス
  const winnerName = getWinnerName(squares);
  let status;
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
export default function Game({nextSquares}) {
  console.log("Game!");
  // 手番管理
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, moveCount) => {
    let description;
    if (moveCount > 0) {
      description = "手順" + moveCount + "へ戻る";
    } else {
      description = "ゲーム開始";
    }

    return (
      <li key={moveCount}>
        <button onClick={() => jumpTo(moveCount)}>{description}</button>
      </li>
    )
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  )
}

// ヘルパー関数 勝者名を返す
function getWinnerName(squares) {
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
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null
}