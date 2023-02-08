import React from "react";
import { AiOutlineSave } from "react-icons/ai";
import classes from "./SaveButton.module.css";

type Props = {
  size: number;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const SaveButton = ({ size, onClick }: Props) => {
  return (
    <button className={classes["save-button"]} onClick={onClick}>
      <AiOutlineSave className={classes.logo} size={size} />
    </button>
  );
};

export default SaveButton;
