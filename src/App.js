import React from 'react';
import Puzzle from './components/Puzzle';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  const imageSrc = process.env.PUBLIC_URL + '/puzzle-images'; // Assuming puzzle images are in the public/puzzle-images directory
  const numRows = 10;
  const numCols = 10;

  // Define styles for the area outside the puzzle
  const appStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: 'linear-gradient(to right, #ff9191, #ffffff)', // Soft pink to white gradient
  };

  const headerStyle = {
    color: '#b30000', // Dark red for contrast
    marginBottom: '20px',
    fontFamily: '"Love Ya Like A Sister", cursive', // A thematic font, ensure it's loaded in your index.html
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={appStyle}>
        <h1 style={headerStyle}>Happy Valentine's Day! Now solve this.</h1>
        <Puzzle imageSrc={imageSrc} numRows={numRows} numCols={numCols} />
        {/* Additional decorative elements or information could go here */}
      </div>
    </DndProvider>
  );
}

export default App;
