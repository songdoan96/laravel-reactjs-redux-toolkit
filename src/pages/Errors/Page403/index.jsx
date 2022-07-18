import { faBackward } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import img from "assets/images/403.svg";

const Page403 = () => {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);
  return (
    <div className="relative w-screen h-screen">
      <button
        onClick={goBack}
        className="absolute top-16 left-1/2 -translate-x-1/2 bg-primary hover:opacity-95 transition text-white py-3 px-5 rounded-md text-sm shadow-lg"
      >
        <FontAwesomeIcon icon={faBackward} className="mr-2" />
        Quay lại
      </button>
      <img src={img} alt="img" className="absolute w-full h-full -z-10" />
    </div>
  );
};

export default Page403;
