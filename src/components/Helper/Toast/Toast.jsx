import "./Toast.scss";

const Toast = (props) => {
  const { id, message } = props.props;
  return (
    <>
      <div className="toast-container hide" id={id}>
        <div className="toast-message">{message}</div>
      </div>
    </>
  );
};

const showToast = (id) => {
  let selector = document.getElementById(id);
  selector.classList.add("show");
  setTimeout(() => selector.classList.remove("show"), 3000);
};

export { Toast, showToast };
