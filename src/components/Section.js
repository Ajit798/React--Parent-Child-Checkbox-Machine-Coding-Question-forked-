import React from "react";

export function Section({ parentData, handleParentChange }) {
  return (
    <div style={{ display: "flex" }}>
      <input
        type="checkbox"
        checked={parentData.isParentChecked}
        onChange={handleParentChange}
      />
      <h2>{parentData.name}</h2>
    </div>
  );
}
