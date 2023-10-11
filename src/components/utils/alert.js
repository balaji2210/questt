import Swal from "sweetalert2";

const Alert = ({
  title = "",
  icon = "",
  text = "",
  showCloseButton = true,
  showCancelButton = false,
  focusConfirm = true,
  confirmButtonText = "OK",
  confirmButtonColor = "#3B82F6",
  cancelButtonText = "Cancel",
  allowOutsideClick = true,
}) => {
  return Swal.fire({
    title,
    icon,
    text,
    showCloseButton,
    showCancelButton,
    focusConfirm,
    confirmButtonText,
    confirmButtonColor,
    cancelButtonText,
    allowOutsideClick,
  });
};

export default Alert;
