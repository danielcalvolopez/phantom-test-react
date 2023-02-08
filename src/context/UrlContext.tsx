import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

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
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

export const UrlContext = createContext<urlContextProps>({
  data: [],
  addItem: function (value: string): void {},
  removeItem: function (id: number): void {},
  removeAll: function (): void {},
  hasError: false,
  editItem: function (id: number, value: string): void {},
  setData: function (value: itemObject[]): void {},
  isEditing: false,
  setIsEditing: function (): void {},
});

const UrlContextProvider = ({ children }: Props) => {
  // State for the data retrieved from the form. Get the initial state from the local storage or empty array if there is no data
  const [data, setData] = useState<itemObject[]>(
    JSON.parse(localStorage.getItem("urls") as any) || []
  );

  // Booleans to control error and edit states
  const [hasError, setHasError] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  // URL format validation with regular expression that accepts a string and returns a test
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

  // Check if the value entered meets the URL criteria. Add the item with an ID if correct and change state to hasError true if not
  const addItem = (value: string) => {
    const found = data.find((url) => url.item === value);

    if (isValidURL(value) && !found) {
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

  // To remove a specific item from the URL list and from the localStorage
  const removeItem = (id: number) => {
    const dataToRemove = data.filter((item) => item.id !== id);
    localStorage.setItem("urls", JSON.stringify(dataToRemove));
    setData(dataToRemove);
  };

  // Accepts two parameters, id to identify the element in the URL list, and new value to update the value
  const editItem = (id: number, newValue: string) => {
    let newData = [...data];
    let index = newData.findIndex((item) => item.id === id);
    if (index !== -1) {
      data[index].item = newValue;
    }
    return newValue;
  };

  // Removes everything from the URL list (data array) and from local storage
  const removeAll = () => {
    localStorage.clear();
    setData([]);
  };

  return (
    <UrlContext.Provider
      value={{
        setIsEditing,
        isEditing,
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
