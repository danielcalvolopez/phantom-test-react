import React, { useContext, useEffect, useState } from "react";
import { itemObject, UrlContext } from "../../../context/UrlContext";
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
  const [editedInput, setEditedInput] = useState<string>(item);
  const { removeItem, editItem, isEditing, setIsEditing } =
    useContext(UrlContext);

  const handleRemoveItem = () => {
    removeItem(id);
  };

  const handleOnClickUrl = () => {
    window.open(item);
  };

  const handleIsEditing = () => {
    setIsEditing((prev) => !prev);

    setEditedInput(item);
  };

  const handleExitEditing = () => {
    setIsEditing(false);
    setEditedInput(item);
  };

  const handleInputEditing = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setEditedInput(event.target.value);
  };

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
