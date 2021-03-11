// Game of Life will run infinitely 
export function runGame(grid){
  const aliveNodes = [];
  for(let i = 0; i < grid.length; i++){
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
          aliveNodes.push(createNode(i, n));
        }
      }else{
        if(counter === 3){
          aliveNodes.push(createNode(i, n));
        }
      }
    }
  }
  console.log(aliveNodes);
  return aliveNodes;
}

const createNode = (col, row) => {
  return {
    col,
    row,
    isAlive: true,
  };
};

const createDeadNode = (col, row) => {
  return {
    col,
    row,
    isAlive: false,
  };
};
