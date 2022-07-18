import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Pagination({ last_page, current_page, setCurrentPage, currentPage }) {
  return (
    <div className="text-center">
      <ul className="inline-flex -space-x-px my-5 items-center">
        <li className="py-2 px-3 ml-0 leading-tight text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 disabled">
          <button onClick={() => setCurrentPage(Math.max(current_page - 1, 1))}>
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        </li>

        {[...Array(last_page)].map((page, index) => {
          const current = index + 1;
          return (
            <li key={index}>
              <button
                onClick={() => setCurrentPage(current)}
                className={`py-2 px-3 leading-tight text-gray-500 border border-gray-300  hover:text-gray-700 ${
                  current === currentPage
                    ? "bg-blue-200 hover:bg-blue-100"
                    : "bg-white hover:bg-gray-100"
                }`}
              >
                {current}
              </button>
            </li>
          );
        })}

        <li className="py-2 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 ">
          <button onClick={() => setCurrentPage(Math.min(current_page + 1, last_page))}>
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
