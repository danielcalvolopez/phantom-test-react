import { ChangeEventHandler } from "react";
import uuid from "react-uuid";
import classes from "./Select.module.css";

type Props = {
  name: string;
  id?: string;
  data: number[];
  title: string;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  value: number;
};

const Select = ({ name, id, data, title, onChange, value }: Props) => {
  return (
    <div className={classes["select-container"]}>
      <label className={classes.title}>{title}</label>
      <select
        className={classes.select}
        name={name}
        id={id}
        onChange={onChange}
        value={value}
      >
        {data.map((option) => (
          <option className={classes.option} key={uuid()}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
