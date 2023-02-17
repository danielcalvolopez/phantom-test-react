import { useEffect, useState } from "react";
import uuid from "react-uuid";
import classes from "./Pagination.module.css";

type Props = {
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
};

const Pagination = ({
  itemsPerPage,
  totalItems,
  paginate,
  currentPage,
}: Props) => {
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);

  // Empty array that is filled with page numbers as the list (array) grows, and depends on the number of elements per page
  useEffect(() => {
    const newPageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i += 1) {
      newPageNumbers.push(i);
    }
    setPageNumbers(newPageNumbers);
  }, [totalItems, itemsPerPage]);

  // Calculate the total number of pages
  const totalPages = pageNumbers.length;

  return (
    <nav className={classes["pagination-container"]}>
      {currentPage > 1 && (
        <div
          className={classes.arrow}
          onClick={() => paginate(currentPage - 1)}
        >
          {"<"}
        </div>
      )}

      <ul className={classes.list}>
        {pageNumbers.map((number) => (
          <li
            key={uuid()}
            className={currentPage === number ? classes.current : classes.page}
          >
            <p onClick={() => paginate(number)} className={classes.link}>
              {number}
            </p>
          </li>
        ))}
      </ul>

      {currentPage < totalPages && (
        <div
          className={classes.arrow}
          onClick={() => paginate(currentPage + 1)}
        >
          {">"}
        </div>
      )}
    </nav>
  );
};

export default Pagination;
