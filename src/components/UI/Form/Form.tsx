import React from "react";
import classes from "./Form.module.css";

type Props = {
  children: React.ReactNode;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  title: string;
};

const Form = ({ children, onSubmit, title }: Props) => {
  return (
    <div className={classes["form-container"]}>
      <h2 className={classes.title}>{title}</h2>
      <form className={classes.form} onSubmit={onSubmit}>
        {children}
      </form>
    </div>
  );
};

export default Form;
