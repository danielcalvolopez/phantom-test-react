import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useState,
} from "react";
import isValidURL from "../utils/functions/validUrl";

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

// Context initial state
export const UrlContext = createContext<urlContextProps>({
  data: [],
  addItem: () => {},
  removeItem: () => {},
  removeAll: () => {},
  hasError: false,
  editItem: () => {},
  setData: () => {},
  isEditing: false,
  setIsEditing: () => {},
});

const UrlContextProvider = ({ children }: Props) => {
  // State for the data retrieved from the form. Get the initial state from the local storage or empty array if there is no data
  const [data, setData] = useState<itemObject[]>(
    JSON.parse(localStorage.getItem("urls") as any) || []
  );

  // Booleans to control error and edit states
  const [hasError, setHasError] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);

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
    const index = data.findIndex((item) => item.id === id);
    const newData = [...data];
    newData[index].item = newValue;

    localStorage.setItem("urls", JSON.stringify(newData));
    setData(newData);
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
