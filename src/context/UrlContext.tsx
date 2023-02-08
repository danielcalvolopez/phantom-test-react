import React, { createContext, useState } from "react";

type Props = {
  children: React.ReactNode;
};

export interface itemObject {
  id: number;
  item: string;
}

interface urlContextProps {
  data: itemObject[];
  addItem: (value: string) => void;
  removeItem: (id: number) => void;
  removeAll: () => void;
  hasError: boolean;
  editItem: (id: number, value: string) => void;
  setData: (value: itemObject[]) => void;
}

export const UrlContext = createContext<urlContextProps>({
  data: [],
  addItem: function (value: string): void {},
  removeItem: function (id: number): void {},
  removeAll: function (): void {},
  hasError: false,
  editItem: function (id: number, value: string): void {},
  setData: function (value: itemObject[]): void {},
});

const UrlContextProvider = ({ children }: Props) => {
  const [data, setData] = useState<itemObject[]>(
    JSON.parse(localStorage.getItem("urls") as any) || []
  );

  console.log(data);

  const [hasError, setHasError] = useState(false);

  const isValidURL = (str: string) => {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    return !!pattern.test(str);
  };

  const addItem = (value: string) => {
    if (isValidURL(value)) {
      const newData = [
        ...data,
        { id: Date.now() * Math.random(), item: value },
      ];

      setData(newData);
      localStorage.setItem("urls", JSON.stringify(newData));
      setHasError(false);
    } else {
      setHasError(true);
    }
  };

  const removeItem = (id: number) => {
    const dataToRemove = data.filter((item) => item.id !== id);
    localStorage.setItem("urls", JSON.stringify(dataToRemove));
    setData(dataToRemove);
  };

  const editItem = (id: number, newValue: string) => {
    let newData = [...data];
    let index = newData.findIndex((item) => item.id === id);
    if (index !== -1) {
      data[index].item = newValue;
    }
    return newValue;
  };

  const removeAll = () => {
    localStorage.clear();
    setData([]);
  };

  return (
    <UrlContext.Provider
      value={{
        setData,
        data,
        addItem,
        removeItem,
        removeAll,
        hasError,
        editItem,
      }}
    >
      {children}
    </UrlContext.Provider>
  );
};

export default UrlContextProvider;
