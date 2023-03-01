import "./Toast.scss";

const Toast = (props) => {
  const { children } = props;

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
            success: props.type === "success",
            warn: props.type === "warn",
            info: props.type === "info",
          }}
        >
          {props.message}
          {children === undefined ? null : (
            <div className="children">{children}</div>
          )}
        </div>
      </div>
    </>
  );
};

export { Toast };
