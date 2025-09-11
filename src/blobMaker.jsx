import Konva from "konva";
import { Potrace } from "potrace";
import { useEffect, useRef, useState } from "react";
import { renderToString } from "react-dom/server";
import { Circle, Layer, Line, Stage } from "react-konva";
import { exportStageSVG } from "react-konva-to-svg";
const Point = ({ position, key, id, changePosition }) => {
  return (
    <Circle
      x={position.x}
      y={position.y}
      key={key}
      id={id}
      radius={5}
      fill="red"
      stroke="black"
      strokeWidth={1}
      draggable
      onMouseEnter={(e) => {
        document.body.style.cursor = "pointer";
      }}
      onMouseLeave={(e) => {
        document.body.style.cursor = "default";
      }}
      onDragMove={(e) => {
        changePosition({
          x: e.target.x(),
          y: e.target.y(),
        });
      }}
    />
  );
};

function downloadURI(uri, name) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

const handleDownload = async (ref) => {
  const stage = ref.current;
  if (ref.current != null) {
    // let test = stage.toCanvas();
    // console.log(test)
    // const svgString = new XMLSerializer().serializeToString(test);
    // console.log(svgString)
    
    // console.log(svgString);
    const line = stage.find("#blob")[0];

    const tempStage = new Konva.Stage({
      container: document.createElement("div"), // Conteneur factice
    
    });

    const tempLayer = new Konva.Layer();
    tempStage.add(tempLayer);

    // 3. Cloner l'élément et l'ajouter à la couche temporaire
    // On le translate pour qu'il soit à (0,0) dans le nouveau Stage
    const clonedRect = line.clone();
    clonedRect.x(0);
    clonedRect.y(0);
    tempLayer.add(clonedRect);

    // Mettre à jour la couche pour l'affichage interne
    tempLayer.draw();
    // console.log(svgString)
    const svgString = await exportStageSVG(tempStage);
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "my-component.svg";
    a.click();
    URL.revokeObjectURL(url);
  } else {
    alert("ref null");
  }
};
export default function BlobMaker() {
  // [23, 20, 23, 160, 70, 93, 150, 109, 290, 139, 270, 93]

  const ref = useRef(null);
  const [strokeWidth, setStrokeWidth] = useState(0);
  const [tension, setTension] = useState(0);
  const [points, setPoints] = useState([]);
  const [position, setPosition] = useState({ x: 10, y: 10 });
  const [position2, setPosition2] = useState({ x: 20, y: 20 });
  const [position3, setPosition3] = useState({ x: 30, y: 30 });
  const [position4, setPosition4] = useState({ x: 40, y: 40 });
  const [position1, setPosition1] = useState({ x: 50, y: 50 });
  const [position5, setPosition5] = useState({ x: 60, y: 60 });
  const [position6, setPosition6] = useState({ x: 70, y: 70 });
  const [position7, setPosition7] = useState({ x: 80, y: 80 });
  const [position8, setPosition8] = useState({ x: 90, y: 90 });
  const [position9, setPosition9] = useState({ x: 10, y: 10 });
  const [nbrPoint, setNbrPoint] = useState(5);
  const [listePosition, setListePosition] = useState([
    <Point position={position} changePosition={setPosition} />,
    <Point position={position1} changePosition={setPosition1} />,
    <Point position={position2} changePosition={setPosition2} />,
    <Point position={position3} changePosition={setPosition3} />,
    <Point position={position4} changePosition={setPosition4} />,
    <Point position={position5} changePosition={setPosition5} />,
    <Point position={position6} changePosition={setPosition6} />,
    <Point position={position7} changePosition={setPosition7} />,
    <Point position={position8} changePosition={setPosition8} />,
    <Point position={position9} changePosition={setPosition9} />,
  ]);

  const [PositionTotal, setPositionTotal] = useState([
    position.x,
    position.y,
    position1.x,
    position1.y,
    position2.x,
    position2.y,
    position3.x,
    position3.y,
    position4.x,
    position4.y,
    position5.x,
    position5.y,
    position6.x,
    position6.y,
    position7.x,
    position7.y,
    position8.x,
    position8.y,
    position9.x,
    position9.y,
  ]);
  const [pointPosition, setPointPosition] = useState(
    PositionTotal.slice(0, nbrPoint * 2)
  );
  const handleRangeChange = (e) => {
    if (e.target.value >= 5 && e.target.value <= 10) {
      setNbrPoint(e.target.value);
    }
  };
  useEffect(
    (e) => {
      setPoints(listePosition.slice(0, nbrPoint));
      setPointPosition(PositionTotal.slice(0, nbrPoint * 2));
      // console.log(pointPosition);
      setPositionTotal([
        position.x,
        position.y,
        position1.x,
        position1.y,
        position2.x,
        position2.y,
        position3.x,
        position3.y,
        position4.x,
        position4.y,
        position5.x,
        position5.y,
        position6.x,
        position6.y,
        position7.x,
        position7.y,
        position8.x,
        position8.y,
        position9.x,
        position9.y,
      ]);
    },
    [
      nbrPoint,
      position,
      position1,
      position2,
      position3,
      position4,
      position5,
      position6,
      position7,
      position8,
      position9,
    ]
  );
  const handleExport = (e) => {
    const uri = ref.current.toDataURL();
    // downloadURI(uri, "blob.png");
    handleDownload(ref);
  };
  const [colorFill, setColorFill] = useState("#eeeeee");

  const [strokeColor, setStrokeColor] = useState("#ffffff");

  return (
    <>
      <div className="btn">
        <div className="nbrPoint">
          <label htmlFor="nbrPoint">nombre de point</label>
          <input
            type="number"
            name="nbrPoint"
            id="nbrPoint"
            value={nbrPoint}
            onChange={(e) => handleRangeChange(e)}
          />
        </div>
        <div className="fill">
          <label htmlFor="fillColor">Color fill</label>
          <input
            type="color"
            id="fillColor"
            value={colorFill}
            onChange={(e) => setColorFill(e.target.value)}
          />
        </div>
        <div className="stroke">
          <div className="fill">
            <label htmlFor="stroke">Stroke </label>
            <div>
              <input
                type="number"
                id="stroke"
                value={strokeWidth}
                onChange={(e) => setStrokeWidth(e.target.value)}
              />
              <input
                type="color"
                name=""
                id="strokeColor"
                value={strokeColor}
                onChange={(e) => setStrokeColor(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="tension">
          <label htmlFor="tension">Tension</label>
          <input
            type="number"
            id="tension"
            value={tension}
            onChange={(e) => setTension(e.target.value)}
            step={"0.1"}
          />
        </div>
      </div>
      <button onClick={handleExport}>Export</button>
      <Stage ref={ref} width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Line
            id="blob"
            points={pointPosition}
            fill={colorFill}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
            closed
            onDragMove={(e) => {
              setPosition({
                x: e.target.x(),
                y: e.target.y(),
              });
            }}
            tension={tension}
          />
          {points.map((point) => point)}
        </Layer>
      </Stage>
    </>
  );
}
