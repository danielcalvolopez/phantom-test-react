import React, { useMemo } from "react";
import classes from "./Card.module.css";

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Card = ({ children, className }: Props) => {
  const classNames = useMemo(() => {
    const defaultClassname = classes.card;

    if (className) {
      return defaultClassname.concat(" ", className);
    }

    return defaultClassname;
  }, []);
  return <div className={classNames}>{children}</div>;
};

export default Card;
