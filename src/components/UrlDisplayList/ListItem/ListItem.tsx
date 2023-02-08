import React, { useContext, useState } from "react";
import { UrlContext } from "../../../context/UrlContext";
import CancelButton from "../../UI/Buttons/CancelButton";
import DeleteButton from "../../UI/Buttons/DeleteButton";
import EditButton from "../../UI/Buttons/EditButton";
import SaveButton from "../../UI/Buttons/SaveButton";
import classes from "./ListItem.module.css";

type Props = {
  item: string;
  id: number;
};

const ListItem = ({ item, id }: Props) => {
  // State of the edited field
  const [editedInput, setEditedInput] = useState<string>(item);

  // useContext is used to bring the functions that can manipulate the elements like remove or edit, and also be able to identify and modify the editing state
  const { removeItem, editItem, isEditing, setIsEditing } =
    useContext(UrlContext);

  // Handles remove items
  const handleRemoveItem = () => {
    removeItem(id);
  };

  // This makes possible to click on the link and go the specific URL
  const handleOnClickUrl = () => {
    window.open(item);
  };

  // Handles access editing mode
  const handleIsEditing = () => {
    setIsEditing(true);

    setEditedInput(item);
  };

  // Handles exit editing mode
  const handleExitEditing = () => {
    setIsEditing(false);
    setEditedInput(item);
  };

  // Handles new value in editing mode
  const handleInputEditing = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEditedInput(event.target.value);
  };

  // Handle save the edited value
  const handleSaveEdit = () => {
    editItem(id, editedInput);

    setIsEditing(false);
  };

  return (
    <div className={classes["list-item-container"]}>
      {isEditing ? (
        <>
          <h3 className={classes.url}>
            <input
              type="text"
              value={editedInput}
              onChange={handleInputEditing}
            />
          </h3>
          <div className={classes["actions-buttons"]}>
            <SaveButton onClick={handleSaveEdit} size={20} />
            <CancelButton onClick={handleExitEditing} size={20} />
          </div>
        </>
      ) : (
        <>
          <h3 className={classes.url} onClick={handleOnClickUrl}>
            {item}
          </h3>
          <div className={classes["actions-buttons"]}>
            <EditButton onClick={handleIsEditing} size={20} />
            <DeleteButton onClick={handleRemoveItem} size={20} />
          </div>
        </>
      )}
    </div>
  );
};

export default ListItem;
