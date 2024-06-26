import { Bounce, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const showErrorToast = (message: string) => {
    toast.error(message, {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
    });
};

export const showSuccessToast = (message: string) => {
    toast.success(message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
    });
};