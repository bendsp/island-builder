import React from "react";
import "../styles/UI.css";

interface UIProps {
  waterLevel: number;
  setWaterLevel: (value: number) => void;
}

const UI: React.FC<UIProps> = ({ waterLevel, setWaterLevel }) => {
  return (
    <div className="ui-container">
      <div className="ui-panel">
        <h2>Island Builder</h2>

        <div className="control-group">
          <h3>Water Level: {waterLevel.toFixed(2)}</h3>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={waterLevel}
            onChange={(e) => setWaterLevel(parseFloat(e.target.value))}
            className="slider"
          />
          <p className="slider-description">Adjusts how high the water rises</p>
        </div>

        <div className="instructions">
          <h3>Instructions</h3>
          <p>Use the slider to adjust the water level.</p>
          <p>Rotate the view by dragging with the right mouse button.</p>
          <p>Zoom with the mouse wheel.</p>
        </div>
      </div>
    </div>
  );
};

export default UI;
