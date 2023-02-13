import "./Toast.scss";

const Toast = (props) => {
  const { id, message } = props.props;
  return (
    <>
      <div className="toast-container" id={id}>
        <div>{message}</div>
      </div>
    </>
  );
};

const showToast = (id) => {
  let selector = document.getElementById(id);
  selector.classList.add("show");
  setTimeout(() => selector.classList.remove("show"), 5000);
};

export { Toast, showToast };
