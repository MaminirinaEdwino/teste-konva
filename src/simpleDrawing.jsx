import { useState } from "react";
import { Layer, Rect, Stage } from "react-konva";

export default function SimpleDrawing() {
  const [rectangleColor, setRectangleColor] = useState("green");
  const handleClick = () => {
    setRectangleColor(rectangleColor == "green" ? "blue" : "green");
  };
  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Rect
          x={20}
          y={50}
          width={100}
          height={80}
          fill={rectangleColor}
          stroke="black"
          strokeWidth={2}
          shadowBlur={10}
          cornerRadius={5}
          draggable // Permet de glisser-déposer le rectangle
          onClick={handleClick} // Gère l'événement de clic
          onTap={handleClick} // Gère l'événement tactile (pour mobile)
        />
      </Layer>
    </Stage>
  );
}
