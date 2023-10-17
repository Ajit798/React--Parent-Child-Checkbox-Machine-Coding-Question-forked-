import "./styles.css";
import React from "react";
import { useCallback } from "react";

export default function App() {
  const [classCheckbox, setClassCheckbox] = React.useState(false);
  const [checkboxes, setCheckboxes] = React.useState([
    {
      name: "Section 1",
      isParentChecked: false,
      id: 1,
      children: [
        { id: 1, isChecked: false },
        { id: 1, isChecked: false },
        { id: 1, isChecked: false },
      ],
    },
    {
      name: "Section 2",
      isParentChecked: false,
      id: 2,
      children: [
        { id: 2, isChecked: false },
        { id: 2, isChecked: false },
        { id: 2, isChecked: false },
      ],
    },
    {
      name: "Section 3",
      isParentChecked: false,
      id: 3,
      children: [
        { id: 3, isChecked: false },
        { id: 3, isChecked: false },
        { id: 3, isChecked: false },
      ],
    },
  ]);
  const handleChange = (id) => {
    const copy = [...checkboxes];
    const index = checkboxes.findIndex((ele) => ele.id === id);
    const output = checkboxes.find((ele) => ele.id === id);
    output.isParentChecked = !output.isParentChecked;
    output.children = output.children.map((ele) => {
      return {
        ...ele,
        isChecked: !ele.isChecked,
      };
    });
    copy[index] = output;
   

    setCheckboxes([...copy]);
    handleClassChange();
  };

  const handleIndividualChange = (e, id, ind) => {
    const copy = [...checkboxes];
    const index = checkboxes.findIndex((ele) => ele.id === id);
    const output = copy.find((ele) => ele.id === id);

    output.children = output.children.map((child, index) => {
      if (index === ind) {
        return {
          ...child,
          isChecked: !child.isChecked,
        };
      } else {
        return child;
      }
    });

    if (output.children.every((nn) => nn.isChecked)) {
      output.isParentChecked = true;
    } else {
      output.isParentChecked = false;
    }
    copy[index] = output;

    setCheckboxes([...copy]);
    handleClassChange();
  };
  const handleClass = () => {
    setClassCheckbox((prevData) => !prevData);
    handleAllCheckbox();
  };

  const handleAllCheckbox = useCallback(() => {
    console.log("copy", copy);
    let copy = [...checkboxes];
    copy = copy.map((elem) => {
      const child = elem.children.map((ele) => ({
        ...ele,
        isChecked: !ele.isChecked,
      }));

      return {
        ...elem,
        isParentChecked: !elem.isParentChecked,
        children: child,
      };
    });

    setCheckboxes([...copy]);
  }, [classCheckbox]);

  const handleClassChange = () => {
    if (checkboxes.every((ele) => ele.isParentChecked)) {
      setClassCheckbox(true);
    } else {
      setClassCheckbox(false);
    }
  };
  
  return (
    <div className="App">
      <div style={{ display: "flex" }}>
        <h3>Class 9</h3>
        <input
          type="checkbox"
          checked={classCheckbox}
          onChange={() => handleClass()}
        />
      </div>

      {checkboxes.map((data, ind) => {
        return (
          <div>
            <div style={{ display: "flex" }}>
              <input
                type="checkbox"
                checked={data.isParentChecked}
                onChange={() => handleChange(data.id)}
              />
              <h2>{data.name}</h2>
            </div>

            <div>
              {data.children.map((ele, ind) => {
                return (
                  <div>
                    <input
                      type="checkbox"
                      checked={ele.isChecked}
                      onChange={(event) =>
                        handleIndividualChange(event, data.id, ind)
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
