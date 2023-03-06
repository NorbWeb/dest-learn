import { createEffect, createSignal } from "solid-js";
import "./Toast.scss";

const Toast = (props) => {
  const { children } = props;
  const [toastOpen, setToastOpen] = createSignal(false);

  createEffect(() => {
    if (props.open === true) {
      setToastOpen(true);
    } else if (props.open === false && !props.timeBeforeAutoClose) {
      setToastOpen(false);
    }
    if (props.open === true && props.timeBeforeAutoClose) {
      setTimeout(() => {
        setToastOpen(false);
      }, props.timeBeforeAutoClose);
    }
  });

  return (
    <>
      <div
        id={props.id ? props.id : "toast"}
        className="toast-container hide"
        classList={{ show: toastOpen() }}
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
