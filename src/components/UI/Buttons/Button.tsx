import React from "react";
import classes from "./Button.module.css";

type Props = {
  children: React.ReactNode;
};

const Button = ({ children }: Props) => {
  return <button className={classes.button}>{children}</button>;
};

export default Button;
