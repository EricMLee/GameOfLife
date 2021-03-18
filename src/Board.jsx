import React, {Component} from 'react';
import Node from './Node';

import './css/Board.css';

export default class PathfindingVisualizer extends Component {
  constructor() {
    super();
    this.state = {
      grid: [],
      mouseIsPressed: false,
      playing: true,
    };
  }

  componentDidMount() {
    const grid = getInitialGrid();
    this.setState({grid});
  }

  resetGrid(){
    const grid = getInitialGrid();
    this.setState({grid});
  }

  handleMouseDown(row, col) {
    console.log(row)
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid, mouseIsPressed: true});
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return;
    const newGrid = getNewGridWithWallToggled(this.state.grid, row, col);
    this.setState({grid: newGrid});
  }

  handleMouseUp() {
    this.setState({mouseIsPressed: false});
  }

  setUp(grid){
    this.setState({playing: true});
    this.playGame(grid);
  }

  playGame(grid){
    if(this.state.playing){
      setTimeout(() => {
        grid = this.nextLevel(grid);
        this.playGame(grid);
      }, 1);
    }else{
      this.setState({playing: true});
    }
  }

  nextLevel(grid){
    let newGrid = [];
    for(let i = 0; i < grid.length; i++){
      const currentRow = [];
      for(let n = 0; n < grid[0].length; n++){
        let counter = 0;
        if(i - 1 !== -1 && grid[i - 1][n].isAlive){
          counter++;
        }
        if(i - 1 !== -1 && n-1 !== -1 && grid[i - 1][n-1].isAlive){
          counter++;
        }
        if(i - 1 !== -1 && n+1 !== grid[0].length && grid[i - 1][n+1].isAlive){
          counter++;
        }
        if(i + 1 !== grid.length && grid[i + 1][n].isAlive){
          counter++;
        }
        if(i + 1 !== grid.length && n+1 !== grid[0].length && grid[i + 1][n + 1].isAlive){
          counter++;
        }
        if(i + 1 !== grid.length && n-1 !== -1 && grid[i + 1][n - 1].isAlive){
          counter++;
        }
        if(n - 1 !== -1 && grid[i][n-1].isAlive){
          counter++;
        }
        if(n + 1 !== grid[0].length && grid[i][n+1].isAlive){
          counter++;
        }
        if(grid[i][n].isAlive){
          if(counter === 2 || counter === 3){
            currentRow.push(createAliveNode(n, i));
          }else{
            currentRow.push(createNode(n, i));
          }
        }else{
          if(counter === 3){
            currentRow.push(createAliveNode(n, i));
          }else{
            currentRow.push(createNode(n, i));
          }
        }
      }
      newGrid.push(currentRow);
    }
    this.setState({grid: newGrid});
    return newGrid;
  }
  
  render() {
    const {grid, mouseIsPressed, playing} = this.state;
    return (
      <>
        <div className = "nav">
          <h1 className = "gameOfLife">Conway's Game of Life</h1>
          <ul>
            <li><button class="button" onClick={() => {
              this.setState({playing: true});
              this.setUp(grid);
            }}>
              Play
            </button></li>
            <li><button class="button" onClick={() => {
              this.setState({playing:false});
            }}>
              Stop
            </button></li>
            <li><button class="button" onClick={() => {
              this.nextLevel(grid);
            }}>
              Step
            </button></li>
            <li><button class="button" onClick={() => {
              const grid = getInitialGrid();
              this.setState({grid});}}>
              Clear Board
            </button></li>
          </ul>
        </div>
        {/* <button onClick={() => {
          const grid = getInitialGrid();
          this.setState({grid});}}>
          Clear Board
        </button>
        <button onClick={() => {
          this.nextLevel(grid);
        }}>
          Step
        </button>
        <button onClick={() => {
          this.setState({playing: true});
          this.setUp(grid);
        }}>
          Play
        </button>
        <button onClick={() => {
          this.setState({playing:false});
        }}>
          Stop
        </button> */}

        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {row, col, isAlive} = node;
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isAlive = {isAlive}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) =>
                        this.handleMouseEnter(row, col)
                      }
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}></Node>
                  );
                })}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

const getInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 30; row++) {
    const currentRow = [];
    for (let col = 0; col < 95/1.3; col++) {
      currentRow.push(createNode(col, row));
    }
    grid.push(currentRow);
  }
  return grid;
};

const createNode = (col, row) => {
  return {
    col,
    row,
    isAlive: false,
  };
};

const createAliveNode = (col, row) => {
  return {
    col,
    row,
    isAlive: true,
  };
};

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice();
  console.log(row);
  const node = newGrid[row][col];
  const newNode = {
    ...node,
    isAlive: !node.isAlive,
  };
  newGrid[row][col] = newNode;
  return newGrid;
};
