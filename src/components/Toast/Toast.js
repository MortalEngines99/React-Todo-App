import toast from "react-hot-toast";

// Documentation => https://react-hot-toast.com/docs/toast

const Toast = (type="", message="", options={}) => {

    if(type === "")
        toast(message, options);
    else if(type === "success")
        toast.success(message, options);
    else if(type === "error")
        toast.error(message, options)

}

export default Toast;