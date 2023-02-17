import "./Toast.scss";

const Toast = (props) => {
  const { id, children, success } = props;
  return (
    <>
      <div className="toast-container hide" id={id}>
        <div className="toast-message">{children}</div>
      </div>
    </>
  );
};


export { Toast };
