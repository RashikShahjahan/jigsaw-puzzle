import React, { useState, useEffect, useRef } from 'react';
import PuzzlePiece from './PuzzlePiece';
import { useDrop } from 'react-dnd';
import { initializePuzzle, shuffle} from '../utils';
import './Float.css';

const Puzzle = ({ imageSrc, numRows, numCols }) => {
  const [pieces, setPieces] = useState([]);
  const [message, setMessage] = useState({ content: "", visible: false });
  const [correctPiecesCount, setCorrectPiecesCount] = useState(0);

  const containerRef = useRef(null); // Ref for the puzzle container

  useEffect(() => {
    if (correctPiecesCount === numRows * numCols) {
      setMessage({ content: "You did it babygirl! Ador!", visible: true });
      // Optionally, clear the message after some time
      setTimeout(() => setMessage({ content: "", visible: false }), 3000);
    }
  }, [correctPiecesCount, numRows, numCols]);
  
  useEffect(() => {
    const initializedPieces = initializePuzzle(imageSrc, numRows, numCols);
    setPieces(shuffle(initializedPieces));
  }, [imageSrc, numRows, numCols]);


  // Dynamically calculate the target position based on the drop location
  const calculateTargetPosition = (clientOffset) => {
    if (!containerRef.current) {
      return { x: 0, y: 0 };
    }
    const containerRect = containerRef.current.getBoundingClientRect();
    const gridCellWidth = containerRect.width / numCols;
    const gridCellHeight = containerRect.height / numRows;

    const gridX = Math.floor((clientOffset.x - containerRect.left) / gridCellWidth);
    const gridY = Math.floor((clientOffset.y - containerRect.top) / gridCellHeight);
    return { x: gridX, y: gridY };
  };

  const isValidPosition = (position) => {
    return position.x >= 0 && position.x < numCols && position.y >= 0 && position.y < numRows;
  };

  const [, drop] = useDrop(() => ({
    accept: "piece",
    drop: (item, monitor) => {
      const clientOffset = monitor.getClientOffset();
      if (clientOffset) {
        const targetPosition = calculateTargetPosition(clientOffset);
        if (isValidPosition(targetPosition)) {
          // Calculate the targetIndex based on the targetPosition
          const targetIndex = targetPosition.y * numCols + targetPosition.x;
          handleDrop(item, targetIndex);
        }
      }
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  

  const handleDrop = (item, targetIndex) => {
    setPieces(prevPieces => {
      const draggedIndex = prevPieces.findIndex(p => p.id === item.id);
      if (draggedIndex !== -1 && targetIndex !== -1) {
        const newPieces = [...prevPieces];
        [newPieces[draggedIndex], newPieces[targetIndex]] = [newPieces[targetIndex], newPieces[draggedIndex]];
  
        // Assume each piece's id correctly maps to its solved position index
        const isDraggedPieceCorrect = targetIndex === item.id;
        const isTargetPieceCorrect = draggedIndex === newPieces[targetIndex].id;
  
        // Show floating message for correct placements
        if (isDraggedPieceCorrect || isTargetPieceCorrect) {
          setMessage({ content: "Ador!", visible: true });
          setTimeout(() => setMessage({ content: "", visible: false }), 2000); // Hide after 2 seconds
        }
  
        // Update correct pieces count
        setCorrectPiecesCount((prevCount) => {
          let newCount = prevCount;
          newCount += isDraggedPieceCorrect ? 1 : (targetIndex === newPieces[draggedIndex].id ? -1 : 0);
          newCount += isTargetPieceCorrect ? 1 : (draggedIndex === newPieces[targetIndex].id ? -1 : 0);
          return newCount;
        });
  
        return newPieces;
      }
      return prevPieces;
    });
  };
  


  // Combined ref function to handle both useDrop and containerRef
  const setDropRef = (element) => {
    containerRef.current = element;
    drop(element);
  };

  return (
    <div 
      ref={setDropRef} // Apply the combined ref here
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        maxWidth: '1024px',
        maxHeight: '1024px',
        width: '90vw', // Adjust based on your layout
        aspectRatio: '1 / 1',
        margin: 'auto',
        border: '5px solid black', // Black border
        position: 'relative',
        backgroundColor: 'white', // White background for the puzzle area
        boxSizing: 'border-box',
        padding: '5px',
        boxShadow: '0 4px 8px rgba(0,0,0,0.2)', // Soft shadow for depth
      }}
    >
      {pieces.map(piece => (
        <PuzzlePiece 
          key={piece.id}
          {...piece}
        />
      ))}
          {message.visible && (
      <div className="floatingMessage" style={{ zIndex: 1000 }}>
        {message.content}
      </div>
    )}
  </div>
  );
};

export default Puzzle;
