import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

function GoBack({ title = "Quay lại" }) {
  const navigate = useNavigate();
  return (
    <button
      className="inline-flex items-center gap-4 bg-primary text-white hover:opacity-90 hover:scale-95 transition px-4 py-2 uppercase font-semibold rounded mt-4"
      onClick={() => navigate(-1)}
    >
      <FontAwesomeIcon icon={faArrowLeft} />
      {title}
    </button>
  );
}

export default GoBack;
