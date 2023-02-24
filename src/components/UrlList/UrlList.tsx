import React, { useContext, useMemo, useState } from "react";
import { UrlContext } from "../../context/UrlContext";
import DeleteButton from "../UI/Buttons/DeleteButton";
import Card from "../UI/Card/Card";
import Pagination from "../UI/Pagination/Pagination";
import Select from "../UI/Select/Select";
import ListItem from "./ListItem/ListItem";
import classes from "./UrlList.module.css";
import paginationOptions from "../../utils/constants/paginationOptions";

const UrlDisplayList = () => {
  const { data, removeAll } = useContext(UrlContext);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(20);

  // Get current items
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  // Change number of items per page
  const handleOnSelectItemsPerPage = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setItemsPerPage(event.target.value as number);
  };

  // Check if the list is empty
  const isEmptyList = useMemo(() => data.length === 0, [data]);

  return (
    <Card className={classes["list-container"]}>
      {isEmptyList ? (
        <h3 className={classes["nothing-to-show"]}>There is nothing to show</h3>
      ) : (
        <div className={classes["url-display-header"]}>
          <div>
            <DeleteButton onClick={removeAll} size={30} />
          </div>
          <Select
            value={itemsPerPage}
            onChange={handleOnSelectItemsPerPage}
            title="Show per page:"
            name="pagination"
            data={paginationOptions}
          />
        </div>
      )}

      {currentItems.map(({ id, item }) => (
        <ListItem key={id} item={item} id={id} />
      ))}

      <Pagination
        paginate={paginate}
        itemsPerPage={itemsPerPage}
        totalItems={data.length}
        currentPage={currentPage}
      />
    </Card>
  );
};

export default UrlDisplayList;
