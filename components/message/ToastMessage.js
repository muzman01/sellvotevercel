import { ToastContainer, toast } from "react-toastify";
export const errorToastMessage = (messaga) => {
    toast.error(messaga, {
        position: toast.POSITION.TOP_CENTER,
      });
};
export const successToastMessage = (messaga) => {
    toast.success(messaga, {
        position: toast.POSITION.TOP_CENTER,
      });
};
export const warningToastMessage = (messaga) => {
    toast.warning(messaga, {
        position: toast.POSITION.TOP_CENTER,
      });
};
