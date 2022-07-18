import { toast } from "react-toastify";

const ToastMsg = (type = "success", msg = "") => {
  switch (type) {
    case "loading":
      toast.warn(msg, { toastId: "toastId" });
      break;
    case "info":
      toast.info(msg, { toastId: "toastId" });
      break;
    case "warn":
      toast.warn(msg, { toastId: "toastId" });
      break;
    case "warning":
      toast.warning(msg, { toastId: "toastId" });
      break;
    case "error":
      toast.error(msg, { toastId: "toastId" });
      break;
    case "dark":
      toast.dark(msg, { toastId: "toastId" });
      break;
    default:
      toast.success(msg, { toastId: "toastId" });
  }
};
export default ToastMsg;
