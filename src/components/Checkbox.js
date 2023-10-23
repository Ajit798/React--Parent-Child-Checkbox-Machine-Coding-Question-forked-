import React from "react";

function Checkbox({ parentData, handleIndividualCheckboxChange, parentIndex }) {
  return (
    <div>
      {parentData.children.map((childCheckboxData, childIndex) => {
        return (
          <input
            key={childCheckboxData.childId}
            type="checkbox"
            checked={childCheckboxData.isChecked}
            onChange={() =>
              handleIndividualCheckboxChange(parentIndex, childIndex)
            }
          />
        );
      })}
    </div>
  );
}

export default Checkbox;
