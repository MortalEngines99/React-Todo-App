import toast from "react-hot-toast";

// Documentation => https://react-hot-toast.com/docs/toast

const Toast = (type="", message="") => {

    if(type === "")
        toast(message);
    else if(type === "success")
        toast.success(message);
    else if(type === "error")
        toast.error(message)

}

export default Toast;