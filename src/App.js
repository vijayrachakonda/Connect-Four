import React from 'react';
import './App.css';
import Board from './Board.js';

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      squares: Array(42).fill(null),
      redTurn: true,
    }
  }



  handleReset() {
    this.setState({
      squares: Array(42).fill(null),
      redTurn: true,
    });
  }


  handleClick(i) {
    const squares = this.state.squares.slice();
    if (calculateRows(squares, 0) || calculateColumns(squares,0) || calculateRightDiagonal(squares, 21) || calculateLeftDiagonal(squares, 27)){
      console.log("entered");
      return;
    }

    let j = put(squares,i);
    console.log(j);

    squares[j] = this.state.redTurn ? 'R': 'B';
    this.setState ({
      squares: squares,
      redTurn: !this.state.redTurn,
    });


  }



  render() {
      let status;
      let won = calculateRows(this.state.squares,0) || calculateColumns(this.state.squares,0) || calculateRightDiagonal(this.state.squares, 21) || calculateLeftDiagonal(this.state.squares, 27);  
      if (won) {
          if (this.state.redTurn) {
            status = "Blue Wins!";
          } else {
            status = "Red Wins!";
          }
      } else {
          if(this.state.redTurn) {
            status = "Red's Turn";
          } else {
            status = "Blue's Turn";
          }
      }

      return (
        <div className="App">
            <h1 id="title">Connect Four</h1>
            <Board 
              squares={this.state.squares}
              onClick={i => this.handleClick(i)}
            />
            <div id="status">
                <p>{status}</p>
            </div>
            <div id ="button-div">
              <button id="new-game-button" type="button" onClick={()=>this.handleReset()}>New Game</button>
            </div>
        </div>
      );
    }
}

// ====================================================


function calculateRows(squares, i) {
  let j = i + 4;

  if (i >= squares.length) {
    return false;
  }

  while(i < j) {
      if(squares[i] && (squares[i]===squares[i+1] && squares[i]===squares[i+2] && squares[i]===squares[i+3])){
        return true;
      }
      i++;
  }
  return calculateRows(squares, i+3);
}

function calculateColumns(squares, i) {
  let j = i + 21;

  if (i > 7) {
    return false;
  }

  while (i < j) {
    if (squares[i] && (squares[i]===squares[i+7] && squares[i]===squares[i+14] && squares[i]===squares[i+21])){
      return true;
    }
    i+=7;
  }
  return calculateColumns(squares, i-20)
}

function calculateRightDiagonal(squares, i) {
  let j = i + 4;
  
  if (i >= squares.length) {
    return false;
  }

  while (i < j) {
    if (squares[i] && (squares[i] === squares[i-6] && squares[i]===squares[i-12] && squares[i] === squares[i-18])) {
      return true;
    }
    i++;
  }

  return calculateRightDiagonal(squares, i+3);

}

function calculateLeftDiagonal(squares, i){
  let j = i - 4;
  if (i >= squares.length) {
    return false;
  }
  while (i > j) {
    if (squares[i] && (squares[i] === squares[i-8] && squares[i] === squares[i-16] && squares[i] === squares[i-24])) {
      return true;
    }
    i--;
  }

  return calculateLeftDiagonal(squares, i+11);
}

function put(squares, i) {
  if (squares[i]) {
    return;
  }

  while (i < 35) {
    if (squares[i+7]) {
      return i;
    }
    i+=7;
  }

  return i;

}

export default App;
