import React, { useState } from "react";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  console.log(colors);
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [addColor, setAddColor] = useState(initialColor);

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    const id = colorToEdit.id;
    axiosWithAuth().put(`/colors/${id}`,colorToEdit)
    .then(res => {
      updateColors([
        ...colors.filter(item => {
          if (item.id !== colorToEdit.id)
            return item; 
        }),
        colorToEdit
      ]);
      setEditing(false);
      // 
    })
    .catch(err => console.log(err))
  };

  const deleteColor = color => {
    axiosWithAuth().delete(`/colors/${color.id}`)
    .then(resp => {
      updateColors( colors.filter(item => {
        if(item.id !== color.id){
          return item;
        }
      }));
    })
    .catch(err => console.log(err))
  };
  const addColors = (e) => {
    e.preventDefault();
    axiosWithAuth().post('/colors',addColor)
      .then(resp => {
        updateColors([
          ...colors,
            addColor
        ]);
        setAddColor(initialColor);
      })
      .catch(err => console.log(err));
  }

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                    e.stopPropagation();
                    deleteColor(color)
                  }
                }>
                  x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <form onSubmit={addColors}>
        <label>color name: 
        <input
              onChange={e =>
                setAddColor({ ...addColor, color: e.target.value })
              }
              value={addColor.color}
            />
        </label>
        <label>hex code:
        <input
              onChange={e =>
                setAddColor({
                  ...addColor,
                  code: { hex: e.target.value }
                })
              }
              value={addColor.code.hex}
            />
        </label>
        <button>Add Color</button>
      </form>
    </div>
  );
};

export default ColorList;
