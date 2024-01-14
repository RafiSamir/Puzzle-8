function dfs(board, goal, path = []) {
    if (arraysEqual(board, goal)) {
      return path.concat([board]);
    }
  
    for (const neighbor of getNeighbors(board)) {
      if (!path.some((visited) => arraysEqual(visited, neighbor))) {
        const newPath = dfs(neighbor, goal, path.concat([board]));
        if (newPath) {
          return newPath;
        }
      }
    }
  
    return null; // Tidak ditemukan solusi
  }
  
  function getNeighbors(board) {
    const neighbors = [];
    const emptyTileIndex = board.indexOf(0);
    const row = Math.floor(emptyTileIndex / 3);
    const col = emptyTileIndex % 3;
  
    // Cek dan tambahkan tetangga yang mungkin
    for (const [i, j] of [
      [row - 1, col],
      [row + 1, col],
      [row, col - 1],
      [row, col + 1],
    ]) {
      if (i >= 0 && i < 3 && j >= 0 && j < 3) {
        const neighborBoard = board.slice();
        [neighborBoard[emptyTileIndex], neighborBoard[i * 3 + j]] = [
          neighborBoard[i * 3 + j],
          neighborBoard[emptyTileIndex],
        ];
        neighbors.push(neighborBoard);
      }
    }
  
    return neighbors;
  }
  
  function arraysEqual(arr1, arr2) {
    return arr1.every((value, index) => value === arr2[index]);
  }
  
  // Contoh penggunaan
  const startState = [1, 2, 3, 4, 5, 6, 0, 7, 8];
  const goalState = [1, 2, 3, 4, 5, 6, 7, 8, 0];
  
  const solutionPath = dfs(startState, goalState);
  
  if (solutionPath) {
    console.log("Solusi ditemukan:");
    for (let step = 0; step < solutionPath.length; step++) {
      console.log(`Langkah ${step + 1}: ${solutionPath[step]}`);
    }
  } else {
    console.log("Tidak ditemukan solusi.");
  }
  