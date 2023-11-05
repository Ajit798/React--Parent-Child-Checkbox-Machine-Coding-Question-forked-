import "./styles.css";
import React from "react";
import { useCallback } from "react";
import { mockCheckboxData, Strings } from "./mockData/constants";
import { Section } from "./components/Section";
import Checkbox from "./components/Checkbox";

export default function App() {
  const [isclassCheckboxChecked, setIsClassCheckboxChecked] =
    React.useState(false);
  const [checkboxesData, setCheckboxesData] = React.useState(mockCheckboxData);

  //* The Parent Section Handle Change Function
  const handleParentChange = (parentIndex) => {
    const copiedCheckboxData = [...checkboxesData];

    copiedCheckboxData[parentIndex].isParentChecked =
      !copiedCheckboxData[parentIndex].isParentChecked;
    copiedCheckboxData[parentIndex].children = copiedCheckboxData[
      parentIndex
    ].children.map((ele) => {
      return {
        ...ele,
        isChecked: !ele.isChecked,
      };
    });

    setCheckboxesData([...copiedCheckboxData]);
    handleClassChange();
  };

  //* The Individual Checkbox Handle Change Function
  const handleIndividualCheckboxChange = (parentIndex, childIndex) => {
    const copiedCheckboxData = [...checkboxesData];

    copiedCheckboxData[parentIndex].children[childIndex].isChecked =
      !copiedCheckboxData[parentIndex].children[childIndex].isChecked;

    if (
      copiedCheckboxData[parentIndex].children.every(
        (childData) => childData.isChecked
      )
    ) {
      copiedCheckboxData[parentIndex].isParentChecked = true;
    } else {
      copiedCheckboxData[parentIndex].isParentChecked = false;
    }

    setCheckboxesData([...copiedCheckboxData]);
    handleClassChange();
  };
  const handleClass = () => {
    setIsClassCheckboxChecked((prevData) => !prevData);
    handleAllCheckbox(!isclassCheckboxChecked);
  };

  //* All Checkbox handle Change Function

  const handleAllCheckbox = useCallback(
    (classStatus) => {
      let copiedCheckboxData = [...checkboxesData];
      copiedCheckboxData = copiedCheckboxData.map((elem) => {
        const child = elem.children.map((ele) => ({
          ...ele,
          isChecked: classStatus,
        }));

        return {
          ...elem,
          isParentChecked: classStatus,
          children: child,
        };
      });

      setCheckboxesData([...copiedCheckboxData]);
    },
    [isclassCheckboxChecked]
  );

  //* Function to check of all the section and subsection are checked
  const handleClassChange = () => {
    if (checkboxesData.every((ele) => ele.isParentChecked)) {
      setIsClassCheckboxChecked(true);
    } else {
      setIsClassCheckboxChecked(false);
    }
  };
  return (
    <div className="App">
      <div style={{ display: "flex" }}>
        <h3>{Strings["Class-9"]}</h3>
        <input
          type="checkbox"
          checked={isclassCheckboxChecked}
          onChange={handleClass}
        />
      </div>

      {checkboxesData.map((parentData, parentIndex) => {
        return (
          <div key={parentIndex}>
            <div style={{ display: "flex" }}>
              <Section
                parentData={parentData}
                handleParentChange={() => handleParentChange(parentIndex)}
              />
            </div>

            <Checkbox
              parentData={parentData}
              handleIndividualCheckboxChange={handleIndividualCheckboxChange}
              parentIndex={parentIndex}
            />
          </div>
        );
      })}
    </div>
  );
}
