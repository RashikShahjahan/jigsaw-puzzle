import React from 'react';
import { useDrag } from 'react-dnd';

const PuzzlePiece = ({ id, position, imageUrl}) => {
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'piece',
    item: { id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));


  // Calculate the correct position for this piece's background image
  const backgroundPosX = (position.x * 10);
  const backgroundPosY = (position.y * 10);

  
  const pieceStyle = {
    opacity: isDragging ? 0.5 : 1,
    width: '10%', // 10% of the container's width
    height: '10%', // 10% of the container's height, maintaining square aspect for each piece
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: '100% 100%', // Ensures the entire image is spread across 10x10 grid
    backgroundPosition: `${backgroundPosX}% ${backgroundPosY}%`,
  };
  

  return (
    <div ref={dragRef} style={pieceStyle}></div>
  );
};

export default PuzzlePiece;
