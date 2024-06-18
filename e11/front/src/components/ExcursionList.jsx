import { useContext, useState } from "react";
import { StateContext } from "../utils/StateContext";
import Excursion from "./Excursion";
import styles from "../styles/Excursions.module.css";
import Pagination from 'react-bootstrap/Pagination';

function ExcursionList() {
  const { excursions, error } = useContext(StateContext);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const indexOfLastExcursion = currentPage * itemsPerPage;
  const indexOfFirstExcursion = indexOfLastExcursion - itemsPerPage;
  const currentExcursions = excursions.slice(indexOfFirstExcursion, indexOfLastExcursion);

  const totalPages = Math.ceil(excursions.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const renderPaginationItems = () => {
    let items = [];
    items.push(
      <Pagination.First key="first" onClick={() => paginate(1)} disabled={currentPage === 1} />
    );
    items.push(
      <Pagination.Prev key="prev" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} />
    );
    for (let i = 1; i <= totalPages; i++) {
      items.push(
        <Pagination.Item key={i} active={i === currentPage} onClick={() => paginate(i)}>
          {i}
        </Pagination.Item>
      );
    }

    items.push(
      <Pagination.Next key="next" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages} />
    );
    items.push(
      <Pagination.Last key="last" onClick={() => paginate(totalPages)} disabled={currentPage === totalPages} />
    );

    return items;
  };

  const { excursionsList, excursionsPagination } = styles;
  return (
    <>
        <div className={excursionsList}>
          {currentExcursions.map((excursion) => (
            <Excursion excursion={excursion} key={excursion._id} />
          ))}
        </div>
      <div className={excursionsPagination}>
        <Pagination>{renderPaginationItems()}</Pagination>
      </div>
      {error}
    </>
  );
}

export default ExcursionList;
