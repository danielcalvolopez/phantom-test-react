import React from "react";
import { AiFillEdit as EditIcon } from "react-icons/ai";
import classes from "./EditButton.module.css";

type Props = {
  size: number;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const EditButton = ({ size, onClick }: Props) => {
  return (
    <button className={classes["edit-button"]} onClick={onClick}>
      <EditIcon className={classes.logo} size={size} />
    </button>
  );
};

export default EditButton;
