import React from "react";
import { AiOutlineDelete } from "react-icons/ai";
import classes from "./DeleteButton.module.css";

type Props = {
  size: number;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const DeleteButton = ({ size, onClick }: Props) => {
  return (
    <button className={classes["delete-button"]} onClick={onClick}>
      <AiOutlineDelete className={classes.logo} size={size} />
    </button>
  );
};

export default DeleteButton;
