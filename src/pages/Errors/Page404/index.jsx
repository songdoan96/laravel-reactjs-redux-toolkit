import img from "assets/images/404.svg";
import GoBack from "components/GoBack";
const Page404 = () => {
  return (
    <div className="relative w-screen h-screen">
      <div className="absolute left-1/2 -translate-x-1/2 ">
        <GoBack />
      </div>

      <img src={img} alt="img" className="absolute w-full h-full -z-10" />
    </div>
  );
};

export default Page404;
