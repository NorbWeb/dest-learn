import "./Toast.scss";

const Toast = (props) => {
  const { children, type } = props;

  return (
    <>
      <div
        id="toast"
        className="toast-container hide"
        classList={{ show: props.open }}
      >
        <div
          className="toast-message"
          classList={{
            success: type === "success",
            warn: type === "warn",
            info: type === "info",
          }}
        >
          {props.message ? props.message : children}
        </div>
      </div>
    </>
  );
};

export { Toast };
