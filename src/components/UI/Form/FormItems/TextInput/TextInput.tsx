import React from "react";
import classes from "./TextInput.module.css";

type Props = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  label: string;
};

const TextInput = ({ label, value, onChange, placeholder }: Props) => {
  return (
    <>
      <label>{label}</label>
      <input
        className={classes["text-input"]}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default TextInput;
