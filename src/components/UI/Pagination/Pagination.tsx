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
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const totalPages = pageNumbers.length;

  console.log(totalPages, currentPage);

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
