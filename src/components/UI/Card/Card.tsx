import React from "react";
import classes from "./Card.module.css";

type Props = {
  children: React.ReactNode;
  style: React.CSSProperties;
};

const Card = ({ children, style }: Props) => {
  return (
    <div className={classes.card} style={style}>
      {children}
    </div>
  );
};

export default Card;
