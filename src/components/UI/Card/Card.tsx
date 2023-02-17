import React, { useMemo } from "react";
import classes from "./Card.module.css";

type Props = {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
};

const Card = ({ children, style, className }: Props) => {
  const classNames = useMemo(() => {
    const defaultClassname = classes.card;

    if (className) {
      return defaultClassname.concat(" ", className);
    }

    return defaultClassname;
  }, []);
  return (
    <div className={classNames} style={style}>
      {children}
    </div>
  );
};

export default Card;
