// src/utils/index.js
export const initializePuzzle = (imageSrc, numRows, numCols) => {
  const pieces = [];

  // Adjusted to start from 0
  for (let i = 0; i < numRows; i++) {
    for (let j = 0; j < numCols; j++) {
      // Adjusted id calculation to be consistent with 0-based indexing
      const id = i * numCols + j;
      // Adjust imageUrl to match 1-based indexing if your file naming starts with 1
      const imageUrl = `${imageSrc}/piece_${i}_${j}.png`;
      // Keep position 0-based for internal logic consistency
      const position = { x: j, y: i };
      pieces.push({ id, position, imageUrl });
    }
  }

  return pieces;
};


  export const shuffle = (array) => {
    // Fisher-Yates (Knuth) Shuffle algorithm
    // https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };


  
  