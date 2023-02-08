import React from "react";
import { MdOutlineCancel } from "react-icons/md";
import classes from "./CancelButton.module.css";

type Props = {
  size: number;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
};

const CancelButton = ({ size, onClick }: Props) => {
  return (
    <button className={classes["cancel-button"]} onClick={onClick}>
      <MdOutlineCancel className={classes.logo} size={size} />
    </button>
  );
};

export default CancelButton;
