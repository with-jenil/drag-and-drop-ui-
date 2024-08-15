import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [cards, setCards] = useState([]);
  const [isDragging, setIsDragging] = useState(false);
  const [draggedCard, setDraggedCard] = useState(null);
  const [popupVisible, setPopupVisible] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    cards.forEach((card) => {
      ctx.fillStyle = card.color;
      ctx.fillRect(card.x, card.y, card.width, card.height);

      ctx.fillStyle = "black";
      ctx.font = "12px Arial";
      ctx.fillText(card.text, card.x + 5, card.y + 20);

      ctx.fillStyle = "black";
      ctx.font = "12px Arial";
      ctx.fillText("Show More", card.x + 5, card.y + card.height - 5);
    });
  }, [cards]);

  const handleCardClick = (index) => {
    setPopupVisible(true);
    setSelectedCard(cards[index]);
  };

  const handleCanvasMouseDown = (e) => {
    const canvas = canvasRef.current;
    const x = e.clientX - canvas.offsetLeft;
    const y = e.clientY - canvas.offsetTop;

    cards.forEach((card, index) => {
      if (
        x >= card.x &&
        x <= card.x + card.width &&
        y >= card.y &&
        y <= card.y + card.height
      ) {
        setIsDragging(true);
        setDraggedCard(index);
      }
    });
  };

  const handleCanvasMouseMove = (e) => {
    if (isDragging) {
      const canvas = canvasRef.current;
      const x = e.clientX - canvas.offsetLeft;
      const y = e.clientY - canvas.offsetTop;

      const updatedCards = [...cards];
      updatedCards[draggedCard] = {
        ...updatedCards[draggedCard],
        x,
        y,
      };

      setCards(updatedCards);
    }
  };

  const handleCanvasMouseUp = () => {
    setIsDragging(false);
    setDraggedCard(null);
  };

  const handleAddCard = () => {
    const newCard = {
      x: 10,
      y: 10 + cards.length * 50,
      width: 150,
      height: 50,
      color: "#eee",
      text: "Dummy Text",
    };
    setCards([...cards, newCard]);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  return (
    <div className="App">
      <center>
        {" "}
        <h1>Drag and Drop UI</h1>
      </center>
      <button onClick={handleAddCard}>Add Card</button>
      <canvas
        ref={canvasRef}
        width={900}
        height={500}
        onMouseDown={handleCanvasMouseDown}
        onMouseMove={handleCanvasMouseMove}
        onMouseUp={handleCanvasMouseUp}
      />
      {popupVisible && (
        <div className="popup">
          <div className="popup-content">
            <h2>{selectedCard.text}</h2>
            <button onClick={handleClosePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
